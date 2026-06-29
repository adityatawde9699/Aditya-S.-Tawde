import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { compress } from 'hono/compress';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import cms from './admin/cms.js';
import { allowedOrigins, config } from './config.js';
import adminRoutes from './routes/admin.js';
import contactRoutes from './routes/contact.js';
import portfolioRoutes from './routes/portfolio.js';

const app = new Hono();

// ── Global middleware ────────────────────────────────────────────────────────
app.use('*', logger());
app.use('*', compress()); // gzip/br — smaller payloads on every response

const origins = allowedOrigins();
app.use(
  '/api/*',
  cors({
    origin: (origin) => (origin && origins.includes(origin) ? origin : origins[0]),
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  }),
);

// ── Health (warmer + Render health check) ────────────────────────────────────
app.get('/api/health/', (c) => c.json({ status: 'ok' }));

// ── API routes ───────────────────────────────────────────────────────────────
app.route('/api/portfolio', portfolioRoutes);
app.route('/api', contactRoutes);
app.route('/api/admin', adminRoutes);

// ── Server-rendered CMS ──────────────────────────────────────────────────────
app.route('/admin', cms);

app.get('/', (c) => c.json({ service: 'portfolio-backend', status: 'ok' }));

// ── Error handling ───────────────────────────────────────────────────────────
app.notFound((c) => c.json({ detail: 'Not found.' }, 404));
app.onError((err, c) => {
  console.error('Unhandled error:', err);
  return c.json({ detail: 'Internal server error.' }, 500);
});

serve({ fetch: app.fetch, port: config.port }, (info) => {
  console.log(`Portfolio backend listening on http://localhost:${info.port}`);
});

export default app;
