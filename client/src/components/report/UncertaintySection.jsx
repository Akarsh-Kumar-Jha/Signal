import React from 'react';
import { AlertTriangle, HelpCircle } from 'lucide-react';

export default function UncertaintySection({ uncertainties }) {
  if (!uncertainties || uncertainties.length === 0) return null;

  return (
    <section className="w-full font-mono">
      <div className="bg-[#F3A6C8]/20 border-2 border-[#18181B] p-3.5 sm:p-6 shadow-brutal-sm sm:shadow-brutal">
        <div className="flex items-center gap-2 mb-3 pb-2.5 border-b-2 border-[#18181B]">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#FF7A59] text-white flex items-center justify-center font-bold text-xs shrink-0">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-display text-xs sm:text-sm font-extrabold text-[#18181B] tracking-wider uppercase">
            CONTRADICTIONS & UNCERTAINTY
          </h2>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          {uncertainties.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-[#18181B] p-3 sm:p-4 shadow-brutal-sm space-y-1.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="font-display font-bold text-xs sm:text-sm text-[#18181B] break-words">
                  {item.topic}
                </h3>
                <span className="self-start sm:self-center px-1.5 py-0.5 bg-[#F3A6C8] border border-[#18181B] font-bold text-[9px] sm:text-[10px] uppercase shrink-0">
                  {item.uncertaintyType?.replace('_', ' ')}
                </span>
              </div>

              <p className="text-xs text-[#18181B] leading-relaxed break-words">
                {item.explanation}
              </p>

              {item.possibleReason && (
                <div className="text-[10px] sm:text-[11px] text-[#18181B]/70 pt-1 border-t border-[#18181B]/15 flex items-start gap-1 break-words">
                  <HelpCircle className="w-3.5 h-3.5 text-[#6C5CE7] shrink-0 mt-0.5" />
                  <span><strong>POSSIBLE CAUSE:</strong> {item.possibleReason}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
