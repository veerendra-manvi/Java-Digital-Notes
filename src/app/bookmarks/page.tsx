'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookMarked, Trash2, ExternalLink } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';
import { topics } from '@/data/topics';

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks();

  const getTopicByIdLocal = (id: string) => topics.find((t) => t.id === id);

  return (
    <div className="app-page max-w-4xl section-gap">
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="app-surface p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
            <BookMarked className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">My Bookmarks</h1>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-7">
          {bookmarks.length} saved question{bookmarks.length !== 1 ? 's' : ''} — your personal revision list.
        </p>
      </motion.div>

      {bookmarks.length === 0 ? (
        <div className="app-surface text-center py-20 px-6">
          <BookMarked className="w-14 h-14 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
          <h2 className="text-xl font-bold text-slate-400 dark:text-slate-600 mb-2">No bookmarks yet</h2>
          <p className="text-sm text-slate-400 dark:text-slate-600 mb-6">
            Click the bookmark icon on any interview question to save it here.
          </p>
          <Link href="/interview" className="btn-gradient inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm">
            Browse Interview Questions
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarks.map((bm, i) => {
            const topic = getTopicByIdLocal(bm.topicId);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="app-surface group flex items-start gap-4 p-5 rounded-2xl hover:border-amber-400/40 transition-all"
              >
                <span className="text-2xl flex-shrink-0">{topic?.icon ?? '📌'}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Link href={`/topics/${topic?.slug ?? bm.topicId}`}
                      className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1">
                      {bm.topicTitle}
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                    <span className="text-xs text-slate-400 dark:text-slate-600">
                      {new Date(bm.savedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 whitespace-pre-line">{bm.questionText}</p>
                </div>
                <button
                  onClick={() => removeBookmark(bm.topicId, bm.questionText)}
                  className="flex-shrink-0 p-2 rounded-lg text-slate-300 dark:text-slate-700 hover:text-rose-500 hover:bg-rose-500/10 transition-all opacity-0 group-hover:opacity-100"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
