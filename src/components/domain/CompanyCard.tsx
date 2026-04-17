'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, HelpCircle, Code2, TrendingUp } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  slug: string;
  summary: string;
  logoEmoji: string;
  gradient: string;
  tier: string;
  _count: {
    questions: number;
    codingProblems: number;
  };
}

export function CompanyCard({ company }: { company: Company }) {
  const qCount = company._count?.questions || 0;
  const pCount = company._count?.codingProblems || 0;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative"
    >
      <Link href={`/companies/${company.slug}`} className="block">
        <div className="app-surface h-full overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-2xl hover:shadow-indigo-500/10">
          {/* Header with Gradient Background */}
          <div className={`h-24 w-full bg-gradient-to-br ${company.gradient} relative flex items-center justify-center`}>
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-5xl group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
              {company.logoEmoji}
            </div>
            
            {/* Tier Badge */}
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black tracking-widest text-white uppercase border border-white/20">
              {company.tier}
            </div>
          </div>

          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
              {company.name}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-6 leading-relaxed flex-1">
              {company.summary}
            </p>

            {/* Stats Row */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-white/5">
              <div className="flex items-center gap-1.5" title="Interview Questions">
                <HelpCircle className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{qCount}</span>
              </div>
              <div className="flex items-center gap-1.5" title="Coding Problems">
                <Code2 className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{pCount}</span>
              </div>
              <div className="ml-auto flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                Practice <ChevronRight className="w-4 h-4 ml-0.5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
