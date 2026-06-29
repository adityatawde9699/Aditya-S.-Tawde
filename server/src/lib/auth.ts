import bcrypt from 'bcryptjs';
import type { Context, Next } from 'hono';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';
import { sign, verify } from 'hono/jwt';

import { config } from '../config.js';

/**
 * JWT-cookie auth, replacing Django's session-based admin auth.
 * The token is stored in an httpOnly cookie so the SPA / admin pages never
 * handle it directly.
 */

const COOKIE_NAME = 'admin_token';
const TOKEN_TTL_SECONDS = 60 * 60 * 8; // 8 hours

export type AdminClaims = {
  sub: number;
  username: string;
  exp: number;
};

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export async function issueAdminCookie(
  c: Context,
  user: { id: number; username: string },
): Promise<void> {
  const exp = Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS;
  const token = await sign({ sub: user.id, username: user.username, exp }, config.jwtSecret);
  setCookie(c, COOKIE_NAME, token, {
    httpOnly: true,
    secure: config.isProd,
    sameSite: config.isProd ? 'None' : 'Lax',
    path: '/',
    maxAge: TOKEN_TTL_SECONDS,
  });
}

export function clearAdminCookie(c: Context): void {
  deleteCookie(c, COOKIE_NAME, { path: '/' });
}

export async function getAdminClaims(c: Context): Promise<AdminClaims | null> {
  const token = getCookie(c, COOKIE_NAME);
  if (!token) return null;
  try {
    return (await verify(token, config.jwtSecret, 'HS256')) as AdminClaims;
  } catch {
    return null;
  }
}

/**
 * Middleware guarding write/admin routes. On API routes returns 401 JSON;
 * on the server-rendered CMS pages it redirects to the login screen.
 */
export function requireAdmin(opts: { redirect?: boolean } = {}) {
  return async (c: Context, next: Next) => {
    const claims = await getAdminClaims(c);
    if (!claims) {
      if (opts.redirect) return c.redirect('/admin/login');
      return c.json({ detail: 'Authentication required.' }, 401);
    }
    c.set('admin', claims);
    return next();
  };
}
