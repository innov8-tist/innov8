
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  animationDelay?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  className,
  animationDelay = 0
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("revealed");
            }, animationDelay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [animationDelay]);

  return (
    <div 
      ref={cardRef} 
      className={cn(
        "animate-reveal",
        "glass hover-scale",
        "rounded-xl p-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
