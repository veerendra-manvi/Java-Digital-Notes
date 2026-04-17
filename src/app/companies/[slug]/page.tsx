import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, ChevronRight, LayoutGrid, Terminal, BookOpen, Code2 } from 'lucide-react';
import { CompanyQuestionCard } from '@/components/domain/CompanyQuestionCard';
import { CodingProblemCard } from '@/components/domain/CodingProblemCard';
import { EmptyState } from '@/components/common/EmptyState';
import { prisma } from '@/lib/prisma';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = await prisma.company.findUnique({
    where: { slug },
    select: { name: true }
  });

  return {
    title: `${company?.name || slug.toUpperCase()} Interview Questions | Java Prep`,
    description: `Practice Java interview questions specifically asked at ${company?.name || slug}.`,
  };
}

export default async function CompanyDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { page: pageStr } = await searchParams;
  const page = parseInt(pageStr || '1');
  const limit = 10;
  const skip = (page - 1) * limit;

  // 1. Fetch Company First
  const company = await prisma.company.findUnique({
    where: { slug },
  });

  if (!company) {
    notFound();
  }

  // 2. Fetch Questions (Paginated)
  const [questions, totalQuestions] = await Promise.all([
    prisma.companyQuestion.findMany({
      where: { companyId: company.id, isApproved: true },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.companyQuestion.count({
      where: { companyId: company.id, isApproved: true }
    })
  ]);

  // 3. Fetch Coding Problems
  const codingProblems = await prisma.codingProblem.findMany({
    where: { companyId: company.id, isApproved: true },
    orderBy: { difficulty: 'asc' }
  });

  const totalPages = Math.ceil(totalQuestions / limit);

  return (
    <div className="app-page section-gap">
      {/* Detail Header */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link 
            href="/companies" 
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-all border border-transparent hover:border-indigo-500/20"
          >
            <LayoutGrid className="w-4 h-4" /> All Companies
          </Link>
          
          <div className="px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-black tracking-widest uppercase border border-indigo-500/20">
            {totalQuestions} Questions Found
          </div>
        </div>

        <div className="app-surface p-8 relative overflow-hidden">
          {/* Company Dynamic Gradient BG */}
          <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${company.gradient || 'from-indigo-500 to-purple-600'}`} />
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left">
            <div className="text-7xl drop-shadow-2xl animate-bounce-slow">
              {company.logoEmoji || '🏢'}
            </div>
            <div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-slate-900 dark:text-white mb-3">
                {company.name}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl leading-relaxed italic">
                "{company.summary || 'Prepare with the latest interview patterns and questions.'}"
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
        {/* Left Column: Interview Questions */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Interview Questions</h2>
          </div>

          {questions.length > 0 ? (
            <div className="space-y-6">
              {questions.map((q: any) => (
                <CompanyQuestionCard key={q.id} q={q} />
              ))}
            </div>
          ) : (
            <EmptyState 
              title="No questions available for this company yet" 
              description="We are currently adding more interview content for this company. Please check back soon." 
              icon="search"
            />
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 py-12">
              <Link
                href={page > 1 ? `/companies/${slug}?page=${page - 1}` : '#'}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all ${
                  page > 1 
                    ? 'bg-white dark:bg-white/5 text-indigo-500 hover:bg-indigo-500 hover:text-white border border-slate-200 dark:border-white/10 shadow-sm' 
                    : 'opacity-30 cursor-not-allowed text-slate-400 border border-slate-200 dark:border-white/5'
                }`}
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </Link>
              
              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, i) => {
                  const p = i + 1;
                  return (
                    <Link
                      key={p}
                      href={`/companies/${slug}?page=${p}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl font-black transition-all ${
                        p === page 
                          ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25' 
                          : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                    >
                      {p}
                    </Link>
                  );
                })}
              </div>

              <Link
                href={page < totalPages ? `/companies/${slug}?page=${page + 1}` : '#'}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all ${
                  page < totalPages 
                    ? 'bg-white dark:bg-white/5 text-indigo-500 hover:bg-indigo-500 hover:text-white border border-slate-200 dark:border-white/10 shadow-sm' 
                    : 'opacity-30 cursor-not-allowed text-slate-400 border border-slate-200 dark:border-white/5'
                }`}
              >
                Next <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Right Column: Coding Problems */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
              <Code2 className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Coding Challenges</h2>
          </div>

          {codingProblems.length > 0 ? (
            <div className="space-y-4">
              {codingProblems.map((cp: any) => (
                <CodingProblemCard key={cp.id} cp={cp} />
              ))}
            </div>
          ) : (
            <EmptyState 
              title="No coding problems yet" 
              description="Stay tuned! Coding challenges for this company are being added." 
            />
          )}

          {/* Tips Card */}
          <div className="app-surface p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none shadow-xl shadow-indigo-500/20">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-5 h-5" />
              <span className="font-black uppercase tracking-widest text-xs">Interview Tip</span>
            </div>
            <p className="text-sm font-medium leading-relaxed opacity-90">
              For {company.name}, focus on Java Collection Framework internals and Multithreading. Most coding problems revolve around optimized String and Array manipulation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
