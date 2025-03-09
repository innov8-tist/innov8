import { Card, ChartDataPoint, ExpenseCategory, FinancialMetric, IncomeSource, Limit, PlanningItem, Transaction } from "../../types/finance";

export const metrics: FinancialMetric[] = [
  {
    id: "total-balance",
    title: "Total Balance",
    value: 21189.00,
    change: 4.1,
    period: "month",
    data: [12000, 13500, 12800, 15000, 16800, 17500, 19200, 20100, 21189]
  },
  {
    id: "income",
    title: "Income",
    value: 12200.00,
    change: 6.2,
    period: "month",
    data: [6000, 6800, 7200, 8500, 9100, 10200, 11000, 11800, 12200]
  },
  {
    id: "expenses",
    title: "Expenses",
    value: 8056.80,
    change: -2.8,
    period: "month",
    data: [4200, 5100, 5800, 6200, 6800, 7500, 8200, 8500, 8056.80]
  }
];

export const expenseCategories: ExpenseCategory[] = [
  { id: "shopping", name: "Shopping", value: 2000.00, color: "#9b87f5" },
  { id: "home", name: "Home", value: 1800.00, color: "#0EA5E9" },
  { id: "vacation", name: "Vacation", value: 1200.00, color: "#e76ac3" },
  { id: "other", name: "Other", value: 1000.00, color: "#10b981" }
];

export const limits: Limit[] = [
  { 
    id: "online-limit", 
    title: "Online limit", 
    current: 3045,
    max: 4000,
    color: "#9b87f5"
  },
  { 
    id: "credit-limit", 
    title: "Credit limit", 
    current: 618,
    max: 2000,
    color: "#e76ac3"
  }
];

export const transactions: Transaction[] = [
  { 
    id: "tx1", 
    merchant: "Adidas", 
    amount: -220.00, 
    date: "15 may", 
    time: "10:12 AM", 
    category: "debit card",
    type: "debit"
  },
  { 
    id: "tx2", 
    merchant: "Kiko Milano", 
    amount: -560.00, 
    date: "15 may", 
    time: "11:30 PM", 
    category: "debit card",
    type: "debit"
  },
  { 
    id: "tx3", 
    merchant: "Sangel H", 
    amount: 2000.00, 
    date: "15 may", 
    time: "13:54 PM", 
    category: "debit card",
    type: "credit"
  },
  { 
    id: "tx4", 
    merchant: "Cinema", 
    amount: -10.00, 
    date: "15 may", 
    time: "19:46 PM", 
    category: "debit card",
    type: "debit"
  },
  { 
    id: "tx5", 
    merchant: "Walt", 
    amount: -370.00, 
    date: "15 may", 
    time: "20:11 AM", 
    category: "debit card",
    type: "debit"
  }
];

export const cards: Card[] = [
  { 
    id: "card1", 
    type: "VISA", 
    number: "4127 1234 5678 9102", 
    balance: 21189.00, 
    holder: "HUSEYNOVA SEVIL", 
    expiry: "01/25", 
    color: "bg-gradient-to-r from-pink-500 to-blue-500"
  }
];

export const planningItems: PlanningItem[] = [
  { 
    id: "plan1", 
    title: "Visit to USA", 
    current: 3100, 
    target: 4000, 
    color: "#9b87f5" 
  },
  { 
    id: "plan2", 
    title: "Car", 
    current: 2000, 
    target: 10000, 
    color: "#e76ac3" 
  },
  { 
    id: "plan3", 
    title: "Computer", 
    current: 2100, 
    target: 3200, 
    color: "#0EA5E9" 
  },
  { 
    id: "plan4", 
    title: "Phone for mom", 
    current: 1680, 
    target: 1800, 
    color: "#9b87f5" 
  },
  { 
    id: "plan5", 
    title: "Wolt", 
    current: 900, 
    target: 1000, 
    color: "#7c3aed" 
  }
];

export const totalBalanceData: ChartDataPoint[] = [
  { day: "Mo", value: 10000 },
  { day: "Tu", value: 25000 },
  { day: "We", value: 15000 },
  { day: "Th", value: 30000 },
  { day: "Fr", value: 10000 },
  { day: "Sa", value: 20000 },
  { day: "Su", value: 15000 }
];

export const incomeSources: IncomeSource[] = [
  { 
    id: "source1", 
    name: "Replenishment", 
    data: [2000, 1000, 1800, 2500, 3000, 2800, 1500],
    color: "#e76ac3"
  },
  { 
    id: "source2", 
    name: "Cashback", 
    data: [500, 300, 600, 800, 700, 400, 200],
    color: "#0EA5E9"
  }
];

// Async functions to simulate API fetching

export const fetchMetrics = (): Promise<FinancialMetric[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(metrics);
    }, 1000);
  });
};

export const fetchExpenseCategories = (): Promise<ExpenseCategory[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(expenseCategories);
    }, 1000);
  });
};

export const fetchLimits = (): Promise<Limit[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(limits);
    }, 1000);
  });
};

export const fetchTransactions = (): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transactions);
    }, 1000);
  });
};

export const fetchCards = (): Promise<Card[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cards);
    }, 1000);
  });
};

export const fetchPlanningItems = (): Promise<PlanningItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(planningItems);
    }, 1000);
  });
};

export const fetchTotalBalanceData = (): Promise<ChartDataPoint[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(totalBalanceData);
    }, 1000);
  });
};

export const fetchIncomeSources = (): Promise<IncomeSource[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(incomeSources);
    }, 1000);
  });
};

