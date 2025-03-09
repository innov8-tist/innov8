"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { fetchMessages,  suggestionChips, type Message } from "@/lib/data/assistant-data"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { pyServer } from "@/axios/axios.config"
import { Navbar } from "@/components/Navbar"

export default function Assistant() {
    const [messages, setMessages] = useState<Message[]>([])
    const [inputValue, setInputValue] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isResponding, setIsResponding] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchMessages()
                setMessages(data)
            } catch (error) {
                console.error("Error fetching messages:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])



const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
        id: new Date().getTime().toString(),
        content,
        sender: "user",
        timestamp: new Date(),
    };

    setMessages((prev) => [...structuredClone(prev), userMessage]);
    setInputValue("");
    setIsResponding(true);

    try {
        const res = await pyServer.post("/normalass", { query: content });

        const assistantMessage: Message = {
            id: new Date().getTime().toString(),
            content: res.data.result || "No response received.",
            sender: "assistant",
            timestamp: new Date(),
        };

        setMessages((prev) => [...structuredClone(prev), assistantMessage]);
    } catch (error) {
        console.error("Error sending message:", error);
    } finally {
        setIsResponding(false);
    }
};

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await handleSendMessage(inputValue)
    }

    const formatTime = (date: Date) => {
        return new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        }).format(date)
    }

    return (
        <div className="flex h-screen bg-background">
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <div className="flex items-center h-16 border-b px-4 md:hidden">
                    <div className="ml-4 font-semibold">Financial Advisor</div>
                </div>
                <div className="flex-1 overflow-auto p-4 md:p-6">
                    <div className="max-w-8xl mx-auto">
                        <Card className="p-0 overflow-hidden">
                            <div className="bg-[#0f1729] text-white p-4">
                                <div className="flex items-center">
                                    <Avatar className="h-8 w-8 mr-2 bg-blue-500">
                                    </Avatar>
                                    <div>
                                        <h2 className="font-medium">Financial Advisor</h2>
                                        <p className="text-xs text-gray-300">Powered by AI to help with your financial needs</p>
                                    </div>
                                </div>
                            </div>

                            <div className="h-[calc(100vh-300px)] md:h-[calc(100vh-280px)] overflow-y-auto p-4 bg-gray-50">
                                {isLoading ? (
                                    <div className="space-y-4">
                                        <div className="flex items-start">
                                            <Skeleton className="h-8 w-8 rounded-full mr-2" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-40" />
                                                <Skeleton className="h-16 w-[300px]" />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {messages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`flex items-start ${message.sender === "assistant" ? "justify-start" : "justify-end"
                                                    }`}
                                            >
                                                {message.sender === "assistant" && (
                                                    <Avatar className="h-8 w-8 mr-2 bg-blue-500">
                                                    </Avatar>
                                                )}
                                                <div
                                                    className={`max-w-[80%] rounded-lg p-3 ${message.sender === "assistant" ? "bg-white border" : "bg-[#0f1729] text-white"
                                                        }`}
                                                >
                                                    <div className="text-sm">{message.content}</div>
                                                    <div
                                                        className={`text-xs mt-1 ${message.sender === "assistant" ? "text-gray-500" : "text-gray-300"
                                                            }`}
                                                    >
                                                        {formatTime(new Date(message.timestamp))}
                                                    </div>
                                                </div>
                                                {message.sender === "user" && (
                                                    <Avatar className="h-8 w-8 ml-2 bg-gray-700">
                                                    </Avatar>
                                                )}
                                            </div>
                                        ))}
                                        {isResponding && (
                                            <div className="flex items-start">
                                                <Avatar className="h-8 w-8 mr-2 bg-blue-500">
                                                </Avatar>
                                                <div className="max-w-[80%] rounded-lg p-3 bg-white border">
                                                    <div className="flex space-x-2">
                                                        <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce"></div>
                                                        <div
                                                            className="h-2 w-2 bg-gray-300 rounded-full animate-bounce"
                                                            style={{ animationDelay: "0.2s" }}
                                                        ></div>
                                                        <div
                                                            className="h-2 w-2 bg-gray-300 rounded-full animate-bounce"
                                                            style={{ animationDelay: "0.4s" }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>
                                )}
                            </div>

                            <div className="p-4 border-t">
                                <div className="mb-4 flex flex-wrap gap-2">
                                    {suggestionChips.map((chip) => (
                                        <button
                                            key={chip.id}
                                            onClick={async () => await handleSendMessage(chip.text)}
                                            disabled={isResponding}
                                            className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1.5 rounded-full transition-colors"
                                        >
                                            {chip.text}
                                        </button>
                                    ))}
                                </div>
                                <form onSubmit={handleSubmit} className="flex gap-2">
                                    <Input
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Ask something about your finances..."
                                        disabled={isResponding}
                                        className="flex-1"
                                    />
                                    <Button
                                        type="submit"
                                        disabled={!inputValue.trim() || isResponding}
                                        className="bg-[#0f1729] hover:bg-[#1a2642]"
                                    >
                                        <span className="sr-only">Send message</span>
                                    </Button>
                                </form>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}


