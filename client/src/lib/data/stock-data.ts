export type AnalysisResult = {
  id: string;
  ticker: string;
  output: string;
  steps: string[];
  timestamp: Date;
};

export type StockSuggestion = {
  ticker: string;
  name: string;
};

export const mockResults: AnalysisResult[] = [
  {
    id: '1',
    ticker: 'MSFT',
    output: "Based on the current price of $393.31, mixed sentiment, and the stock being slightly below its 10-day moving average, I would recommend a neutral stance on Microsoft stock. Further research and monitoring of market trends are advised.",
    steps: [
      "StockPriceTool",
      "MSFT",
      "Thought: I need to get the stock price, sentiment, and technical analysis for Microsoft to make a recommendation. \nAction: StockPriceTool\nAction Input: MSFT",
      "-----------------------------------------------------",
      "SentimentAnalysisTool",
      "MSFT",
      "Thought: Next, I need to analyze the sentiment surrounding Microsoft. \nAction: SentimentAnalysisTool\nAction Input: MSFT",
      "-----------------------------------------------------",
      "TechnicalAnalysisTool",
      "MSFT",
      "Thought: The sentiment seems mixed, with some positive news about AI and quantum computing, but also some negative news about data center cancellations and stock slips. \nAction: TechnicalAnalysisTool\nAction Input: MSFT",
      "-----------------------------------------------------"
    ],
    timestamp: new Date()
  },
  {
    id: '2',
    ticker: 'AAPL',
    output: "Apple's current price of $189.98 shows stable performance with positive sentiment around product launches. Technical indicators show a strong uptrend above key moving averages. I recommend a bullish stance on Apple stock with a focus on upcoming product releases and services growth.",
    steps: [
      "StockPriceTool",
      "AAPL",
      "Thought: I need to analyze Apple's current price and performance. \nAction: StockPriceTool\nAction Input: AAPL",
      "-----------------------------------------------------",
      "SentimentAnalysisTool",
      "AAPL",
      "Thought: Now I'll check the market sentiment around Apple. \nAction: SentimentAnalysisTool\nAction Input: AAPL",
      "-----------------------------------------------------",
      "TechnicalAnalysisTool",
      "AAPL",
      "Thought: With positive sentiment and strong product performance, I should look at technical indicators. \nAction: TechnicalAnalysisTool\nAction Input: AAPL",
      "-----------------------------------------------------"
    ],
    timestamp: new Date(Date.now() - 86400000)
  }
];

export const stockSuggestions: StockSuggestion[] = [
  { ticker: 'AAPL', name: 'AAPL' },
  { ticker: 'MSFT', name: 'Microsoft' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.' },
  { ticker: 'AMZN', name: 'Amazon.com Inc.' },
  { ticker: 'META', name: 'Meta Platforms Inc.' },
  { ticker: 'TSLA', name: 'Tesla Inc.' },
  { ticker: 'NVDA', name: 'NVIDIA Corporation' },
  { ticker: 'JPM', name: 'JPMorgan Chase & Co.' },
  { ticker: 'V', name: 'Visa Inc.' },
  { ticker: 'JNJ', name: 'Johnson & Johnson' }
];

