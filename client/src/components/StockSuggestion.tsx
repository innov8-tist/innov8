import { useState, useRef, useEffect } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { StockSuggestion as SuggestionType } from '../lib/data/stock-data';

interface StockSuggestionProps {
    suggestions: SuggestionType[];
    onSelectStock: (ticker: string, label: string) => void;
}

const StockSuggestion = ({ suggestions, onSelectStock }: StockSuggestionProps) => {
    const [input, setInput] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState<SuggestionType[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (input.trim() === '') {
            setFilteredSuggestions(suggestions.slice(0, 5));
        } else {
            const filtered = suggestions.filter(
                (s) =>
                    s.ticker.toLowerCase().includes(input.toLowerCase()) ||
                    s.name.toLowerCase().includes(input.toLowerCase())
            ).slice(0, 5);
            setFilteredSuggestions(filtered);
        }
    }, [input, suggestions]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSelectStock(input.toUpperCase());
            setInput('');
        }
    };

    const handleSuggestionClick = (ticker: string, label: string) => {
        onSelectStock(ticker, label);
        setInput('');
        setShowSuggestions(false);
    };


    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative flex items-center">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-finance-neutral" size={18} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="Enter a stock ticker or company name..."
                        className="w-full pl-10 pr-14 py-3 rounded-full border border-gray-200 glassmorphism shadow-sm input-focus-ring text-base"
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 p-2 bg-finance-highlight hover:bg-finance-highlight-hover text-white rounded-full transition-colors duration-200 flex items-center justify-center"
                        aria-label="Search"
                    >
                        <ArrowRight size={18} />
                    </button>
                </div>

                {showSuggestions && (
                    <div
                        ref={suggestionsRef}
                        className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden animate-fade-down"
                    >
                        {filteredSuggestions.length > 0 ? (
                            <ul>
                                {filteredSuggestions.map((suggestion) => (
                                    <li
                                        key={suggestion.ticker}
                                        onClick={() => handleSuggestionClick(suggestion.ticker, suggestion.name)}
                                        className="suggestion-item flex items-center justify-between"
                                    >
                                        <span className="font-medium">{suggestion.ticker}</span>
                                        <span className="text-sm text-finance-neutral truncate">{suggestion.name}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="p-3 text-center text-sm text-finance-neutral">No matching stocks found</p>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
};

export default StockSuggestion;

