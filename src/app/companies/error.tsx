'use client';
import { useEffect } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function CompaniesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="app-page flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-20 h-20 rounded-3xl bg-rose-500/10 flex items-center justify-center mb-6 text-rose-500">
        <AlertCircle className="w-10 h-10" />
      </div>
      <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Something went wrong!</h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
        We encountered an error while fetching the companies list. Please try again or contact support if the problem persists.
      </p>
      <button
        onClick={() => reset()}
        className="flex items-center gap-2 px-6 py-3 rounded-2xl btn-gradient font-bold"
      >
        <RefreshCcw className="w-4 h-4" /> Try Again
      </button>
    </div>
  );
}
