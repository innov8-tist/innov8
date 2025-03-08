import { pgTable, text, integer } from "drizzle-orm/pg-core";

export const transactions = pgTable("transactions", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  date: text("date").notNull(),
  amount: integer("amount").notNull(),
});
