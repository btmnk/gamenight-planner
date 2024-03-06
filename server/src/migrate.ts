import { migrate } from "drizzle-orm/postgres-js/migrator";

import { DB } from "./persistence/DB.js";

try {
  const start = Date.now();
  console.log("[DB] Running migrations...");
  await migrate(DB, { migrationsFolder: "./src/persistence/migrations" });
  console.log(`[DB] Migrations done in ${Date.now() - start}ms`);
  process.exit(0);
} catch (error) {
  console.error("Could not run migrations", error);
  process.exit(1);
}
