import { pgTable, text, integer, serial, uniqueIndex, foreignKey, boolean, varchar } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const total = pgTable("Total", {
	id: serial().primaryKey().notNull(),
	total: integer().notNull(),
});

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const user = pgTable("User", {
	id: serial().primaryKey().notNull(),
	email: text().notNull(),
	name: text(),
}, (table) => [
	uniqueIndex("User_email_key").using("btree", table.email.asc().nullsLast().op("text_ops")),
]);

export const post = pgTable("Post", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	content: text(),
	published: boolean().default(false).notNull(),
	authorId: integer().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.authorId],
			foreignColumns: [user.id],
			name: "Post_authorId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);
