import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Award, 
  Lightbulb,
  Sparkles
} from 'lucide-react';
import { QuizQuestion } from '../types';

export default function QuizGenerator() {
  const [topic, setTopic] = useState('Data Structures & Algorithms');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [count, setCount] = useState(4);
  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: 'q1',
      question: 'What is the primary cause of the Vanishing Gradient problem during backpropagation in deep neural networks?',
      options: [
        'The loss function oscillates without converging',
        'Early layers learn exceedingly slowly because gradients diminish exponentially through repeated multiplication',
        'Weights explode to infinity, causing numerical overflow',
        'The model immediately overfits to the training batch'
      ],
      correctIndex: 1,
      hint: 'Think about multiplying several small fractional numbers according to the chain rule.',
      explanation: 'Repeatedly multiplying derivatives < 1 through deep layers causes the backpropagated gradient to vanish near the input layers, halting weight updates.',
      concept: 'Backpropagation'
    },
    {
      id: 'q2',
      question: 'Which of the following activation functions mitigates the vanishing gradient problem for positive inputs?',
      options: [
        'Standard Sigmoid',
        'Hyperbolic Tangent (Tanh)',
        'Rectified Linear Unit (ReLU)',
        'Softmax'
      ],
      correctIndex: 2,
      hint: 'Its derivative is a constant 1 for positive values of x.',
      explanation: 'ReLU has a constant gradient of 1 for x > 0, preventing attenuation as gradients propagate through layers.',
      concept: 'Activation Functions'
    },
    {
      id: 'q3',
      question: 'What is the primary trade-off addressed by L2 Regularization (Weight Decay)?',
      options: [
        'Accepting slightly higher training bias for substantially lower testing variance',
        'Eliminating the need for a validation dataset',
        'Increasing runtime complexity',
        'Forcing all non-essential weights strictly to zero'
      ],
      correctIndex: 0,
      hint: 'L2 penalizes large weights, preventing overfitting to noise.',
      explanation: 'L2 adds the squared magnitude of weights to the loss, constraining model complexity to generalize better.',
      concept: 'Regularization'
    },
    {
      id: 'q4',
      question: 'In the Transformer architecture, why is the Self-Attention mechanism scaled by 1/sqrt(d_k)?',
      options: [
        'To prevent dot-product values from growing too large and pushing softmax into near-zero gradient regions',
        'To enforce orthogonality between Queries and Keys',
        'To reduce memory consumption of attention matrices by half',
        'To enable parallel computation across attention heads'
      ],
      correctIndex: 0,
      hint: 'For large vector dimensions d_k, the variance of the dot product equals d_k.',
      explanation: 'Scaling prevents the magnitude of the dot products from growing excessively large, keeping softmax gradients stable.',
      concept: 'Self-Attention'
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showHint, setShowHint] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = questions[currentIndex];
  const hasAnsweredCurrent = selectedAnswers[currentIndex] !== undefined;

  const handleSelectOption = (idx: number) => {
    if (hasAnsweredCurrent) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: idx }));
  };

  const handleNext = () => {
    setShowHint(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      const correctCount = questions.filter((q, i) => selectedAnswers[i] === q.correctIndex).length;
      const scorePct = (correctCount / questions.length) * 100;
      if (scorePct >= 75) {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#0f172a', '#334155', '#10b981', '#64748b']
        });
      }
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setShowHint(false);
    setQuizFinished(false);
  };

  const handleGenerateNewQuiz = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, count, difficulty }),
      });

      if (!res.ok) throw new Error('Failed to generate quiz');
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        handleRestart();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const correctCount = questions.filter((q, i) => selectedAnswers[i] === q.correctIndex).length;
  const scorePercent = Math.round((correctCount / questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto py-2">
      
      {/* Quiz Configuration Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-3.5 sm:p-4 mb-5 border border-gray-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] font-bold text-gray-500 dark:text-slate-400 mb-1 uppercase tracking-wider">
            Quiz Topic
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Organic Chemistry, Quantum Mechanics"
            className="w-full bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white text-xs rounded-md px-3 py-1.5 border border-gray-200 dark:border-slate-700 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 dark:text-slate-400 mb-1 uppercase tracking-wider">
              Level
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white text-xs rounded-md px-2.5 py-1.5 border border-gray-200 dark:border-slate-700 focus:outline-none"
            >
              <option value="Foundations">Foundations</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="self-end">
            <button
              onClick={handleGenerateNewQuiz}
              disabled={loading || !topic.trim()}
              className="px-3.5 py-1.5 rounded-md text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-40"
            >
              {loading ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>New Quiz</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Quiz Card */}
      {!quizFinished ? (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs">
          
          {/* Progress Header */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-gray-700 dark:text-slate-300">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span className="text-gray-300 dark:text-slate-600">·</span>
              <span className="text-gray-500 dark:text-slate-400">{currentQ?.concept}</span>
            </div>

            <button
              onClick={() => setShowHint(!showHint)}
              className="text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 font-medium"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
            </button>
          </div>

          {/* Hint Clue */}
          {showHint && (
            <div className="mb-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[10px] font-bold uppercase">Hint:</strong>
                {currentQ?.hint}
              </div>
            </div>
          )}

          {/* Question Text */}
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-relaxed mb-5">
            {currentQ?.question}
          </h3>

          {/* Options */}
          <div className="space-y-2.5 mb-5">
            {currentQ?.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentIndex] === optIdx;
              const isCorrect = optIdx === currentQ.correctIndex;
              
              let style = "bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-750 border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-200";
              
              if (hasAnsweredCurrent) {
                if (isCorrect) {
                  style = "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-medium";
                } else if (isSelected && !isCorrect) {
                  style = "bg-rose-50 dark:bg-rose-950/30 border-rose-400 text-rose-900 dark:text-rose-200";
                } else {
                  style = "bg-gray-50 dark:bg-slate-850 border-gray-200 dark:border-slate-800 text-gray-400 dark:text-slate-600 opacity-60";
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={hasAnsweredCurrent}
                  className={`w-full text-left p-3.5 rounded-lg border transition-colors flex items-start gap-3 text-xs sm:text-sm leading-relaxed ${style}`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 font-mono text-[11px] font-bold ${
                    hasAnsweredCurrent && isCorrect
                      ? 'bg-emerald-600 text-white'
                      : hasAnsweredCurrent && isSelected && !isCorrect
                      ? 'bg-rose-600 text-white'
                      : isSelected
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                      : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300'
                  }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </div>
                  <span className="flex-1">{option}</span>
                  {hasAnsweredCurrent && isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {hasAnsweredCurrent && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation revealed on answer */}
          {hasAnsweredCurrent && (
            <div className="p-3.5 rounded-lg bg-gray-50 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 text-xs text-gray-700 dark:text-slate-300 space-y-1 mb-5">
              <span className="font-bold text-gray-900 dark:text-white block text-[11px]">Explanation:</span>
              <p className="leading-relaxed">{currentQ?.explanation}</p>
            </div>
          )}

          {/* Next Button (NO BLUE!) */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-800">
            <span className="text-[11px] text-gray-400">
              {hasAnsweredCurrent ? 'Answer checked' : 'Select an answer to continue'}
            </span>

            <button
              onClick={handleNext}
              disabled={!hasAnsweredCurrent}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-40"
            >
              <span>{currentIndex < questions.length - 1 ? 'Next' : 'Show Score'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      ) : (
        /* Finished Card */
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-6 sm:p-8 text-center shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center mx-auto mb-3">
            <Award className="w-6 h-6" />
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            Quiz Completed!
          </h3>
          <p className="text-gray-500 dark:text-slate-400 text-xs mb-5">
            Topic: <strong className="text-gray-800 dark:text-slate-200">{topic}</strong>
          </p>

          <div className="grid grid-cols-3 gap-2.5 max-w-sm mx-auto mb-6 text-center">
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-2.5 border border-gray-100 dark:border-slate-800">
              <div className="text-[10px] text-gray-500">Score</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white font-mono">{scorePercent}%</div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-2.5 border border-gray-100 dark:border-slate-800">
              <div className="text-[10px] text-gray-500">Correct</div>
              <div className="text-xl font-bold text-emerald-600 font-mono">{correctCount}/{questions.length}</div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-2.5 border border-gray-100 dark:border-slate-800">
              <div className="text-[10px] text-gray-500">Status</div>
              <div className="text-sm font-bold text-gray-800 dark:text-slate-200 mt-1">
                {scorePercent >= 75 ? 'Pass' : 'Review'}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              onClick={handleRestart}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-700 dark:text-slate-300 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>

            <button
              onClick={handleGenerateNewQuiz}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>New Topic</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
