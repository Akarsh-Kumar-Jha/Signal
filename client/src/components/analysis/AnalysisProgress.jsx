import React, { useState, useEffect } from 'react';
import { Radio, Loader2, Check, Clock, Server } from 'lucide-react';

const PIPELINE_STEPS = [
  { id: '01', title: 'QUERY UNDERSTOOD', detail: 'Query validated & schema prepared', duration: 1500 },
  { id: '02', title: 'RESEARCHING MULTIPLE ANGLES', detail: 'Generating search queries', duration: 3500 },
  { id: '03', title: 'SEARCHING SOURCES', detail: 'Querying Tavily · Exa · GNews in parallel', duration: 7000 },
  { id: '04', title: 'FILTERING NOISE', detail: 'Merging articles & removing duplicates', duration: 5000 },
  { id: '05', title: 'DETECTING SIGNALS', detail: 'Analyzing trends & strategic impact', duration: 7000 },
  { id: '06', title: 'BUILDING REPORT', detail: 'Synthesizing report output', duration: 8000 },
];

export default function AnalysisProgress({ userQuery }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    let timeoutId;
    const advanceStep = (index) => {
      if (index < PIPELINE_STEPS.length - 1) {
        timeoutId = setTimeout(() => {
          setCurrentStepIndex(index + 1);
          advanceStep(index + 1);
        }, PIPELINE_STEPS[index].duration);
      }
    };

    advanceStep(0);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="max-w-xl mx-auto px-2 sm:px-4 py-6 sm:py-12">
      <div className="panel-brutal p-3.5 sm:p-8 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#18181B] dark:border-[#3F3F46] font-mono gap-2">
          <div className="flex items-start sm:items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#6C5CE7] border border-[#18181B] text-white flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] sm:text-xs font-bold text-[#6C5CE7] tracking-wider uppercase block">
                SIGNAL ANALYSIS IN PROGRESS
              </span>
              <h2 className="font-display text-xs sm:text-sm font-extrabold text-[#18181B] dark:text-white break-words line-clamp-2 leading-tight">
                "{userQuery}"
              </h2>
            </div>
          </div>
          <span className="px-1.5 py-0.5 bg-[#B8E986] border border-[#18181B] text-[9px] sm:text-[10px] font-bold text-[#18181B] shrink-0">
            RUNNING
          </span>
        </div>

        {/* Free Cloud Instance Spin-Up Banner */}
        <div className="p-3 bg-[#C9BFFF]/30 dark:bg-[#1E2028] border-2 border-[#18181B] dark:border-[#3F3F46] shadow-brutal-sm font-mono text-[10px] sm:text-[11px] text-[#18181B] dark:text-gray-200 flex items-center gap-2.5">
          <Server className="w-4 h-4 text-[#6C5CE7] shrink-0 animate-pulse" />
          <span>
            <strong>Note:</strong> Running on a free cloud instance — server spin-up & multi-source analysis may take extra time (up to 30-60s). Please hold tight!
          </span>
        </div>

        {/* Steps List */}
        <div className="space-y-2.5 font-mono text-xs">
          {PIPELINE_STEPS.map((step, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={step.id}
                className={`p-2.5 sm:p-3 border-2 border-[#18181B] dark:border-[#3F3F46] flex items-center justify-between gap-2 transition-all ${
                  isDone
                    ? 'bg-[#B8E986]/30 border-[#18181B]'
                    : isCurrent
                    ? 'bg-[#6C5CE7] text-white border-[#18181B] shadow-brutal-sm'
                    : 'bg-white dark:bg-[#1E2028] text-[#18181B]/50 dark:text-gray-400 border-[#18181B]/20'
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <span className={`font-bold text-xs shrink-0 ${isCurrent ? 'text-white' : 'text-[#18181B] dark:text-white'}`}>
                    {step.id}
                  </span>
                  <div className="min-w-0">
                    <h3 className={`font-bold tracking-wider uppercase text-[11px] sm:text-xs truncate ${
                      isCurrent ? 'text-white font-display' : 'text-[#18181B] dark:text-white'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-[9px] sm:text-[10px] truncate ${isCurrent ? 'text-white/80' : 'text-[#18181B]/60 dark:text-gray-400'}`}>
                      {step.detail}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 font-bold">
                  {isDone ? (
                    <span className="w-5 h-5 sm:w-6 sm:h-6 bg-[#18181B] text-[#B8E986] flex items-center justify-center border border-[#18181B]">
                      <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </span>
                  ) : isCurrent ? (
                    <span className="w-5 h-5 sm:w-6 sm:h-6 bg-white text-[#6C5CE7] flex items-center justify-center border border-[#18181B]">
                      <Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin" />
                    </span>
                  ) : (
                    <span className="w-5 h-5 sm:w-6 sm:h-6 bg-[#F3F1EC] dark:bg-[#16181E] text-[#18181B]/40 dark:text-gray-500 flex items-center justify-center border border-[#18181B]/20 text-[10px]">
                      ○
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="pt-1 font-mono">
          <div className="flex justify-between text-[10px] sm:text-[11px] font-bold text-[#18181B] dark:text-white mb-1">
            <span>SYNTHESIS_PROGRESS</span>
            <span>{Math.round(((currentStepIndex + 1) / PIPELINE_STEPS.length) * 100)}%</span>
          </div>
          <div className="w-full h-2.5 sm:h-3 bg-white dark:bg-[#1E2028] border-2 border-[#18181B] dark:border-[#3F3F46] p-0.5">
            <div
              className="h-full bg-[#6C5CE7] transition-all duration-500"
              style={{ width: `${((currentStepIndex + 1) / PIPELINE_STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
