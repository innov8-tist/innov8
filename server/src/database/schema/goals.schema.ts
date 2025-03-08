import { pgTable, text, integer } from "drizzle-orm/pg-core";

export const goals = pgTable("goals", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  progress: integer("progress").notNull(),
  target: integer("target").notNull(),
  current: integer("current").notNull(),
});

