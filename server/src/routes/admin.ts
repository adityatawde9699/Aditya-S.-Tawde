import { eq } from 'drizzle-orm';
import { Hono } from 'hono';

import { db } from '../db/client.js';
import { adminUsers } from '../db/schema.js';
import {
  clearAdminCookie,
  getAdminClaims,
  issueAdminCookie,
  verifyPassword,
} from '../lib/auth.js';

/**
 * Admin authentication API (JSON), replacing Django's session login views.
 * Paths preserved: POST /login/, POST /logout/, GET /status/.
 */
const admin = new Hono();

admin.post('/login/', async (c) => {
  let body: { username?: string; password?: string };
  try {
    body = await c.req.json();
  } catch {
    return c.json({ detail: 'Invalid request body.' }, 400);
  }

  const { username, password } = body;
  if (!username || !password) {
    return c.json({ detail: 'Username and password are required.' }, 400);
  }

  const [user] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.username, username))
    .limit(1);

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return c.json({ detail: 'Invalid admin credentials.' }, 401);
  }

  await issueAdminCookie(c, user);
  return c.json({ detail: 'Admin login successful.', username: user.username, is_staff: true });
});

admin.post('/logout/', async (c) => {
  clearAdminCookie(c);
  return c.json({ detail: 'Logged out successfully.' });
});

admin.get('/status/', async (c) => {
  const claims = await getAdminClaims(c);
  if (!claims) {
    return c.json({ detail: 'Authentication required.' }, 401);
  }
  return c.json({ is_authenticated: true, username: claims.username, is_staff: true });
});

export default admin;
