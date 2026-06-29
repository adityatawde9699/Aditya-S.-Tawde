/**
 * Tiny in-memory TTL cache for read endpoints. Replaces Django's
 * cache_page(60*60). Cleared wholesale on any CMS write so edits show up
 * immediately.
 */

type Entry = { value: unknown; expiresAt: number };

const store = new Map<string, Entry>();

export function cacheGet<T>(key: string): T | undefined {
  const entry = store.get(key);
  if (!entry) return undefined;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return undefined;
  }
  return entry.value as T;
}

export function cacheSet(key: string, value: unknown, ttlSeconds: number): void {
  store.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
}

/** Wrap an async producer with read-through caching. */
export async function cached<T>(
  key: string,
  ttlSeconds: number,
  producer: () => Promise<T>,
): Promise<T> {
  const hit = cacheGet<T>(key);
  if (hit !== undefined) return hit;
  const value = await producer();
  cacheSet(key, value, ttlSeconds);
  return value;
}

/** Invalidate the entire read cache (called after any content mutation). */
export function cacheClear(): void {
  store.clear();
}
