import React from 'react';
import { Zap, Globe, Target, ArrowRight } from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: 'FAST INTELLIGENCE',
    desc: 'Multi-source scanning and AI analysis in seconds.',
    accent: 'bg-[#C9BFFF]',
  },
  {
    icon: Globe,
    title: 'MULTI-SOURCE RESEARCH',
    desc: 'Aggregates data from web, news, and verified sources.',
    accent: 'bg-[#F3A6C8]',
  },
  {
    icon: Target,
    title: 'ACTIONABLE INSIGHTS',
    desc: 'Clear reports with trends, signals, and real impact.',
    accent: 'bg-[#B8E986]',
  },
];

export default function FeatureCard() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 shrink-0">
      {FEATURES.map((feat, idx) => {
        const Icon = feat.icon;
        return (
          <div
            key={idx}
            className="panel-brutal p-2.5 flex flex-col justify-between relative group hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
          >
            <div>
              {/* Icon Square */}
              <div
                className={`w-6 h-6 ${feat.accent} border-2 border-[#18181B] flex items-center justify-center text-[#18181B] mb-1.5 shadow-brutal-sm`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>

              {/* Title */}
              <h3 className="font-display text-[10px] font-extrabold tracking-wider text-[#18181B] mb-0.5 uppercase">
                {feat.title}
              </h3>

              {/* Description */}
              <p className="text-[10px] font-mono text-[#18181B]/80 leading-snug">
                {feat.desc}
              </p>
            </div>

            {/* Bottom Square Action Button */}
            <div className="mt-1.5 pt-1 border-t border-[#18181B]/15 flex justify-end">
              <div className={`w-4 h-4 ${feat.accent} border border-[#18181B] flex items-center justify-center text-[#18181B] font-bold text-[9px] group-hover:bg-[#6C5CE7] group-hover:text-white transition-colors`}>
                <ArrowRight className="w-2.5 h-2.5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
