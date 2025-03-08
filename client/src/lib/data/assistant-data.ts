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

export const personalAssistantSuggestions: SuggestionChip[] = [
    { id: "1", text: "List the products I bought last year that cost more than 2 lakhs." },
    { id: "2", text: "In which year can I buy a car without it being a liability?" },
]

const initialMessages: Message[] = [
    {
        id: "1",
        content: "Hello! I'm your personal financial assistant. How can I help you today?",
        sender: "assistant",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
]

export async function fetchMessages(): Promise<Message[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(initialMessages)
        }, 1000)
    })
}



