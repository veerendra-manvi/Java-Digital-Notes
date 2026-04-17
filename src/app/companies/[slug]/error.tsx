'use client';
import Link from 'next/link';
import { AlertTriangle, Home } from 'lucide-react';

export default function CompanyDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="app-page flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mb-6 text-amber-500">
        <AlertTriangle className="w-10 h-10" />
      </div>
      <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Failed to Load Questions</h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
        We couldn't retrieve the questions for this company. This might be due to a network issue or the company slug being invalid.
      </p>
      
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-white/5 font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200"
        >
          Try Again
        </button>
        <Link
          href="/companies"
          className="flex items-center gap-2 px-6 py-3 rounded-2xl btn-gradient font-bold"
        >
          <Home className="w-4 h-4" /> Go Back
        </Link>
      </div>
    </div>
  );
}
