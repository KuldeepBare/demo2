import React, { useState } from 'react';
import { 
  Brain, 
  Calendar, 
  CheckSquare, 
  BarChart2, 
  Sun, 
  Moon, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNewSession?: () => void;
}

export default function Navbar({ activeTab, setActiveTab, onNewSession }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'chat', label: 'AI Tutor', icon: Brain },
    { id: 'planner', label: 'Study Plan', icon: Calendar },
    { id: 'quiz', label: 'Quiz', icon: CheckSquare },
    { id: 'dashboard', label: 'Progress', icon: BarChart2 },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        
        {/* Brand */}
        <div 
          onClick={() => handleTabClick('chat')}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <div className="w-7 h-7 rounded-md bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
            NovaLearn
          </span>
        </div>

        {/* Center Minimal Tabs (Desktop) */}
        <div className="hidden md:flex items-center gap-1 bg-gray-100 dark:bg-slate-800 p-1 rounded-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-md flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 border border-gray-200 dark:border-slate-700 transition-colors"
            title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 rounded-md flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 border border-gray-200 dark:border-slate-700"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium text-left transition-colors ${
                  isActive
                    ? 'bg-gray-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
