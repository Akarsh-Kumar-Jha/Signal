import React from 'react';
import { Radio } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t-2 border-[#18181B] dark:border-[#3F3F46] bg-[#FAF8F5] dark:bg-[#101114] py-5 mt-auto font-mono text-xs text-[#18181B] dark:text-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-bold">
          <div className="w-4 h-4 bg-[#6C5CE7] flex items-center justify-center text-white text-[10px] shrink-0">
            <Radio className="w-3 h-3" />
          </div>
          <span>SIGNAL AI — INTELLIGENCE OVER NOISE</span>
        </div>
        <div className="text-[11px] text-[#18181B]/70 dark:text-gray-400">
          MULTI-SOURCE NEWS & RESEARCH SYNTHESIS ENGINE
        </div>
      </div>
    </footer>
  );
}
