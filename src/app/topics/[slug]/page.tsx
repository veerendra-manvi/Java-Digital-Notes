'use client';
import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, CheckCircle2, BookMarked,
  ArrowLeft, GraduationCap, Target, Lightbulb,
  Star,
} from 'lucide-react';
import { getTopicBySlug, topics } from '@/data/topics';
import { useProgress } from '@/hooks/useProgress';
import { useBookmarks } from '@/hooks/useBookmarks';
import CodeBlock from '@/components/domain/CodeBlock';
import InterviewAlert from '@/components/domain/InterviewAlert';
import Visualizer from '@/components/domain/Visualizer';
import Accordion from '@/components/ui/Accordion';
import { AnimatePresence } from 'framer-motion';

// New feature components
import PracticeSection from '@/components/domain/PracticeSection';
import CodingPractice from '@/components/domain/CodingPractice';
import EnhancedQuiz from '@/components/domain/EnhancedQuiz';
import AddContentModal from '@/components/domain/AddContentModal';

const sectionVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─── Toast notification ─────────────────────────────────────────────────────
function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.95 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-5 py-2.5 rounded-2xl shadow-2xl text-sm font-semibold pointer-events-none whitespace-nowrap"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Topic Page ────────────────────────────────────────────────────────
export default function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ Next 15/16 async params — use `use()` to unwrap
  const { slug } = use(params);
  const topic = getTopicBySlug(slug);

  if (!topic) notFound();

  const { isCompleted, markComplete, unmarkComplete } = useProgress();
  const { addBookmark, isBookmarked } = useBookmarks();
  const [toast, setToast] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const done = isCompleted(topic.id);
  const topicIndex = topics.findIndex((t) => t.slug === slug);
  const prevTopic = topicIndex > 0 ? topics[topicIndex - 1] : null;
  const nextTopic = topicIndex < topics.length - 1 ? topics[topicIndex + 1] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const diffBadgeColors: Record<string, string> = {
    beginner: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20',
    intermediate: 'text-amber-600 bg-amber-500/10 border-amber-500/20',
    tricky: 'text-rose-600 bg-rose-500/10 border-rose-500/20',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 sm:space-y-12">
      <Toast message={toast} visible={toastVisible} />

      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2"
      >
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
        </Link>
        <span>/</span>
        <span className="text-slate-700 dark:text-slate-300 font-medium">
          {topic.title}
        </span>
      </motion.div>

      {/* ── Hero header ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-0"
      >
        <div
          className={`rounded-3xl p-8 sm:p-10 bg-gradient-to-br ${topic.gradient} text-white relative overflow-hidden shadow-2xl`}
        >
          {/* decorative blobs */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full" />
          <div className="absolute -bottom-20 -left-10 w-56 h-56 bg-black/10 rounded-full" />

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
              {/* left – icon + title */}
              <div className="flex items-start gap-4">
                <span className="text-5xl sm:text-6xl">{topic.icon}</span>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold capitalize border border-white/20">
                      {topic.difficulty}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold border border-white/20">
                      {topic.learningTimeMin} min
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold capitalize border border-white/20">
                      {topic.category === 'interview-critical' ? '🔥 Interview Critical' : topic.category}
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black leading-tight">
                    {topic.title}
                  </h1>
                  <p className="text-white/75 mt-1 italic text-sm">{topic.tagline}</p>
                </div>
              </div>

              {/* right – complete button */}
              <button
                onClick={() => {
                  done ? unmarkComplete(topic.id) : markComplete(topic.id);
                  showToast(done ? '↩ Marked as incomplete' : '✅ Topic completed!');
                }}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  done
                    ? 'bg-emerald-400 text-emerald-900 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30 border border-white/20'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {done ? 'Completed ✓' : 'Mark Complete'}
              </button>
            </div>

            <p className="mt-5 text-white/80 max-w-2xl leading-relaxed text-sm sm:text-base">
              {topic.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Interview Strategy ── */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/75 backdrop-blur-sm p-6 sm:p-8 space-y-4"
      >
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
          <Star className="w-5 h-5 text-amber-500" />
          Interview Strategy
        </h2>
        <InterviewAlert type="good-answer">
          <strong>Best 30-Second Answer: </strong>
          {topic.best30SecAnswer}
        </InterviewAlert>
        <InterviewAlert type="interview">
          {topic.whatInterviewerWantsToHear}
        </InterviewAlert>
        <InterviewAlert type="mistake">
          <strong>Most Common Wrong Answer: </strong>
          {topic.topCommonWrongAnswer}
        </InterviewAlert>
      </motion.section>

      {/* ── Visual Concept Map ── */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/75 backdrop-blur-sm p-6 sm:p-8"
      >
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-5">
          📊 Visual Concept Map
        </h2>
        <Visualizer type={topic.visualizerType} topicSlug={topic.slug} />
      </motion.section>

      {/* ── Subtopics Accordion ── */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/75 backdrop-blur-sm p-6 sm:p-8"
      >
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-6">
          <GraduationCap className="w-5 h-5 text-indigo-500" />
          Subtopics — Deep Dive
        </h2>
        <Accordion
          defaultOpen={topic.subtopics[0]?.id}
          items={topic.subtopics.map((sub) => ({
            id: sub.id,
            title: sub.title,
            children: (
              <div className="space-y-5 mt-3">
                {/* Definition */}
                <div className="rounded-xl border border-slate-200/70 dark:border-white/10 bg-slate-50/70 dark:bg-slate-800/40 p-4">
                  <p className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2">
                    Definition
                  </p>
                  <p className="text-slate-800 dark:text-slate-200 text-sm leading-7 font-medium">
                    {sub.definition}
                  </p>
                </div>

                {/* Simple explanation */}
                <div className="rounded-xl border border-slate-200/70 dark:border-white/10 bg-white/80 dark:bg-slate-950/30 p-4">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    In Simple Words
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-7 whitespace-pre-line">
                    {sub.simpleExplanation}
                  </p>
                </div>

                {/* Analogy */}
                {sub.analogy && (
                  <InterviewAlert type="analogy">{sub.analogy}</InterviewAlert>
                )}

                {/* Code example */}
                {sub.codeExample && (
                  <CodeBlock
                    title={sub.codeExample.title}
                    code={sub.codeExample.code}
                    output={sub.codeExample.output}
                    explanation={sub.codeExample.explanation}
                    interviewNote={sub.codeExample.interviewNote}
                  />
                )}

                {/* One-liner */}
                <div className="oneliner flex items-start gap-3 rounded-xl border border-indigo-200/70 dark:border-indigo-400/20 bg-indigo-50/60 dark:bg-indigo-500/10 p-4">
                  <Lightbulb className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 dark:text-slate-200 leading-7">
                    <strong>One-Line Revision: </strong>
                    {sub.oneLineRevision}
                  </span>
                </div>

                {/* Common mistake */}
                <InterviewAlert type="mistake">{sub.commonMistake}</InterviewAlert>

                {/* Interview language */}
                <InterviewAlert type="interview">{sub.interviewLanguage}</InterviewAlert>
              </div>
            ),
          }))}
        />
      </motion.section>

      {/* ── Interview Q&A ── */}
      {topic.interviewQuestions.length > 0 && (
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/75 backdrop-blur-sm p-6 sm:p-8"
        >
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-rose-500" />
            Top Interview Questions
          </h2>
          <div className="space-y-4">
            {topic.interviewQuestions.map((iq, i) => {
              const bmkd = isBookmarked(topic.id, iq.question);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.055 }}
                  className="rounded-2xl border border-slate-200/80 dark:border-white/8 bg-white/70 dark:bg-white/3 overflow-hidden"
                >
                  {/* Question row */}
                  <div className="flex items-start justify-between gap-3 p-5 pb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5 mb-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs border font-semibold ${diffBadgeColors[iq.difficulty] ?? diffBadgeColors['beginner']}`}
                          >
                            {iq.difficulty}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 capitalize">
                            {iq.type}
                          </span>
                        </div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm leading-relaxed whitespace-pre-line">
                          {iq.question}
                        </p>
                      </div>
                    </div>
                    {/* Bookmark button */}
                    <button
                      onClick={() => {
                        if (!bmkd) {
                          addBookmark({
                            topicId: topic.id,
                            topicTitle: topic.title,
                            questionText: iq.question,
                          });
                          showToast('🔖 Question bookmarked!');
                        }
                      }}
                      title={bmkd ? 'Bookmarked' : 'Bookmark this question'}
                      className={`flex-shrink-0 p-1.5 rounded-lg transition-all ${
                        bmkd
                          ? 'text-amber-500'
                          : 'text-slate-300 dark:text-slate-600 hover:text-amber-400'
                      }`}
                    >
                      <BookMarked className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Answer */}
                  <div className="px-5 pb-5 pt-1 ml-9">
                    <div className="good-answer">
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                        {iq.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* ── Practice Now ── */}
      <PracticeSection topicSlug={topic.slug} />

      {/* ── Coding Practice ── */}
      <CodingPractice topicSlug={topic.slug} />

      {/* ── Enhanced Quiz ── */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/75 backdrop-blur-sm p-0"
      >
        <EnhancedQuiz questions={topic.quizQuestions} />
      </motion.section>

      {/* ── Prev / Next navigation ── */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex items-center gap-3 pt-8 border-t border-slate-200/70 dark:border-white/10"
      >
        {prevTopic ? (
          <Link
            href={`/topics/${prevTopic.slug}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/8 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="truncate max-w-[140px]">{prevTopic.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {nextTopic && (
          <Link
            href={`/topics/${nextTopic.slug}`}
            className="ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-indigo-500/20 transition-all"
          >
            <span className="truncate max-w-[140px]">{nextTopic.title}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </motion.div>

      {/* ── Add Your Content FAB ── */}
      <AddContentModal defaultTopicTitle={topic.title} />
    </div>
  );
}