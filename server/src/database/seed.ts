import { db } from "./db";
import { financialSummary } from "./schema/financial_summary.schema";
import {goals} from "./schema/goals.schema";
import {contacts} from "./schema/contacts.schema";
import {transactions} from "./schema/transactions.schema";

export async function seedData() {
  console.log("🌱 Seeding database with dummy data...");

  const existingSummary = await db.select().from(financialSummary);
  if (existingSummary.length === 0) { 
    await db.insert(financialSummary).values({
      balance: 3596,
      income: 421,
      expenses: 164,
      savings: 257,
    });
  }

  const existingTransactions = await db.select().from(transactions);
  if (existingTransactions.length === 0) {
    await db.insert(transactions).values([
      { id: "1", name: "Aaron Evans", type: "Food", date: "March 29, 2022", amount: 45 },
      { id: "2", name: "Clement Stewart", type: "Shopping", date: "March 27, 2022", amount: -241 },
      { id: "3", name: "Jessica Johanne", type: "Others", date: "March 25, 2022", amount: 100 },
    ]);
  }

  const existingContacts = await db.select().from(contacts);
  if (existingContacts.length === 0) {
    await db.insert(contacts).values([
      { id: "1", name: "Michael Jordan" },
      { id: "2", name: "Edelyn Sandra" },
      { id: "3", name: "Ahmed Azhar" },
      { id: "4", name: "Celyn Gustav" },
    ]);
  }

  const existingGoals = await db.select().from(goals);
  if (existingGoals.length === 0) {
    await db.insert(goals).values([
      { id: "1", name: "New iMac", progress: 50, target: 2000, current: 1000 },
      { id: "2", name: 'New Macbook 14"', progress: 60, target: 2500, current: 1500 },
    ]);
  }

  console.log("✅ Database seeding completed!");
}

