import 'dotenv/config';

/**
 * Centralized, typed environment configuration.
 *
 * Mirrors the Django settings contract so the same env vars used by the old
 * backend continue to work (DATABASE_URL, EMAIL_HOST_USER, etc.).
 */

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is required but not set.`);
  }
  return value;
}

const isProd = process.env.NODE_ENV === 'production';

export const config = {
  isProd,
  port: Number(process.env.PORT ?? 8000),

  // Database — reuse the existing Neon Postgres connection string.
  databaseUrl: isProd
    ? required('DATABASE_URL')
    : process.env.DATABASE_URL ?? '',

  // Auth / CMS
  jwtSecret: process.env.JWT_SECRET ?? (isProd ? required('JWT_SECRET') : 'dev-insecure-jwt-secret'),
  adminUsername: process.env.ADMIN_USERNAME ?? 'admin',
  adminPassword: process.env.ADMIN_PASSWORD ?? (isProd ? required('ADMIN_PASSWORD') : 'admin'),

  // Email (Gmail SMTP, same vars as Django)
  email: {
    host: process.env.EMAIL_HOST ?? 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT ?? 587),
    user: process.env.EMAIL_HOST_USER ?? '',
    password: process.env.EMAIL_HOST_PASSWORD ?? '',
    recipient: process.env.RECIPIENT_EMAIL ?? '',
  },

  // CORS — allowed client origins
  prodClientUrl: process.env.PROD_CLIENT_URL ?? '',

  // Cache TTL for read endpoints (seconds). Matches Django's 1h cache_page.
  cacheTtlSeconds: Number(process.env.CACHE_TTL_SECONDS ?? 60 * 60),
} as const;

export const emailConfigured = Boolean(
  config.email.user && config.email.password && config.email.recipient,
);

/** Origins permitted by CORS. Static vercel origin + prod client + local dev. */
export function allowedOrigins(): string[] {
  const origins = new Set<string>([
    'https://aditya-s-tawde.vercel.app',
  ]);
  if (config.prodClientUrl) {
    origins.add(config.prodClientUrl.replace(/\/$/, ''));
  }
  if (!isProd) {
    origins.add('http://localhost:5173');
    origins.add('http://127.0.0.1:5173');
    origins.add('http://localhost:3000');
    origins.add('http://127.0.0.1:3000');
  }
  return [...origins];
}
