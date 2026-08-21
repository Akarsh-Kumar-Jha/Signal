import React from 'react';
import { Layers, ExternalLink } from 'lucide-react';

export default function SourcesList({ sources, sourceOverview }) {
  if (!sources || sources.length === 0) return null;

  return (
    <section className="w-full font-mono">
      <div className="panel-brutal p-3.5 sm:p-6">
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 pb-2.5 mb-3 border-b-2 border-[#18181B]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#18181B] text-white flex items-center justify-center font-bold text-xs shrink-0">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <h2 className="font-display text-xs sm:text-sm font-extrabold text-[#18181B] tracking-wider uppercase">
              VERIFIED SOURCES
            </h2>
          </div>

          {sourceOverview?.totalArticlesAnalyzed > 0 && (
            <span className="text-[10px] sm:text-[11px] font-bold text-[#6C5CE7] shrink-0">
              [{sourceOverview.totalArticlesAnalyzed} ARTICLES ANALYZED]
            </span>
          )}
        </div>

        <div className="divide-y-2 divide-[#18181B]/15">
          {sources.map((source, idx) => (
            <div
              key={idx}
              className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white p-1.5 transition-colors"
            >
              <div className="flex items-start gap-2 min-w-0">
                <span className="font-mono font-bold text-[11px] text-[#6C5CE7] shrink-0">
                  [{String(idx + 1).padStart(2, '0')}]
                </span>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-xs sm:text-sm text-[#18181B] break-words">
                    {source.title || 'Source Document'}
                  </h3>
                  <div className="text-[10px] sm:text-[11px] text-[#18181B]/60 mt-0.5">
                    <span>{source.source || 'Publisher'}</span>
                    {source.publishedAt && (
                      <span> • {new Date(source.publishedAt).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>

              <a
                href={source.url || '#'}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 self-start sm:self-center px-2.5 py-1 bg-white hover:bg-[#6C5CE7] text-[#18181B] hover:text-white border-2 border-[#18181B] text-[10px] sm:text-[11px] font-bold shadow-brutal-sm hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>OPEN SOURCE</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
