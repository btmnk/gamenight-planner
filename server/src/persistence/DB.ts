import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { Config } from "../Config.js";
import * as Schemas from "./schema/schema.js";

const client = postgres(Config.DB_URL);
const DB = drizzle(client, {
  schema: Schemas,
});

export { DB };
