import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { X, Zap } from 'lucide-react';

export default function PageContainer({
  children,
  className = '',
  showFooter = true,
  containerStyle = {},
  containerClassName = 'bg-[#F3F1EC] dark:bg-[#0D0E12]',
}) {
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);

  return (
    <div
      style={containerStyle}
      className={`min-h-screen flex flex-col text-[#18181B] dark:text-[#F3F4F6] selection:bg-[#6C5CE7] selection:text-white transition-colors ${containerClassName}`}
    >
      <Navbar onOpenHowItWorks={() => setHowItWorksOpen(true)} />

      <main className={`flex-1 ${className}`}>
        {children}
      </main>

      {showFooter && <Footer />}

      {/* How it Works Neo-Brutalist Modal */}
      {howItWorksOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101114]/80 backdrop-blur-xs animate-in fade-in duration-150 font-mono">
          <div className="bg-[#FAF8F5] dark:bg-[#16181E] border-2 border-[#18181B] dark:border-[#3F3F46] max-w-xl w-full p-6 sm:p-8 shadow-brutal-lg dark:shadow-brutal-lg relative text-[#18181B] dark:text-[#F3F4F6]">
            <button
              onClick={() => setHowItWorksOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-[#18181B] text-white flex items-center justify-center hover:bg-[#6C5CE7] transition-colors cursor-pointer font-bold"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold uppercase tracking-wider text-[#6C5CE7]">
              <Zap className="w-4 h-4 text-[#F3A6C8]" />
              <span>HOW SIGNALAI WORKS</span>
            </div>

            <h3 className="font-display text-2xl font-extrabold mb-2 uppercase">
              MULTI-STAGE INTELLIGENCE PIPELINE
            </h3>

            <p className="text-xs text-[#18181B]/80 dark:text-gray-300 font-mono mb-6">
              SignalAI deconstructs queries, queries Tavily, Exa, and GNews in parallel, deduplicates article coverage, and extracts true signal from noise.
            </p>

            <div className="space-y-4 font-mono text-xs">
              <div className="p-3 bg-white dark:bg-[#1E2028] border-2 border-[#18181B] dark:border-[#3F3F46] flex items-start gap-3 shadow-brutal-sm">
                <div className="w-7 h-7 bg-[#C9BFFF] border border-[#18181B] flex items-center justify-center text-[#18181B] font-bold shrink-0">
                  01
                </div>
                <div>
                  <h4 className="font-bold uppercase">MULTI-QUERY GENERATION</h4>
                  <p className="text-[11px] text-[#18181B]/70 dark:text-gray-400 mt-0.5">
                    Deconstructs intent into 3 targeted provider queries (general web, research, & news).
                  </p>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-[#1E2028] border-2 border-[#18181B] dark:border-[#3F3F46] flex items-start gap-3 shadow-brutal-sm">
                <div className="w-7 h-7 bg-[#F3A6C8] border border-[#18181B] flex items-center justify-center text-[#18181B] font-bold shrink-0">
                  02
                </div>
                <div>
                  <h4 className="font-bold uppercase">PARALLEL RETRIEVAL & FILTERING</h4>
                  <p className="text-[11px] text-[#18181B]/70 dark:text-gray-400 mt-0.5">
                    Merges live Tavily, Exa, and GNews results while stripping out duplicate coverage.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-[#1E2028] border-2 border-[#18181B] dark:border-[#3F3F46] flex items-start gap-3 shadow-brutal-sm">
                <div className="w-7 h-7 bg-[#B8E986] border border-[#18181B] flex items-center justify-center text-[#18181B] font-bold shrink-0">
                  03
                </div>
                <div>
                  <h4 className="font-bold uppercase">SIGNAL SYNTHESIS</h4>
                  <p className="text-[11px] text-[#18181B]/70 dark:text-gray-400 mt-0.5">
                    Ranks impact, tracks trends, isolates contradictions, and generates actionable watchlists.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-[#18181B] dark:border-[#3F3F46] flex justify-end">
              <button
                onClick={() => setHowItWorksOpen(false)}
                className="px-6 py-2 bg-[#6C5CE7] text-white text-xs font-mono font-bold border-2 border-[#18181B] shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer"
              >
                GOT IT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
