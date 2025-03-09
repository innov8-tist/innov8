import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Transaction } from "@/types/finance";

interface TransactionListProps {
  transactions: Transaction[] | null;
  isLoading: boolean;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, isLoading }) => {
  const formatCurrency = (value: number) => {
    if (value > 0) {
      return `+${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(value)}`;
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-5 w-16" />
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-between">
              <div className="space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-4 w-16" />
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
          <CardTitle className="text-base">Transaction history</CardTitle>
          <div className="text-xs text-muted-foreground">
            Today ▾
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-4">
        {transactions?.map((transaction) => (
          <div key={transaction.id} className="flex justify-between">
            <div className="space-y-1">
              <div className="font-medium">{transaction.merchant}</div>
              <div className="text-xs text-muted-foreground">
                {transaction.date} at {transaction.time}
              </div>
            </div>
            <div className={transaction.amount > 0 ? "positive font-medium" : "negative font-medium"}>
              {formatCurrency(transaction.amount)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TransactionList;

