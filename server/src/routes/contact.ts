import { Hono } from 'hono';

import { db } from '../db/client.js';
import { contactSubmissions } from '../db/schema.js';
import { sendContactNotification } from '../lib/mailer.js';
import { containsHtml, sanitizeText } from '../lib/sanitize.js';

/**
 * Contact form endpoint. Ports the DRF ContactView + ContactSerializer +
 * ContactService: validation, HTML rejection/sanitization, persistence, and a
 * best-effort email notification. Rate limited to 5/hour/IP (matching the old
 * AnonRateThrottle 'contact' scope).
 */
const contact = new Hono();

// ── In-memory per-IP rate limiter (5 requests / hour) ─────────────────────
const WINDOW_MS = 60 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function clientIp(c: import('hono').Context): string {
  const fwd = c.req.header('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return c.req.header('x-real-ip') ?? 'unknown';
}

type ContactInput = { name?: unknown; email?: unknown; message?: unknown };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body: ContactInput): { errors: Record<string, string[]> } | { value: { name: string; email: string; message: string } } {
  const errors: Record<string, string[]> = {};

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (name.length < 2 || name.length > 100) {
    errors.name = ['Name must be between 2 and 100 characters.'];
  } else if (containsHtml(name)) {
    errors.name = ['Name contains invalid characters. HTML is not allowed.'];
  }

  if (!EMAIL_RE.test(email)) {
    errors.email = ['Enter a valid email address.'];
  }

  if (message.length < 10 || message.length > 5000) {
    errors.message = ['Message must be between 10 and 5000 characters.'];
  } else if (containsHtml(message)) {
    errors.message = ['Message contains invalid content. HTML is not allowed.'];
  }

  if (Object.keys(errors).length > 0) return { errors };
  return {
    value: {
      name: sanitizeText(name),
      email,
      message: sanitizeText(message),
    },
  };
}

contact.post('/contact/', async (c) => {
  if (rateLimited(clientIp(c))) {
    return c.json({ detail: 'Too many requests. Please wait a moment.' }, 429);
  }

  let body: ContactInput;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: { detail: ['Invalid JSON body.'] } }, 400);
  }

  const result = validate(body);
  if ('errors' in result) {
    return c.json({ error: result.errors }, 400);
  }

  const [submission] = await db
    .insert(contactSubmissions)
    .values(result.value)
    .returning();

  console.log(
    `Contact submission persisted | id=${submission.id} name='${submission.name}'`,
  );

  // Fire-and-forget: never let email latency/failure block the response.
  void sendContactNotification(submission);

  return c.json({ message: 'Message sent successfully!' }, 201);
});

export default contact;
