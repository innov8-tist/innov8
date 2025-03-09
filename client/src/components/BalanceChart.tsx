import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from "recharts";
import { ChartDataPoint } from "@/types/finance";
import { Skeleton } from "@/components/ui/skeleton";

interface BalanceChartProps {
  data: ChartDataPoint[] | null;
  isLoading: boolean;
}

const BalanceChart: React.FC<BalanceChartProps> = ({ data, isLoading }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-blue-600 text-white p-2 rounded-md text-sm">
          {formatCurrency(payload[0].value)}
        </div>
      );
    }
    return null;
  };

  const highestPoint = data ? 
    data.reduce((prev, current) => (prev.value > current.value) ? prev : current) : 
    null;
  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-24" />
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden card-hover">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">Total Balance</CardTitle>
          <div className="flex items-center text-xs">
            <div className="flex items-center mr-4">
              <div className="w-2 h-2 rounded-full bg-purple-500 mr-1"></div>
              <span>Income</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
              <span>Expenses</span>
            </div>
            <div className="ml-4 text-muted-foreground">
              This week ▾
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-2">
        <div className="chart-container-large">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data || []} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12 }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis 
                hide={true} 
                domain={[0, 'dataMax + 5000']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#9b87f5" 
                strokeWidth={3}
                dot={false} 
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#0EA5E9" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 5, strokeWidth: 0 }}
                style={{ opacity: 0.7 }}
              />
              {highestPoint && (
                <ReferenceDot 
                  x={highestPoint.day} 
                  y={highestPoint.value} 
                  r={5} 
                  fill="#0EA5E9" 
                  stroke="none"
                  label={{
                    value: formatCurrency(highestPoint.value),
                    position: "top",
                    fill: "#fff",
                    fontSize: 12,
                    fontWeight: "bold",
                    offset: 15
                  }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceChart;

