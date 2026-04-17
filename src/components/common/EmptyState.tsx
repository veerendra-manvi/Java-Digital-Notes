'use client';
import { motion } from 'framer-motion';
import { SearchX, Layout } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: 'search' | 'default';
  action?: () => void;
  actionText?: string;
}

export function EmptyState({ title, description, icon = 'default', action, actionText }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-12 text-center app-surface"
    >
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6 text-slate-400">
        {icon === 'search' ? <SearchX className="w-8 h-8" /> : <Layout className="w-8 h-8" />}
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-8 leading-relaxed">
        {description}
      </p>
      {action && (
        <button
          onClick={action}
          className="px-6 py-2.5 rounded-xl btn-gradient font-semibold text-sm"
        >
          {actionText}
        </button>
      )}
    </motion.div>
  );
}
