import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Zap, Sun, Moon, ExternalLink } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar({ onOpenHowItWorks }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full bg-[#101114] text-white border-b-2 border-[#18181B] dark:border-[#3F3F46] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-11 flex items-center justify-between font-mono text-[11px]">
        {/* Left: Brand Logo & BY AKARSH Badge */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 group shrink-0">
            <div className="w-6 h-6 bg-[#B8E986] border border-black flex items-center justify-center text-black shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <Target className="w-3.5 h-3.5 text-black font-bold" />
            </div>
            <span className="font-display font-extrabold text-xs sm:text-sm tracking-wider text-white">
              SIGNAL AI
            </span>
          </Link>

          <a
            href="https://akarshjha.dev"
            target="_blank"
            rel="noreferrer"
            className="px-2 py-0.5 bg-[#B8E986] hover:bg-[#a3dc69] text-black border border-black font-mono text-[9px] sm:text-[10px] font-extrabold tracking-wider uppercase flex items-center gap-1 transition-all shadow-2xs hover:scale-105 shrink-0"
            title="Portfolio of Akarsh Jha"
          >
            <span>BY AKARSH</span>
            <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-black" />
          </a>
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
