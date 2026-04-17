import { Metadata } from 'next';
import { Building2, Search, Filter } from 'lucide-react';
import { CompanyCard } from '@/components/domain/CompanyCard';
import { EmptyState } from '@/components/common/EmptyState';

export const metadata: Metadata = {
  title: 'Companies | Java Interview Prep',
  description: 'Practice Java interview questions from top companies like FAANG, Tier-1, and MNCs.',
};

async function getCompanies() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/companies`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch companies');
  return res.json();
}

export default async function CompaniesPage() {
  const companies = await getCompanies();

  return (
    <div className="app-page section-gap">
      {/* Header */}
      <div className="app-surface p-8 sm:p-10 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/20">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Target Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Dream Company</span>
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl leading-relaxed">
            Browse and practice actual Java interview questions from top tech companies. 
            Organized by difficulty, category, and freqency.
          </p>
        </div>
      </div>

      {/* Grid Content */}
      {companies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {companies.map((company: any) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="No Companies Found" 
          description="We are currently adding more companies to our database. Check back soon!" 
        />
      )}

      {/* Basic Stats Summary (Optional) */}
      <div className="py-10 border-t border-slate-200 dark:border-white/5 flex flex-wrap gap-8 justify-center">
        <div className="text-center">
          <div className="text-3xl font-black text-slate-900 dark:text-white">{companies.length}</div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Companies</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {companies.reduce((acc: number, c: any) => acc + (c._count?.questions || 0), 0)}
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Questions</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {companies.filter((c: any) => c.tier === 'FAANG').length}
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">FAANG Partners</div>
        </div>
      </div>
    </div>
  );
}
