'use client';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import {
  ArrowRight, Zap, Target, BookOpen, RotateCcw, Trophy, Code2,
  Brain, Layers, CheckCircle2, Star, BookMarked, ChevronRight
} from 'lucide-react';
import { topics } from '@/data/topics';

const DAILY_QUOTES = [
  "\"In Java, every object has a story. Learn to tell it.",
  "\"The best time to learn Java was yesterday. The second best time is now.",
  "\"Polymorphism is not magic — it's just objects playing their role.",
  "\"String immutability is a feature, not a bug. Embrace it.",
];

const features = [
  { icon: Brain, title: 'Visual Learning', desc: 'Concept diagrams, memory maps, and flow visualizers for every topic.', color: 'from-violet-500 to-purple-600' },
  { icon: Target, title: 'Interview Ready', desc: 'Every topic includes "what the interviewer really wants to hear."', color: 'from-rose-500 to-pink-600' },
  { icon: Code2, title: 'Real Code Examples', desc: 'Clean, commented Java examples with expected output and dry-run.', color: 'from-cyan-500 to-blue-500' },
  { icon: RotateCcw, title: 'Quick Revision', desc: 'Flashcards and one-line recaps for last-minute prep.', color: 'from-emerald-500 to-teal-600' },
  { icon: BookMarked, title: 'Smart Bookmarks', desc: 'Save tricky questions and topics to your personal revision list.', color: 'from-amber-500 to-orange-500' },
  { icon: Trophy, title: 'Progress Tracking', desc: 'Visual streak tracker and topic progress saved locally.', color: 'from-indigo-500 to-brand-600' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] } },
};

export default function LandingPage() {
  const today = new Date();
  const quoteIndex = today.getDate() % DAILY_QUOTES.length;
  const dailyQuote = DAILY_QUOTES[quoteIndex];

  return (
    <div className="relative overflow-hidden">
      {/* Background glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-600/15 dark:bg-purple-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-64 bg-cyan-500/10 dark:bg-cyan-400/5 rounded-full blur-3xl" />
      </div>

      {/* ─── Daily Quote Banner ─── */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-2.5 px-4 text-center text-sm font-medium">
        <span className="opacity-80">Today's Java Boost · </span>{dailyQuote}
      </div>

      {/* ─── Hero Section ─── */}
      <section className="app-page pt-20 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6">
            <Star className="w-3.5 h-3.5" />
            Core Java · 13 Topics · Interview-Ready
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
            <span className="text-slate-900 dark:text-white">Master </span>
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-600 bg-clip-text text-transparent">Core Java</span>
            <br />
            <span className="text-slate-900 dark:text-white">for </span>
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Interviews</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A visual, memorable, and interview-focused learning platform. Every concept explained the way
            you should say it in your next technical round.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              id="cta-start-learning"
              className="btn-gradient group flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg"
            >
              Start Learning
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/interview"
              id="cta-interview-questions"
              className="btn-soft flex items-center gap-2 px-8 py-4 rounded-2xl text-slate-700 dark:text-slate-300 font-bold text-lg"
            >
              <Target className="w-5 h-5" />
              Practice Interview Questions
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-8 mt-16">
            {[
              { label: 'Core Topics', value: '13' },
              { label: 'Interview Questions', value: '100+' },
              { label: 'Code Examples', value: '50+' },
              { label: 'Quiz Questions', value: '60+' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-black bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Features Section ─── */}
      <section className="app-page py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
              Everything You Need to <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Crack the Interview</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">Not just notes — a full interview preparation system built around how tech interviewers think.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={itemVariants}
                className="app-surface group p-6 rounded-2xl hover:border-indigo-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── Topics Preview ─── */}
      <section className="app-page py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">13 Core Java Topics</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1">From basics to OOP to advanced — interview-first approach</p>
            </div>
            <Link href="/dashboard" className="hidden sm:flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:gap-2.5 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {topics.slice(0, 8).map((topic) => (
              <motion.div key={topic.id} variants={itemVariants}>
                <Link
                  href={`/topics/${topic.slug}`}
                  className="app-surface group flex items-center gap-3 p-4 rounded-xl hover:border-indigo-500/30 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${topic.gradient} flex items-center justify-center flex-shrink-0 text-lg`}>
                    {topic.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-slate-900 dark:text-white truncate">{topic.title}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 capitalize">{topic.difficulty} · {topic.learningTimeMin}min</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center mt-8">
            <Link href="/dashboard" className="btn-soft inline-flex items-center gap-2 px-6 py-3 rounded-xl text-indigo-600 dark:text-indigo-300 font-semibold">
              <BookOpen className="w-4 h-4" />
              View All 13 Topics
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── What Makes Us Different ─── */}
      <section className="app-page py-16">
        <motion.div
          className="rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 p-10 md:p-14 text-white text-center shadow-2xl shadow-indigo-500/20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4">Built for the Interview Room</h2>
          <p className="text-indigo-200 text-lg max-w-2xl mx-auto mb-8">
            Every subtopic includes "what the interviewer really wants to hear," "best 30-second answer," and "common wrong answers." You learn to speak Java, not just code it.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {['Interview Language', 'Common Mistakes', 'Real Analogies', 'One-Line Revision', 'Output Prediction', 'Scenario Questions'].map((tag) => (
              <span key={tag} className="px-4 py-1.5 rounded-full bg-white/15 text-white text-sm font-medium border border-white/20">
                <CheckCircle2 className="w-3.5 h-3.5 inline mr-1.5 opacity-80" />{tag}
              </span>
            ))}
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-indigo-700 font-bold text-lg hover:bg-indigo-50 transition-all hover:scale-[1.02] shadow-xl"
          >
            <Zap className="w-5 h-5" />
            Start Cracking Interviews
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
