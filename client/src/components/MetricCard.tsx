
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AreaChart, Area, ResponsiveContainer  } from "recharts";
import { FinancialMetric } from "@/types/finance";
import { ArrowDown, ArrowUp } from "lucide-react";

interface MetricCardProps {
  metric: FinancialMetric | null;
  color: string;
  gradientId: string;
  isLoading: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, color, gradientId, isLoading }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  // Create data for chart
  const chartData = metric?.data.map((value, index) => ({
    name: index.toString(),
    value
  })) || [];

  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="p-4 pb-0">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-4 w-16 mt-2" />
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <Skeleton className="h-24 w-full mt-2" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden card-hover">
      <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-sm text-muted-foreground">
            {metric?.title}
          </CardTitle>
          <div className="text-2xl font-bold mt-1">
            {formatCurrency(metric?.value || 0)}
          </div>
          <div className={`text-xs mt-1 flex items-center ${metric?.change && metric.change > 0 ? "positive" : "negative"}`}>
            {metric?.change && metric.change > 0 ? (
              <ArrowUp className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDown className="h-3 w-3 mr-1" />
            )}
            {Math.abs(metric?.change || 0)}%
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          This {metric?.period || "month"} ▾
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-2">
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                fillOpacity={1} 
                fill={`url(#${gradientId})`} 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;

