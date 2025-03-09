import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card as CardType } from "@/types/finance";

interface CreditCardProps {
  card: CardType | null;
  isLoading: boolean;
}

const CreditCard: React.FC<CreditCardProps> = ({ card, isLoading }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <Skeleton className="h-[180px] w-full rounded-md" />
      </Card>
    );
  }

  return (
    <Card className={`h-[180px] overflow-hidden ${card?.color || "bg-gradient-to-r from-pink-500 to-blue-500"} text-white`}>
      <CardContent className="p-6 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start">
          <div className="text-2xl font-bold">
            {formatCurrency(card?.balance || 0)}
          </div>
          <div className="text-xl font-bold">
            {card?.type || "VISA"}
          </div>
        </div>
        
        <div>
          <div className="text-base mb-2">
            {card?.number || "4127 1234 5678 9102"}
          </div>
          <div className="flex justify-between">
            <div className="text-sm uppercase">
              {card?.holder || "HUSEYNOVA SEVIL"}
            </div>
            <div className="text-sm">
              {card?.expiry || "01/25"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditCard;

