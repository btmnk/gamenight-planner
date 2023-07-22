import "dotenv/config";

import type { Config } from "drizzle-kit";

export default {
  schema: "./src/persistence/schema/*",
  driver: "pg",
  out: "./src/persistence/migrations",
  dbCredentials: {
    connectionString: process.env.DB_URL ?? "",
  },
} satisfies Config;
