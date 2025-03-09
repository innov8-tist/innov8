"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Navbar } from "./Navbar"

// Mock data for the dashboard
const dashboardData = {
    totalBalance: {
        amount: 21189.0,
        change: 4.1,
        isPositive: true,
    },
    income: {
        amount: 12200.0,
        change: 6.2,
        isPositive: true,
    },
    expenses: {
        amount: 8056.8,
        change: 2.8,
        isPositive: false,
    },
    limits: {
        online: {
            current: 3045,
            max: 4000,
        },
        credit: {
            current: 618,
            max: 2000,
        },
    },
    expenseBreakdown: {
        total: 6000.0,
        categories: [
            { name: "Shopping", amount: 2000.0, color: "bg-purple-400" },
            { name: "Home", amount: 1800.0, color: "bg-blue-400" },
            { name: "Vacation", amount: 1200.0, color: "bg-pink-400" },
            { name: "Other", amount: 1000.0, color: "bg-green-400" },
        ],
    },
    weeklyBalance: [
        { day: "Mo", value: 19000 },
        { day: "Tu", value: 20500 },
        { day: "We", value: 19500 },
        { day: "Th", value: 22000 },
        { day: "Fr", value: 19000 },
        { day: "Sa", value: 20000 },
        { day: "Su", value: 21000 },
    ],
    card: {
        number: "4127 1234 5678 9102",
        holder: "HUSEYNOVA SEVIL",
        expiry: "01/25",
        balance: 21189.0,
        type: "VISA",
    },
    transactions: [
        { merchant: "Adidas", amount: -220.0, date: "15 may at 10:12 AM" },
        { merchant: "Kiko Milano", amount: -560.0, date: "15 may at 11:30 PM" },
        { merchant: "Sangel H", amount: 2000.0, date: "15 may at 13:54 PM" },
        { merchant: "Cinema", amount: -10.0, date: "15 may at 19:46 PM" },
        { merchant: "Walt", amount: -370.0, date: "15 may at 20:11 AM" },
    ],
}

export default function FinancialDashboard() {
    const [activeTimeframe, setActiveTimeframe] = useState("month")
    const [activeChartTimeframe, setActiveChartTimeframe] = useState("week")

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Summary Cards - First Row */}
                    <Card className="overflow-hidden">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col">
                                <div className="text-3xl font-bold">
                                    $
                                    {dashboardData.totalBalance.amount.toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </div>
                                <div className="flex items-center mt-1">
                                    <span
                                        className={cn(
                                            "text-xs flex items-center",
                                            dashboardData.totalBalance.isPositive ? "text-green-500" : "text-red-500",
                                        )}
                                    >
                                        {dashboardData.totalBalance.isPositive ? (
                                            <ArrowUp className="h-3 w-3 mr-1" />
                                        ) : (
                                            <ArrowDown className="h-3 w-3 mr-1" />
                                        )}
                                        {dashboardData.totalBalance.change}%
                                    </span>
                                    <Button variant="link" className="text-xs p-0 h-auto ml-auto">
                                        This month <ChevronDown className="h-3 w-3 ml-1" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Income</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col">
                                <div className="text-3xl font-bold">
                                    $
                                    {dashboardData.income.amount.toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </div>
                                <div className="flex items-center mt-1">
                                    <span
                                        className={cn(
                                            "text-xs flex items-center",
                                            dashboardData.income.isPositive ? "text-green-500" : "text-red-500",
                                        )}
                                    >
                                        {dashboardData.income.isPositive ? (
                                            <ArrowUp className="h-3 w-3 mr-1" />
                                        ) : (
                                            <ArrowDown className="h-3 w-3 mr-1" />
                                        )}
                                        {dashboardData.income.change}%
                                    </span>
                                    <Button variant="link" className="text-xs p-0 h-auto ml-auto">
                                        This month <ChevronDown className="h-3 w-3 ml-1" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Expenses</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col">
                                <div className="text-3xl font-bold">
                                    $
                                    {dashboardData.expenses.amount.toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </div>
                                <div className="flex items-center mt-1">
                                    <span
                                        className={cn(
                                            "text-xs flex items-center",
                                            dashboardData.expenses.isPositive ? "text-green-500" : "text-red-500",
                                        )}
                                    >
                                        {dashboardData.expenses.isPositive ? (
                                            <ArrowUp className="h-3 w-3 mr-1" />
                                        ) : (
                                            <ArrowDown className="h-3 w-3 mr-1" />
                                        )}
                                        {dashboardData.expenses.change}%
                                    </span>
                                    <Button variant="link" className="text-xs p-0 h-auto ml-auto">
                                        This month <ChevronDown className="h-3 w-3 ml-1" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Limits Card */}
                    <Card>
                        <CardHeader className="pb-2 flex flex-row items-center justify-between">
                            <CardTitle className="text-lg font-bold">Limits</CardTitle>
                            <Button variant="link" className="text-xs p-0 h-auto flex items-center">
                                Edit limits <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <span className="flex items-center text-sm">
                                            <span className="h-2 w-2 rounded-full bg-purple-500 mr-2"></span>
                                            Online limit
                                        </span>
                                        <span className="ml-auto text-sm">${dashboardData.limits.online.max}</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-purple-500 rounded-full"
                                            style={{
                                                width: `${(dashboardData.limits.online.current / dashboardData.limits.online.max) * 100}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <div className="text-sm">${dashboardData.limits.online.current}</div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <span className="flex items-center text-sm">
                                            <span className="h-2 w-2 rounded-full bg-pink-500 mr-2"></span>
                                            Credit limit
                                        </span>
                                        <span className="ml-auto text-sm">${dashboardData.limits.credit.max}</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-pink-500 rounded-full"
                                            style={{
                                                width: `${(dashboardData.limits.credit.current / dashboardData.limits.credit.max) * 100}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <div className="text-sm">${dashboardData.limits.credit.current}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Second Row */}
                    {/* Expense Breakdown */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-bold">All Expense</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold mb-4">
                                $
                                {dashboardData.expenseBreakdown.total.toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </div>

                            <div className="relative w-40 h-40 mx-auto">
                                {/* Donut chart using CSS */}
                                <svg viewBox="0 0 36 36" className="w-full h-full">
                                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e2e8f0" strokeWidth="3" />

                                    {/* Shopping - Purple */}
                                    <circle
                                        cx="18"
                                        cy="18"
                                        r="15.915"
                                        fill="none"
                                        stroke="#a78bfa"
                                        strokeWidth="3"
                                        strokeDasharray="33.3 100"
                                        strokeDashoffset="25"
                                        className="transition-all duration-1000 ease-in-out"
                                    />

                                    {/* Home - Blue */}
                                    <circle
                                        cx="18"
                                        cy="18"
                                        r="15.915"
                                        fill="none"
                                        stroke="#60a5fa"
                                        strokeWidth="3"
                                        strokeDasharray="30 100"
                                        strokeDashoffset="58.3"
                                        className="transition-all duration-1000 ease-in-out"
                                    />

                                    {/* Vacation - Pink */}
                                    <circle
                                        cx="18"
                                        cy="18"
                                        r="15.915"
                                        fill="none"
                                        stroke="#f472b6"
                                        strokeWidth="3"
                                        strokeDasharray="20 100"
                                        strokeDashoffset="88.3"
                                        className="transition-all duration-1000 ease-in-out"
                                    />

                                    {/* Other - Green */}
                                    <circle
                                        cx="18"
                                        cy="18"
                                        r="15.915"
                                        fill="none"
                                        stroke="#4ade80"
                                        strokeWidth="3"
                                        strokeDasharray="16.7 100"
                                        strokeDashoffset="108.3"
                                        className="transition-all duration-1000 ease-in-out"
                                    />

                                    {/* Center hole */}
                                    <circle cx="18" cy="18" r="12" fill="white" />
                                </svg>
                            </div>

                            <div className="mt-4 space-y-2">
                                {dashboardData.expenseBreakdown.categories.map((category, index) => (
                                    <div key={index} className="flex items-center">
                                        <span className="flex items-center text-sm">
                                            <span className={`h-3 w-3 rounded-full ${category.color} mr-2`}></span>
                                            {category.name}
                                        </span>
                                        <span className="ml-auto text-sm">
                                            ${category.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Weekly Balance Chart */}
                    <Card className="md:col-span-2">
                        <CardHeader className="pb-2 flex flex-row items-center justify-between">
                            <CardTitle className="text-lg font-bold">Total Balance</CardTitle>
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-1">
                                    <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                                    <span className="text-xs">Income</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                    <span className="text-xs">Expenses</span>
                                </div>
                                <Button variant="link" className="text-xs p-0 h-auto flex items-center">
                                    This week <ChevronDown className="h-3 w-3 ml-1" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="h-60 w-full relative">
                                {/* Line chart using SVG */}
                                <svg className="w-full h-full" viewBox="0 0 700 240">
                                    {/* Line for the chart */}
                                    <path
                                        d="M 50,190 L 150,100 L 250,150 L 350,50 L 450,170 L 550,120 L 650,140"
                                        fill="none"
                                        stroke="#3b82f6"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />

                                    {/* Dot for Thursday (highest point) */}
                                    <circle cx="350" cy="50" r="6" fill="#3b82f6" />

                                    {/* X-axis labels */}
                                    {dashboardData.weeklyBalance.map((day, index) => (
                                        <text key={index} x={50 + index * 100} y="220" textAnchor="middle" fontSize="14" fill="#6b7280">
                                            {day.day}
                                        </text>
                                    ))}
                                </svg>
                            </div>
                        </CardContent>
                    </Card>

                    {/* My Cards */}
                    <Card>
                        <CardHeader className="pb-2 flex flex-row items-center justify-between">
                            <CardTitle className="text-lg font-bold">My Cards</CardTitle>
                            <Button variant="outline" size="sm" className="h-8 flex items-center">
                                <Plus className="h-3 w-3 mr-1" /> Add new
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full h-48 rounded-xl bg-gradient-to-r from-pink-500 to-blue-500 p-4 text-white flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="text-2xl font-bold">
                                        $
                                        {dashboardData.card.balance.toLocaleString("en-US", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </div>
                                    <div className="text-xl font-bold">{dashboardData.card.type}</div>
                                </div>

                                <div className="text-lg tracking-wider mt-4">{dashboardData.card.number}</div>

                                <div className="flex justify-between items-end mt-4">
                                    <div className="text-sm">{dashboardData.card.holder}</div>
                                    <div className="text-sm">{dashboardData.card.expiry}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Transaction History */}
                    <Card className="md:col-span-2">
                        <CardHeader className="pb-2 flex flex-row items-center justify-between">
                            <CardTitle className="text-lg font-bold">Transaction history</CardTitle>
                            <Button variant="link" className="text-xs p-0 h-auto flex items-center">
                                Today <ChevronDown className="h-3 w-3 ml-1" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {dashboardData.transactions.map((transaction, index) => (
                                    <div key={index} className="flex items-center justify-between py-2">
                                        <div>
                                            <div className="font-medium">{transaction.merchant}</div>
                                            <div className="text-sm text-muted-foreground">{transaction.date}</div>
                                        </div>
                                        <div className={cn("font-medium", transaction.amount > 0 ? "text-green-500" : "text-red-500")}>
                                            {transaction.amount > 0 ? "+" : ""}
                                            {transaction.amount.toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                                minimumFractionDigits: 2,
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}
