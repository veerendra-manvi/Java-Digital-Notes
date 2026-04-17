'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Target, BookMarked, Filter, Search } from 'lucide-react';
import { topics } from '@/data/topics';
import { useBookmarks } from '@/hooks/useBookmarks';

const difficultyOrder = ['beginner', 'intermediate', 'tricky'] as const;
const typeTabs = ['all', 'conceptual', 'output', 'difference', 'scenario'] as const;

type Difficulty = typeof difficultyOrder[number];
type TabType = typeof typeTabs[number];

const diffBadge: Record<string, string> = {
  beginner:     'text-emerald-600 bg-emerald-500/10 border-emerald-500/20',
  intermediate: 'text-amber-600   bg-amber-500/10   border-amber-500/20',
  tricky:       'text-rose-600    bg-rose-500/10    border-rose-500/20',
};

// Aggregate all questions from all topics
const allQuestions = topics.flatMap((t) =>
  t.interviewQuestions.map((q) => ({ ...q, topicId: t.id, topicTitle: t.title, topicSlug: t.slug, topicIcon: t.icon }))
);

export default function InterviewPage() {
  const [search, setSearch] = useState('');
  const [activeTopic, setActiveTopic] = useState('all');
  const [activeType, setActiveType] = useState<TabType>('all');
  const [activeDiff, setActiveDiff] = useState<Difficulty | 'all'>('all');
  const { addBookmark, isBookmarked } = useBookmarks();
  const [saved, setSaved] = useState<string[]>([]);

  const filtered = allQuestions.filter((q) => {
    const matchTopic = activeTopic === 'all' || q.topicId === activeTopic;
    const matchType  = activeType  === 'all' || q.type === activeType;
    const matchDiff  = activeDiff  === 'all' || q.difficulty === activeDiff;
    const matchSearch = search === '' || q.question.toLowerCase().includes(search.toLowerCase());
    return matchTopic && matchType && matchDiff && matchSearch;
  });

  const handleBookmark = (q: typeof allQuestions[0]) => {
    addBookmark({ topicId: q.topicId, topicTitle: q.topicTitle, questionText: q.question });
    setSaved((p) => [...p, q.question]);
  };

  return (
    <div className="app-page max-w-5xl section-gap">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="app-surface p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg">
            <Target className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">Interview Preparation</h1>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-7">
          {allQuestions.length} Core Java interview questions — organized by topic, difficulty, and type.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="app-surface space-y-3 p-4 sm:p-5">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-950/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            {/* Topic filter */}
            <select
              value={activeTopic}
              onChange={(e) => setActiveTopic(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            >
              <option value="all">All Topics</option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>{t.icon} {t.title}</option>
              ))}
            </select>

            {/* Type filter */}
            {typeTabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border capitalize transition-all ${activeType === t ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-indigo-400/50'}`}
              >
                {t}
              </button>
            ))}

            {/* Difficulty filter */}
            {(['all', ...difficultyOrder] as const).map((d) => (
              <button
                key={d}
                onClick={() => setActiveDiff(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border capitalize transition-all ${activeDiff === d ? 'bg-rose-600 text-white border-rose-600' : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-rose-400/50'}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Results count */}
      <div className="text-sm text-slate-500 dark:text-slate-400">
        Showing <span className="font-bold text-slate-700 dark:text-slate-300">{filtered.length}</span> questions
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {filtered.map((q, i) => {
          const bmkd = isBookmarked(q.topicId, q.question) || saved.includes(q.question);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.4) }}
              className="app-surface rounded-2xl overflow-hidden"
            >
              {/* Question header */}
              <div className="flex items-start justify-between gap-3 p-5 pb-3">
                <div className="flex items-start gap-3 flex-1">
                  <Link href={`/topics/${q.topicSlug}`} className="text-xl flex-shrink-0 hover:scale-110 transition-transform">
                    {q.topicIcon}
                  </Link>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <Link
                        href={`/topics/${q.topicSlug}`}
                        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        {q.topicTitle}
                      </Link>
                      <span className={`px-2 py-0.5 rounded-full text-xs border font-semibold ${diffBadge[q.difficulty]}`}>{q.difficulty}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 capitalize">{q.type}</span>
                    </div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm whitespace-pre-line">{q.question}</p>
                  </div>
                </div>
                <button
                  onClick={() => !bmkd && handleBookmark(q)}
                  className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${bmkd ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600 hover:text-amber-400'}`}
                  title={bmkd ? 'Bookmarked' : 'Bookmark question'}
                >
                  <BookMarked className="w-4 h-4" />
                </button>
              </div>

              {/* Answer */}
              <div className="px-5 pb-5 pt-1">
                <div className="good-answer">
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">{q.answer}</p>
                </div>
              </div>
            </motion.div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-14 text-slate-400">
            <Target className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>No questions match your filters.</p>
            <button onClick={() => { setSearch(''); setActiveTopic('all'); setActiveType('all'); setActiveDiff('all'); }}
              className="mt-2 text-xs text-indigo-500 hover:underline">Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
