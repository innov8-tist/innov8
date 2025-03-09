import React from "react";
import AnimatedCard from "./AnimatedCard";
import { CreditCard, LineChart, BarChart } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, delay }) => {
  return (
    <AnimatedCard 
      className="h-full flex flex-col"
      animationDelay={delay}
    >
      <div className="mb-5 p-3 rounded-lg bg-finance-accent/10 w-fit">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-finance-navy">{title}</h3>
      <p className="text-finance-navy/70 flex-grow">{description}</p>
    </AnimatedCard>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      title: "Expense Tracking",
      description: "Track every penny with our intelligent expense categorization. Automatically organize your spending for better insights.",
      icon: <CreditCard className="w-6 h-6 text-finance-accent" />,
    },
    {
      title: "Investment Portfolio",
      description: "Monitor all your investments in one place with real-time updates, performance metrics, and personalized insights.",
      icon: <LineChart className="w-6 h-6 text-finance-accent" />,
    },
    {
      title: "Financial Reports",
      description: "Generate comprehensive reports that help you understand your financial health and make informed decisions.",
      icon: <BarChart className="w-6 h-6 text-finance-accent" />,
    },
    {
      title: "Smart Budgeting",
      description: "Create intelligent budgets that adapt to your spending habits and help you reach your financial goals.",
      icon: <CreditCard className="w-6 h-6 text-finance-accent" />,
    },
    {
      title: "Wealth Forecasting",
      description: "Predict your future wealth with our advanced algorithms that take into account your income, expenses, and investments.",
      icon: <LineChart className="w-6 h-6 text-finance-accent" />,
    },
    {
      title: "Tax Optimization",
      description: "Maximize your tax savings with intelligent suggestions and year-round tax planning strategies.",
      icon: <BarChart className="w-6 h-6 text-finance-accent" />,
    },
  ];

  return (
    <section id="features" className="py-24 px-6 relative overflow-hidden bg-finance-light-bg">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-finance-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-finance-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-finance-blue/10 text-finance-accent animate-fade-in">
            <span className="text-sm font-medium">Powerful Features</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-finance-navy animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Everything You Need for <span className="text-finance-accent">Financial Success</span>
          </h2>
          
          <p className="text-lg text-finance-navy/70 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Our platform offers a comprehensive suite of tools designed to help you manage every aspect of your financial life.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={100 * index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
