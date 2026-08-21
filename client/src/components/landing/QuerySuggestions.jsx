import React from 'react';
import { Sparkles } from 'lucide-react';

const SUGGESTIONS = [
  { label: 'AI This Week', query: 'What is happening with AI this week?' },
  { label: 'Tech Markets', query: 'Why are tech stocks falling today?' },
  { label: 'Indian Startups', query: 'What is happening with AI startups in India?' },
  { label: 'Electric Vehicles', query: 'Latest developments in electric vehicles & batteries' },
  { label: 'Job Market', query: 'What is changing in the Indian technology job market?' }
];

export default function QuerySuggestions({ onSelect }) {
  return (
    <div className="max-w-2xl mx-auto px-4 text-center">
      <div className="flex items-center justify-center gap-1.5 mb-2.5 text-xs font-semibold text-[#6B6B72] uppercase tracking-wider">
        <Sparkles className="w-3.5 h-3.5 text-[#6D5DFB]" />
        <span>Popular Signals</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {SUGGESTIONS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(item.query)}
            className="px-3.5 py-1.5 bg-[#FAF8F5] hover:bg-[#6D5DFB] hover:text-white text-[#18181B] text-xs font-medium border border-[#18181B]/15 rounded-full transition-all duration-200 shadow-2xs hover:shadow-sm cursor-pointer"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
