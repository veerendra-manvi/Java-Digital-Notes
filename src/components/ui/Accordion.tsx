'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  children: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string;
  allowMultiple?: boolean;
}

export default function Accordion({
  items,
  defaultOpen,
  allowMultiple = false,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpen ? [defaultOpen] : []
  );

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      return allowMultiple ? [...prev, id] : [id];
    });
  };

  return (
    <div className="space-y-5">
      {items.map((item, i) => {
        const open = openIds.includes(item.id);
        return (
          <motion.div
            key={item.id}
            layout
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={`group rounded-2xl border transition-all duration-300 overflow-hidden
              ${
                open
                  ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/10 bg-gradient-to-br from-indigo-500/[0.07] via-purple-500/[0.05] to-transparent dark:from-indigo-500/[0.13] dark:via-purple-500/[0.08] dark:to-transparent'
                  : 'border-slate-200/80 dark:border-white/10 bg-white/75 dark:bg-slate-900/60 hover:border-indigo-400/35 hover:shadow-md hover:shadow-indigo-500/5'
              }`}
          >
            {/* Trigger */}
            <motion.button
              onClick={() => toggle(item.id)}
              whileTap={{ scale: 0.998 }}
              className="w-full flex items-center justify-between gap-4 px-6 py-4 sm:py-[18px] text-left transition-colors duration-200 bg-white/80 dark:bg-slate-900/60 hover:bg-indigo-500/5 dark:hover:bg-indigo-500/10"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Step number */}
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-xl text-white text-xs font-black flex items-center justify-center shadow-md transition-transform duration-300 ${
                    open ? 'scale-110' : 'group-hover:scale-105'
                  }`}
                  style={{
                    background:
                      'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  }}
                >
                  {i + 1}
                </span>

                {/* Title */}
                <span
                  className={`font-semibold text-sm sm:text-[0.95rem] leading-relaxed transition-colors duration-200 ${
                    open
                      ? 'text-indigo-700 dark:text-indigo-300'
                      : 'text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                  }`}
                >
                  {item.title}
                </span>
              </div>

              {/* Chevron */}
              <div
                className={`flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  open
                    ? 'bg-indigo-100 dark:bg-indigo-500/15 rotate-180'
                    : 'bg-slate-100 dark:bg-white/5 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/10'
                }`}
              >
                <ChevronDown
                  className={`w-4 h-4 transition-colors duration-200 ${
                    open
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-400 group-hover:text-indigo-500'
                  }`}
                />
              </div>
            </motion.button>

            {/* Body */}
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0, filter: 'blur(2px)' }}
                  animate={{ height: 'auto', opacity: 1, filter: 'blur(0px)' }}
                  exit={{ height: 0, opacity: 0, filter: 'blur(2px)' }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-5 border-t border-indigo-100/80 dark:border-indigo-500/20 bg-white/80 dark:bg-slate-950/50">
                    <motion.div
                      initial={{ y: -6, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.06 }}
                      className="text-slate-700 dark:text-slate-200 leading-7"
                    >
                      {item.children}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
