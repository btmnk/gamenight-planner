import { relations } from "drizzle-orm";
import { pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  discordUserId: text("discord_user_id").unique(),
});

export const Events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  ownerId: uuid("owner_id"),
  name: text("name"),
});

export const EventsRelations = relations(Events, ({ one, many }) => ({
  owner: one(Users, {
    fields: [Events.ownerId],
    references: [Users.id],
  }),

  participants: many(EventParticipants),
}));

export const EventParticipants = pgTable(
  "event_participants",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => Users.id),
    eventId: uuid("event_id")
      .notNull()
      .references(() => Events.id),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.eventId),
  }),
);

export const EventParticipantRelations = relations(EventParticipants, ({ one }) => ({
  event: one(Events, {
    fields: [EventParticipants.eventId],
    references: [Events.id],
  }),
  user: one(Users, {
    fields: [EventParticipants.userId],
    references: [Users.id],
  }),
}));
