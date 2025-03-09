import { useState } from "react";
import axios from "@/axios/axios.config";
import AnalysisResult from "../components/AnalysisResult";
import { toast } from "@/hooks/use-toast";

type ResultType = {
  id: string;
  ticker: string;
  output: string;
  steps: string[];
  timestamp: Date;
  isLoading?: boolean;
};

const StockAnalyzer = () => {
  const [results, setResults] = useState<ResultType[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const ticker = input.toUpperCase();
    setInput("");
    setLoading(true);

    const loadingResult: ResultType = {
      id: Date.now().toString(),
      ticker,
      output: "Analyzing... Please wait.",
      steps: [],
      timestamp: new Date(),
      isLoading: true,
    };

    setResults((prev) => [loadingResult, ...prev]);

    try {
      const response = await axios.post("http://localhost:7000/Agent", {
        query: `Can you analyze ${ticker} stock and give me a recommendation?`,
      });

      const { output, steps } = response.data;

      const newResult: ResultType = {
        id: Date.now().toString(),
        ticker,
        output,
        steps,
        timestamp: new Date(),
      };

      setResults((prev) => [newResult, ...prev.filter((r) => r.id !== loadingResult.id)]);
      toast({
        title: "Analysis Complete",
        description: `Analysis for ${ticker} completed`,
      });
    } catch (error) {
      console.error("Error fetching stock analysis:", error);
      setResults((prev) => prev.filter((r) => r.id !== loadingResult.id));
      toast({
        title: "Error",
        description: `Failed to analyze ${ticker}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stock-analyzer-container p-10">
      <div className="mb-8 text-center animate-fade-down">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Stock Sight Optimizer</h1>
        <p className="text-finance-neutral">Gain valuable insights on any stock with our advanced AI analysis</p>
      </div>

      <div className="chat-input-container mt-6 animate-fade-up">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="can you analyze MICROSOFT stock and give me a recommendation"
            className="w-full p-3 rounded-full border border-gray-200 shadow-sm input-focus-ring text-base"
            autoComplete="off"
          />
          <button
            type="submit"
            className="absolute right-2 p-2 bg-finance-highlight hover:bg-finance-highlight-hover text-white rounded-full transition-colors duration-200"
            disabled={loading}
          >
            Send
          </button>
        </form>
      </div>

      {results.length > 0 && (
        <div className="results-container mt-6">
          {results.map((result) => (
            <AnalysisResult key={result.id} result={result} />
          ))}
        </div>
      )}

      {results.length === 0 && (
        <div className="mt-10 text-center text-finance-neutral animate-pulse-soft">
          <p>Enter a stock ticker to see analysis results</p>
        </div>
      )}
    </div>
  );
};

export default StockAnalyzer;

