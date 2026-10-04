import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Brain, 
  Clock, 
  CheckCircle2, 
  Play, 
  Pause, 
  RotateCcw, 
  Calendar,
  Check
} from 'lucide-react';
import { SubjectMastery } from '../types';

interface ProgressDashboardProps {
  onStartStudyDrill: (subjectName: string) => void;
}

export default function ProgressDashboard({ onStartStudyDrill }: ProgressDashboardProps) {
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerType, setTimerType] = useState<'focus' | 'break'>('focus');

  const [reviewQueue, setReviewQueue] = useState([
    { id: 1, title: 'Schrödinger Wave Equation (Time-Dependent)', subject: 'Physics', interval: 'Due today', completed: false },
    { id: 2, title: 'B-Tree & LSM-Tree Engine Trade-offs', subject: 'CS', interval: 'Due today', completed: false },
    { id: 3, title: 'Krebs Cycle Rate-Limiting Steps (Isocitrate DH)', subject: 'Biology', interval: 'Due today', completed: false },
    { id: 4, title: 'Bayesian Conjugate Priors', subject: 'Math', interval: 'Due today', completed: false },
  ]);

  const [masteries] = useState<SubjectMastery[]>([
    { subject: 'Computer Science', category: 'STEM', percentage: 92, color: 'bg-slate-900 dark:bg-white', tasksDone: 46, totalTasks: 50 },
    { subject: 'Physics', category: 'STEM', percentage: 85, color: 'bg-slate-700 dark:bg-slate-300', tasksDone: 34, totalTasks: 40 },
    { subject: 'Biology & Chemistry', category: 'Pre-Med', percentage: 78, color: 'bg-emerald-600 dark:bg-emerald-400', tasksDone: 28, totalTasks: 36 },
    { subject: 'Mathematics', category: 'Math', percentage: 89, color: 'bg-slate-800 dark:bg-slate-200', tasksDone: 40, totalTasks: 45 },
  ]);

  const weeklyData = [
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 4.2 },
    { day: 'Wed', hours: 2.8 },
    { day: 'Thu', hours: 5.0 },
    { day: 'Fri', hours: 3.9 },
    { day: 'Sat', hours: 6.1 },
    { day: 'Sun', hours: 4.4 },
  ];

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);

  const resetTimer = (type: 'focus' | 'break' = 'focus') => {
    setIsTimerRunning(false);
    setTimerType(type);
    setTimerSeconds(type === 'focus' ? 25 * 60 : 5 * 60);
  };

  const markCardReviewed = (id: number) => {
    setReviewQueue((prev) =>
      prev.map((card) => (card.id === id ? { ...card, completed: true } : card))
    );
  };

  const formatTimerTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto py-2 space-y-6">
      
      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Streak */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400 mb-1">
            <span>Streak</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            14 <span className="text-xs font-normal text-gray-500">Days</span>
          </div>
        </div>

        {/* Retention */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400 mb-1">
            <span>Recall Retention</span>
            <Brain className="w-4 h-4 text-gray-600 dark:text-slate-300" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            94.2<span className="text-xs font-normal text-gray-500">%</span>
          </div>
        </div>

        {/* Weekly Time */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400 mb-1">
            <span>Weekly Study</span>
            <Clock className="w-4 h-4 text-gray-600 dark:text-slate-300" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            29.9 <span className="text-xs font-normal text-gray-500">Hours</span>
          </div>
        </div>

        {/* Completed Concepts */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400 mb-1">
            <span>Concepts Mastered</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            148
          </div>
        </div>

      </div>

      {/* Middle Row: Subject Mastery & Weekly Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Subject Mastery (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl p-5 border border-gray-200 dark:border-slate-800 shadow-xs">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
            Subject Mastery
          </h3>

          <div className="space-y-3.5">
            {masteries.map((m, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-gray-800 dark:text-slate-200">{m.subject}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-400">{m.tasksDone}/{m.totalTasks} modules</span>
                    <span className="font-mono font-bold text-gray-900 dark:text-white">{m.percentage}%</span>
                  </div>
                </div>

                <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${m.color} transition-all duration-300`}
                    style={{ width: `${m.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl p-5 border border-gray-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-sm font-bold text-gray-900 dark:text-white mb-4">
              <span>Weekly Activity</span>
              <Calendar className="w-4 h-4 text-gray-400" />
            </div>

            <div className="flex items-end justify-between gap-2 h-36 pt-2 pb-1">
              {weeklyData.map((d, idx) => {
                const maxH = 6.5;
                const heightPct = Math.round((d.hours / maxH) * 100);
                const isHighlight = d.day === 'Sat' || d.day === 'Thu';
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-t-md h-28 flex items-end p-0.5">
                      <div
                        className={`w-full rounded-t-sm transition-all ${
                          isHighlight ? 'bg-slate-900 dark:bg-white' : 'bg-gray-300 dark:bg-slate-600'
                        }`}
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-gray-500 dark:text-slate-400">
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 dark:border-slate-800 text-[11px] text-gray-500 dark:text-slate-400 flex items-center justify-between">
            <span>Goal: 25h/week</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono">119.6% reached</span>
          </div>
        </div>

      </div>

      {/* Bottom Row: Review Queue & Pomodoro Timer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Spaced Review Queue (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl p-5 border border-gray-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-3 text-xs">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Spaced Repetition Due Queue
            </h3>
            <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 text-[11px]">
              {reviewQueue.filter(r => !r.completed).length} Due
            </span>
          </div>

          <div className="space-y-2">
            {reviewQueue.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-lg border text-xs flex items-center justify-between gap-3 transition-colors ${
                  item.completed
                    ? 'bg-gray-50 dark:bg-slate-850/50 border-gray-200 dark:border-slate-800 text-gray-400'
                    : 'bg-white dark:bg-slate-850 border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-200'
                }`}
              >
                <div className="flex-1">
                  <div className={item.completed ? 'line-through text-gray-400' : 'font-medium text-gray-900 dark:text-white'}>
                    {item.title}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {item.subject} · {item.interval}
                  </div>
                </div>

                <button
                  onClick={() => markCardReviewed(item.id)}
                  disabled={item.completed}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors flex items-center gap-1 ${
                    item.completed
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400'
                      : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900'
                  }`}
                >
                  {item.completed ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Reviewed</span>
                    </>
                  ) : (
                    <span>Review</span>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Focus Timer (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl p-5 border border-gray-200 dark:border-slate-800 shadow-xs flex flex-col justify-between text-center">
          <div>
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-gray-900 dark:text-white text-sm">Focus Timer</span>
              <div className="flex gap-1 bg-gray-100 dark:bg-slate-800 p-0.5 rounded-md">
                <button
                  onClick={() => resetTimer('focus')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    timerType === 'focus' ? 'bg-white dark:bg-slate-900 text-gray-900 dark:text-white shadow-xs font-semibold' : 'text-gray-500'
                  }`}
                >
                  25m
                </button>
                <button
                  onClick={() => resetTimer('break')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    timerType === 'break' ? 'bg-white dark:bg-slate-900 text-gray-900 dark:text-white shadow-xs font-semibold' : 'text-gray-500'
                  }`}
                >
                  5m
                </button>
              </div>
            </div>

            <div className="my-5">
              <div className="text-4xl font-extrabold font-mono text-gray-900 dark:text-white">
                {formatTimerTime(timerSeconds)}
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                {isTimerRunning ? 'Session In Progress' : 'Paused'}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 pt-3 border-t border-gray-100 dark:border-slate-800">
            <button
              onClick={toggleTimer}
              className="px-5 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 shadow-xs flex items-center gap-1.5 transition-colors"
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isTimerRunning ? 'Pause' : 'Start Focus'}</span>
            </button>

            <button
              onClick={() => resetTimer(timerType)}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-slate-800 transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
