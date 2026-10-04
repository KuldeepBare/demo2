import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ChatInterface from './components/ChatInterface';
import StudyPlanGenerator from './components/StudyPlanGenerator';
import QuizGenerator from './components/QuizGenerator';
import ProgressDashboard from './components/ProgressDashboard';
import Footer from './components/Footer';

function MainApp() {
  const [activeTab, setActiveTab] = useState<'chat' | 'planner' | 'quiz' | 'dashboard'>('chat');
  const [activeChatPrompt, setActiveChatPrompt] = useState<string | undefined>(undefined);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-150">
      
      {/* Minimal Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => setActiveTab(tab as any)}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
        
        {/* Simple Header Bar for context */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100 dark:border-slate-800">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {activeTab === 'chat' && 'AI Study Tutor'}
              {activeTab === 'planner' && '14-Day Study Planner'}
              {activeTab === 'quiz' && 'Interactive Diagnostic Quiz'}
              {activeTab === 'dashboard' && 'Study Progress & Focus Timer'}
            </h1>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              {activeTab === 'chat' && 'Ask questions, review proofs, or practice Socratic intuition.'}
              {activeTab === 'planner' && 'Build and track daily milestone study roadmaps.'}
              {activeTab === 'quiz' && 'Test conceptual recall with instant feedback.'}
              {activeTab === 'dashboard' && 'Track retention velocity, streaks, and focus sessions.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 dark:bg-slate-800 text-[11px] font-medium text-gray-700 dark:text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Ready</span>
            </span>
          </div>
        </div>

        {/* Active Tool View */}
        {activeTab === 'chat' && (
          <ChatInterface
            initialPrompt={activeChatPrompt}
            onClearInitialPrompt={() => setActiveChatPrompt(undefined)}
          />
        )}

        {activeTab === 'planner' && <StudyPlanGenerator />}

        {activeTab === 'quiz' && <QuizGenerator />}

        {activeTab === 'dashboard' && (
          <ProgressDashboard
            onStartStudyDrill={(subject) => {
              setActiveChatPrompt(`Generate a 5-question high-yield diagnostic drill on: ${subject}`);
              setActiveTab('chat');
            }}
          />
        )}

      </main>

      {/* Clean Minimal Footer */}
      <Footer onNavClick={(tab) => setActiveTab(tab as any)} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
