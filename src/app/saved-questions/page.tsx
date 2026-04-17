'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookMarked, 
  Trash2, 
  Search, 
  ChevronLeft, 
  ArrowRight, 
  Building2, 
  Layers, 
  BarChart3,
  Loader2,
  Inbox
} from 'lucide-react';

interface Company {
  name: string;
  slug: string;
  logoEmoji: string;
}

interface Question {
  id: string;
  question: string;
  category: string;
  difficulty: string;
  company: Company;
}

const STORAGE_KEY = 'jdn_questions_saved';

export default function SavedQuestionsPage() {
  const [ids, setIds] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Load IDs from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    setIds(saved);
  }, []);

  // Fetch full question details when IDs change
  useEffect(() => {
    if (ids.length === 0) {
      setQuestions([]);
      setLoading(false);
      return;
    }

    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/questions/bulk?ids=${ids.join(',')}`);
        const result = await res.json();
        setQuestions(result.data || []);
      } catch (error) {
        console.error("Failed to load saved questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [ids]);

  // Real-time filtering
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [questions, searchQuery]);

  const removeQuestion = (id: string) => {
    const nextIds = ids.filter(savedId => savedId !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextIds));
    setIds(nextIds);
    setQuestions(questions.filter(q => q.id !== id));
  };

  const clearAll = () => {
    if (confirm("Are you sure you want to clear all saved questions?")) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      setIds([]);
      setQuestions([]);
    }
  };

  const difficultyStyles: Record<string, string> = {
    easy: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    medium: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    hard: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
  };

  return (
    <div className="app-page section-gap min-h-screen pb-20">
      {/* Header section */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link 
            href="/companies" 
            className="flex items-center gap-2 group text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Companies
          </Link>
          
          {ids.length > 0 && (
            <button 
              onClick={clearAll}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                <BookMarked className="w-6 h-6" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                Saved Questions
              </h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400 max-w-lg">
              Review and practice the questions you've bookmarked across all companies.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search saved questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
          <p className="text-sm font-bold text-slate-500 animate-pulse uppercase tracking-widest">Loading your bookmarks...</p>
        </div>
      ) : ids.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="app-surface flex flex-col items-center justify-center py-24 px-6 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6">
            <Inbox className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No Saved Questions</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xs mb-8">
            You haven't bookmarked any interview questions yet. Start exploring company pages!
          </p>
          <Link 
            href="/companies"
            className="btn-gradient flex items-center gap-2 px-8 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-500/25"
          >
            Browse Companies <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      ) : filteredQuestions.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500 dark:text-slate-400">No saved questions match your search "{searchQuery}"</p>
          <button 
            onClick={() => setSearchQuery('')}
            className="text-indigo-500 font-bold mt-2 hover:underline"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredQuestions.map((q) => (
              <motion.div
                key={q.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="app-surface flex flex-col md:flex-row md:items-center gap-6 p-6 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
              >
                {/* Company & Meta info */}
                <div className="flex flex-col gap-3 min-w-[200px]">
                  <Link 
                    href={`/companies/${q.company.slug}`}
                    className="flex items-center gap-3 p-2 -m-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group"
                  >
                    <div className="text-3xl group-hover:scale-110 transition-transform">{q.company.logoEmoji}</div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                        {q.company.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-indigo-500 tracking-wider">
                        View Practice <ArrowRight className="w-2 h-2" />
                      </div>
                    </div>
                  </Link>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${difficultyStyles[q.difficulty] || difficultyStyles.medium}`}>
                      {q.difficulty}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400">
                      {q.category}
                    </span>
                  </div>
                </div>

                {/* Question Text */}
                <div className="flex-1 md:border-l border-slate-200 dark:border-white/10 md:pl-8">
                  <p className="text-slate-900 dark:text-slate-200 font-bold text-lg leading-relaxed">
                    {q.question}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between md:justify-end gap-3 mt-4 md:mt-0 md:pl-6">
                  <button
                    onClick={() => removeQuestion(q.id)}
                    className="p-2.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
                    title="Remove from bookmarks"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
