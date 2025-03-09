import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { IncomeSource } from "@/types/finance";

interface IncomeBarChartProps {
    incomeSources: IncomeSource[] | null;
    isLoading: boolean;
}

const IncomeBarChart: React.FC<IncomeBarChartProps> = ({ incomeSources, isLoading }) => {
    const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    const chartData = days.map((day, index) => {
        const data: any = { day };
        incomeSources?.forEach(source => {
            data[source.name] = source.data[index] || 0;
        });
        return data;
    });

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-pink-500 text-white p-2 rounded-md text-sm">
                    ${payload[0].value}
                </div>
            );
        }
        return null;
    };

    if (isLoading) {
        return (
            <Card>
                <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-24" />
                    </div>
                </CardHeader>
                <CardContent className="p-0 pt-2">
                    <Skeleton className="h-[200px] w-full" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="card-hover">
            <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-base">Income Statistics</CardTitle>
                    <div className="flex items-center text-xs space-x-3">
                        {incomeSources?.map(source => (
                            <div key={source.id} className="flex items-center">
                                <div
                                    className="w-2 h-2 rounded-full mr-1"
                                    style={{ backgroundColor: source.color }}
                                ></div>
                                <span>{source.name}</span>
                            </div>
                        ))}
                        <div className="text-muted-foreground">
                            This week ▾
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0 pt-2">
                <div className="chart-container-large">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>
                            <XAxis
                                dataKey="day"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis hide={true} />
                            <Tooltip content={<CustomTooltip />} />
                            {incomeSources?.map((source, index) => (
                                <Bar
                                    key={source.id}
                                    dataKey={source.name}
                                    fill={source.color}
                                    barSize={20}
                                    radius={[4, 4, 0, 0]}
                                >
                                    <LabelList
                                        dataKey={source.name}
                                        position="top"
                                        formatter={(value: number) => (value > 2000 ? `$${value}` : '')}
                                        style={{ fill: '#e76ac3', fontWeight: 'bold', fontSize: 12 }}
                                    />
                                </Bar>
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default IncomeBarChart;

