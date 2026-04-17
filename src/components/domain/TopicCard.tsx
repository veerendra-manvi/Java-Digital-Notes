import Link from 'next/link';
import { Clock, BookOpen, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Topic } from '@/data/topics';

interface TopicCardProps {
  topic: Topic;
  completed?: boolean;
}

const difficultyColor: Record<string, string> = {
  beginner:     'text-emerald-600 bg-emerald-500/10 border-emerald-500/20',
  intermediate: 'text-amber-600   bg-amber-500/10   border-amber-500/20',
  advanced:     'text-rose-600    bg-rose-500/10    border-rose-500/20',
};

const categoryLabel: Record<string, string> = {
  basics:              'Basics',
  oop:                 'OOP',
  advanced:            'Advanced',
  'interview-critical':'🔥 Interview Critical',
};

const categoryBadge: Record<string, string> = {
  basics:              'badge-basics',
  oop:                 'badge-oop',
  advanced:            'badge-advanced',
  'interview-critical':'badge-interview-critical',
};

export default function TopicCard({ topic, completed = false }: TopicCardProps) {
  return (
    <Link
      href={`/topics/${topic.slug}`}
      className={`group relative flex flex-col p-6 rounded-3xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 overflow-hidden
        ${completed
          ? 'border-emerald-500/35 bg-gradient-to-br from-emerald-500/10 to-white/80 dark:from-emerald-500/15 dark:to-slate-900/70 hover:border-emerald-500/55'
          : 'border-slate-200/80 dark:border-white/10 bg-gradient-to-br from-white/90 to-slate-50/70 dark:from-slate-900/80 dark:to-slate-800/65 hover:border-indigo-500/40'
        }`}
    >
      {/* Gradient top stripe */}
      <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${topic.gradient} opacity-70 group-hover:opacity-100 transition-opacity`} />

      {/* Completion badge */}
      {completed && (
        <div className="absolute top-4 right-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        </div>
      )}

      {/* Icon + title */}
      <div className="flex items-start gap-4 mb-3">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.gradient} flex items-center justify-center text-xl shadow-md flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
          {topic.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 leading-tight tracking-tight">{topic.title}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic leading-relaxed">{topic.tagline}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-7 line-clamp-2 mb-4">{topic.description}</p>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-1.5 mt-auto mb-3">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${difficultyColor[topic.difficulty]}`}>
          {topic.difficulty}
        </span>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${categoryBadge[topic.category]}`}>
          {categoryLabel[topic.category]}
        </span>
        <span className="ml-auto flex items-center gap-1 text-xs text-slate-400">
          <Clock className="w-3 h-3" />{topic.learningTimeMin}m
        </span>
      </div>

      {/* Footer stats */}
      <div className="flex items-center gap-3 pt-3 border-t border-slate-200/60 dark:border-white/5">
        <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
          <BookOpen className="w-3 h-3" />{topic.subtopics.length} subtopics
        </span>
        <span className="text-xs text-slate-400 dark:text-slate-500">💬 {topic.interviewQuestions.length} Q&A</span>
        <span className="text-xs text-slate-400 dark:text-slate-500">🧠 {topic.quizQuestions.length} quiz</span>
        <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all ml-auto" />
      </div>
    </Link>
  );
}
