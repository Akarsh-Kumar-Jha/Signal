import React from 'react';
import { ExternalLink, ShieldCheck, Zap } from 'lucide-react';

export default function SignalCard({ signal, index }) {
  const {
    headline,
    whatIsHappening,
    whyItMatters,
    impact,
    confidence,
    supportingSources,
  } = signal;

  const impactStyles = {
    high: 'bg-[#F3A6C8] text-[#18181B]',
    medium: 'bg-[#C9BFFF] text-[#18181B]',
    low: 'bg-white text-[#18181B]',
  };

  const badgeStyle = impactStyles[impact?.toLowerCase()] || impactStyles.medium;

  return (
    <div className="panel-brutal p-3.5 sm:p-6 space-y-3 sm:space-y-4">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b-2 border-[#18181B] font-mono text-[10px] sm:text-xs font-bold">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="bg-[#6C5CE7] text-white px-2 py-0.5 border border-[#18181B] tracking-wider">
            SIGNAL {String(index + 1).padStart(2, '0')}
          </span>
          <span className={`px-2 py-0.5 border-2 border-[#18181B] font-extrabold uppercase ${badgeStyle}`}>
            {impact?.toUpperCase()} IMPACT
          </span>
        </div>

        <div className="flex items-center gap-1 text-[#18181B]/70 font-semibold text-[10px] sm:text-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#6C5CE7]" />
          <span>CONFIDENCE: <strong className="text-[#18181B]">{confidence?.toUpperCase()}</strong></span>
        </div>
      </div>

      {/* Headline */}
      <h3 className="font-display text-base sm:text-xl font-extrabold text-[#18181B] leading-snug break-words">
        {headline}
      </h3>

      {/* What Happened */}
      {whatIsHappening && (
        <div className="text-xs sm:text-sm font-sans text-[#18181B]/90 leading-relaxed break-words">
          {whatIsHappening}
        </div>
      )}

      {/* Why it Matters Callout */}
      {whyItMatters && (
        <div className="p-3 sm:p-4 bg-[#6C5CE7]/10 border-2 border-[#18181B] font-mono text-xs space-y-1 shadow-brutal-sm">
          <span className="font-bold text-[#6C5CE7] uppercase flex items-center gap-1.5 text-[10px] sm:text-xs">
            <Zap className="w-3.5 h-3.5 text-[#6C5CE7]" /> WHY IT MATTERS
          </span>
          <p className="text-[#18181B] font-medium leading-relaxed font-sans text-xs sm:text-sm break-words">
            {whyItMatters}
          </p>
        </div>
      )}

      {/* Supporting Sources */}
      {supportingSources && supportingSources.length > 0 && (
        <div className="pt-2.5 border-t border-[#18181B]/15 font-mono text-xs">
          <span className="font-bold text-[#18181B]/70 block mb-1.5 uppercase text-[10px] sm:text-[11px]">
            SUPPORTING SOURCES:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {supportingSources.map((source, idx) => (
              <a
                key={idx}
                href={source.url || '#'}
                target="_blank"
                rel="noreferrer"
                className="px-2 py-1 bg-white hover:bg-[#18181B] text-[#18181B] hover:text-white border border-[#18181B] text-[10px] sm:text-[11px] font-bold transition-colors flex items-center gap-1 max-w-full"
              >
                <span className="truncate max-w-[140px] sm:max-w-[200px]">
                  {source.source || source.title || 'Source'}
                </span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
