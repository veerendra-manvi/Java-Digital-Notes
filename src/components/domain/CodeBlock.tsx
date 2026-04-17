'use client';
import { useState } from 'react';
import { Check, Copy, Terminal, Play } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  title?: string;
  language?: string;
  output?: string;
  explanation?: string;
  interviewNote?: string;
}

// Lightweight Java syntax highlighter
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

  // Comments first (before keywords mess with them)
  let h = esc.replace(
    /(\/\/[^\n]*)/g,
    '<span style="color:#6a9955;font-style:italic">$1</span>'
  );
  // Strings
  h = h.replace(
    /("(?:[^"\\]|\\.)*")/g,
    '<span style="color:#ce9178">$1</span>'
  );
  // Keywords
  keywords.forEach((kw) => {
    h = h.replace(
      new RegExp(`\\b(${kw})\\b`, 'g'),
      '<span style="color:#79b8ff;font-weight:700">$1</span>'
    );
  });
  // Numbers
  h = h.replace(
    /\b(\d[\d_]*\.?\d*[LlFfDd]?)\b/g,
    '<span style="color:#f8c555">$1</span>'
  );
  // Annotations
  h = h.replace(
    /(@\w+)/g,
    '<span style="color:#ffd700;font-weight:600">$1</span>'
  );
  // Class names (capitalised identifiers)
  h = h.replace(
    /\b([A-Z][A-Za-z0-9_]*)\b(?!<)/g,
    '<span style="color:#e3b341">$1</span>'
  );

  return h;
}

export default function CodeBlock({
  code,
  title,
  output,
  explanation,
  interviewNote,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="group rounded-3xl overflow-hidden border border-slate-300/80 dark:border-slate-700/70 bg-slate-950 shadow-xl shadow-slate-900/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-indigo-500/20 hover:border-indigo-500/35">
      {/* ── Title bar ── */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-white/10">
        {/* Traffic lights + filename */}
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-rose-500 opacity-80 hover:opacity-100 transition-opacity" />
          <span className="w-3 h-3 rounded-full bg-amber-400 opacity-80 hover:opacity-100 transition-opacity" />
          <span className="w-3 h-3 rounded-full bg-emerald-500 opacity-80 hover:opacity-100 transition-opacity" />
          {title && (
            <div className="ml-3 flex items-center gap-1.5 border border-white/10 bg-white/5 px-3 py-1 rounded-lg">
              <Terminal className="w-3 h-3 text-indigo-400" />
              <span className="text-xs text-slate-300 font-mono font-medium">
                {title}.java
              </span>
            </div>
          )}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-200 ${
            copied
              ? 'text-emerald-300 border-emerald-400/45 bg-emerald-500/15 shadow-sm shadow-emerald-500/20'
              : 'text-slate-300 border-white/15 bg-white/5 hover:text-white hover:bg-indigo-500/20 hover:border-indigo-300/40 hover:shadow-sm hover:shadow-indigo-500/25'
          }`}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>

      {/* ── Code area ── */}
      <div className="px-6 sm:px-7 py-6 overflow-x-auto bg-gradient-to-b from-slate-950 to-slate-900/95">
        <pre
          className="text-sm md:text-[0.92rem] text-slate-100 leading-8 font-mono whitespace-pre"
          style={{ fontFamily: '"JetBrains Mono", "Fira Code", monospace' }}
          dangerouslySetInnerHTML={{ __html: highlight(code) }}
        />
      </div>

      {/* ── Output ── */}
      {output && (
        <div className="border-t border-white/10 px-6 sm:px-7 py-4 bg-slate-900/80">
          <div className="flex items-center gap-2 mb-2.5">
            <Play className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
              Output
            </span>
          </div>
          <pre className="rounded-xl border border-emerald-400/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-300 font-mono leading-7 whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      )}

      {/* ── Explanation ── */}
      {explanation && (
        <div className="border-t border-white/10 bg-slate-900/75 px-6 sm:px-7 py-4">
          <p className="text-sm text-slate-300 leading-7">{explanation}</p>
        </div>
      )}

      {/* ── Interview note ── */}
      {interviewNote && (
        <div className="border-t border-amber-400/20 px-6 sm:px-7 py-4 flex gap-3"
          style={{ background: 'rgba(245,158,11,0.05)' }}>
          <span className="text-lg flex-shrink-0 mt-0.5">🎯</span>
          <div>
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
              Interview Note
            </p>
            <p className="text-sm text-amber-200 leading-7">
              {interviewNote}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
