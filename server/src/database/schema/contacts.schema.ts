import { pgTable, text, integer } from "drizzle-orm/pg-core";

export const contacts = pgTable("contacts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  avatar: text("avatar"),
});

