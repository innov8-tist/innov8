"use client"

import { useState, useEffect } from "react"
import { fetchChartData, type ChartData } from "@/lib/data/financial-data"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, type TooltipProps } from "recharts"

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#0f1729] text-white p-3 rounded-md shadow-md text-sm">
                <p className="font-medium mb-1">{`${label}`}</p>
                <div className="flex flex-col gap-1">
                    <p className="text-blue-300">
                        <span className="inline-block w-2 h-2 bg-blue-300 rounded-full mr-2"></span>
                        Income: ${payload[0].value}
                    </p>
                    <p className="text-red-300">
                        <span className="inline-block w-2 h-2 bg-red-300 rounded-full mr-2"></span>
                        Expenses: ${payload[1].value}
                    </p>
                </div>
            </div>
        )
    }

    return null
}

export function FinancesChart() {
    const [data, setData] = useState<ChartData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const chartData = await fetchChartData()
                setData(chartData)
            } catch (error) {
                console.error("Error fetching chart data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Finances</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <Skeleton className="h-[300px] w-full" />
                ) : (
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Line
                                    type="monotone"
                                    dataKey="income"
                                    stroke="#93c5fd"
                                    strokeWidth={3}
                                    dot={false}
                                    activeDot={{ r: 8 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="expenses"
                                    stroke="#fca5a5"
                                    strokeWidth={3}
                                    dot={false}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}


