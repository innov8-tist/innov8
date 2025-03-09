
import { useState } from 'react';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { AnalysisResult as ResultType } from '../lib/data/stock-data';
import AnalysisSteps from './AnalysisSteps';

interface AnalysisResultProps {
  result: ResultType;
}

const AnalysisResult = ({ result }: AnalysisResultProps) => {
  const [expanded, setExpanded] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className={`result-card group pt-10 ${expanded ? 'shadow-md' : ''}`}>
      <div className="result-highlight space-y-2">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-finance-highlight/10 text-finance-highlight">
            {result.ticker}
          </span>
          <div className="flex items-center text-xs text-finance-neutral">
            <Clock size={14} className="mr-1" />
            <span>{formatDate(result.timestamp)}</span>
          </div>
        </div>
        
        <p className="text-base leading-relaxed">{result.output}</p>
        
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center text-xs text-finance-neutral hover:text-finance-highlight transition-colors mt-2"
        >
          {expanded ? (
            <>
              <ChevronUp size={16} className="mr-1" />
              Hide analysis steps
            </>
          ) : (
            <>
              <ChevronDown size={16} className="mr-1" />
              Show analysis steps
            </>
          )}
        </button>
      </div>
      
      <AnalysisSteps steps={result.steps} isOpen={expanded} />
    </div>
  );
};

export default AnalysisResult;

