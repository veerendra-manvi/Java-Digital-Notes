import { Lightbulb, XCircle, Star, MessageSquare, CheckCircle2 } from 'lucide-react';

type AlertType = 'interview' | 'mistake' | 'oneliner' | 'analogy' | 'good-answer';

interface InterviewAlertProps {
  type: AlertType;
  title?: string;
  children: React.ReactNode;
}

const config: Record<
  AlertType,
  {
    icon: React.ElementType;
    defaultTitle: string;
    accent: string;
    bg: string;
    border: string;
    bar: string;
    titleColor: string;
  }
> = {
  interview: {
    icon: Star,
    defaultTitle: 'What the Interviewer Wants to Hear',
    accent: '#d97706',
    bg: 'rgba(245,158,11,0.06)',
    border: 'rgba(245,158,11,0.25)',
    bar: 'linear-gradient(180deg,#f59e0b,#d97706)',
    titleColor: '#d97706',
  },
  mistake: {
    icon: XCircle,
    defaultTitle: 'Common Mistake Students Make',
    accent: '#dc2626',
    bg: 'rgba(239,68,68,0.06)',
    border: 'rgba(239,68,68,0.25)',
    bar: 'linear-gradient(180deg,#ef4444,#dc2626)',
    titleColor: '#dc2626',
  },
  oneliner: {
    icon: Lightbulb,
    defaultTitle: 'One-Line Revision',
    accent: '#6366f1',
    bg: 'rgba(99,102,241,0.06)',
    border: 'rgba(99,102,241,0.25)',
    bar: 'linear-gradient(180deg,#818cf8,#6366f1)',
    titleColor: '#6366f1',
  },
  analogy: {
    icon: MessageSquare,
    defaultTitle: 'Real-World Analogy',
    accent: '#7c3aed',
    bg: 'rgba(139,92,246,0.06)',
    border: 'rgba(139,92,246,0.25)',
    bar: 'linear-gradient(180deg,#a78bfa,#7c3aed)',
    titleColor: '#7c3aed',
  },
  'good-answer': {
    icon: CheckCircle2,
    defaultTitle: 'Best 30-Second Answer',
    accent: '#059669',
    bg: 'rgba(16,185,129,0.06)',
    border: 'rgba(16,185,129,0.25)',
    bar: 'linear-gradient(180deg,#34d399,#059669)',
    titleColor: '#059669',
  },
};

export default function InterviewAlert({ type, title, children }: InterviewAlertProps) {
  const { icon: Icon, defaultTitle, bg, border, bar, titleColor } = config[type];
  const label = title ?? defaultTitle;

  return (
    <div
      className="flex gap-0 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
      style={{ border: `1px solid ${border}`, background: bg }}
    >
      {/* Left accent bar */}
      <div
        className="w-1 flex-shrink-0 rounded-l-xl"
        style={{ background: bar }}
      />

      {/* Content */}
      <div className="flex-1 px-4 sm:px-5 py-4">
        <div
          className="flex items-center gap-2 mb-2.5 text-[11px] font-black uppercase tracking-[0.11em]"
          style={{ color: titleColor }}
        >
          <Icon className="w-3.5 h-3.5 flex-shrink-0" />
          {label}
        </div>
        <div className="text-sm text-slate-700 dark:text-slate-200 leading-7">
          {children}
        </div>
      </div>
    </div>
  );
}
