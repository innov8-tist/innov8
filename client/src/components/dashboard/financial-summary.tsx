"use client"

import { useState, useEffect } from "react"
import { fetchFinancialSummary, type FinancialSummary as FinancialSummaryType } from "@/lib/data/financial-data"
import { Skeleton } from "@/components/ui/skeleton"
import { DollarSign, TrendingUp, TrendingDown, PiggyBank } from "lucide-react"

export function FinancialSummary() {
  const [data, setData] = useState<FinancialSummaryType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summaryData = await fetchFinancialSummary()
        setData(summaryData)
      } catch (error) {
        console.error("Error fetching financial summary:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const summaryItems = [
    {
      title: "Balance",
      value: data?.balance,
      icon: <DollarSign className="h-5 w-5 text-gray-500" />,
      color: "bg-gray-100",
    },
    {
      title: "Income",
      value: data?.income,
      icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-100",
    },
    {
      title: "Expenses",
      value: data?.expenses,
      icon: <TrendingDown className="h-5 w-5 text-red-500" />,
      color: "bg-red-100",
    },
    {
      title: "Savings",
      value: data?.savings,
      icon: <PiggyBank className="h-5 w-5 text-purple-500" />,
      color: "bg-purple-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {loading
        ? summaryItems.map((_, index) => <Skeleton key={index} className="h-[100px] rounded-lg" />)
        : summaryItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm flex flex-col">
              <div className="flex items-center mb-2">
                <div className={`p-2 rounded-full ${item.color}`}>{item.icon}</div>
              </div>
              <div className="mt-2">
                <h3 className="text-2xl font-semibold">${item.value?.toLocaleString()}</h3>
                <p className="text-sm text-gray-500">{item.title}</p>
              </div>
            </div>
          ))}
    </div>
  )
}


