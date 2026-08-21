import React from 'react';
import { Filter, CheckCircle2, XCircle } from 'lucide-react';

export default function NoiseVsSignal({ noiseVsSignal }) {
  if (!noiseVsSignal) return null;

  const {
    signalPercentage = 75,
    noisePercentage = 25,
    signalSummary = [],
    noiseSummary = [],
    reasoning = '',
  } = noiseVsSignal;

  return (
    <section className="w-full font-mono">
      <div className="panel-brutal p-3.5 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 mb-3 border-b-2 border-[#18181B] gap-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#6C5CE7] text-white flex items-center justify-center font-bold text-xs shrink-0">
              <Filter className="w-3.5 h-3.5" />
            </div>
            <h2 className="font-display text-xs sm:text-sm font-extrabold text-[#18181B] tracking-wider uppercase">
              NOISE VS SIGNAL RATIO
            </h2>
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold text-[#6C5CE7] shrink-0">DEDUPLICATED</span>
        </div>

        {/* Visual Block Ratio */}
        <div className="mb-4 sm:mb-6 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] sm:text-xs font-bold">
            <span className="text-[#6C5CE7]">SIGNAL: {signalPercentage}%</span>
            <span className="text-[#18181B]/60">NOISE: {noisePercentage}%</span>
          </div>

          <div className="w-full h-5 sm:h-6 bg-white border-2 border-[#18181B] flex p-0.5 shadow-brutal-sm">
            <div
              className="h-full bg-[#6C5CE7] flex items-center justify-center text-white text-[9px] sm:text-[10px] font-bold transition-all duration-700 truncate"
              style={{ width: `${signalPercentage}%` }}
            >
              {signalPercentage}% SIGNAL
            </div>
            <div
              className="h-full bg-[#18181B]/20 flex items-center justify-center text-[#18181B] text-[9px] sm:text-[10px] font-bold transition-all duration-700 truncate"
              style={{ width: `${noisePercentage}%` }}
            >
              {noisePercentage}%
            </div>
          </div>
        </div>

        {/* Breakdown Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* Signal Side */}
          <div className="p-3 sm:p-4 bg-white border-2 border-[#18181B] shadow-brutal-sm space-y-2">
            <h3 className="text-[11px] sm:text-xs font-bold uppercase text-[#6C5CE7] flex items-center gap-1.5 border-b border-[#18181B]/15 pb-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#6C5CE7] shrink-0" />
              <span>MEANINGFUL SIGNALS ({signalPercentage}%)</span>
            </h3>
            {signalSummary.length > 0 ? (
              <ul className="space-y-1 text-xs text-[#18181B]">
                {signalSummary.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 break-words">
                    <span className="text-[#6C5CE7] font-bold shrink-0">▶</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-[#18181B]/60">High quality multi-source evidence.</p>
            )}
          </div>

          {/* Noise Side */}
          <div className="p-3 sm:p-4 bg-white border-2 border-[#18181B] shadow-brutal-sm space-y-2">
            <h3 className="text-[11px] sm:text-xs font-bold uppercase text-[#18181B]/70 flex items-center gap-1.5 border-b border-[#18181B]/15 pb-1.5">
              <XCircle className="w-3.5 h-3.5 text-[#FF7A59] shrink-0" />
              <span>FILTERED NOISE ({noisePercentage}%)</span>
            </h3>
            {noiseSummary.length > 0 ? (
              <ul className="space-y-1 text-xs text-[#18181B]/70">
                {noiseSummary.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 break-words">
                    <span className="text-[#FF7A59] font-bold shrink-0">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-[#18181B]/60">Duplicate releases and repeated coverage.</p>
            )}
          </div>
        </div>

        {reasoning && (
          <p className="mt-3 text-[10px] sm:text-[11px] text-[#18181B]/70 border-t border-[#18181B]/15 pt-2 break-words">
            <strong>FILTER RATIONALE:</strong> {reasoning}
          </p>
        )}
      </div>
    </section>
  );
}
