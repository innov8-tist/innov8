export interface FinancialMetric {
  id: string;
  title: string;
  value: number;
  change: number;
  period: 'day' | 'week' | 'month' | 'year';
  data: number[];
}

export interface ExpenseCategory {
  id: string;
  name: string;
  value: number;
  color: string;
}

export interface Limit {
  id: string;
  title: string;
  current: number;
  max: number;
  color: string;
}

export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  time: string;
  category: string;
  type: 'debit' | 'credit';
}

export interface Card {
  id: string;
  type: string;
  number: string;
  balance: number;
  holder: string;
  expiry: string;
  color: string;
}

export interface PlanningItem {
  id: string;
  title: string;
  current: number;
  target: number;
  color: string;
}

export interface ChartDataPoint {
  day: string;
  value: number;
}

export interface IncomeSource {
  id: string;
  name: string;
  data: number[];
  color: string;
}

