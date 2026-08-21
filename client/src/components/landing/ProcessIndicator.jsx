import React from 'react';
import { Search, Globe, Zap, FileText } from 'lucide-react';

const STEPS = [
  { icon: Search, label: 'QUERY', desc: 'Deconstruct intent' },
  { icon: Globe, label: 'RESEARCH', desc: 'Parallel multi-source' },
  { icon: Zap, label: 'SIGNALS', desc: 'Filter noise & trends' },
  { icon: FileText, label: 'INSIGHT', desc: 'Synthesized report' }
];

export default function ProcessIndicator() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 pt-4 pb-2">
      <div className="bg-[#FAF8F5]/80 border border-[#18181B]/10 rounded-xl p-3 sm:p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center relative group">
                <div className="w-8 h-8 rounded-lg bg-[#F4F1EA] border border-[#18181B]/15 flex items-center justify-center text-[#6D5DFB] mb-1.5 shadow-2xs group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-syne font-bold text-xs text-[#18181B] tracking-wider">
                  {step.label}
                </span>
                <span className="text-[10px] text-[#6B6B72] mt-0.5">
                  {step.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
