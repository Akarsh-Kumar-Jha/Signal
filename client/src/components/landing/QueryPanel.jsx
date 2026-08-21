import React, { useState, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const EXAMPLES = [
  { icon: '✦', label: 'AI This Week', query: 'What is happening with AI this week?' },
  { icon: '📈', label: 'Tech Markets', query: 'Why are tech stocks falling today?' },
  { icon: '🚀', label: 'Indian Startups', query: 'What is happening with AI startups in India?' },
  { icon: '⚡', label: 'Electric Vehicles', query: 'Latest developments in electric vehicles & batteries' },
  { icon: '💼', label: 'Job Market', query: 'What is changing in the technology job market?' }
];

export default function QueryPanel({ onSubmit, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const [error, setError] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!query || !query.trim()) {
      setError('Please enter a query or select an example below.');
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

  const handleSelectExample = (exampleQuery) => {
    setQuery(exampleQuery);
    setError('');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-2 sm:px-4 shrink-0">
      {/* Main Panel Container */}
      <div className="panel-brutal rounded-none p-3 sm:p-5 dark:bg-[#16181E] dark:border-[#3F3F46]">
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between pb-2 mb-2.5 border-b-2 border-[#18181B] dark:border-[#3F3F46] font-mono text-[10px] sm:text-xs font-bold text-[#18181B] dark:text-white">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#6C5CE7] text-white flex items-center justify-center font-extrabold text-[10px] shrink-0">
              1
            </div>
            <span className="uppercase tracking-wider">WHAT DO YOU WANT TO KNOW?</span>
          </div>
          <span className="text-[#6C5CE7] dark:text-[#C9BFFF] text-[10px] sm:text-[11px] hidden xs:inline tracking-wider uppercase font-extrabold">
            NO SIGN UP REQUIRED
          </span>
        </div>

        {/* Textarea Container */}
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="bg-white dark:bg-[#1E2028] border-2 border-[#18181B] dark:border-[#3F3F46] p-2.5 sm:p-3.5 shadow-brutal-sm transition-all focus-within:ring-2 focus-within:ring-[#6C5CE7]">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#6C5CE7] shrink-0 mt-1" />
              <textarea
                ref={textareaRef}
                rows={2}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (error) setError('');
                }}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything... e.g. What's happening with AI this week? Why are tech stocks falling? Latest in Indian startup ecosystem?"
                className="w-full bg-transparent text-[#18181B] dark:text-white font-mono text-xs sm:text-sm placeholder-[#18181B]/40 dark:placeholder-gray-400 focus:outline-none resize-none leading-relaxed"
              />
            </div>

            {/* Bottom Panel Controls inside Textarea Box */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 mt-1.5 border-t border-[#18181B]/15 dark:border-white/10">
              <div className="text-[10px] sm:text-[11px] font-mono text-[#18181B]/70 dark:text-gray-300 flex items-center gap-1">
                <span>ⓘ Tip: Be specific for better insights</span>
              </div>

              <button
                type="submit"
                className="px-5 py-2 bg-[#6C5CE7] text-white font-mono font-bold text-xs uppercase tracking-wider btn-brutal flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>RUN ANALYSIS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Validation Error */}
          {error && (
            <p className="text-[10px] sm:text-xs font-mono font-bold text-[#FF7A59] text-center">
              ⚠ {error}
            </p>
          )}
        </form>

        {/* Try Examples Sub-row */}
        <div className="mt-3 pt-2.5 border-t-2 border-[#18181B] dark:border-[#3F3F46] flex flex-wrap items-center gap-1.5 font-mono text-xs">
          <span className="font-bold text-[#18181B] dark:text-gray-200 tracking-wider uppercase text-[10px] sm:text-[11px] shrink-0 mr-1">
            TRY EXAMPLE:
          </span>
          <div className="flex flex-wrap gap-1.5 max-w-full">
            {EXAMPLES.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectExample(item.query)}
                className="px-2.5 py-1 bg-white dark:bg-[#1E2028] hover:bg-[#6C5CE7] dark:hover:bg-[#6C5CE7] text-[#18181B] dark:text-white hover:text-white border-2 border-[#18181B] dark:border-[#3F3F46] font-mono text-[10px] sm:text-[11px] font-bold transition-all shadow-2xs hover:-translate-x-0.5 hover:-translate-y-0.5 cursor-pointer flex items-center gap-1 shrink-0"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                <span>→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
