import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Brain, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  RotateCcw
} from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatInterfaceProps {
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

export default function ChatInterface({ initialPrompt, onClearInitialPrompt }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `### Hello! I am your NovaLearn Study Companion.

I can help break down complex subjects, derive formulas, review homework problems, or test your understanding through guided questions.

**Popular topics right now:**
* Quantum Superposition & Qubits
* Dynamic Programming & Memoization
* Bayes' Theorem & Conditional Probability
* Cellular Respiration & Krebs Cycle

What would you like to work on?`,
      timestamp: 'Just now',
      subject: 'STEM',
      mode: 'Socratic Tutor',
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('Computer Science');
  const [mode, setMode] = useState('Socratic Tutor');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const subjects = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Biology & Chemistry',
    'Economics',
    'Law & Humanities',
  ];

  const modes = [
    'Socratic Tutor',
    'Quick Explainer',
    'Exam Prep Drill',
    'Simple Analogies',
  ];

  const starterPrompts = [
    'Explain Quantum Superposition simply',
    'Derive Bayes Theorem with an intuitive example',
    'Explain 0/1 Knapsack Dynamic Programming',
    'What are the rate-limiting steps of the Krebs Cycle?',
  ];

  useEffect(() => {
    if (initialPrompt) {
      setInput(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt, onClearInitialPrompt]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      return;
    }
    const cleanText = text.replace(/[#*`_$\\]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText.slice(0, 300));
    utterance.rate = 1.05;
    speechSynthesis.speak(utterance);
  };

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      subject,
      mode,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          subject,
          mode,
          history: newMessages.slice(-6),
        }),
      });

      if (!response.ok) throw new Error('Network error');
      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        subject,
        mode,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (audioEnabled) {
        handleSpeak(data.reply);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: 'assistant',
          content: `### 💡 Study Note on: ${userMessage.content}\n\nHere is a simple first-principles breakdown:\n\n1. **Core Concept:** At the foundation, this topic depends on understanding how the key variables behave under boundary conditions.\n2. **Intuitive Mental Model:** Picture the system as an equilibrium state. Changes in one factor cause predictable responses in the rest of the system.\n3. **Key Takeaway:** Always check extreme values (0, infinity, negative limits) to confirm your logic.\n\n*Would you like to practice a quick question on this?*`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          subject,
          mode,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: `### Chat Reset\n\nReady for your next topic in **${subject}**! Ask anything below.`,
        timestamp: 'Just now',
        subject,
        mode,
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      
      {/* Container Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-xs flex flex-col h-[700px] overflow-hidden">
        
        {/* Minimal Controls Bar */}
        <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          
          <div className="flex items-center gap-2">
            <span className="text-gray-500 dark:text-slate-400">Subject:</span>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-md px-2 py-1 font-medium text-gray-800 dark:text-slate-200 focus:outline-none"
            >
              {subjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500 dark:text-slate-400">Mode:</span>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-md px-2 py-1 font-medium text-gray-800 dark:text-slate-200 focus:outline-none"
            >
              {modes.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`p-1.5 rounded-md border text-xs transition-colors ${
                audioEnabled 
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-slate-900 border-transparent' 
                  : 'text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-white border-gray-200 dark:border-slate-700'
              }`}
              title={audioEnabled ? 'Voice readouts enabled' : 'Turn on voice readouts'}
            >
              {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={handleClear}
              className="p-1.5 rounded-md border border-gray-200 dark:border-slate-700 text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-white transition-colors"
              title="Clear chat"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Question Chips */}
        <div className="px-4 py-2 border-b border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-[11px] text-gray-400 shrink-0">Try asking:</span>
          {starterPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="whitespace-nowrap px-2.5 py-1 rounded-md bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 text-[11px] transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => {
            const isAI = msg.role === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isAI ? 'items-start' : 'items-start flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-semibold shrink-0 ${
                    isAI
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300'
                  }`}
                >
                  {isAI ? <Brain className="w-3.5 h-3.5" /> : 'You'}
                </div>

                {/* Message Body */}
                <div className={`max-w-2xl flex flex-col ${isAI ? 'items-start' : 'items-end'}`}>
                  <div className="text-[10px] text-gray-400 mb-1 px-1">
                    {isAI ? 'NovaLearn AI' : 'Student'} · {msg.timestamp}
                  </div>

                  <div
                    className={`rounded-xl p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed ${
                      isAI
                        ? 'bg-gray-50 dark:bg-slate-800/80 text-gray-800 dark:text-slate-200 border border-gray-200/80 dark:border-slate-700'
                        : 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 rounded-tr-none'
                    }`}
                  >
                    <div className="space-y-2.5">
                      {msg.content.split('\n\n').map((paragraph, pIdx) => {
                        if (paragraph.startsWith('### ')) {
                          return (
                            <h4 key={pIdx} className="font-bold text-sm sm:text-base mt-1 mb-1">
                              {paragraph.replace('### ', '')}
                            </h4>
                          );
                        }
                        if (paragraph.startsWith('```')) {
                          const code = paragraph.replace(/```[a-z]*\n?/g, '').trim();
                          return (
                            <div key={pIdx} className="my-2 rounded-lg bg-gray-900 text-emerald-400 p-3 font-mono text-xs overflow-x-auto">
                              <pre className="m-0">{code}</pre>
                            </div>
                          );
                        }
                        if (paragraph.includes('\n* ') || paragraph.startsWith('* ')) {
                          const lines = paragraph.split('\n').filter(Boolean);
                          return (
                            <ul key={pIdx} className="list-disc pl-5 space-y-1">
                              {lines.map((l, lIdx) => (
                                <li key={lIdx}>{l.replace(/^\*\s*/, '')}</li>
                              ))}
                            </ul>
                          );
                        }
                        return <p key={pIdx}>{paragraph}</p>;
                      })}
                    </div>

                    {isAI && (
                      <div className="flex items-center gap-3 mt-3 pt-2 border-t border-gray-200/60 dark:border-slate-700 text-[11px] text-gray-500 dark:text-slate-400">
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="flex items-center gap-1 hover:text-gray-800 dark:hover:text-white transition-colors"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-600">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleSpeak(msg.content)}
                          className="flex items-center gap-1 hover:text-gray-800 dark:hover:text-white transition-colors"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Audio</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400 p-2">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Thinking step-by-step...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Minimal Input Bar */}
        <div className="p-3 border-t border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/60">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask a question in ${subject}...`}
              className="flex-1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-xs sm:text-sm rounded-lg px-3.5 py-2.5 border border-gray-300 dark:border-slate-700 focus:outline-none focus:border-gray-500 shadow-2xs"
              disabled={loading}
            />

            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-xs font-semibold flex items-center gap-1.5 shadow-xs disabled:opacity-40 transition-colors"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
