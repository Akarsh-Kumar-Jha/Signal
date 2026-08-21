import React from 'react';

export default function Hero() {
  return (
    <div className="relative text-center max-w-3xl mx-auto space-y-2 sm:space-y-3 px-2 sm:px-4 pt-1 sm:pt-2 shrink-0">
      {/* Technical Outlined Badge */}
      <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#FAF8F5] dark:bg-[#16181E] border-2 border-[#18181B] dark:border-[#3F3F46] shadow-brutal-sm font-mono text-[9px] sm:text-[11px] font-bold text-[#18181B] dark:text-[#C9BFFF] tracking-wider uppercase max-w-full truncate">
        <span>(⌁)</span>
        <span className="truncate">AI-POWERED NEWS INTELLIGENCE PLATFORM</span>
      </div>

      {/* Main Headline */}
      <div className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#18181B] dark:text-white leading-[1.08] tracking-tight uppercase">
        <div>FIND THE</div>
        <div className="my-0.5 sm:my-1 inline-block">
          <span className="bg-[#6C5CE7] text-white px-3 sm:px-6 py-0.5 border-2 border-[#18181B] dark:border-white/60 shadow-brutal inline-block tracking-widest">
            SIGNAL.
          </span>
        </div>
        <div>IGNORE THE NOISE.</div>
      </div>

      {/* Supporting Subtext */}
      <p className="text-[10px] sm:text-xs font-mono text-[#18181B]/80 dark:text-gray-200 max-w-xl mx-auto font-normal leading-relaxed px-1">
        SignalAI analyzes multiple sources, detects key developments and emerging trends, and delivers clear intelligence reports so you can focus on what actually matters.
      </p>
    </div>
  );
}
