'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ChevronLeft, ChevronRight, Shuffle } from 'lucide-react';
import { topics } from '@/data/topics';

// Build flashcard data from all subtopics
const allFlashcards = topics.flatMap((t) =>
  t.subtopics.map((s) => ({
    topicTitle: t.title,
    topicSlug: t.slug,
    topicIcon: t.icon,
    gradient: t.gradient,
    front: s.title,
    back: s.oneLineRevision,
    definition: s.definition,
    interviewTip: s.interviewLanguage,
  }))
);

// One-liners list (all subtopics)
const oneLiners = topics.flatMap((t) =>
  t.subtopics.map((s) => ({
    topicTitle: t.title,
    topicSlug: t.slug,
    topicIcon: t.icon,
    gradient: t.gradient,
    title: s.title,
    line: s.oneLineRevision,
  }))
);

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function FlashcardView() {
  const [cards, setCards] = useState(allFlashcards);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [dir, setDir] = useState(1);

  const card = cards[index];

  const go = (d: 1 | -1) => {
    setDir(d);
    setFlipped(false);
    setIndex((p) => Math.max(0, Math.min(cards.length - 1, p + d)));
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Progress */}
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
          <span>Card {index + 1} of {cards.length}</span>
          <button onClick={() => { setCards(shuffle(allFlashcards)); setIndex(0); setFlipped(false); }}
            className="flex items-center gap-1.5 text-indigo-500 hover:underline">
            <Shuffle className="w-3 h-3" /> Shuffle
          </button>
        </div>
        <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${((index + 1) / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index + (flipped ? '-b' : '-f')}
          initial={{ opacity: 0, x: dir * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -40 }}
          transition={{ duration: 0.22 }}
          onClick={() => setFlipped((v) => !v)}
          className={`w-full max-w-lg min-h-[260px] cursor-pointer rounded-3xl p-8 flex flex-col justify-between shadow-2xl transition-all hover:-translate-y-0.5
            ${flipped
              ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white'
              : 'app-surface'
            }`}
        >
          {!flipped ? (
            <>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{card.topicIcon}</span>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">{card.topicTitle}</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{card.front}</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-auto">Tap to reveal →</p>
            </>
          ) : (
            <>
              <div className="text-xs font-semibold text-white/60 mb-4">One-Line Revision</div>
              <p className="text-lg font-bold text-white leading-relaxed flex-1">{card.back}</p>
              <p className="text-xs text-white/60 mt-4 pt-3 border-t border-white/10 leading-relaxed">{card.definition}</p>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <button onClick={() => go(-1)} disabled={index === 0}
          className="w-11 h-11 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:border-indigo-500/40 hover:text-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm text-slate-400 font-mono">{index + 1} / {cards.length}</span>
        <button onClick={() => go(1)} disabled={index === cards.length - 1}
          className="w-11 h-11 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:border-indigo-500/40 hover:text-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function OneLinersView() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? oneLiners : oneLiners.filter((l) => l.topicSlug === filter);

  return (
    <div>
      <div className="flex items-center gap-2 flex-wrap mb-6">
        <button onClick={() => setFilter('all')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${filter === 'all' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400'}`}>All</button>
        {topics.map((t) => (
          <button key={t.id} onClick={() => setFilter(t.slug)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${filter === t.slug ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400'}`}>
            {t.icon} {t.title}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((l, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="app-surface rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">{l.topicIcon}</span>
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">{l.topicTitle}</span>
            </div>
            <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">{l.title}</p>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{l.line}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function RevisionPage() {
  const [tab, setTab] = useState<'flashcards' | 'oneliners'>('flashcards');

  return (
    <div className="app-page max-w-4xl section-gap">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="app-surface p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
            <RotateCcw className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">Quick Revision</h1>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-7">
          Flashcards and one-line notes — perfect for last-minute interview prep.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="app-surface flex gap-2 p-2 w-fit">
        {([['flashcards', '🃏 Flashcards'], ['oneliners', '⚡ One-Liners']] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${tab === id ? 'btn-gradient shadow-md shadow-indigo-500/20' : 'btn-soft text-slate-600 dark:text-slate-300'}`}>
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'flashcards' ? (
          <motion.div key="fc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FlashcardView />
          </motion.div>
        ) : (
          <motion.div key="ol" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <OneLinersView />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
