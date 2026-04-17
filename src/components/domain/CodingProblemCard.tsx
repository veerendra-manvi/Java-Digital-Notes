'use client';
import { motion } from 'framer-motion';
import { Terminal, Code2, ExternalLink, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface CodingProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  description: string;
}

export function CodingProblemCard({ cp }: { cp: CodingProblem }) {
  const difficultyStyles: Record<string, string> = {
    easy: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    medium: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    hard: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="app-surface p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:border-indigo-500/30 transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-indigo-500 group-hover:bg-indigo-500/10 transition-colors">
          <Terminal className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
              {cp.title}
            </h4>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${difficultyStyles[cp.difficulty] || difficultyStyles.medium}`}>
              {cp.difficulty}
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1 max-w-md">
            {cp.description}
          </p>
        </div>
      </div>

      <Link 
        href={`/coding-problems/${cp.slug}`}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-indigo-500 hover:text-white transition-all border border-transparent"
      >
        <Code2 className="w-4 h-4" />
        Practice Now
        <ChevronRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}
