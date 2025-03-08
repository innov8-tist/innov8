"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { FinancialSummary } from "@/components/dashboard/financial-summary"
import { FinancesChart } from "@/components/dashboard/finances-chart"
import { MyCard } from "@/components/dashboard/my-card"
import { QuickTransaction } from "@/components/dashboard/quick-transaction"
import { TransactionHistory } from "@/components/dashboard/transaction-history"
import { MyGoals } from "@/components/dashboard/my-goals"
import { Skeleton } from "@/components/ui/skeleton"
import { Navbar } from "@/components/Navbar"
import useAuth from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
    const [isLoadingUser, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const { user, isLoading } = useAuth() 

    useEffect(() => {
        if (!isLoading && user == null) {
            navigate("/login")
        }

        if (!isLoading) {
            const timer = setTimeout(() => {
                setIsLoading(false)
            }, 150)

            return () => clearTimeout(timer)
        }
    }, [user, isLoading, navigate]) 

    if (isLoading) {
        return <div>Loading...</div> 
    }

    return (
        <div className="flex h-screen bg-background">
            <Sidebar />

            <div className="flex-1 overflow-auto">
                <Navbar />
                <div className="container mx-auto p-6">
                    <h1 className="text-2xl font-semibold mb-8">Dashboard</h1>
                    {isLoadingUser ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="col-span-3 lg:col-span-2">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                    {[1, 2, 3, 4].map((i) => (
                                        <Skeleton key={i} className="h-[100px] rounded-lg" />
                                    ))}
                                </div>
                                <Skeleton className="h-[300px] rounded-lg mb-6" />
                                <Skeleton className="h-[300px] rounded-lg" />
                            </div>
                            <div className="col-span-3 lg:col-span-1">
                                <Skeleton className="h-[200px] rounded-lg mb-6" />
                                <Skeleton className="h-[150px] rounded-lg mb-6" />
                                <Skeleton className="h-[200px] rounded-lg" />
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="col-span-3 lg:col-span-2">
                                <FinancialSummary />
                                <FinancesChart />
                                <TransactionHistory />
                            </div>
                            <div className="col-span-3 lg:col-span-1">
                                <MyCard />
                                <QuickTransaction />
                                <MyGoals />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

