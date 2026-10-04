import React, { useState } from 'react';
import { ArrowRight, Sparkles, Brain, Check } from 'lucide-react';

interface CTASectionProps {
  onLaunch: (prompt?: string) => void;
}

export default function CTASection({ onLaunch }: CTASectionProps) {
  const [instantTopic, setInstantTopic] = useState('');

  const handleInstantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (instantTopic.trim()) {
      onLaunch(instantTopic.trim());
    } else {
      onLaunch();
    }
  };

  const sampleTriggers = [
    'Explain General Relativity using analogies',
    'Generate a 7-day Organic Chemistry roadmap',
    'Quiz me on Transformer Attention heads',
    'Derive Bayes Theorem with a medical example'
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-white dark:bg-[#0b0f17] border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-14 text-center relative overflow-hidden shadow-xl border border-slate-800">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-slate-800/50 rounded-full blur-3xl pointer-events-none" />

          {/* Pill kicker */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-medium mb-5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Instant Cognitive Activation</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3 font-['Outfit']">
            Accelerate Your Learning Velocity
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Experience the difference of an AI tutor that builds intuition instead of giving out superficial answers.
          </p>

          {/* Interactive Prompt Launcher */}
          <form onSubmit={handleInstantSubmit} className="max-w-xl mx-auto mb-6">
            <div className="relative flex flex-col sm:flex-row items-center gap-2 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 shadow-lg focus-within:border-white">
              <div className="flex items-center pl-3 text-slate-300">
                <Brain className="w-4 h-4 text-slate-300" />
              </div>
              <input
                type="text"
                value={instantTopic}
                onChange={(e) => setInstantTopic(e.target.value)}
                placeholder="Enter a topic: e.g. Quantum Computing, Bayes Theorem..."
                className="w-full bg-transparent text-white placeholder-slate-400 text-xs sm:text-sm px-2 py-2 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs text-slate-900 bg-white hover:bg-slate-100 shadow-xs transition-colors flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Sample Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto mb-8 text-xs">
            <span className="text-slate-400 text-[11px]">Quick topics:</span>
            {sampleTriggers.map((trig, idx) => (
              <button
                key={idx}
                onClick={() => onLaunch(trig)}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
              >
                {trig}
              </button>
            ))}
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-5 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Zero Setup Barrier</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Socratic Coaching</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Adaptive Retention</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
