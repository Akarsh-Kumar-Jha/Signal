import React from 'react';
import { Eye, Clock } from 'lucide-react';

export default function WatchNext({ watchList }) {
  if (!watchList || watchList.length === 0) return null;

  return (
    <section className="w-full font-mono">
      <div className="panel-brutal p-3.5 sm:p-6">
        <div className="flex items-center gap-2 mb-3 pb-2.5 border-b-2 border-[#18181B]">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#6C5CE7] text-white flex items-center justify-center font-bold text-xs shrink-0">
            <Eye className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-display text-xs sm:text-sm font-extrabold text-[#18181B] tracking-wider uppercase">
            WHAT TO WATCH NEXT
          </h2>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          {watchList.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-[#18181B] p-3 sm:p-4 shadow-brutal-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <span className="font-display font-extrabold text-base sm:text-xl text-[#6C5CE7] shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-xs sm:text-sm text-[#18181B] break-words">
                    {item.indicator}
                  </h3>
                  {item.whyWatch && (
                    <p className="text-[11px] sm:text-xs font-sans text-[#18181B]/80 mt-0.5 leading-relaxed break-words">
                      <strong>WHY WATCH:</strong> {item.whyWatch}
                    </p>
                  )}
                  {item.relatedTo && (
                    <span className="inline-block mt-1.5 text-[9px] sm:text-[10px] font-mono font-bold bg-[#C9BFFF] text-[#18181B] px-1.5 py-0.5 border border-[#18181B] max-w-full truncate">
                      RELATED: {item.relatedTo}
                    </span>
                  )}
                </div>
              </div>

              <div className="shrink-0 self-start sm:self-center px-2 py-0.5 sm:px-3 sm:py-1 bg-[#18181B] text-white text-[9px] sm:text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 border border-[#18181B]">
                <Clock className="w-3 h-3 text-[#B8E986]" />
                <span>{item.timeHorizon?.replace('_', ' ')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
