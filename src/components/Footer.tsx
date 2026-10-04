import React from 'react';
import { Sparkles } from 'lucide-react';

interface FooterProps {
  onNavClick: (id: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-slate-400">
        
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900">
            <Sparkles className="w-3 h-3" />
          </div>
          <span className="font-semibold text-gray-800 dark:text-slate-200">
            NovaLearn
          </span>
          <span>· Minimal AI Study Companion</span>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => onNavClick('chat')} className="hover:text-gray-900 dark:hover:text-white transition-colors">
            AI Tutor
          </button>
          <button onClick={() => onNavClick('planner')} className="hover:text-gray-900 dark:hover:text-white transition-colors">
            Study Planner
          </button>
          <button onClick={() => onNavClick('quiz')} className="hover:text-gray-900 dark:hover:text-white transition-colors">
            Quiz Drill
          </button>
          <button onClick={() => onNavClick('dashboard')} className="hover:text-gray-900 dark:hover:text-white transition-colors">
            Progress
          </button>
        </div>

        <div className="text-gray-400 dark:text-slate-500 text-[11px]">
          © {new Date().getFullYear()} NovaLearn
        </div>

      </div>
    </footer>
  );
}
