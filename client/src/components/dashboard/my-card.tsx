"use client"

import { useState, useEffect } from "react"
import { fetchCardDetails, type CardDetails } from "@/lib/data/financial-data"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function MyCard() {
  const [cardDetails, setCardDetails] = useState<CardDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCardDetails()
        setCardDetails(data)
      } catch (error) {
        console.error("Error fetching card details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Card</CardTitle>
        <Button variant="outline" size="sm">
          Add Card
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-[180px] w-full rounded-xl" />
        ) : (
          <div className="relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <div className="bg-gradient-to-r from-gray-400 to-gray-300 rounded-xl p-6 h-[180px] relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-white"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="mb-4">
                  <p className="text-sm opacity-80 mb-1">Card Number</p>
                  <p className="font-mono">{cardDetails?.number}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm opacity-80 mb-1">Card Holder</p>
                    <p>{cardDetails?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80 mb-1">Expires</p>
                    <p>{cardDetails?.expiry}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


