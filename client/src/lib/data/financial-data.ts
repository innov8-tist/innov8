export interface FinancialSummary {
  balance: number
  income: number
  expenses: number
  savings: number
}

export interface ChartData {
  date: string
  income: number
  expenses: number
}

export interface Transaction {
  id: string
  name: string
  type: "Food" | "Shopping" | "Others"
  date: string
  amount: number
}

export interface Contact {
  id: string
  name: string
  avatar?: string
}

export interface Goal {
  id: string
  name: string
  progress: number
  target: number
  current: number
}

export interface CardDetails {
  number: string
  expiry: string
  name: string
}

// Simulate API calls with setTimeout
export async function fetchFinancialSummary(): Promise<FinancialSummary> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        balance: 3596,
        income: 421,
        expenses: 164,
        savings: 257,
      })
    }, 1000)
  })
}

export async function fetchChartData(): Promise<ChartData[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { date: "3 Apr", income: 120, expenses: 220 },
        { date: "4 Apr", income: 176, expenses: 223 },
        { date: "5 Apr", income: 150, expenses: 180 },
        { date: "6 Apr", income: 200, expenses: 160 },
        { date: "7 Apr", income: 250, expenses: 140 },
        { date: "8 Apr", income: 300, expenses: 180 },
      ])
    }, 1200)
  })
}

export async function fetchTransactions(): Promise<Transaction[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          name: "Aaron Evans",
          type: "Food",
          date: "March 29, 2022",
          amount: 45,
        },
        {
          id: "2",
          name: "Clement Stewart",
          type: "Shopping",
          date: "March 27, 2022",
          amount: -241,
        },
        {
          id: "3",
          name: "Jessica Johanne",
          type: "Others",
          date: "March 25, 2022",
          amount: 100,
        },
      ])
    }, 1500)
  })
}

export async function fetchContacts(): Promise<Contact[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "1", name: "Michael Jordan" },
        { id: "2", name: "Edelyn Sandra" },
        { id: "3", name: "Ahmed Azhar" },
        { id: "4", name: "Celyn Gustav" },
      ])
    }, 800)
  })
}

export async function fetchGoals(): Promise<Goal[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          name: "New iMac",
          progress: 50,
          target: 2000,
          current: 1000,
        },
        {
          id: "2",
          name: 'New Macbook 14"',
          progress: 60,
          target: 2500,
          current: 1500,
        },
      ])
    }, 1000)
  })
}

export async function fetchCardDetails(): Promise<CardDetails> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        number: "5995 7474 1103 7513 0014",
        expiry: "11/24",
        name: "John Doe",
      })
    }, 900)
  })
}


