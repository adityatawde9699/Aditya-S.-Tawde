import { asc, eq } from 'drizzle-orm';
import { Hono } from 'hono';
import type { FC, PropsWithChildren } from 'hono/jsx';

import { db } from '../db/client.js';
import { projectTechStacks, techStacks } from '../db/schema.js';
import {
  clearAdminCookie,
  getAdminClaims,
  issueAdminCookie,
  requireAdmin,
  verifyPassword,
} from '../lib/auth.js';
import { cacheClear } from '../lib/cache.js';
import { adminUsers, contactSubmissions } from '../db/schema.js';
import { coerceField, RESOURCES, type Field, type Resource } from './resources.js';

/**
 * Server-rendered CMS (hono/jsx). Replaces the Django Unfold admin with a
 * lightweight, dependency-free UI for CRUD over portfolio content. Mutations
 * clear the read cache so changes appear on the site immediately.
 */
const cms = new Hono();

// ── Layout ─────────────────────────────────────────────────────────────────
const STYLES = `
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin:0; font-family: ui-sans-serif, system-ui, sans-serif; background:#0b0b14; color:#e7e7ef; }
  a { color:#a78bfa; text-decoration:none; }
  a:hover { text-decoration:underline; }
  header { display:flex; align-items:center; justify-content:space-between; padding:14px 24px; background:#15152a; border-bottom:1px solid #26264a; }
  header .brand { font-weight:700; letter-spacing:.3px; }
  .layout { display:flex; min-height: calc(100vh - 56px); }
  nav { width:220px; padding:18px 12px; border-right:1px solid #26264a; background:#101024; }
  nav a { display:block; padding:9px 12px; border-radius:8px; margin-bottom:4px; color:#c9c9da; }
  nav a.active, nav a:hover { background:#23234a; color:#fff; text-decoration:none; }
  main { flex:1; padding:28px 32px; max-width: 980px; }
  h1 { font-size:20px; margin:0 0 18px; }
  table { width:100%; border-collapse:collapse; font-size:14px; }
  th, td { text-align:left; padding:10px 12px; border-bottom:1px solid #23234a; }
  th { color:#9a9ab8; font-weight:600; }
  .btn { display:inline-block; padding:8px 14px; border-radius:8px; border:1px solid #3a3a6a; background:#6d4aff; color:#fff; cursor:pointer; font-size:14px; }
  .btn.secondary { background:transparent; }
  .btn.danger { background:#b3325a; border-color:#b3325a; }
  .row-actions a, .row-actions button { margin-right:8px; }
  form.stack label { display:block; margin:14px 0 6px; font-size:13px; color:#b9b9d4; }
  form.stack input[type=text], form.stack input[type=url], form.stack input[type=number],
  form.stack input[type=date], form.stack select, form.stack textarea {
    width:100%; padding:10px 12px; border-radius:8px; border:1px solid #2f2f5a; background:#101024; color:#e7e7ef; font-size:14px;
  }
  form.stack textarea { min-height:120px; font-family: ui-monospace, monospace; }
  .help { font-size:12px; color:#7a7a9a; margin-top:4px; }
  .checks { display:flex; flex-wrap:wrap; gap:8px; margin-top:8px; }
  .checks label { display:flex; align-items:center; gap:6px; background:#16162e; padding:6px 10px; border-radius:6px; margin:0; }
  .toolbar { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
  .login-wrap { display:flex; align-items:center; justify-content:center; min-height:100vh; }
  .card { background:#15152a; border:1px solid #26264a; padding:28px; border-radius:14px; width:320px; }
  .error { color:#ff8aa6; font-size:13px; margin-top:10px; }
  .pill { font-size:12px; padding:2px 8px; border-radius:99px; background:#23234a; }
`;

const Layout: FC<PropsWithChildren<{ title: string; active?: string; username?: string }>> = (props) => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{props.title} · CMS</title>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
    </head>
    <body>
      <header>
        <span class="brand">⚙️ Portfolio CMS</span>
        <span>
          {props.username ? <span class="pill">{props.username}</span> : null}{' '}
          <a href="/admin/logout">Logout</a>
        </span>
      </header>
      <div class="layout">
        <nav>
          {Object.values(RESOURCES).map((r) => (
            <a class={props.active === r.slug ? 'active' : ''} href={`/admin/${r.slug}`}>
              {r.label}
            </a>
          ))}
          <a class={props.active === 'contacts' ? 'active' : ''} href="/admin/contacts">
            Messages
          </a>
        </nav>
        <main>{props.children}</main>
      </div>
    </body>
  </html>
);

// ── Field rendering ──────────────────────────────────────────────────────────
const FieldInput: FC<{ field: Field; value: unknown }> = ({ field, value }) => {
  const v = value ?? '';
  if (field.type === 'textarea') {
    return <textarea name={field.key}>{String(v)}</textarea>;
  }
  if (field.type === 'json') {
    const str = typeof v === 'string' ? v : JSON.stringify(v ?? [], null, 2);
    return <textarea name={field.key}>{str}</textarea>;
  }
  if (field.type === 'boolean') {
    return <input type="checkbox" name={field.key} checked={Boolean(v)} />;
  }
  if (field.type === 'select') {
    return (
      <select name={field.key}>
        {(field.options ?? []).map((opt) => (
          <option value={opt} selected={String(v) === opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }
  const inputType = field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : field.type === 'url' ? 'url' : 'text';
  return <input type={inputType} name={field.key} value={String(v ?? '')} />;
};

// ── Helpers ──────────────────────────────────────────────────────────────────
function resourceOr404(c: any, slug: string): Resource | null {
  const r = RESOURCES[slug];
  if (!r) {
    c.status(404);
    return null;
  }
  return r;
}

async function buildValues(r: Resource, form: Record<string, any>): Promise<Record<string, unknown>> {
  const values: Record<string, unknown> = {};
  for (const field of r.fields) {
    const raw = form[field.key];
    values[field.key] = coerceField(field, typeof raw === 'string' ? raw : undefined);
  }
  if (r.table === RESOURCES.experiences.table) {
    values.updatedAt = new Date();
  }
  return values;
}

async function syncTechStack(projectId: number, selected: string[]): Promise<void> {
  await db.delete(projectTechStacks).where(eq(projectTechStacks.projectId, projectId));
  const ids = selected.map(Number).filter((n) => Number.isFinite(n));
  if (ids.length > 0) {
    await db.insert(projectTechStacks).values(ids.map((techStackId) => ({ projectId, techStackId })));
  }
}

// ── Auth pages ───────────────────────────────────────────────────────────────
cms.get('/login', async (c) => {
  if (await getAdminClaims(c)) return c.redirect('/admin');
  const error = c.req.query('error');
  return c.html(
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>CMS Login</title>
        <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      </head>
      <body>
        <div class="login-wrap">
          <form class="card stack" method="post" action="/admin/login">
            <h1>Portfolio CMS</h1>
            <label>Username</label>
            <input type="text" name="username" autofocus />
            <label>Password</label>
            <input type="text" style="-webkit-text-security:disc" name="password" />
            <div style="margin-top:18px">
              <button class="btn" type="submit">Sign in</button>
            </div>
            {error ? <div class="error">Invalid credentials.</div> : null}
          </form>
        </div>
      </body>
    </html>,
  );
});

cms.post('/login', async (c) => {
  const form = await c.req.parseBody();
  const username = String(form.username ?? '');
  const password = String(form.password ?? '');
  const [user] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.username, username))
    .limit(1);
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return c.redirect('/admin/login?error=1');
  }
  await issueAdminCookie(c, user);
  return c.redirect('/admin');
});

cms.get('/logout', async (c) => {
  clearAdminCookie(c);
  return c.redirect('/admin/login');
});

// Everything below requires auth (redirect to login when missing).
cms.use('*', requireAdmin({ redirect: true }));

// ── Dashboard ────────────────────────────────────────────────────────────────
cms.get('/', async (c) => {
  const claims = await getAdminClaims(c);
  return c.html(
    <Layout title="Dashboard" username={claims?.username}>
      <h1>Content Management</h1>
      <p>Select a section to manage from the left. Changes appear on the live site immediately.</p>
    </Layout>,
  );
});

// ── Contact inbox (read-only) ────────────────────────────────────────────────
cms.get('/contacts', async (c) => {
  const claims = await getAdminClaims(c);
  const rows = await db
    .select()
    .from(contactSubmissions)
    .orderBy(asc(contactSubmissions.id));
  return c.html(
    <Layout title="Messages" active="contacts" username={claims?.username}>
      <h1>Messages</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Message</th><th>Received</th>
          </tr>
        </thead>
        <tbody>
          {rows.reverse().map((r) => (
            <tr>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.message}</td>
              <td>{new Date(r.submittedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>,
  );
});

// ── Generic list ─────────────────────────────────────────────────────────────
cms.get('/:slug', async (c) => {
  const r = resourceOr404(c, c.req.param('slug'));
  if (!r) return c.text('Not found', 404);
  const claims = await getAdminClaims(c);
  const orderCol = r.orderBy ? r.table[r.orderBy] : r.table.id;
  const rows = await db.select().from(r.table).orderBy(asc(orderCol));
  return c.html(
    <Layout title={r.label} active={r.slug} username={claims?.username}>
      <div class="toolbar">
        <h1>{r.label}</h1>
        <a class="btn" href={`/admin/${r.slug}/new`}>+ New</a>
      </div>
      <table>
        <thead>
          <tr>
            {r.listColumns.map((col) => <th>{col}</th>)}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row: any) => (
            <tr>
              {r.listColumns.map((col) => <td>{String(row[col] ?? '')}</td>)}
              <td class="row-actions">
                <a href={`/admin/${r.slug}/${row.id}/edit`}>Edit</a>
                <form method="post" action={`/admin/${r.slug}/${row.id}/delete`} style="display:inline">
                  <button class="btn danger" type="submit" onclick="return confirm('Delete this item?')">Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>,
  );
});

// ── New form ─────────────────────────────────────────────────────────────────
cms.get('/:slug/new', async (c) => {
  const r = resourceOr404(c, c.req.param('slug'));
  if (!r) return c.text('Not found', 404);
  const claims = await getAdminClaims(c);
  const allTech = r.hasTechStack ? await db.select().from(techStacks).orderBy(asc(techStacks.name)) : [];
  return c.html(
    <Layout title={`New ${r.label}`} active={r.slug} username={claims?.username}>
      <h1>New {r.label}</h1>
      <RecordForm r={r} row={{}} action={`/admin/${r.slug}`} allTech={allTech} selectedTech={[]} />
    </Layout>,
  );
});

// ── Edit form ────────────────────────────────────────────────────────────────
cms.get('/:slug/:id/edit', async (c) => {
  const r = resourceOr404(c, c.req.param('slug'));
  if (!r) return c.text('Not found', 404);
  const id = Number(c.req.param('id'));
  const claims = await getAdminClaims(c);
  const [row] = await db.select().from(r.table).where(eq(r.table.id, id)).limit(1);
  if (!row) return c.text('Not found', 404);

  let allTech: any[] = [];
  let selectedTech: number[] = [];
  if (r.hasTechStack) {
    allTech = await db.select().from(techStacks).orderBy(asc(techStacks.name));
    const links = await db
      .select()
      .from(projectTechStacks)
      .where(eq(projectTechStacks.projectId, id));
    selectedTech = links.map((l) => l.techStackId);
  }
  return c.html(
    <Layout title={`Edit ${r.label}`} active={r.slug} username={claims?.username}>
      <h1>Edit {r.label}</h1>
      <RecordForm r={r} row={row} action={`/admin/${r.slug}/${id}`} allTech={allTech} selectedTech={selectedTech} />
    </Layout>,
  );
});

const RecordForm: FC<{ r: Resource; row: any; action: string; allTech: any[]; selectedTech: number[] }> = ({
  r,
  row,
  action,
  allTech,
  selectedTech,
}) => (
  <form class="stack" method="post" action={action}>
    {r.fields.map((field) => (
      <div>
        <label>{field.label}</label>
        <FieldInput field={field} value={row[field.key]} />
        {field.help ? <div class="help">{field.help}</div> : null}
      </div>
    ))}
    {r.hasTechStack ? (
      <div>
        <label>Tech Stack</label>
        <div class="checks">
          {allTech.map((t) => (
            <label>
              <input type="checkbox" name="tech_stack" value={String(t.id)} checked={selectedTech.includes(t.id)} />
              {t.name}
            </label>
          ))}
        </div>
      </div>
    ) : null}
    <div style="margin-top:20px">
      <button class="btn" type="submit">Save</button>
      <a class="btn secondary" href={`/admin/${r.slug}`}>Cancel</a>
    </div>
  </form>
);

// ── Create ───────────────────────────────────────────────────────────────────
cms.post('/:slug', async (c) => {
  const r = resourceOr404(c, c.req.param('slug'));
  if (!r) return c.text('Not found', 404);
  const form = await c.req.parseBody({ all: true });
  const values = await buildValues(r, form);
  const inserted = (await db.insert(r.table).values(values).returning()) as any[];
  const created = inserted[0];
  if (r.hasTechStack) {
    await syncTechStack(created.id, toArray(form.tech_stack));
  }
  cacheClear();
  return c.redirect(`/admin/${r.slug}`);
});

// ── Update ───────────────────────────────────────────────────────────────────
cms.post('/:slug/:id', async (c) => {
  const r = resourceOr404(c, c.req.param('slug'));
  if (!r) return c.text('Not found', 404);
  const id = Number(c.req.param('id'));
  const form = await c.req.parseBody({ all: true });
  const values = await buildValues(r, form);
  await db.update(r.table).set(values).where(eq(r.table.id, id));
  if (r.hasTechStack) {
    await syncTechStack(id, toArray(form.tech_stack));
  }
  cacheClear();
  return c.redirect(`/admin/${r.slug}`);
});

// ── Delete ───────────────────────────────────────────────────────────────────
cms.post('/:slug/:id/delete', async (c) => {
  const r = resourceOr404(c, c.req.param('slug'));
  if (!r) return c.text('Not found', 404);
  const id = Number(c.req.param('id'));
  await db.delete(r.table).where(eq(r.table.id, id));
  cacheClear();
  return c.redirect(`/admin/${r.slug}`);
});

function toArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String);
  if (v === undefined || v === null || v === '') return [];
  return [String(v)];
}

export default cms;
