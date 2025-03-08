"use client"

import { useState, useEffect } from "react"
import { fetchGoals, type Goal } from "@/lib/data/financial-data"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Monitor, Laptop } from "lucide-react"

export function MyGoals() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGoals()
        setGoals(data)
      } catch (error) {
        console.error("Error fetching goals:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getGoalIcon = (name: string) => {
    if (name.toLowerCase().includes("imac")) {
      return <Monitor className="h-5 w-5" />
    } else if (name.toLowerCase().includes("macbook")) {
      return <Laptop className="h-5 w-5" />
    }
    return <Monitor className="h-5 w-5" />
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Goals</CardTitle>
        <Button variant="outline" size="sm">
          Add
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-md">{getGoalIcon(goal.name)}</div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{goal.name}</span>
                      <span className="text-sm text-gray-500">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${goal.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}


