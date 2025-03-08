
import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}) => {
  const baseClasses = "rounded-md font-medium transition-all duration-300 inline-flex items-center justify-center";

  const variantClasses = {
    primary: "bg-finance-accent text-white hover:bg-finance-accent/90 shadow-md hover:shadow-lg",
    secondary: "bg-finance-blue/10 text-finance-navy hover:bg-finance-blue/20",
    outline: "border border-finance-navy/20 text-finance-navy hover:bg-finance-gray/80",
    ghost: "text-finance-navy hover:bg-finance-gray/50",
  };

  const sizeClasses = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
