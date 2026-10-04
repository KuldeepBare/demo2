import React, { useState } from 'react';
import { ArrowRight, Sparkles, Brain, CheckCircle2, Play, Terminal } from 'lucide-react';

interface HeroSectionProps {
  onStartChat: (presetTopic?: string) => void;
  onStartPlan: () => void;
  onStartQuiz: () => void;
}

export default function HeroSection({ onStartChat, onStartPlan, onStartQuiz }: HeroSectionProps) {
  const [activePreviewTab, setActivePreviewTab] = useState<'quantum' | 'bayes' | 'memory'>('quantum');

  const previews = {
    quantum: {
      query: "How does Quantum Superposition allow quantum algorithms to solve problems faster?",
      tag: "Quantum Computing",
      response: "A classical bit is strictly 0 or 1. A qubit exists in a linear superposition |ψ⟩ = α|0⟩ + β|1⟩, evaluating 2ⁿ state paths concurrently. Quantum interference actively cancels out incorrect candidate paths while constructively amplifying the optimal solution.",
      speed: "12ms neural synthesis",
      mode: "Socratic First-Principles"
    },
    bayes: {
      query: "Why do rare conditions produce false positives even with 99% test accuracy?",
      tag: "Bayesian Statistics",
      response: "The Base Rate Fallacy: In a cohort of 100,000 where 10 have the condition, a 1% false positive rate creates 1,000 false alarms. The true positives (10) are outnumbered 100-to-1 by false alarms. Consequently, posterior P(Condition|Positive) is ~1%.",
      speed: "8ms cognitive derivation",
      mode: "Analogy & Intuition"
    },
    memory: {
      query: "Generate a 3-tier spaced repetition schedule for Organic Chemistry synthesis reactions.",
      tag: "Cognitive Science",
      response: "Tier 1: E2 vs SN2 steric hindrances (Review Day 1 & Day 3). Tier 2: Grignard nucleophilic additions (Review Day 7). Tier 3: Retrosynthetic disconnections (Active recall mock Day 14). Spaced intervals solidify long-term synaptic consolidation.",
      speed: "15ms adaptive schedule",
      mode: "Exam Retention Protocol"
    }
  };

  const current = previews[activePreviewTab];

  return (
    <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100/90 dark:bg-slate-800/90 text-xs font-medium text-slate-700 dark:text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-900 dark:text-white">NovaLearn 3.8</span>
            <span className="text-slate-400">·</span>
            <span>Adaptive Spaced Tutoring Engine</span>
          </div>
        </div>

        {/* Hero Title & Value Proposition */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-5 font-['Outfit']">
            Master Any Discipline with{' '}
            <span className="underline decoration-slate-300 dark:decoration-slate-700 underline-offset-8">
              Cognitive Clarity
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed max-w-2xl mx-auto mb-8">
            NovaLearn is your personalized AI study companion. It deconstructs tough STEM topics into first principles, designs milestone-driven study roadmaps, and tests conceptual recall with diagnostic drills.
          </p>

          {/* Call to Actions (No Blue Buttons!) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <button
              onClick={() => onStartChat()}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-xs text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 shadow-sm transition-all flex items-center justify-center gap-2 group"
            >
              <Brain className="w-4 h-4" />
              <span>Launch AI Study Companion</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onStartPlan}
              className="w-full sm:w-auto px-5 py-3 rounded-xl font-semibold text-xs text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-2xs transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>Generate 14-Day Study Plan</span>
            </button>

            <button
              onClick={onStartQuiz}
              className="w-full sm:w-auto px-5 py-3 rounded-xl font-semibold text-xs text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-2xs transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Interactive Quiz Drill</span>
            </button>
          </div>

          {/* Proof Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-slate-200 dark:border-slate-800 text-left">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Outfit']">98.4%</div>
              <div className="text-xs text-slate-500">Concept Accuracy</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Outfit']">3.2×</div>
              <div className="text-xs text-slate-500">Faster Problem Derivation</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Outfit']">14 Days</div>
              <div className="text-xs text-slate-500">Average Retention Cycle</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-['Outfit']">Socratic</div>
              <div className="text-xs text-slate-500">First-Principles Logic</div>
            </div>
          </div>
        </div>

        {/* Interactive Card Preview */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="pro-card rounded-2xl p-5 sm:p-6 bg-white dark:bg-[#111827] shadow-sm border border-slate-200 dark:border-slate-800">
            
            {/* Header bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 ml-2">novalearn-tutor · interactive preview</span>
              </div>

              {/* Preset switcher tabs */}
              <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200/60 dark:border-slate-700/60">
                <button
                  onClick={() => setActivePreviewTab('quantum')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activePreviewTab === 'quantum'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Quantum Mechanics
                </button>
                <button
                  onClick={() => setActivePreviewTab('bayes')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activePreviewTab === 'bayes'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Bayesian Logic
                </button>
                <button
                  onClick={() => setActivePreviewTab('memory')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activePreviewTab === 'memory'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Spaced Recall
                </button>
              </div>
            </div>

            {/* Conversation Preview Body */}
            <div className="space-y-3.5 text-sm">
              
              {/* Question */}
              <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 text-xs font-bold">
                  Q
                </div>
                <div className="flex-1">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-0.5 flex items-center gap-1.5">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">STUDENT QUERY</span>
                    <span>·</span>
                    <span>{current.tag}</span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
                    {current.query}
                  </p>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex items-start gap-3 bg-slate-100/70 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700">
                <div className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shrink-0 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div className="text-[11px] mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">NOVALEARN TUTOR</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-600 dark:text-slate-400">{current.mode}</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/40 px-2 py-0.5 rounded font-medium border border-emerald-200 dark:border-emerald-800">
                      {current.speed}
                    </span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                    {current.response}
                  </p>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => onStartChat(current.query)}
                      className="text-xs text-slate-900 dark:text-white hover:underline font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Continue this deep-dive in AI Companion</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
