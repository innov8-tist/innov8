import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface CircularProgressProps {
  title: string;
  value: number;
  max: number;
  color: string;
  size?: number;
  strokeWidth?: number;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  title,
  value,
  max,
  color,
  size = 120,
  strokeWidth = 10,
  isLoading = false,
  children
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = value / max;
  const strokeDashoffset = circumference - progress * circumference;

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-4 w-24" />
        </CardHeader>
        <CardContent className="flex justify-center pt-0">
          <Skeleton className="h-[120px] w-[120px] rounded-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center pt-0">
        <div className="progress-ring-container" style={{ width: size, height: size }}>
          <svg width={size} height={size}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#e6e6e6"
              strokeWidth={strokeWidth}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </svg>
          <div className="progress-ring-text">
            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CircularProgress;

