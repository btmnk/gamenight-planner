import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import { Config } from "../Config.js";
import * as Schemas from "./schema/schema.js";

const client = postgres(Config.DB_URL);
const DB = drizzle(client, {
  schema: Schemas,
});

try {
  const start = Date.now();
  console.log("[DB] Running migrations...");
  await migrate(DB, { migrationsFolder: "./src/persistence/migrations" });
  console.log(`[DB] Migrations done in ${Date.now() - start}ms`);
} catch (error) {
  console.error("Could not run migrations", error);
}

export { DB };
