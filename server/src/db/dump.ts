import { writeFileSync } from 'node:fs';

import { neon } from '@neondatabase/serverless';

import { config } from '../config.js';

/**
 * Safety net before cutover: dumps any existing Django-era tables (and our new
 * tables, if present) from Neon to a timestamped JSON file. Run `npm run db:dump`
 * BEFORE migrating so live CMS edits made through the old Unfold admin are never
 * lost.
 */
async function main() {
  if (!config.databaseUrl) throw new Error('DATABASE_URL is not set.');
  const sql = neon(config.databaseUrl);

  const tables = await sql`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    ORDER BY table_name
  `;

  const dump: Record<string, unknown[]> = {};
  for (const { table_name } of tables as { table_name: string }[]) {
    try {
      const rows = await sql(`SELECT * FROM "${table_name}"`);
      dump[table_name] = rows as unknown[];
      console.log(`Dumped ${table_name}: ${(rows as unknown[]).length} rows`);
    } catch (err) {
      console.warn(`Skipped ${table_name}:`, (err as Error).message);
    }
  }

  const file = `data-backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  writeFileSync(file, JSON.stringify(dump, null, 2));
  console.log(`\nBackup written to ${file}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Dump failed:', err);
    process.exit(1);
  });
