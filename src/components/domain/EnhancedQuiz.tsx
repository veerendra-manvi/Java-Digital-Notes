'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, RefreshCw, ChevronLeft, ChevronRight,
  CheckCircle2, XCircle, BarChart2, ListOrdered,
} from 'lucide-react';
import type { QuizQuestion } from '@/data/topics';

// ─── Types ────────────────────────────────────────────────────────────────────
type QuizMode = 'quiz' | 'submitted' | 'review';

// ─── Difficulty badge styles ──────────────────────────────────────────────────
const diffBadge: Record<string, string> = {
  easy:   'text-emerald-600 bg-emerald-500/10 border-emerald-500/20',
  medium: 'text-amber-600 bg-amber-500/10 border-amber-500/20',
  tricky: 'text-rose-600 bg-rose-500/10 border-rose-500/20',
};

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="px-6 sm:px-7 pt-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          Question {current} / {total}
        </span>
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
          {pct}% through
        </span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

// ─── Score display ────────────────────────────────────────────────────────────
function ScoreDisplay({
  correct,
  total,
}: {
  correct: number;
  total: number;
}) {
  const pct = Math.round((correct / total) * 100);
  const isPerfect = correct === total;
  const isGood = pct >= 60;

  const emoji = isPerfect ? '🏆' : isGood ? '👍' : '📚';
  const message = isPerfect
    ? 'Perfect score! You absolutely nailed it!'
    : isGood
    ? 'Great job! Review the ones you missed.'
    : 'Keep studying — every attempt builds you up!';

  const scoreColor = isPerfect
    ? 'text-emerald-500'
    : isGood
    ? 'text-amber-500'
    : 'text-rose-500';

  return (
    <div className="text-center py-6 px-4">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14 }}
      >
        <div className="text-5xl mb-3">{emoji}</div>
        <div className={`text-6xl font-black mb-2 ${scoreColor}`}>
          {correct}/{total}
        </div>
        <div
          className={`text-2xl font-extrabold mb-1 ${scoreColor}`}
        >
          {pct}%
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
          {message}
        </p>
      </motion.div>
    </div>
  );
}

// ─── Review card ─────────────────────────────────────────────────────────────
function ReviewCard({
  q,
  userAnswer,
  index,
}: {
  q: QuizQuestion;
  userAnswer: number | undefined;
  index: number;
}) {
  const isCorrect = userAnswer === q.answer;
  const notAnswered = userAnswer === undefined;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className={`rounded-2xl border p-5 ${
        notAnswered
          ? 'border-slate-200/70 dark:border-white/8 bg-white/60 dark:bg-white/3'
          : isCorrect
          ? 'border-emerald-400/40 bg-emerald-50/60 dark:bg-emerald-500/10'
          : 'border-rose-400/40 bg-rose-50/60 dark:bg-rose-500/10'
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        {isCorrect ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
        ) : notAnswered ? (
          <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex-shrink-0 mt-0.5" />
        ) : (
          <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
        )}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
            <span className="text-xs font-semibold text-slate-400">Q{index + 1}</span>
            {q.difficulty && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${diffBadge[q.difficulty]}`}>
                {q.difficulty}
              </span>
            )}
          </div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
            {q.question}
          </p>
        </div>
      </div>

      <div className="ml-8 space-y-1.5">
        {q.options.map((opt, oi) => {
          const isCorrectOpt = oi === q.answer;
          const isUserChoice = oi === userAnswer;
          let cls = 'text-slate-500 dark:text-slate-500';
          if (isCorrectOpt) cls = 'text-emerald-700 dark:text-emerald-400 font-semibold';
          if (isUserChoice && !isCorrectOpt) cls = 'text-rose-600 dark:text-rose-400 line-through';

          return (
            <div key={oi} className={`flex items-start gap-2 text-xs ${cls}`}>
              <span className="font-mono opacity-60 mt-0.5">
                {String.fromCharCode(65 + oi)}.
              </span>
              <span>{opt}</span>
              {isCorrectOpt && <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5 ml-1" />}
              {isUserChoice && !isCorrectOpt && <XCircle className="w-3 h-3 text-rose-500 flex-shrink-0 mt-0.5 ml-1" />}
            </div>
          );
        })}
      </div>

      <div className="ml-8 mt-3 text-xs text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-white/5 rounded-lg px-3 py-2 border border-slate-200/50 dark:border-white/8 leading-relaxed">
        💡 {q.explanation}
      </div>
    </motion.div>
  );
}

// ─── Main EnhancedQuiz ────────────────────────────────────────────────────────
interface EnhancedQuizProps {
  questions: QuizQuestion[] | undefined;
}

export default function EnhancedQuiz({ questions }: EnhancedQuizProps) {
  const [mode, setMode] = useState<QuizMode>('quiz');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  if (!questions || questions.length === 0) return null;

  const current = questions[currentIndex];
  const chosen = answers[current.id];
  const isLast = currentIndex === questions.length - 1;
  const allAnswered = questions.every((q) => answers[q.id] !== undefined);
  const correctCount = questions.filter((q) => answers[q.id] === q.answer).length;

  const handleSelect = (oi: number) => {
    if (mode !== 'quiz') return;
    setAnswers((prev) => ({ ...prev, [current.id]: oi }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex((p) => p + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((p) => p - 1);
  };

  const handleSubmit = () => {
    setMode('submitted');
    setCurrentIndex(0);
  };

  const handleRetry = () => {
    setAnswers({});
    setCurrentIndex(0);
    setMode('quiz');
  };

  // ── QUIZ MODE ─────────────────────────────────────────────────────────────
  if (mode === 'quiz') {
    return (
      <div className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/80 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 px-6 sm:px-7 py-4 border-b border-slate-200/70 dark:border-white/10 bg-slate-50/90 dark:bg-slate-800/70">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span className="font-bold text-slate-900 dark:text-slate-100">Topic Quiz</span>
          <span className="ml-auto text-xs font-medium text-slate-500 dark:text-slate-400">
            {Object.keys(answers).length}/{questions.length} answered
          </span>
        </div>

        {/* Progress */}
        <ProgressBar current={currentIndex + 1} total={questions.length} />

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            className="p-6 sm:p-7 space-y-5"
          >
            <div className="rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white/70 dark:bg-slate-950/40 p-5 sm:p-6">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-indigo-500 dark:text-indigo-400">
                  Q{currentIndex + 1} of {questions.length}
                </span>
                {current.difficulty && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${diffBadge[current.difficulty]}`}>
                    {current.difficulty}
                  </span>
                )}
              </div>

              <p className="font-semibold text-slate-900 dark:text-slate-100 mb-5 text-sm sm:text-base leading-relaxed">
                {current.question}
              </p>

              <div className="space-y-2">
                {current.options.map((opt, oi) => {
                  let cls =
                    'border-slate-200 dark:border-white/8 text-slate-700 dark:text-slate-300 hover:border-indigo-400/60 cursor-pointer hover:bg-indigo-500/5';
                  if (chosen === oi) {
                    cls = 'border-indigo-500 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 shadow-sm';
                  }
                  return (
                    <button
                      key={oi}
                      onClick={() => handleSelect(oi)}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm leading-relaxed transition-all ${cls}`}
                    >
                      <span className="font-mono mr-2 opacity-50">
                        {String.fromCharCode(65 + oi)}.
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-sm font-semibold text-slate-600 dark:text-slate-400 disabled:opacity-30 hover:border-indigo-400/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>

              {isLast ? (
                <button
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-indigo-500/20 transition-all"
                >
                  {allAnswered ? 'Submit Quiz →' : `Answer all (${Object.keys(answers).length}/${questions.length})`}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-indigo-500/40 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10 transition-all"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Jump dots */}
            <div className="flex items-center gap-1.5 justify-center flex-wrap">
              {questions.map((q, i) => {
                const done = answers[q.id] !== undefined;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === currentIndex
                        ? 'bg-indigo-600 scale-125'
                        : done
                        ? 'bg-indigo-300 dark:bg-indigo-600 hover:scale-110'
                        : 'bg-slate-200 dark:bg-slate-700 hover:scale-110'
                    }`}
                    title={`Q${i + 1}`}
                  />
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // ── SUBMITTED / RESULT MODE ───────────────────────────────────────────────
  if (mode === 'submitted') {
    return (
      <div className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/80 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-6 sm:px-7 py-4 border-b border-slate-200/70 dark:border-white/10 bg-slate-50/90 dark:bg-slate-800/70">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span className="font-bold text-slate-900 dark:text-slate-100">Quiz Results</span>
        </div>

        <div className="p-6 sm:p-7">
          <ScoreDisplay correct={correctCount} total={questions.length} />

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-3 mt-2 flex-wrap">
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
            >
              <RefreshCw className="w-4 h-4" /> Retry Quiz
            </button>
            <button
              onClick={() => setMode('review')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold hover:shadow-lg hover:shadow-indigo-500/20 transition-all"
            >
              <ListOrdered className="w-4 h-4" /> Review All Answers
            </button>
          </div>

          {/* Quick stats */}
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-400/20 p-3">
              <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">{correctCount}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5 font-medium">Correct</p>
            </div>
            <div className="rounded-2xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200/60 dark:border-rose-400/20 p-3">
              <p className="text-xl font-black text-rose-600 dark:text-rose-400">
                {questions.filter((q) => answers[q.id] !== undefined && answers[q.id] !== q.answer).length}
              </p>
              <p className="text-xs text-rose-600 dark:text-rose-400 mt-0.5 font-medium">Wrong</p>
            </div>
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/10 p-3">
              <p className="text-xl font-black text-slate-600 dark:text-slate-400">
                {questions.filter((q) => answers[q.id] === undefined).length}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Skipped</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── REVIEW MODE ────────────────────────────────────────────────────────────
  return (
    <div className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/80 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-6 sm:px-7 py-4 border-b border-slate-200/70 dark:border-white/10 bg-slate-50/90 dark:bg-slate-800/70">
        <BarChart2 className="w-5 h-5 text-indigo-500" />
        <span className="font-bold text-slate-900 dark:text-slate-100">Review Answers</span>
        <span className="ml-auto text-xs font-medium text-slate-500 dark:text-slate-400">
          {correctCount}/{questions.length} correct
        </span>
        <button
          onClick={() => setMode('submitted')}
          className="ml-2 text-xs text-indigo-500 hover:text-indigo-400 font-medium"
        >
          ← Back
        </button>
      </div>

      <div className="p-6 sm:p-7 space-y-4">
        {questions.map((q, i) => (
          <ReviewCard key={q.id} q={q} userAnswer={answers[q.id]} index={i} />
        ))}

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleRetry}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold hover:shadow-lg hover:shadow-indigo-500/20 transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
          <button
            onClick={() => setMode('submitted')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
          >
            ← Score Summary
          </button>
        </div>
      </div>
    </div>
  );
}
