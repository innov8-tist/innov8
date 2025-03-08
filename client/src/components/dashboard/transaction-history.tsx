"use client"

import { useState, useEffect } from "react"
import { fetchTransactions, type Transaction } from "@/lib/data/financial-data"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { ShoppingBag, Coffee, MoreHorizontal } from "lucide-react"

export function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTransactions()
        setTransactions(data)
      } catch (error) {
        console.error("Error fetching transactions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "Food":
        return <Coffee className="h-4 w-4 text-blue-500" />
      case "Shopping":
        return <ShoppingBag className="h-4 w-4 text-red-500" />
      default:
        return <MoreHorizontal className="h-4 w-4 text-blue-500" />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "Food":
        return "bg-blue-100"
      case "Shopping":
        return "bg-red-100"
      default:
        return "bg-blue-100"
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setViewMode("cards")
      } else {
        setViewMode("table")
      }
    }

    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent className="px-0 sm:px-6">
        {loading ? (
          <div className="space-y-4 px-6 sm:px-0">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : (
          <>
            <div className={`${viewMode === "cards" ? "hidden sm:block" : "block"} overflow-auto`}>
              <div className="min-w-[600px]">
                <div className="grid grid-cols-4 text-sm text-gray-500 pb-2 px-6">
                  <div>Name</div>
                  <div>Type</div>
                  <div>Date</div>
                  <div className="text-right">Amount</div>
                </div>
                {transactions.map((transaction) => (
                  <div
                    key={`table-${transaction.id}`}
                    className="grid grid-cols-4 items-center py-4 px-6 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <div className="flex h-full w-full items-center justify-center bg-gray-100 rounded-full">
                          {transaction.name.charAt(0)}
                        </div>
                      </Avatar>
                      <span className="text-sm font-medium">{transaction.name}</span>
                    </div>
                    <div>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-md text-xs ${getTransactionColor(
                          transaction.type,
                        )}`}
                      >
                        {getTransactionIcon(transaction.type)}
                        <span className="ml-1">{transaction.type}</span>
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">{transaction.date}</div>
                    <div className={`text-right font-medium ${transaction.amount < 0 ? "text-red-500" : ""}`}>
                      {transaction.amount < 0 ? "-" : ""}${Math.abs(transaction.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${viewMode === "table" ? "hidden" : "block sm:hidden"} px-4`}>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={`card-${transaction.id}`} className="bg-white rounded-lg border p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <div className="flex h-full w-full items-center justify-center bg-gray-100 rounded-full">
                            {transaction.name.charAt(0)}
                          </div>
                        </Avatar>
                        <span className="text-sm font-medium">{transaction.name}</span>
                      </div>
                      <div className={`font-medium ${transaction.amount < 0 ? "text-red-500" : ""}`}>
                        {transaction.amount < 0 ? "-" : ""}${Math.abs(transaction.amount)}
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-md text-xs ${getTransactionColor(
                          transaction.type,
                        )}`}
                      >
                        {getTransactionIcon(transaction.type)}
                        <span className="ml-1">{transaction.type}</span>
                      </span>
                      <div className="text-gray-500">{transaction.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}


