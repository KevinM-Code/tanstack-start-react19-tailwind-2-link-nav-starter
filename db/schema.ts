import { pgTable, text, integer, serial, uniqueIndex, foreignKey, boolean, varchar, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const total = pgTable("Total", {
	id: serial().primaryKey().notNull(),
	total: integer().notNull(),
});

export const users = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	email: text('email').unique().notNull(),
	password: text('password').notNull(),
	salt: text('salt').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	name: varchar({ length: 255 }),
	age: integer(),
});

export const user = pgTable("User", {
	id: serial().primaryKey().notNull(),
	email: varchar({ length: 255 }).notNull(),
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

