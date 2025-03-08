import { pgTable,  integer, serial } from "drizzle-orm/pg-core";

export const financialSummary = pgTable("financial_summary", {
  id: serial("id").primaryKey(),
  balance: integer("balance").notNull(),
  income: integer("income").notNull(),
  expenses: integer("expenses").notNull(),
  savings: integer("savings").notNull(),
});
