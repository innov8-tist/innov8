export interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

export interface SuggestionChip {
  id: string
  text: string
}

// Predefined suggestions for the financial assistant
export const suggestionChips: SuggestionChip[] = [
  { id: "1", text: "How can I save money?" },
  { id: "2", text: "What is my current balance?" },
  { id: "3", text: "How to invest my savings?" },
  { id: "4", text: "Explain my spending habits" },
  { id: "5", text: "Set up a budget plan" },
  { id: "6", text: "How to improve my credit score?" },
]

// Initial conversation history
const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm your personal financial assistant. How can I help you today?",
    sender: "assistant",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
]

// Simulate fetching conversation history
export async function fetchMessages(): Promise<Message[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(initialMessages)
    }, 1000)
  })
}

// Simulate sending a message and getting a response
export async function sendMessage(content: string): Promise<Message> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate appropriate responses based on the content
      let responseContent = ""

      if (content.toLowerCase().includes("save money")) {
        responseContent =
          "To save money, consider creating a budget, cutting unnecessary expenses, automating your savings, and looking for ways to increase your income. Based on your spending patterns, you could save approximately $150 per month by reducing dining out expenses."
      } else if (content.toLowerCase().includes("balance")) {
        responseContent =
          "Your current account balance is $3,596. You have $421 in pending transactions that haven't been processed yet."
      } else if (content.toLowerCase().includes("invest")) {
        responseContent =
          "For investing your savings, consider a mix of stocks, bonds, and ETFs based on your risk tolerance. With your current profile, I recommend starting with index funds which offer lower risk and steady returns for beginners."
      } else if (content.toLowerCase().includes("spending") || content.toLowerCase().includes("habits")) {
        responseContent =
          "Looking at your spending habits, your largest categories are housing (35%), food (20%), and entertainment (15%). Compared to last month, your entertainment spending has increased by 8%, which might be an area to review."
      } else if (content.toLowerCase().includes("budget")) {
        responseContent =
          "I can help you set up a budget plan. Based on your income and expenses, I recommend allocating 50% to necessities, 30% to wants, and 20% to savings and debt repayment. Would you like me to create a detailed budget plan for you?"
      } else if (content.toLowerCase().includes("credit score")) {
        responseContent =
          "To improve your credit score, make sure to pay bills on time, reduce credit card balances, don't close old credit accounts, limit new credit applications, and regularly check your credit report for errors. Your current score is 720, which is considered good."
      } else {
        responseContent =
          "Thank you for your message. I'll analyze your financial data and provide personalized advice shortly. Is there anything specific about your finances you'd like to know?"
      }

      resolve({
        id: Date.now().toString(),
        content: responseContent,
        sender: "assistant",
        timestamp: new Date(),
      })
    }, 1500) // Simulate network delay
  })
}


