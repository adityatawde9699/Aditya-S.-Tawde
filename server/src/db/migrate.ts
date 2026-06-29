import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';

import { config } from '../config.js';

/**
 * Applies pending SQL migrations from ./drizzle to the Neon database.
 * Run via `npm run db:migrate` (also part of the Render buildCommand).
 */
async function main() {
  if (!config.databaseUrl) {
    throw new Error('DATABASE_URL is not set; cannot run migrations.');
  }
  const sql = neon(config.databaseUrl);
  const db = drizzle(sql);
  console.log('Running migrations…');
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('Migrations complete.');
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
