import React from 'react';
import { Activity } from 'lucide-react';

const CATEGORY_SCORES = [
  { label: 'AI', score: 92, level: 'HIGH', color: 'bg-[#6C5CE7]' },
  { label: 'TECH', score: 85, level: 'HIGH', color: 'bg-[#6C5CE7]' },
  { label: 'STARTUPS', score: 70, level: 'MEDIUM', color: 'bg-[#F3A6C8]' },
  { label: 'MARKETS', score: 55, level: 'DEVELOPING', color: 'bg-[#C9BFFF]' },
  { label: 'POLICY', score: 40, level: 'EMERGING', color: 'bg-[#B8E986]' },
];

export default function SignalMap() {
  return (
    <div className="panel-brutal p-6 font-mono">
      <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-[#18181B]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#6C5CE7] text-white flex items-center justify-center font-bold text-xs">
            <Activity className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-display text-sm font-extrabold text-[#18181B] tracking-wider uppercase">
            SIGNAL INTENSITY MAP
          </h2>
        </div>
        <span className="text-xs font-bold text-[#6C5CE7]">[LIVE_FEED]</span>
      </div>

      <div className="space-y-3">
        {CATEGORY_SCORES.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 text-xs">
            <span className="w-20 font-bold text-[#18181B] truncate">{item.label}</span>
            <div className="flex-1 h-4 bg-white border-2 border-[#18181B] p-0.5 shadow-brutal-sm">
              <div
                className={`h-full ${item.color} transition-all duration-700`}
                style={{ width: `${item.score}%` }}
              />
            </div>
            <span className="w-24 text-right font-bold text-[#18181B]">{item.level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
