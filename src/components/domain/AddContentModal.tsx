'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, X, Save, BookPlus, AlertCircle,
  CheckCircle2, Code2, HelpCircle, FileText,
} from 'lucide-react';
import { useUserContent } from '@/hooks/useUserContent';

// ─── Form data shape ──────────────────────────────────────────────────────────
interface FormData {
  topicTitle: string;
  subtopicName: string;
  explanation: string;
  codeExample: string;
  interviewQuestion: string;
  interviewAnswer: string;
  quizQuestion: string;
  quizCorrectAnswer: string;
}

const EMPTY_FORM: FormData = {
  topicTitle: '',
  subtopicName: '',
  explanation: '',
  codeExample: '',
  interviewQuestion: '',
  interviewAnswer: '',
  quizQuestion: '',
  quizCorrectAnswer: '',
};

// ─── Field component ──────────────────────────────────────────────────────────
function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  multiline,
  rows,
  icon,
  hint,
}: {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: (name: keyof FormData, val: string) => void;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  icon?: React.ReactNode;
  hint?: string;
}) {
  const baseClass =
    'w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 text-sm leading-relaxed placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all resize-none';

  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
        {icon}
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>

      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          rows={rows ?? 4}
          className={baseClass}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          className={baseClass}
        />
      )}

      {hint && (
        <p className="text-xs text-slate-400 dark:text-slate-500 pl-1">{hint}</p>
      )}
    </div>
  );
}

// ─── Section divider ──────────────────────────────────────────────────────────
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">
        {label}
      </span>
      <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────
interface AddContentModalProps {
  /** If provided, pre-fills topicTitle and topicId context */
  defaultTopicTitle?: string;
}

export default function AddContentModal({ defaultTopicTitle }: AddContentModalProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormData>({
    ...EMPTY_FORM,
    topicTitle: defaultTopicTitle ?? '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [saved, setSaved] = useState(false);

  const { addContent } = useUserContent();

  // Sync topicTitle if prop changes
  useEffect(() => {
    if (defaultTopicTitle && !open) {
      setForm((p) => ({ ...p, topicTitle: defaultTopicTitle }));
    }
  }, [defaultTopicTitle, open]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleChange = (name: keyof FormData, val: string) => {
    setForm((p) => ({ ...p, [name]: val }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
    setSaved(false);
  };

  const validate = (): boolean => {
    const next: Partial<FormData> = {};
    if (!form.topicTitle.trim()) next.topicTitle = 'Topic Title is required.';
    if (!form.subtopicName.trim()) next.subtopicName = 'Subtopic Name is required.';
    if (!form.explanation.trim()) next.explanation = 'Explanation is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    addContent({
      topicTitle: form.topicTitle.trim(),
      subtopicName: form.subtopicName.trim(),
      explanation: form.explanation.trim(),
      codeExample: form.codeExample.trim() || undefined,
      interviewQuestion: form.interviewQuestion.trim() || undefined,
      interviewAnswer: form.interviewAnswer.trim() || undefined,
      quizQuestion: form.quizQuestion.trim() || undefined,
      quizCorrectAnswer: form.quizCorrectAnswer.trim() || undefined,
    });
    setSaved(true);
    setTimeout(() => {
      setOpen(false);
      setForm({ ...EMPTY_FORM, topicTitle: defaultTopicTitle ?? '' });
      setSaved(false);
      setErrors({});
    }, 1200);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors({});
    setSaved(false);
  };

  return (
    <>
      {/* ─── Floating Action Button ─── */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm shadow-2xl shadow-indigo-500/40 hover:shadow-indigo-500/60 transition-shadow border border-white/20"
        title="Add Your Content"
      >
        <BookPlus className="w-4.5 h-4.5" />
        <span className="hidden sm:inline">Add Your Content</span>
        <Plus className="w-4 h-4 sm:hidden" />
      </motion.button>

      {/* ─── Modal Backdrop + Panel ─── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="fixed inset-x-4 bottom-0 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:bottom-6 z-50 w-full sm:w-[600px] max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl shadow-black/30 overflow-hidden"
            >
              {/* Modal header */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-200/70 dark:border-white/10 bg-gradient-to-r from-indigo-50/80 to-violet-50/80 dark:from-indigo-950/50 dark:to-violet-950/50 flex-shrink-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md">
                  <BookPlus className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <h2 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
                    Add Your Content
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Saved locally — never sent to any server
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="ml-auto p-1.5 rounded-xl hover:bg-slate-200/70 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Scrollable form body */}
              <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
                {/* ── Core fields ── */}
                <SectionDivider label="Topic Info" />

                <Field
                  label="Topic Title"
                  name="topicTitle"
                  value={form.topicTitle}
                  onChange={handleChange}
                  placeholder="e.g. Java Generics, Design Patterns…"
                  required
                  icon={<FileText className="w-3 h-3" />}
                  hint={errors.topicTitle}
                />
                {errors.topicTitle && (
                  <p className="flex items-center gap-1 text-xs text-rose-500 -mt-3">
                    <AlertCircle className="w-3 h-3" />{errors.topicTitle}
                  </p>
                )}

                <Field
                  label="Subtopic Name"
                  name="subtopicName"
                  value={form.subtopicName}
                  onChange={handleChange}
                  placeholder="e.g. Bounded Type Parameters, Wildcard…"
                  required
                  icon={<FileText className="w-3 h-3" />}
                />
                {errors.subtopicName && (
                  <p className="flex items-center gap-1 text-xs text-rose-500 -mt-3">
                    <AlertCircle className="w-3 h-3" />{errors.subtopicName}
                  </p>
                )}

                <Field
                  label="Explanation"
                  name="explanation"
                  value={form.explanation}
                  onChange={handleChange}
                  placeholder="Explain the concept in plain English…"
                  required
                  multiline
                  rows={4}
                  icon={<FileText className="w-3 h-3" />}
                />
                {errors.explanation && (
                  <p className="flex items-center gap-1 text-xs text-rose-500 -mt-3">
                    <AlertCircle className="w-3 h-3" />{errors.explanation}
                  </p>
                )}

                {/* ── Optional fields ── */}
                <SectionDivider label="Optional — Code, Interview & Quiz" />

                <Field
                  label="Code Example"
                  name="codeExample"
                  value={form.codeExample}
                  onChange={handleChange}
                  placeholder={`public class MyExample {\n    // your code here\n}`}
                  multiline
                  rows={5}
                  icon={<Code2 className="w-3 h-3" />}
                  hint="Optional — paste a Java code snippet"
                />

                <Field
                  label="Interview Question"
                  name="interviewQuestion"
                  value={form.interviewQuestion}
                  onChange={handleChange}
                  placeholder="What is the difference between…?"
                  icon={<HelpCircle className="w-3 h-3" />}
                  hint="Optional — will appear in your Interview Q&A section"
                />

                {form.interviewQuestion.trim() && (
                  <Field
                    label="Interview Answer"
                    name="interviewAnswer"
                    value={form.interviewAnswer}
                    onChange={handleChange}
                    placeholder="The answer is…"
                    multiline
                    rows={3}
                    icon={<HelpCircle className="w-3 h-3" />}
                  />
                )}

                <Field
                  label="Quiz Question"
                  name="quizQuestion"
                  value={form.quizQuestion}
                  onChange={handleChange}
                  placeholder="Which of the following…?"
                  icon={<HelpCircle className="w-3 h-3" />}
                  hint="Optional — will appear in the quiz section"
                />

                {form.quizQuestion.trim() && (
                  <Field
                    label="Correct Answer"
                    name="quizCorrectAnswer"
                    value={form.quizCorrectAnswer}
                    onChange={handleChange}
                    placeholder="The correct answer is…"
                    icon={<CheckCircle2 className="w-3 h-3" />}
                    hint="This will be option A and marked as correct"
                  />
                )}

                {/* Privacy note */}
                <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/8 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-blue-400" />
                  <span>
                    Your content is stored exclusively in your browser&apos;s localStorage under{' '}
                    <code className="font-mono bg-slate-200 dark:bg-white/10 px-1 rounded text-xs">jdn_user_content</code>.
                    It never leaves your device.
                  </span>
                </div>
              </div>

              {/* Footer buttons */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200/70 dark:border-white/10 bg-slate-50/80 dark:bg-slate-800/50 flex-shrink-0">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:border-slate-300 hover:text-slate-800 dark:hover:text-slate-200 transition-all"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={handleSubmit}
                  whileTap={{ scale: 0.97 }}
                  disabled={saved}
                  className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                    saved
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                      : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-lg hover:shadow-indigo-500/25'
                  }`}
                >
                  {saved ? (
                    <><CheckCircle2 className="w-4 h-4" /> Saved!</>
                  ) : (
                    <><Save className="w-4 h-4" /> Save Content</>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
