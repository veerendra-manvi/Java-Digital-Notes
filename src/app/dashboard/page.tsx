'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import {
  Search, Clock, CheckCircle2, BookOpen, Filter,
  TrendingUp, Sparkles, UserPlus, Trash2, Code2,
} from 'lucide-react';
import { topics } from '@/data/topics';
import { useProgress } from '@/hooks/useProgress';
import { useUserContent, type UserTopic } from '@/hooks/useUserContent';
import AddContentModal from '@/components/domain/AddContentModal';

const categories = [
  { id: 'all', label: 'All Topics' },
  { id: 'basics', label: 'Basics' },
  { id: 'oop', label: 'OOP' },
  { id: 'advanced', label: 'Advanced' },
  { id: 'interview-critical', label: 'Interview Critical' },
];

const difficultyColor: Record<string, string> = {
  beginner: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  intermediate: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20',
  advanced: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20',
};

const categoryBadge: Record<string, string> = {
  basics: 'badge-basics',
  oop: 'badge-oop',
  advanced: 'badge-advanced',
  'interview-critical': 'badge-interview-critical',
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] } },
};

// ─── User-created topic card ──────────────────────────────────────────────────
function UserTopicCard({ topic, onDelete }: { topic: UserTopic; onDelete: (id: string) => void }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="group relative flex flex-col p-6 rounded-3xl border border-violet-200/60 dark:border-violet-400/20 bg-gradient-to-br from-violet-50/80 to-white dark:from-violet-950/30 dark:to-slate-900/60 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 overflow-hidden"
    >
      {/* Gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 to-indigo-600 opacity-70 group-hover:opacity-100 transition-opacity" />

      {/* User badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-500/20 border border-violet-200/60 dark:border-violet-400/20">
        <UserPlus className="w-3 h-3 text-violet-500" />
        <span className="text-xs font-bold text-violet-600 dark:text-violet-300">Custom</span>
      </div>

      {/* Icon + title */}
      <div className="flex items-start gap-4 mb-4 mt-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xl shadow-lg flex-shrink-0">
          📝
        </div>
        <div className="flex-1 min-w-0 pr-16">
          <h2 className="font-bold text-lg text-slate-900 dark:text-white leading-tight tracking-tight">
            {topic.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 italic">
            {topic.subtopicName}
          </p>
        </div>
      </div>

      {/* Explanation preview */}
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-7 mb-4 line-clamp-3">
        {topic.explanation}
      </p>

      {/* Code snippet indicator */}
      {topic.codeExample && (
        <div className="flex items-center gap-1.5 mb-4 px-3 py-1.5 rounded-xl bg-slate-900/10 dark:bg-slate-700/30 w-fit">
          <Code2 className="w-3 h-3 text-slate-500" />
          <span className="text-xs text-slate-500 font-mono">Code example included</span>
        </div>
      )}

      {/* Footer row */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-violet-200/40 dark:border-violet-400/10">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          {topic.interviewQuestion && (
            <span className="flex items-center gap-1">💬 Interview Q</span>
          )}
          {topic.quizQuestion && (
            <span className="flex items-center gap-1">🧠 Quiz Q</span>
          )}
        </div>
        <button
          onClick={() => onDelete(topic.id)}
          className="p-1.5 rounded-lg text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
          title="Delete this topic"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Dashboard Page ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { isCompleted, progressPercent } = useProgress();
  const { getTopics, removeTopic, hasUserContent } = useUserContent();

  const userTopics = getTopics();

  const filtered = topics.filter((t) => {
    const matchCat = activeCategory === 'all' || t.category === activeCategory;
    const matchSearch =
      search === '' ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const progress = progressPercent(topics.length);
  const completedCount = topics.filter((t) => isCompleted(t.id)).length;

  return (
    <div className="app-page section-gap">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="app-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-500/20 text-indigo-600 dark:text-indigo-300 bg-indigo-500/10">
            <Sparkles className="w-3.5 h-3.5" /> Curated Learning Path
          </span>
          {hasUserContent && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border border-violet-500/20 text-violet-600 dark:text-violet-300 bg-violet-500/10">
              <UserPlus className="w-3.5 h-3.5" /> {userTopics.length} Custom Topic{userTopics.length !== 1 ? 's' : ''} Added
            </span>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] tracking-tight font-black text-slate-900 dark:text-white mb-2 leading-tight">
          Java Topics Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-7 max-w-3xl">
          13 core Java topics with visual explanations, practical code examples, interview language, and revision-friendly learning flow.
          {hasUserContent && ' Plus your custom content below.'}
        </p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="app-surface p-5 sm:p-6"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-white">Your Learning Journey</span>
            <span className="ml-2 text-sm text-slate-600 dark:text-slate-300">{completedCount} of {topics.length} topics completed</span>
          </div>
          <span className="text-2xl font-black bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">{progress}%</span>
        </div>
        <div className="w-full h-3 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" /> {completedCount} completed
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
            <TrendingUp className="w-3.5 h-3.5" /> {topics.length - completedCount} remaining
          </span>
        </div>
      </motion.div>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="app-surface flex flex-col sm:flex-row gap-4 p-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="topic-search"
            type="text"
            placeholder="Search topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-950/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-sm"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                  : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Topic Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {filtered.map((topic) => {
          const done = isCompleted(topic.id);
          return (
            <motion.div key={topic.id} variants={itemVariants} whileHover={{ y: -6, scale: 1.02 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
              <Link
                href={`/topics/${topic.slug}`}
                className={`group relative flex flex-col p-6 rounded-3xl border transition-all duration-300 hover:shadow-2xl overflow-hidden
                  ${done
                    ? 'border-emerald-500/35 bg-gradient-to-br from-emerald-500/10 to-white/70 dark:from-emerald-500/15 dark:to-slate-900/60 hover:border-emerald-500/60 hover:shadow-emerald-500/20'
                    : 'border-slate-200/80 dark:border-white/10 bg-gradient-to-br from-white/90 to-slate-50/70 dark:from-slate-900/80 dark:to-slate-800/60 backdrop-blur-sm hover:border-indigo-500/45 hover:shadow-indigo-500/15'
                  }`}
              >
                {/* Completion badge */}
                {done && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>
                )}

                {/* Gradient top bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${topic.gradient} opacity-75 group-hover:opacity-100 transition-opacity`} />

                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${topic.gradient} flex items-center justify-center text-xl shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    {topic.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white leading-tight tracking-tight">{topic.title}</h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 italic leading-relaxed">{topic.tagline}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-7 mb-5 line-clamp-2">
                  {topic.description}
                </p>

                {/* Meta badges */}
                <div className="flex items-center gap-2 flex-wrap mt-auto">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${difficultyColor[topic.difficulty]}`}>
                    Difficulty: {topic.difficulty}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${categoryBadge[topic.category]}`}>
                    {topic.category === 'interview-critical' ? '🔥 Interview Critical' : topic.category.toUpperCase()}
                  </span>
                  <span className="ml-auto flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <Clock className="w-3 h-3" /> {topic.learningTimeMin} min
                  </span>
                </div>

                {/* Sub-info row */}
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-200/70 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{topic.subtopics.length} subtopics</span>
                  <span className="flex items-center gap-1">💬 {topic.interviewQuestions.length} interview Q&A</span>
                  <span className="flex items-center gap-1">🧠 {topic.quizQuestions.length} quiz</span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">No topics match your search.</p>
          <button onClick={() => { setSearch(''); setActiveCategory('all'); }} className="mt-3 text-indigo-500 hover:underline text-sm">Clear filters</button>
        </div>
      )}

      {/* ── User Content Section ── */}
      {hasUserContent && userTopics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-5"
        >
          {/* Section header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow">
                <UserPlus className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="font-extrabold text-slate-900 dark:text-slate-100 text-lg">
                  Your Custom Content
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {userTopics.length} topic{userTopics.length !== 1 ? 's' : ''} added by you · stored locally
                </p>
              </div>
            </div>
          </div>

          {/* User topic cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {userTopics.map((ut) => (
              <UserTopicCard key={ut.id} topic={ut} onDelete={removeTopic} />
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* Add Content FAB */}
      <AddContentModal />
    </div>
  );
}
