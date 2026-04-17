'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Pencil, Eye, EyeOff, ChevronDown, ChevronUp,
  CheckCircle2, Lightbulb, Brain,
} from 'lucide-react';
import { getPracticeQuestions, type PracticeQuestion } from '@/data/practiceData';

// ─── Single Practice Card ────────────────────────────────────────────────────
function PracticeCard({
  q,
  index,
}: {
  q: PracticeQuestion;
  index: number;
}) {
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const hasTyped = userAnswer.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Question header */}
      <div className="flex items-start gap-3 p-5 pb-4">
        <span className="flex-shrink-0 w-7 h-7 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
          {index + 1}
        </span>
        <p className="text-slate-900 dark:text-slate-100 font-semibold text-sm sm:text-base leading-relaxed flex-1">
          {q.question}
        </p>
      </div>

      <div className="px-5 pb-5 space-y-3">
        {/* Hint toggle */}
        <button
          onClick={() => setShowHint((p) => !p)}
          className="flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors"
        >
          <Lightbulb className="w-3.5 h-3.5" />
          {showHint ? 'Hide hint' : 'Need a hint?'}
        </button>

        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200/60 dark:border-amber-400/20 text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                <Lightbulb className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                {q.hint}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User answer textarea */}
        <div className="relative">
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Write your answer here… (explaining in your own words is the best practice)"
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 text-sm leading-relaxed placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 resize-y transition-all"
          />
          {hasTyped && (
            <CheckCircle2 className="absolute right-3 bottom-3 w-4 h-4 text-emerald-500 opacity-70" />
          )}
        </div>

        {/* Show Answer button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAnswer((p) => !p)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
              showAnswer
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/25'
                : 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border-indigo-300/60 dark:border-indigo-400/30 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:border-indigo-500/50'
            }`}
          >
            {showAnswer ? (
              <><EyeOff className="w-3.5 h-3.5" /> Hide Answer</>
            ) : (
              <><Eye className="w-3.5 h-3.5" /> Show Answer</>
            )}
          </button>

          {hasTyped && !showAnswer && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium animate-pulse">
              ✓ Answer saved
            </span>
          )}
        </div>

        {/* Model answer */}
        <AnimatePresence>
          {showAnswer && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-3 pt-1">
                {/* Model answer */}
                <div className="rounded-xl border border-emerald-200/70 dark:border-emerald-400/20 bg-emerald-50/70 dark:bg-emerald-500/10 p-4">
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
                    ✅ Model Answer
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {q.answer}
                  </p>
                </div>

                {/* Check yourself */}
                <div className="rounded-xl border border-indigo-200/60 dark:border-indigo-400/20 bg-indigo-50/60 dark:bg-indigo-500/10 p-4">
                  <p className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Brain className="w-3.5 h-3.5" />
                    Check Yourself
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                    {q.checkYourself}
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

// ─── Practice Section ─────────────────────────────────────────────────────────
interface PracticeSectionProps {
  topicSlug: string;
}

export default function PracticeSection({ topicSlug }: PracticeSectionProps) {
  const questions = getPracticeQuestions(topicSlug);
  const [isOpen, setIsOpen] = useState(false);

  if (questions.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-violet-200/70 dark:border-violet-400/15 bg-gradient-to-br from-violet-50/60 to-white dark:from-violet-950/30 dark:to-slate-900/60 backdrop-blur-sm overflow-hidden shadow-sm"
    >
      {/* Section header — click to expand */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="w-full flex items-center justify-between gap-3 p-6 sm:p-8 text-left hover:bg-violet-50/50 dark:hover:bg-violet-500/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <Pencil className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Practice Now
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {questions.length} concept questions · Write answers in your own words
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 text-xs font-bold">
            {questions.length} Q
          </span>
          <div className={`p-1.5 rounded-xl bg-slate-100 dark:bg-white/10 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          </div>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-8 pb-8 space-y-4 border-t border-violet-200/50 dark:border-violet-400/10 pt-6">
              {/* Instruction banner */}
              <div className="flex items-start gap-2 p-3 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-700 dark:text-slate-300">How to use: </strong>
                  Write your answer first, then reveal the model answer to compare. 
                  Use "Check Yourself" to see if your answer covers the key points. 
                  Your answers are stored while you browse (session-only).
                </span>
              </div>

              {/* Question cards */}
              <div className="space-y-4">
                {questions.map((q, i) => (
                  <PracticeCard key={q.id} q={q} index={i} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
