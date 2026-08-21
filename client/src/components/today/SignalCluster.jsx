import React from 'react';
import { TrendingUp, Layers, Zap, ArrowRight } from 'lucide-react';

export default function SignalCluster({ cluster, onAnalyze }) {
  const {
    id,
    title,
    impact,
    category,
    summary,
    whyItMatters,
    sourceCount,
    momentum,
    badge,
    query,
  } = cluster;

  const impactStyles = {
    HIGH: 'bg-[#F3A6C8] text-[#18181B]',
    MEDIUM: 'bg-[#C9BFFF] text-[#18181B]',
    DEVELOPING: 'bg-[#B8E986] text-[#18181B]',
  };

  return (
    <div className="panel-brutal p-6 flex flex-col justify-between space-y-4 font-mono">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-[#18181B]/15">
          <span className="text-[11px] font-bold text-[#6C5CE7] tracking-wider uppercase">
            {badge || '🔥 SIGNAL CLUSTER'}
          </span>
          <span
            className={`px-2.5 py-0.5 border border-[#18181B] text-[10px] font-extrabold uppercase ${
              impactStyles[impact] || impactStyles.MEDIUM
            }`}
          >
            {impact} IMPACT
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-extrabold text-[#18181B] leading-snug mb-2">
          {title}
        </h3>

        {/* Summary */}
        <p className="text-xs font-sans text-[#18181B]/80 leading-relaxed mb-3">
          {summary}
        </p>

        {/* Why it Matters Callout */}
        {whyItMatters && (
          <div className="p-3 bg-[#6C5CE7]/10 border border-[#18181B] mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6C5CE7] flex items-center gap-1 mb-0.5">
              <Zap className="w-3 h-3 text-[#6C5CE7]" /> WHY IT MATTERS
            </span>
            <p className="text-xs font-sans font-medium text-[#18181B]">
              {whyItMatters}
            </p>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="pt-3 border-t-2 border-[#18181B] flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-3 text-[11px] font-bold text-[#18181B]/70">
          <span className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-[#6C5CE7]" />
            {sourceCount} SOURCES
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-[#18181B]">
            <TrendingUp className="w-3.5 h-3.5 text-[#FF7A59]" />
            {momentum?.toUpperCase()}
          </span>
        </div>

        <button
          onClick={() => onAnalyze(query || title)}
          className="px-3 py-1.5 bg-[#6C5CE7] text-white text-[11px] font-bold uppercase btn-brutal flex items-center gap-1 cursor-pointer"
        >
          <span>ANALYZE SIGNAL</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
