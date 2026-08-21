import React from 'react';
import { Activity } from 'lucide-react';

export default function EmergingTrends({ trends }) {
  if (!trends || trends.length === 0) return null;

  return (
    <section className="w-full font-mono">
      <div className="panel-brutal p-3.5 sm:p-6">
        <div className="flex items-center gap-2 mb-3 pb-2.5 border-b-2 border-[#18181B]">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#6C5CE7] text-white flex items-center justify-center font-bold text-xs shrink-0">
            <Activity className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-display text-xs sm:text-sm font-extrabold text-[#18181B] tracking-wider uppercase">
            EMERGING TRENDS & MOMENTUM
          </h2>
        </div>

        {/* Rows */}
        <div className="divide-y border-b border-[#18181B]/20">
          {trends.map((trend, idx) => {
            const isGrowing = trend.direction?.toLowerCase() === 'growing';
            const isDeclining = trend.direction?.toLowerCase() === 'declining';

            return (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 text-xs">
                <div className="space-y-0.5">
                  <h3 className="font-display font-bold text-xs sm:text-sm text-[#18181B] break-words">
                    {trend.title}
                  </h3>
                  {trend.explanation && (
                    <p className="text-[10px] sm:text-[11px] font-sans text-[#18181B]/80 leading-snug break-words">
                      {trend.explanation}
                    </p>
                  )}
                </div>

                <div className="shrink-0 self-start sm:self-center">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 border border-[#18181B] text-[10px] sm:text-[11px] font-bold uppercase ${
                    isGrowing
                      ? 'bg-[#B8E986] text-[#18181B]'
                      : isDeclining
                      ? 'bg-[#F3A6C8] text-[#18181B]'
                      : 'bg-white text-[#18181B]'
                  }`}>
                    {isGrowing ? '↑ GROWING' : isDeclining ? '↓ DECLINING' : '→ STABLE'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
