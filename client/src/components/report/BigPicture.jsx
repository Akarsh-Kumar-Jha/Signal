import React from 'react';

export default function BigPicture({ summary }) {
  if (!summary) return null;

  return (
    <div className="panel-brutal p-3.5 sm:p-8 space-y-3 sm:space-y-4">
      <div className="flex items-center gap-2 border-b-2 border-[#18181B] pb-2 font-mono">
        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#6C5CE7] text-white flex items-center justify-center font-bold text-xs shrink-0">
          01
        </div>
        <h2 className="font-display font-extrabold text-xs sm:text-base text-[#18181B] uppercase tracking-wider">
          THE BIG PICTURE
        </h2>
      </div>

      <p className="text-xs sm:text-sm text-[#18181B] leading-relaxed font-sans font-medium break-words">
        {summary}
      </p>
    </div>
  );
}
