import React from 'react';
import { HelpCircle, ArrowRight, X, Sparkles } from 'lucide-react';

export default function ClarificationModal({
  isOpen,
  userQuery,
  clarification,
  onClose,
  onTryNewQuery,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101114]/80 backdrop-blur-xs animate-in fade-in duration-150 font-mono">
      <div className="bg-[#FAF8F5] dark:bg-[#16181E] border-2 border-[#18181B] dark:border-[#3F3F46] max-w-lg w-full p-6 sm:p-8 shadow-brutal-lg dark:shadow-brutal-lg relative text-[#18181B] dark:text-[#F3F4F6] space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-[#18181B] dark:bg-[#1E2028] text-white flex items-center justify-center hover:bg-[#6C5CE7] transition-colors cursor-pointer font-bold border border-[#18181B] dark:border-[#3F3F46]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F3A6C8] text-[#18181B] text-[10px] font-bold tracking-wider uppercase border-2 border-[#18181B] shadow-brutal-sm">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>CLARIFICATION REQUIRED</span>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="font-display text-xl sm:text-2xl font-extrabold uppercase text-[#18181B] dark:text-white leading-tight">
            QUERY TOO VAGUE OR CONVERSATIONAL
          </h2>
          <p className="text-xs text-[#18181B]/70 dark:text-gray-400 font-mono">
            Entered Query: <strong className="text-[#6C5CE7] dark:text-[#C9BFFF]">"{userQuery}"</strong>
          </p>
        </div>

        {/* Clarification Box */}
        <div className="p-4 bg-white dark:bg-[#1E2028] border-2 border-[#18181B] dark:border-[#3F3F46] shadow-brutal-sm space-y-2">
          <span className="text-[10px] font-bold text-[#6C5CE7] uppercase flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#6C5CE7]" />
            AI ENGINE FEEDBACK
          </span>
          <p className="text-xs sm:text-sm font-sans font-medium text-[#18181B] dark:text-gray-200 leading-relaxed">
            {clarification || "Could you please specify what news or topic you're looking for?"}
          </p>
        </div>

        {/* Tip Box */}
        <div className="text-[11px] text-[#18181B]/80 dark:text-gray-400 bg-[#C9BFFF]/20 dark:bg-[#1E2028] p-3 border border-[#18181B] dark:border-[#3F3F46]">
          💡 <strong>Tip for best results:</strong> Ask specific questions like:
          <ul className="mt-1 space-y-0.5 list-disc list-inside text-[10px]">
            <li>"What is happening with AI this week?"</li>
            <li>"Why are tech stocks falling today?"</li>
            <li>"Latest developments in electric vehicle batteries"</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t-2 border-[#18181B] dark:border-[#3F3F46] flex flex-col sm:flex-row items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-white dark:bg-[#1E2028] text-[#18181B] dark:text-white text-xs font-mono font-bold border-2 border-[#18181B] dark:border-[#3F3F46] shadow-brutal-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            CLOSE
          </button>
          
          <button
            onClick={onTryNewQuery}
            className="w-full sm:w-auto px-5 py-2 bg-[#6C5CE7] text-white text-xs font-mono font-bold border-2 border-[#18181B] shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase"
          >
            <span>TRY A SPECIFIC QUERY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
