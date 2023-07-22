import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const Events = pgTable("events", {
  id: serial("id").primaryKey(),
  name: text("name"),
});
