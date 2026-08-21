import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';

const ROTATING_PLACEHOLDERS = [
  "What's changing in AI this week?",
  "Why are tech stocks falling today?",
  "What is happening in India's startup ecosystem?",
  "Latest developments in electric vehicles & battery tech",
  "What is changing in the global semiconductor market?"
];

export default function QueryBox({ onSubmit, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (query) return; // Stop rotation if user typed
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % ROTATING_PLACEHOLDERS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [query]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!query || !query.trim()) {
      setError('Please enter a query or select a topic below.');
      return;
    }
    setError('');
    onSubmit(query.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="relative group">
        {/* Terminal Container */}
        <div className={`relative bg-[#FAF8F5] border-2 rounded-2xl p-4 sm:p-5 transition-all shadow-lg ${
          error ? 'border-[#FF7A59]' : 'border-[#18181B] focus-within:border-[#6D5DFB] focus-within:ring-4 focus-within:ring-[#6D5DFB]/15'
        }`}>

          {/* Header Row */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#18181B]/10 text-xs font-mono text-[#6B6B72]">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#6D5DFB]" />
              <span className="font-semibold text-[#18181B]">SIGNAL_TERMINAL_V1</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B8F2E6]"></span>
              <span>LIVE_INDEX_READY</span>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            rows={3}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (error) setError('');
            }}
            onKeyDown={handleKeyDown}
            placeholder={ROTATING_PLACEHOLDERS[placeholderIndex]}
            className="w-full bg-transparent text-[#18181B] text-base sm:text-lg font-medium placeholder-[#6B6B72]/60 focus:outline-none resize-none leading-relaxed"
          />

          {/* Actions Row */}
          <div className="flex items-center justify-between pt-3 mt-1 border-t border-[#18181B]/5">
            <div className="text-xs text-[#6B6B72] hidden sm:flex items-center gap-1 font-mono">
              <kbd className="px-1.5 py-0.5 bg-[#18181B]/5 border border-[#18181B]/15 rounded text-[10px] font-semibold text-[#18181B]">Press Enter ↵</kbd>
              <span>to analyze</span>
            </div>

            <button
              type="submit"
              className="ml-auto px-6 py-2.5 bg-[#6D5DFB] hover:bg-[#5b4be8] active:scale-[0.98] text-white font-syne font-bold text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer group/btn"
            >
              <Sparkles className="w-4 h-4 text-[#B8F2E6]" />
              <span>Find Signals</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Validation Error Message */}
        {error && (
          <p className="mt-2 text-xs font-semibold text-[#FF7A59] text-center animate-shake">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
