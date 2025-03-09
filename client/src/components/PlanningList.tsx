import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PlanningItem } from "@/types/finance";
import { Progress } from "@/components/ui/progress";

interface PlanningListProps {
  items: PlanningItem[] | null;
  isLoading: boolean;
}

const PlanningList: React.FC<PlanningListProps> = ({ items, isLoading }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-2 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-hover">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">Planning</CardTitle>
          <Button variant="outline" size="sm" className="h-8">
            Add new +
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-4">
        {items?.map((item) => {
          const progress = (item.current / item.target) * 100;
          
          return (
            <div key={item.id} className="space-y-2">
              <div className="flex justify-between">
                <div className="text-sm font-medium">{item.title}</div>
                <div className="text-sm">
                  {formatCurrency(item.current)}/{formatCurrency(item.target)}
                </div>
              </div>
              <Progress 
                value={progress} 
                className="h-2" 
                style={{ backgroundColor: "#f0f0f0" }}
              />
              <div className="h-1 w-full" style={{ backgroundColor: item.color, opacity: 0.3, marginTop: -8 }}></div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default PlanningList;

