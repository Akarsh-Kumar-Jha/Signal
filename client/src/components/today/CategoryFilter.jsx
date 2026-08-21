import React from 'react';

const CATEGORIES = [
  'ALL',
  'AI',
  'TECHNOLOGY',
  'STARTUPS',
  'BUSINESS',
  'MARKETS',
  'SCIENCE',
  'POLICY',
];

export default function CategoryFilter({ activeCategory, onSelectCategory }) {
  return (
    <div className="flex flex-wrap items-center gap-2 font-mono">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory?.toUpperCase() === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-3 py-1 text-xs font-bold border-2 border-[#18181B] transition-all cursor-pointer ${
              isActive
                ? 'bg-[#18181B] text-white shadow-brutal-sm'
                : 'bg-white text-[#18181B] hover:bg-[#6C5CE7] hover:text-white shadow-2xs hover:-translate-x-0.5 hover:-translate-y-0.5'
            }`}
          >
            [ {cat} ]
          </button>
        );
      })}
    </div>
  );
}
