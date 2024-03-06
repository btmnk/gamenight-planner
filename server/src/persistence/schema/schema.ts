import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";

/**
 * USERS
 */

export const Users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  discordUserId: text("discord_user_id").unique(),
  username: text("username").notNull(),
  avatar: text("avatar"),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true }).defaultNow(),
});

// /**
//  * NOTES
//  */

// export const Notes = pgTable(
//   "notes",
//   {
//     id: uuid("id").defaultRandom().primaryKey(),
//     authorId: uuid("author_id")
//       .references(() => Users.id)
//       .notNull(),
//     content: text("content").notNull(),
//     directory: uuid("directory").references(() => NoteDirectory.id),
//     softDeleted: boolean("soft_deleted").notNull().default(false),
//     createdAt: timestamp("created_at", { mode: "date", withTimezone: true }).defaultNow().notNull(),
//     updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true }).defaultNow().notNull(),
//   },
//   (t) => ({ unq: unique().on(t.id, t.authorId) }),
// );

// export const NotesRelations = relations(Notes, ({ one, many }) => ({
//   noteDirectory: one(NoteDirectory, { fields: [Notes.directory], references: [NoteDirectory.id] }),
//   notesToTags: many(NotesToTags),
// }));

// /**
//  * NOTE DIRECTORIES
//  */

// export const NoteDirectory = pgTable("note_directory", {
//   id: uuid("id").defaultRandom().primaryKey(),
//   authorId: uuid("author_id")
//     .references(() => Users.id)
//     .notNull(),
//   name: text("name").notNull(),
//   parentDirectory: uuid("parent_directory").references((): AnyPgColumn => NoteDirectory.id),
// });

// export const NoteDirectoryRelations = relations(NoteDirectory, ({ many }) => ({
//   notes: many(Notes),
// }));

// /**
//  * TAGS
//  */

// export const Tags = pgTable(
//   "tags",
//   {
//     id: uuid("id").defaultRandom().primaryKey(),
//     authorId: uuid("author_id")
//       .references(() => Users.id)
//       .notNull(),
//     tag: text("tag").notNull(),
//     createdAt: timestamp("created_at", { mode: "date", withTimezone: true }).defaultNow().notNull(),
//     updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true }).defaultNow().notNull(),
//   },
//   (t) => ({ unq: unique().on(t.id, t.authorId), unq2: unique().on(t.authorId, t.tag) }),
// );

// export const TagsRelations = relations(Tags, ({ many }) => ({
//   notesToTags: many(NotesToTags),
// }));

// /**
//  * NOTES_TAGS
//  */

// export const NotesToTags = pgTable(
//   "notes_to_tags",
//   {
//     noteId: uuid("note_id")
//       .notNull()
//       .references(() => Notes.id),
//     tagId: uuid("tag_id")
//       .notNull()
//       .references(() => Tags.id),
//     authorId: uuid("author_id")
//       .notNull()
//       .references(() => Users.id),
//   },
//   (t) => ({
//     pk: primaryKey(t.noteId, t.tagId, t.authorId),
//     noteAuthorConstraint: foreignKey({
//       columns: [t.noteId, t.authorId],
//       foreignColumns: [Notes.id, Notes.authorId],
//     }),
//     tagAuthorConstraint: foreignKey({
//       columns: [t.tagId, t.authorId],
//       foreignColumns: [Tags.id, Tags.authorId],
//     }),
//   }),
// );

// export const NotesToTagsRelations = relations(NotesToTags, ({ one }) => ({
//   note: one(Notes, {
//     fields: [NotesToTags.noteId, NotesToTags.authorId],
//     references: [Notes.id, Notes.authorId],
//   }),
//   tag: one(Tags, {
//     fields: [NotesToTags.tagId, NotesToTags.authorId],
//     references: [Tags.id, Tags.authorId],
//   }),
// }));
