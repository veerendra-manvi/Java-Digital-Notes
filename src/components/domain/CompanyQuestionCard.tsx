'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, 
  CheckCircle, 
  Bookmark, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  EyeOff,
  Star,
  Sparkles,
  RotateCcw,
  MessageSquare,
  Loader2
} from 'lucide-react';

interface CompanyQuestion {
  id: string;
  question: string;
  modelAnswer: string;
  hints: string[];
  category: string;
  difficulty: string;
  isFresher: boolean;
}

const STORAGE_KEYS = {
  DONE: 'jdn_questions_done',
  SAVED: 'jdn_questions_saved',
  DRAFTS: 'jdn_question_drafts'
};

export function CompanyQuestionCard({ q }: { q: CompanyQuestion }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeHint, setActiveHint] = useState<number | null>(null);
  const [isDone, setIsDone] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<{
    hint?: string;
    improvedAnswer?: string;
    keyPoints?: string[];
  } | null>(null);
  const [aiMode, setAiMode] = useState<'hint' | 'improvement' | null>(null);

  // Sync with localStorage
  useEffect(() => {
    const done = JSON.parse(localStorage.getItem(STORAGE_KEYS.DONE) || '[]');
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED) || '[]');
    setIsDone(done.includes(q.id));
    setIsSaved(saved.includes(q.id));
    
    // Optional: Load previous answer if we want persistence for draft answers
    const drafts = JSON.parse(localStorage.getItem(STORAGE_KEYS.DRAFTS) || '{}');
    if (drafts[q.id]) setUserAnswer(drafts[q.id]);
  }, [q.id]);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setUserAnswer(val);
    const drafts = JSON.parse(localStorage.getItem(STORAGE_KEYS.DRAFTS) || '{}');
    drafts[q.id] = val;
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
  };

  const toggleDone = () => {
    const done = JSON.parse(localStorage.getItem(STORAGE_KEYS.DONE) || '[]');
    const next = isDone ? done.filter((id: string) => id !== q.id) : [...done, q.id];
    localStorage.setItem(STORAGE_KEYS.DONE, JSON.stringify(next));
    setIsDone(!isDone);
  };

  const toggleSaved = () => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED) || '[]');
    const next = isSaved ? saved.filter((id: string) => id !== q.id) : [...saved, q.id];
    localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(next));
    setIsSaved(!isSaved);
  };

  const getAiFeedback = async (mode: 'hint' | 'improvement') => {
    if (isAiLoading) return;
    setIsAiLoading(true);
    setAiMode(mode);
    
    try {
      const res = await fetch('/api/ai/hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q.question,
          userAnswer: mode === 'improvement' ? userAnswer : undefined
        }),
      });
      
      const data = await res.json();
      setAiFeedback(data);
    } catch (error) {
      console.error('Failed to get AI feedback:', error);
      setAiFeedback({
        hint: "AI service is currently unavailable. Try focusing on the core logic!",
        improvedAnswer: "Sorry, I couldn't generate an improvement right now.",
        keyPoints: ["Read carefully", "Think modular"]
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  const difficultyStyles: Record<string, string> = {
    easy: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    medium: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    hard: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`app-surface border-l-4 transition-all overflow-hidden ${isDone ? 'border-l-emerald-500' : 'border-l-slate-200 dark:border-l-white/10'}`}
    >
      <div className="p-6">
        {/* Header Tags & Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${difficultyStyles[q.difficulty] || difficultyStyles.medium}`}>
            {q.difficulty}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400">
            {q.category}
          </span>
          
          <AnimatePresence>
            {isDone && (
              <motion.span 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white flex items-center gap-1"
              >
                <CheckCircle className="w-3 h-3" /> Completed
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Question Text */}
        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6 leading-relaxed">
          {q.question}
        </h4>

        {/* Practice Input Component */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
            Your Draft Answer
          </label>
          <textarea
            value={userAnswer}
            onChange={handleAnswerChange}
            placeholder="Type your answer here to practice..."
            className="w-full h-32 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/30 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-mono text-sm resize-none"
          />
        </div>

        {/* Hints Section */}
        {q.hints && q.hints.length > 0 && (
          <div className="mb-6 space-y-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveHint(activeHint === null ? 0 : null)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold border transition-all ${activeHint !== null ? 'bg-amber-500 border-amber-500 text-white' : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-amber-400'}`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                {activeHint !== null ? 'Hide Hint' : 'Show Hint'}
              </button>
              
              {activeHint !== null && q.hints.length > 1 && (
                <div className="flex gap-1">
                  {q.hints.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveHint(idx)}
                      className={`w-6 h-6 rounded-md text-[10px] font-bold border transition-all ${activeHint === idx ? 'bg-amber-500 text-white border-amber-500' : 'border-slate-200 dark:border-white/10 text-slate-500 hover:border-amber-400'}`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <AnimatePresence>
              {activeHint !== null && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-amber-50 dark:bg-amber-500/5 rounded-xl border border-amber-200/50 dark:border-amber-500/20 text-sm text-amber-900 dark:text-amber-200 italic leading-relaxed">
                    {q.hints[activeHint]}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* System Controls */}
        <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-200 dark:border-white/5">
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${showAnswer ? 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-200' : 'btn-gradient'}`}
          >
            {showAnswer ? <><EyeOff className="w-4 h-4" /> Hide Answer</> : <><Eye className="w-4 h-4" /> Reveal Answer</>}
          </button>

          <button
            onClick={toggleDone}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border transition-all ${isDone ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600' : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-emerald-500/50'}`}
          >
            <CheckCircle className={`w-4 h-4 ${isDone ? 'fill-current' : ''}`} />
            {isDone ? 'Done' : 'Mark as Done'}
          </button>

          <button
            onClick={toggleSaved}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border transition-all ${isSaved ? 'bg-amber-500/10 border-amber-500/30 text-amber-600' : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-amber-500/50'}`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            {isSaved ? 'Saved' : 'Save Question'}
          </button>

          {/* AI Buttons */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => getAiFeedback('hint')}
              disabled={isAiLoading}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all disabled:opacity-50"
            >
              {isAiLoading && aiMode === 'hint' ? (
                <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Thinking...</>
              ) : (
                <><Sparkles className="w-3.5 h-3.5" /> Get AI Hint</>
              )}
            </button>
            <button
              onClick={() => getAiFeedback('improvement')}
              disabled={isAiLoading || !userAnswer.trim()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-purple-500/10 text-purple-500 border border-purple-500/20 hover:bg-purple-500/20 transition-all disabled:opacity-50"
              title={!userAnswer.trim() ? "Type an answer first to get improvements" : ""}
            >
              {isAiLoading && aiMode === 'improvement' ? (
                <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Thinking...</>
              ) : (
                <><MessageSquare className="w-3.5 h-3.5" /> Improve My Answer</>
              )}
            </button>
          </div>
        </div>

        {/* AI Feedback Display */}
        <AnimatePresence>
          {aiFeedback && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-6 p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 relative">
                <button 
                  onClick={() => setAiFeedback(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">AI Interview Coach Feedback</span>
                </div>

                {aiFeedback.hint && (
                  <div className="mb-4">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-1">AI Hint</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400 italic">"{aiFeedback.hint}"</p>
                  </div>
                )}

                {aiFeedback.improvedAnswer && aiMode === 'improvement' && (
                  <div className="mb-4">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Suggested Improvement</h5>
                    <div className="p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-indigo-500/10 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {aiFeedback.improvedAnswer}
                    </div>
                  </div>
                )}

                {aiFeedback.keyPoints && aiFeedback.keyPoints.length > 0 && (
                  <div>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Key Points to Mention</h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {aiFeedback.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Answer Content */}
        <AnimatePresence>
          {showAnswer && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-6">
                <div className="good-answer">
                  <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Model Answer
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                    {q.modelAnswer}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
