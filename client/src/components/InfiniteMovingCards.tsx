import { useState} from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface Card {
  id: number;
  title: string;
  description: string;
}

const DUMMY_CARDS: Card[] = [
  { id: 1, title: "Smart Investing", description: "AI-powered investment recommendations" },
  { id: 2, title: "Expense Tracking", description: "Automated categorization and insights" },
  { id: 3, title: "Tax Optimization", description: "Maximize your tax returns effortlessly" },
  { id: 4, title: "Wealth Management", description: "Comprehensive portfolio management" },
  { id: 5, title: "Financial Planning", description: "Personalized financial roadmap" },
  { id: 6, title: "Risk Analysis", description: "Advanced risk assessment tools" },
];

const InfiniteMovingCards = () => {
  const [duplicatedCards] = useState([...DUMMY_CARDS, ...DUMMY_CARDS]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full overflow-hidden bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "flex gap-4 py-12 animate-scroll",
          isHovered && "pause-animation"
        )}
      >
        {duplicatedCards.map((card, idx) => (
          <div
            key={`${card.id}-${idx}`}
            className="relative flex-shrink-0 w-[300px] h-[400px] rounded-xl bg-white border border-gray-200 p-8 flex flex-col justify-between transform transition-transform hover:scale-105"
          >
            <div>
              <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </div>
            <button className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
             <Link to="/dashboard">try it</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteMovingCards;
