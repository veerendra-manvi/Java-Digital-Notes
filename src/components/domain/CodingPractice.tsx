'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, Play, Eye, EyeOff, ChevronDown,
  BookOpen, Zap, CheckCircle2, XCircle, AlertCircle,
} from 'lucide-react';
import { getCodingProblems, type CodingProblem } from '@/data/codingProblems';

// ─── Lightweight syntax highlighter (same as CodeBlock.tsx) ──────────────────
function highlight(code: string): string {
  const keywords = [
    'public','private','protected','static','void','class','interface',
    'abstract','extends','implements','new','return','if','else','for',
    'while','do','switch','case','break','continue','try','catch','finally',
    'throw','throws','import','package','this','super','final','boolean',
    'int','long','short','byte','char','double','float','String','null',
    'true','false','instanceof','synchronized','override',
  ];

  const esc = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  let h = esc.replace(
    /(\/\/[^\n]*)/g,
    '<span style="color:#6a9955;font-style:italic">$1</span>'
  );
  h = h.replace(
    /("(?:[^"\\]|\\.)*")/g,
    '<span style="color:#ce9178">$1</span>'
  );
  keywords.forEach((kw) => {
    h = h.replace(
      new RegExp(`\\b(${kw})\\b`, 'g'),
      '<span style="color:#79b8ff;font-weight:700">$1</span>'
    );
  });
  h = h.replace(
    /\b(\d[\d_]*\.?\d*[LlFfDd]?)\b/g,
    '<span style="color:#f8c555">$1</span>'
  );
  h = h.replace(
    /(@\w+)/g,
    '<span style="color:#ffd700;font-weight:600">$1</span>'
  );
  h = h.replace(
    /\b([A-Z][A-Za-z0-9_]*)(?!<)/g,
    '<span style="color:#e3b341">$1</span>'
  );
  return h;
}

// ─── Difficulty badge ─────────────────────────────────────────────────────────
const difficultyStyles = {
  easy:   'text-emerald-600 bg-emerald-500/10 border-emerald-500/20',
  medium: 'text-amber-600 bg-amber-500/10 border-amber-500/20',
  hard:   'text-rose-600 bg-rose-500/10 border-rose-500/20',
};

// ─── Simulated run result ─────────────────────────────────────────────────────
type RunState = 'idle' | 'running' | 'done' | 'correct' | 'wrong';

// ─── Coding Problem Card ──────────────────────────────────────────────────────
function CodingProblemCard({
  problem,
  index,
}: {
  problem: CodingProblem;
  index: number;
}) {
  const [code, setCode] = useState(problem.starterCode);
  const [runState, setRunState] = useState<RunState>('idle');
  const [output, setOutput] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isExpanded, setIsExpanded] = useState(index === 0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle Tab key in textarea — insert spaces instead of switching focus
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const val = ta.value;
        ta.value = val.substring(0, start) + '    ' + val.substring(end);
        ta.selectionStart = ta.selectionEnd = start + 4;
        setCode(ta.value);
      }
    };
    ta.addEventListener('keydown', handler);
    return () => ta.removeEventListener('keydown', handler);
  }, []);

  // Simulate code run — compares trimmed user code against solution
  const handleRunCode = () => {
    setRunState('running');
    setOutput('');
    setTimeout(() => {
      const userTrimmed = code.trim();
      const solutionTrimmed = problem.solution.trim();

      if (!userTrimmed || userTrimmed === problem.starterCode.trim()) {
        setOutput(problem.expectedOutputForStarter ?? '// Starter code — add your logic to see output.');
        setRunState('done');
      } else if (userTrimmed === solutionTrimmed) {
        setOutput(
          problem.examples.map((ex) => ex.output).join('\n\n')
        );
        setRunState('correct');
      } else {
        // Show expected output for comparison
        setOutput(
          `📋 Expected Output:\n${problem.examples[0]?.output ?? '(see examples)'}\n\n💡 Tip: Compare your logic with the expected output above. Your code may be correct — click "Show Solution" to verify.`
        );
        setRunState('done');
      }
    }, 800);
  };

  const runIcon =
    runState === 'running' ? (
      <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
    ) : runState === 'correct' ? (
      <CheckCircle2 className="w-3.5 h-3.5" />
    ) : (
      <Play className="w-3.5 h-3.5" />
    );

  const runLabel =
    runState === 'running' ? 'Running…' : runState === 'correct' ? 'Correct!' : 'Run Code';

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-slate-900/50 overflow-hidden"
    >
      {/* Problem header */}
      <button
        onClick={() => setIsExpanded((p) => !p)}
        className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-slate-50/80 dark:hover:bg-white/3 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-white text-xs font-mono font-bold flex items-center justify-center">
            {index + 1}
          </span>
          <div className="text-left">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold border ${difficultyStyles[problem.difficulty]}`}
              >
                {problem.difficulty}
              </span>
            </div>
            <p className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
              {problem.title}
            </p>
          </div>
        </div>
        <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-200/60 dark:border-white/8 p-5 space-y-5">
              {/* Problem description */}
              <div className="rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/8 p-4">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Problem Statement
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {problem.description}
                </p>
              </div>

              {/* Examples */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Examples
                </p>
                {problem.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden border border-slate-200/60 dark:border-white/8 bg-slate-950"
                  >
                    <div className="px-4 py-2 bg-slate-900 border-b border-white/8 flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">
                        Example {i + 1}
                      </span>
                    </div>
                    <div className="px-4 py-3 space-y-2">
                      <div>
                        <span className="text-xs text-slate-500 uppercase tracking-wider">Input:</span>
                        <pre className="text-xs text-slate-300 font-mono mt-1">{ex.input}</pre>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 uppercase tracking-wider">Output:</span>
                        <pre className="text-xs text-emerald-400 font-mono mt-1">{ex.output}</pre>
                      </div>
                      {ex.explanation && (
                        <div>
                          <span className="text-xs text-slate-500 uppercase tracking-wider">Note:</span>
                          <p className="text-xs text-slate-400 mt-1">{ex.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Constraints */}
              {problem.constraints && problem.constraints.length > 0 && (
                <div className="rounded-xl bg-amber-50/60 dark:bg-amber-500/10 border border-amber-200/60 dark:border-amber-400/20 p-4">
                  <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">
                    Constraints
                  </p>
                  <ul className="space-y-1">
                    {problem.constraints.map((c, i) => (
                      <li key={i} className="text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">•</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ── Code Editor ── */}
              <div className="rounded-2xl overflow-hidden border border-slate-700/70 shadow-xl">
                {/* Editor title bar */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 opacity-80" />
                    <span className="w-3 h-3 rounded-full bg-amber-400 opacity-80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 opacity-80" />
                    <span className="ml-2 text-xs text-slate-400 font-mono">Solution.java</span>
                  </div>
                  <button
                    onClick={() => setCode(problem.starterCode)}
                    className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    Reset
                  </button>
                </div>

                {/* Code textarea */}
                <div className="relative bg-slate-950">
                  <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setRunState('idle');
                      setOutput('');
                    }}
                    spellCheck={false}
                    className="w-full min-h-[220px] px-5 py-4 bg-transparent text-slate-100 text-sm font-mono leading-7 resize-y focus:outline-none"
                    style={{
                      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                      tabSize: 4,
                    }}
                  />
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-900/80 border-t border-white/8 flex-wrap">
                  <button
                    onClick={handleRunCode}
                    disabled={runState === 'running'}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-60 ${
                      runState === 'correct'
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5'
                    }`}
                  >
                    {runIcon}
                    {runLabel}
                  </button>

                  <button
                    onClick={() => setShowSolution((p) => !p)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 transition-all"
                  >
                    {showSolution ? (
                      <><EyeOff className="w-3.5 h-3.5" /> Hide Solution</>
                    ) : (
                      <><Eye className="w-3.5 h-3.5" /> Show Solution</>
                    )}
                  </button>

                  <button
                    onClick={() => setShowExplanation((p) => !p)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 transition-all"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    {showExplanation ? 'Hide' : 'View'} Explanation
                  </button>
                </div>

                {/* Run output */}
                <AnimatePresence>
                  {output && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-white/8 overflow-hidden"
                    >
                      <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/60">
                        {runState === 'correct' ? (
                          <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Output — Matches Expected ✓</span></>
                        ) : runState === 'wrong' ? (
                          <><XCircle className="w-3.5 h-3.5 text-rose-400" />
                          <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Output — Check Your Logic</span></>
                        ) : (
                          <><AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Output</span></>
                        )}
                      </div>
                      <pre
                        className={`px-4 py-3 text-sm font-mono whitespace-pre-wrap leading-7 ${
                          runState === 'correct'
                            ? 'text-emerald-300 bg-emerald-500/5'
                            : 'text-slate-300 bg-slate-950'
                        }`}
                      >
                        {output}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Solution panel */}
              <AnimatePresence>
                {showSolution && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="rounded-2xl overflow-hidden border border-emerald-400/30 shadow-lg overflow-hidden"
                  >
                    <div className="px-4 py-2.5 bg-emerald-900/30 border-b border-emerald-400/20 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        Solution
                      </span>
                    </div>
                    <div className="bg-slate-950 overflow-x-auto">
                      <pre
                        className="px-5 py-4 text-sm text-slate-100 leading-8 font-mono whitespace-pre"
                        style={{ fontFamily: '"JetBrains Mono", "Fira Code", monospace' }}
                        dangerouslySetInnerHTML={{ __html: highlight(problem.solution) }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Explanation panel */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="rounded-xl border border-indigo-200/60 dark:border-indigo-400/20 bg-indigo-50/60 dark:bg-indigo-500/10 p-4 overflow-hidden"
                  >
                    <p className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2">
                      🧠 Explanation
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {problem.solutionExplanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main CodingPractice Section ─────────────────────────────────────────────
interface CodingPracticeProps {
  topicSlug: string;
}

export default function CodingPractice({ topicSlug }: CodingPracticeProps) {
  const problems = getCodingProblems(topicSlug);
  const [isOpen, setIsOpen] = useState(false);

  if (problems.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-slate-300/60 dark:border-white/10 bg-gradient-to-br from-slate-50/80 to-white dark:from-slate-900/80 dark:to-slate-900/40 backdrop-blur-sm overflow-hidden shadow-sm"
    >
      {/* Header toggle */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="w-full flex items-center justify-between gap-3 p-6 sm:p-8 text-left hover:bg-slate-100/50 dark:hover:bg-white/3 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center shadow-lg border border-white/10">
            <Code2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
              Coding Practice
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200/60 dark:border-emerald-400/20">
                HackerRank Style
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {problems.length} coding problem{problems.length !== 1 ? 's' : ''} · Simulated execution
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400 text-xs font-bold">
            <Zap className="w-3 h-3" /> {problems.length} Problems
          </span>
          <div className={`p-1.5 rounded-xl bg-slate-100 dark:bg-white/10 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          </div>
        </div>
      </button>

      {/* Problems */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-8 pb-8 space-y-5 border-t border-slate-200/60 dark:border-white/8 pt-6">
              {/* Note */}
              <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50/60 dark:bg-blue-500/10 border border-blue-200/60 dark:border-blue-400/20 text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Note:</strong> Code execution is simulated — there is no backend.
                  Click <strong>Run Code</strong> to see expected output, <strong>Show Solution</strong> to reveal the answer,
                  and <strong>View Explanation</strong> to understand the logic.
                </span>
              </div>

              {problems.map((problem, i) => (
                <CodingProblemCard key={problem.id} problem={problem} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
