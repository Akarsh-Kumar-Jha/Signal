import React from 'react';
import { AlertTriangle, RefreshCw, X, CreditCard } from 'lucide-react';

export default function ErrorModal({
  isOpen,
  errorMessage,
  onClose,
  onRetry,
}) {
  if (!isOpen) return null;

  const isCreditError =
    errorMessage &&
    (errorMessage.toLowerCase().includes('credits') ||
      errorMessage.toLowerCase().includes('max_tokens') ||
      errorMessage.toLowerCase().includes('openrouter'));

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
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FF7A59] text-white text-[10px] font-bold tracking-wider uppercase border-2 border-[#18181B] shadow-brutal-sm">
          {isCreditError ? (
            <CreditCard className="w-3.5 h-3.5" />
          ) : (
            <AlertTriangle className="w-3.5 h-3.5" />
          )}
          <span>{isCreditError ? 'API CREDIT LIMIT EXCEEDED' : 'SERVICE ERROR'}</span>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="font-display text-xl sm:text-2xl font-extrabold uppercase text-[#18181B] dark:text-white leading-tight">
            {isCreditError ? 'OPENROUTER CREDITS EXHAUSTED' : 'ANALYSIS ENGINE ERROR'}
          </h2>
          <p className="text-xs text-[#18181B]/70 dark:text-gray-400 font-mono">
            {isCreditError
              ? 'The AI LLM provider has run out of available tokens or credits.'
              : 'An unexpected issue occurred while executing the synthesis graph.'}
          </p>
        </div>

        {/* Error Detail Box */}
        <div className="p-4 bg-white dark:bg-[#1E2028] border-2 border-[#18181B] dark:border-[#3F3F46] shadow-brutal-sm space-y-2">
          <span className="text-[10px] font-bold text-[#FF7A59] uppercase flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-[#FF7A59]" />
            SERVER RESPONSE
          </span>
          <p className="text-xs font-mono text-[#18181B] dark:text-gray-200 leading-relaxed break-words bg-[#FF7A59]/10 p-2.5 border border-[#FF7A59]/40">
            {errorMessage || 'Unknown service error occurred.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t-2 border-[#18181B] dark:border-[#3F3F46] flex flex-col sm:flex-row items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-white dark:bg-[#1E2028] text-[#18181B] dark:text-white text-xs font-mono font-bold border-2 border-[#18181B] dark:border-[#3F3F46] shadow-brutal-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            GO HOME
          </button>
          
          <button
            onClick={onRetry}
            className="w-full sm:w-auto px-5 py-2 bg-[#6C5CE7] text-white text-xs font-mono font-bold border-2 border-[#18181B] shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>TRY AGAIN</span>
          </button>
        </div>

      </div>
    </div>
  );
}
