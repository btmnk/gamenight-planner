import { integer, pgTable, serial } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  discordUserId: integer("discord_user_id").unique(),
});
