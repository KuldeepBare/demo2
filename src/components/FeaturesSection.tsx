import React from 'react';
import { 
  Brain, 
  Repeat, 
  Calendar, 
  HelpCircle, 
  LineChart, 
  ArrowUpRight,
  Code2
} from 'lucide-react';

interface FeaturesSectionProps {
  onSelectFeature: (tab: string) => void;
}

export default function FeaturesSection({ onSelectFeature }: FeaturesSectionProps) {
  const features = [
    {
      id: 'chat',
      title: 'Socratic Dialogue Coach',
      tagline: 'Deep comprehension over rote memorization',
      description: 'NovaLearn guides you with purposeful questions and structural hints, helping you arrive at the mathematical or conceptual breakthrough on your own.',
      icon: Brain,
      iconBg: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white',
      actionLabel: 'Chat with Socratic AI',
      sampleSnippet: '“If gravitational force drops with 1/r², what must happen to the orbital period under Kepler’s Third Law?”'
    },
    {
      id: 'planner',
      title: 'Adaptive Study Roadmaps',
      tagline: 'Milestone-driven cognitive pacing',
      description: 'Input your exam date, daily hours, and target score. NovaLearn structures modular phases, diagnostic checkpoints, and scheduled consolidation days.',
      icon: Calendar,
      iconBg: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white',
      actionLabel: 'Generate Study Plan',
      sampleSnippet: '14-Day Sprint: Days 1–4 Foundations → Days 5–9 Synthesis & Problem Sets → Days 10–14 Mock Simulations.'
    },
    {
      id: 'quiz',
      title: 'Diagnostic Quiz Engine',
      tagline: 'Instant feedback with conceptual traps',
      description: 'Generate calibrated question sets on any topic. Each option comes with clear explanations of why it is valid or where the distractor misled you.',
      icon: HelpCircle,
      iconBg: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white',
      actionLabel: 'Start Interactive Quiz',
      sampleSnippet: '“Which statement regarding L2 regularization vs L1 weight decay is mathematically rigorous?”'
    },
    {
      id: 'dashboard',
      title: 'Mastery & Retention Analytics',
      tagline: 'Quantifiable memory curves',
      description: 'Visualize your learning velocity with subject progress bars, daily streak tracking, spaced repetition queues, and cognitive stamina charts.',
      icon: LineChart,
      iconBg: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white',
      actionLabel: 'View Progress Analytics',
      sampleSnippet: 'Active Streak: 14 Days · Syllabus Mastery: 84% · 4 Core concepts due for spaced review today.'
    },
    {
      id: 'chat',
      title: 'Technical Math & Code Synthesis',
      tagline: 'Rigorous derivation support',
      description: 'Render clean LaTeX formulas, asymptotic big-O algorithmic traces, and code snippets with complete breakdown of edge cases and invariants.',
      icon: Code2,
      iconBg: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white',
      actionLabel: 'Explore Technical Tutor',
      sampleSnippet: '“O(V + E) BFS traversal · P(A|B) = P(B|A)P(A)/P(B) · Schrödinger Wave Function ψ(x,t)”'
    },
    {
      id: 'dashboard',
      title: 'Ebbinghaus Spaced Repetition',
      tagline: 'Scientifically scheduled recall',
      description: 'The algorithm analyzes your error log and schedules micro-recall sessions right before the memory decay threshold wipes out retention.',
      icon: Repeat,
      iconBg: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white',
      actionLabel: 'Review Due Cards',
      sampleSnippet: 'Interval calculation: 1 day → 3 days → 7 days → 14 days → Permanent Long-Term Potentiation.'
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-white dark:bg-[#0e1422] border-y border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase font-mono tracking-widest text-slate-500 dark:text-slate-400 mb-2 font-semibold">
            Engineered For Serious Students
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3 font-['Outfit']">
            Cognitive Tools for Complex Subjects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
            Move beyond static textbooks and passive lecture videos. NovaLearn turns studying into an active, high-yield dialogue that adapts to your thinking.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="pro-card pro-card-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  {/* Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl ${feat.iconBg} flex items-center justify-center font-bold border border-slate-200 dark:border-slate-700`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      MODULE 0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 font-['Outfit']">
                    {feat.title}
                  </h3>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                    {feat.tagline}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                    {feat.description}
                  </p>

                  {/* Sample Snippet preview */}
                  <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-200/70 dark:border-slate-700/70 text-xs font-mono text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                    <span className="text-slate-400 dark:text-slate-500 text-[10px] block mb-1 font-sans uppercase font-bold tracking-wider">Example:</span>
                    {feat.sampleSnippet}
                  </div>
                </div>

                {/* Card Button (NO BLUE!) */}
                <button
                  onClick={() => onSelectFeature(feat.id)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 hover:bg-slate-900 hover:text-white dark:bg-slate-800 dark:hover:bg-white dark:hover:text-slate-900 border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{feat.actionLabel}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
