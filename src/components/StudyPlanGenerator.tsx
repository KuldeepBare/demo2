import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Copy, 
  Check, 
  Sliders, 
  Award
} from 'lucide-react';
import { StudyPlan } from '../types';

export default function StudyPlanGenerator() {
  const [subject, setSubject] = useState('Data Structures & Algorithms');
  const [days, setDays] = useState(14);
  const [hoursPerDay, setHoursPerDay] = useState(3);
  const [level, setLevel] = useState('Intermediate');
  const [goal, setGoal] = useState('Technical Interview & Exam Mastery');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Initial realistic sample plan
  const [plan, setPlan] = useState<StudyPlan>({
    title: '14-Day High-Yield Algorithmic Blueprint',
    subject: 'Data Structures & Algorithms',
    totalHours: 42,
    intensity: '3h daily · Intermediate',
    goal: 'Technical Interview & Exam Mastery',
    phases: [
      {
        phaseName: 'Phase 1: Core Patterns & Asymptotic Mastery',
        daysRange: 'Days 1–4',
        focus: 'Sliding Window, Two-Pointer Invariants, Prefix Sums, Monotonic Queues',
        tasks: [
          { day: 1, title: 'Two Pointers & Sliding Window: Minimum Window Substring', duration: '3h', completed: true },
          { day: 2, title: 'Prefix Sums & Monotonic Stacks: Daily Temperatures', duration: '3h', completed: true },
          { day: 3, title: 'Binary Search: Median of Two Sorted Arrays', duration: '3h', completed: false },
          { day: 4, title: 'System Foundations: CAP Theorem & Consistent Hashing', duration: '3h', completed: false },
        ],
      },
      {
        phaseName: 'Phase 2: Graph Theory & Dynamic Programming',
        daysRange: 'Days 5–9',
        focus: 'DFS/BFS, Topological Sort, 1D/2D Dynamic Programming',
        tasks: [
          { day: 5, title: 'Graph Traversal & Cycle Detection: Course Schedule', duration: '3h', completed: false },
          { day: 6, title: '1D Dynamic Programming: Longest Increasing Subsequence', duration: '3h', completed: false },
          { day: 7, title: '2D Matrix DP: Edit Distance and 0/1 Knapsack', duration: '3h', completed: false },
          { day: 8, title: 'Distributed Systems: Rate Limiting & Caching', duration: '3h', completed: false },
          { day: 9, title: 'Mid-Point Mock Diagnostic: 4 Timed Hard Problems', duration: '3h', completed: false },
        ],
      },
      {
        phaseName: 'Phase 3: Synthesis & High-Stakes Simulation',
        daysRange: 'Days 10–14',
        focus: 'Union-Find, Trie, Full Simulations, and Final Review',
        tasks: [
          { day: 10, title: 'Union-Find & Trie: Redundant Connection', duration: '3h', completed: false },
          { day: 11, title: 'Architecture: URL Shortener & Key-Value Store', duration: '3h', completed: false },
          { day: 12, title: 'Error-Log Review: Redo missed problems', duration: '3h', completed: false },
          { day: 13, title: 'Behavioral & Structural Communication Practice', duration: '3h', completed: false },
          { day: 14, title: 'Final Full-Length Simulation under timed conditions', duration: '3h', completed: false },
        ],
      },
    ],
    milestones: [
      { title: 'Checkpoint 1: Core Invariants Mastered', progress: 100, status: 'Completed' },
      { title: 'Checkpoint 2: Dynamic Programming & Graphs', progress: 35, status: 'In Progress' },
      { title: 'Checkpoint 3: Final Comprehensive Simulation', progress: 0, status: 'Upcoming' },
    ],
  });

  const handleGeneratePlan = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          days,
          hoursPerDay,
          level,
          goal,
        }),
      });

      if (!res.ok) throw new Error('Failed to generate plan');
      const data = await res.json();
      setPlan(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = (phaseIdx: number, taskIdx: number) => {
    setPlan((prev) => {
      const newPhases = [...prev.phases];
      const phase = { ...newPhases[phaseIdx] };
      const tasks = [...phase.tasks];
      tasks[taskIdx] = { ...tasks[taskIdx], completed: !tasks[taskIdx].completed };
      phase.tasks = tasks;
      newPhases[phaseIdx] = phase;
      return { ...prev, phases: newPhases };
    });
  };

  const handleCopyPlan = () => {
    const text = `# ${plan.title}\nSubject: ${plan.subject} (${plan.intensity})\nGoal: ${plan.goal}\n\n` +
      plan.phases.map(p => `## ${p.phaseName} (${p.daysRange})\nFocus: ${p.focus}\n` +
        p.tasks.map(t => `- [${t.completed ? 'x' : ' '}] Day ${t.day}: ${t.title} (${t.duration})`).join('\n')
      ).join('\n\n');
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const allTasks = plan.phases.flatMap((p) => p.tasks);
  const completedTasks = allTasks.filter((t) => t.completed).length;
  const progressPercent = allTasks.length > 0 ? Math.round((completedTasks / allTasks.length) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto py-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Controls Form Column (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-xl p-5 border border-gray-200 dark:border-slate-800 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-slate-800">
            <Sliders className="w-4 h-4 text-gray-700 dark:text-slate-300" />
            <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Plan Settings</h3>
          </div>

          {/* Subject Input */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">
              Discipline or Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Organic Chemistry, AP Physics"
              className="w-full bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white text-xs rounded-lg px-3 py-2 border border-gray-200 dark:border-slate-700 focus:outline-none"
            />
          </div>

          {/* Target Goal */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">
              Target Goal / Exam
            </label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. Final Exam, Interview Prep"
              className="w-full bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white text-xs rounded-lg px-3 py-2 border border-gray-200 dark:border-slate-700 focus:outline-none"
            />
          </div>

          {/* Timeline Duration */}
          <div>
            <div className="flex justify-between text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">
              <span>Duration</span>
              <span className="font-mono font-bold text-gray-900 dark:text-white">{days} Days</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[7, 14, 30, 60].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDays(d)}
                  className={`py-1.5 text-xs rounded-md font-medium transition-colors ${
                    days === d
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold'
                      : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {d}d
                </button>
              ))}
            </div>
          </div>

          {/* Daily Hours Slider */}
          <div>
            <div className="flex justify-between text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">
              <span>Daily Study Time</span>
              <span className="font-mono font-bold text-gray-900 dark:text-white">{hoursPerDay}h / day</span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              step="1"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(Number(e.target.value))}
              className="w-full accent-slate-900 dark:accent-white bg-gray-200 dark:bg-slate-700 rounded-lg cursor-pointer h-1.5"
            />
          </div>

          {/* Current Proficiency Level */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">
              Proficiency Level
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {['Foundations', 'Intermediate', 'Advanced'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevel(lvl)}
                  className={`py-1.5 rounded-md font-medium transition-colors ${
                    level === lvl
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold'
                      : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button (NO BLUE!) */}
          <button
            onClick={handleGeneratePlan}
            disabled={loading || !subject.trim()}
            className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 shadow-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-40"
          >
            {loading ? (
              <>
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Generating Roadmap...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Build Study Roadmap</span>
              </>
            )}
          </button>
        </div>

        {/* Plan Output Column (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs">
          
          {/* Plan Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-3 mb-4 border-b border-gray-100 dark:border-slate-800">
            <div>
              <div className="text-[11px] font-mono text-gray-500 dark:text-slate-400 mb-0.5">
                {plan.subject} · {plan.intensity}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {plan.title}
              </h3>
            </div>

            <button
              onClick={handleCopyPlan}
              className="px-2.5 py-1.5 rounded-md text-xs font-medium text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy Plan'}</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2.5 mb-4 text-center">
            <div className="bg-gray-50 dark:bg-slate-800/60 rounded-lg p-2.5 border border-gray-100 dark:border-slate-800">
              <div className="text-[10px] text-gray-500 dark:text-slate-400">Total Investment</div>
              <div className="text-base font-bold text-gray-900 dark:text-white font-mono">{plan.totalHours}h</div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800/60 rounded-lg p-2.5 border border-gray-100 dark:border-slate-800">
              <div className="text-[10px] text-gray-500 dark:text-slate-400">Tasks Completed</div>
              <div className="text-base font-bold text-gray-900 dark:text-white font-mono">
                {completedTasks}/{allTasks.length}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800/60 rounded-lg p-2.5 border border-gray-100 dark:border-slate-800">
              <div className="text-[10px] text-gray-500 dark:text-slate-400">Completion</div>
              <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono">{progressPercent}%</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-1.5 mb-5 overflow-hidden">
            <div
              className="bg-slate-900 dark:bg-white h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Phases Breakdown */}
          <div className="space-y-4">
            {plan.phases.map((phase, pIdx) => (
              <div key={pIdx} className="rounded-lg bg-gray-50/70 dark:bg-slate-800/40 p-4 border border-gray-200 dark:border-slate-800">
                
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-slate-200 font-mono text-xs flex items-center justify-center font-bold">
                      {pIdx + 1}
                    </span>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">{phase.phaseName}</h4>
                  </div>
                  <span className="text-[11px] font-mono text-gray-500 dark:text-slate-400">
                    {phase.daysRange}
                  </span>
                </div>

                <p className="text-[11px] text-gray-500 dark:text-slate-400 mb-2.5 pl-7">
                  Focus: {phase.focus}
                </p>

                {/* Tasks List */}
                <div className="space-y-1.5 pl-1 sm:pl-7">
                  {phase.tasks.map((task, tIdx) => (
                    <div
                      key={tIdx}
                      onClick={() => toggleTask(pIdx, tIdx)}
                      className={`flex items-start gap-2.5 p-2 rounded-md cursor-pointer transition-colors border text-xs ${
                        task.completed
                          ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50 text-gray-400 dark:text-slate-500'
                          : 'bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-750 border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-200'
                      }`}
                    >
                      <button className="mt-0.5 shrink-0 text-slate-700 dark:text-slate-300">
                        {task.completed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                      
                      <div className="flex-1 flex flex-wrap items-center justify-between gap-1">
                        <span className={task.completed ? 'line-through text-gray-400' : ''}>
                          <strong className="text-gray-500 dark:text-slate-400 mr-1.5">Day {task.day}:</strong>
                          {task.title}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {task.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>

          {/* Milestones Checkpoints */}
          {plan.milestones && plan.milestones.length > 0 && (
            <div className="mt-5 pt-4 border-t border-gray-100 dark:border-slate-800">
              <div className="text-[11px] font-bold text-gray-600 dark:text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-500" /> Milestones
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {plan.milestones.map((ms, idx) => (
                  <div key={idx} className="bg-gray-50 dark:bg-slate-800/60 rounded-md p-2.5 border border-gray-100 dark:border-slate-800 text-xs">
                    <div className="font-medium text-gray-800 dark:text-slate-200 truncate">{ms.title}</div>
                    <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-slate-400 mt-1">
                      <span>{ms.status}</span>
                      <span className="font-mono font-bold">{ms.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
