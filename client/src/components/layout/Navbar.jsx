import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Radio, Compass, Zap, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar({ onOpenHowItWorks }) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full bg-[#101114] text-white border-b-2 border-[#18181B] dark:border-[#3F3F46] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-11 flex items-center justify-between font-mono text-[11px]">
        {/* Left: Brand Logo & Badge */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-1.5 group shrink-0">
            <div className="w-6 h-6 bg-[#6C5CE7] border border-white/20 flex items-center justify-center text-white shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <Radio className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-extrabold text-xs sm:text-sm tracking-wider text-white">
              SIGNAL AI
            </span>
          </Link>

          <div className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#6C5CE7]/20 border border-[#6C5CE7]/60 text-[#C9BFFF] text-[9px] font-bold tracking-widest uppercase">
            <span>&lt;&gt;</span>
            <span>INTELLIGENCE ENGINE</span>
          </div>
        </div>

        {/* Right: Responsive Nav Links */}
        <nav className="flex items-center gap-2.5 sm:gap-4 uppercase font-bold text-[10px] sm:text-[11px]">
          <button
            onClick={onOpenHowItWorks}
            className="text-white/80 hover:text-[#C9BFFF] transition-colors flex items-center gap-1 cursor-pointer shrink-0"
          >
            <Zap className="w-3 h-3 text-[#6C5CE7]" />
            <span className="hidden xs:inline">HOW IT WORKS</span>
            <span className="xs:hidden">WORKS</span>
          </button>

          <span className="text-white/30 hidden xs:inline">•</span>

          <Link
            to="/today"
            className={`transition-colors flex items-center gap-1 shrink-0 ${
              location.pathname === '/today'
                ? 'text-[#B8E986] underline decoration-2 underline-offset-4'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <Compass className="w-3 h-3 text-[#F3A6C8]" />
            <span className="hidden xs:inline">TODAY'S SIGNALS</span>
            <span className="xs:hidden">SIGNALS</span>
          </Link>

          <button
            onClick={toggleTheme}
            className="w-6.5 h-6.5 bg-white/10 hover:bg-[#6C5CE7] border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? (
              <Moon className="w-3.5 h-3.5 text-[#C9BFFF]" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-[#FF7A59]" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
