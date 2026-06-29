import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import { config } from '../config.js';
import * as schema from './schema.js';

/**
 * Neon serverless (HTTP) connection. Unlike a TCP connection pool, the HTTP
 * driver has no warmup cost when the Neon instance has auto-suspended — which
 * is exactly the free-tier cold-start scenario we optimize for.
 */
const sql = neon(config.databaseUrl);

export const db = drizzle(sql, { schema });

export { schema };
