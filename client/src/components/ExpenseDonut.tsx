import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { ExpenseCategory } from "@/types/finance";

interface ExpenseDonutProps {
  categories: ExpenseCategory[] | null;
  isLoading: boolean;
}

const ExpenseDonut: React.FC<ExpenseDonutProps> = ({ categories, isLoading }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const totalExpense = categories?.reduce((sum, category) => sum + category.value, 0) || 0;

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-24" />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex justify-center mb-4">
            <Skeleton className="h-[120px] w-[120px] rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">All Expense</CardTitle>
        <div className="text-center my-2">
          <div className="text-2xl font-bold">
            {formatCurrency(totalExpense)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex justify-center mb-4">
          <ResponsiveContainer width={120} height={120}>
            <PieChart>
              <Pie
                data={categories || []}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                dataKey="value"
                strokeWidth={0}
                startAngle={90}
                endAngle={-270}
              >
                {categories?.map((category, index) => (
                  <Cell key={index} fill={category.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2">
          {categories?.map((category) => (
            <div key={category.id} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: category.color }}
              ></div>
              <div className="flex-1 text-sm">{category.name}</div>
              <div className="text-sm font-medium">{formatCurrency(category.value)}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseDonut;

