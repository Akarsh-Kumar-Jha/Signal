import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info, ShieldCheck } from 'lucide-react';

export default function ReportQuality() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="w-full font-mono">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 sm:p-4 bg-[#FAF8F5] dark:bg-[#16181E] border-2 border-[#18181B] dark:border-[#3F3F46] shadow-brutal-sm text-[#18181B] dark:text-[#F3F4F6] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all text-[10px] sm:text-xs font-bold cursor-pointer"
      >
        <div className="flex items-center gap-2 min-w-0">
          <Info className="w-4 h-4 text-[#6C5CE7] shrink-0" />
          <span className="truncate">ABOUT THIS ANALYSIS & METHODOLOGY</span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
      </button>

      {isOpen && (
        <div className="mt-2 p-3.5 sm:p-5 bg-white dark:bg-[#16181E] border-2 border-[#18181B] dark:border-[#3F3F46] text-[#18181B] dark:text-[#F3F4F6] space-y-3 text-[11px] sm:text-xs shadow-brutal-sm animate-in fade-in duration-150">
          <div className="flex items-center gap-2 font-bold">
            <ShieldCheck className="w-4 h-4 text-[#6C5CE7] shrink-0" />
            <span>INTELLIGENCE VERIFICATION MODEL</span>
          </div>

          <p className="leading-relaxed text-[#18181B]/80 dark:text-gray-300 break-words">
            SignalAI generates reports by synthesizing live results from Tavily, Exa, and GNews search providers in parallel. Articles are merged, deduplicated, and scored for strategic impact using structured LLM chains.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
            <div className="p-2.5 sm:p-3 bg-[#FAF8F5] dark:bg-[#1E2028] border-2 border-[#18181B] dark:border-[#3F3F46]">
              <strong className="block mb-1 uppercase text-[10px] sm:text-[11px] text-[#18181B] dark:text-[#F3F4F6]">EVIDENCE SUFFICIENCY</strong>
              <span className="text-[10px] sm:text-[11px] text-[#18181B]/80 dark:text-gray-300">Confidence ratings reflect cross-source alignment and source authority.</span>
            </div>
            <div className="p-2.5 sm:p-3 bg-[#FAF8F5] dark:bg-[#1E2028] border-2 border-[#18181B] dark:border-[#3F3F46]">
              <strong className="block mb-1 uppercase text-[10px] sm:text-[11px] text-[#18181B] dark:text-[#F3F4F6]">DEDUPLICATION</strong>
              <span className="text-[10px] sm:text-[11px] text-[#18181B]/80 dark:text-gray-300">Multiple coverage of the same event is consolidated into a single signal.</span>
            </div>
            <div className="p-2.5 sm:p-3 bg-[#FAF8F5] dark:bg-[#1E2028] border-2 border-[#18181B] dark:border-[#3F3F46]">
              <strong className="block mb-1 uppercase text-[10px] sm:text-[11px] text-[#18181B] dark:text-[#F3F4F6]">LIMITATIONS</strong>
              <span className="text-[10px] sm:text-[11px] text-[#18181B]/80 dark:text-gray-300">Subject to real-time search provider indexing latency.</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
