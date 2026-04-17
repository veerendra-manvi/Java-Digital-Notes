import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, ChevronRight, LayoutGrid, Terminal, BookOpen, Code2 } from 'lucide-react';
import { CompanyQuestionCard } from '@/components/domain/CompanyQuestionCard';
import { CodingProblemCard } from '@/components/domain/CodingProblemCard';
import { EmptyState } from '@/components/common/EmptyState';
import { prisma } from '@/lib/prisma';
import { CompanyQuestion, CodingProblem } from '@prisma/client';

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

  // Fetch Company
  const company = await prisma.company.findUnique({
    where: { slug },
  });

  if (!company) {
    notFound();
  }

  // Fetch Questions
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

  // Fetch Coding Problems
  const codingProblems = await prisma.codingProblem.findMany({
    where: { companyId: company.id, isApproved: true },
    orderBy: { difficulty: 'asc' }
  });

  const totalPages = Math.ceil(totalQuestions / limit);

  return (
    <div className="app-page section-gap">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link href="/companies" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-500">
            <LayoutGrid className="w-4 h-4" /> All Companies
          </Link>

          <div className="px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-black uppercase">
            {totalQuestions} Questions Found
          </div>
        </div>

        <div className="app-surface p-8 relative">
          <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${company.gradient || 'from-indigo-500 to-purple-600'}`} />

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="text-7xl">{company.logoEmoji || '🏢'}</div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white">
                {company.name}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 italic">
                "{company.summary || 'Prepare with the latest interview patterns.'}"
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">

        {/* Questions */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-black">Interview Questions</h2>

          {questions.length > 0 ? (
            <div className="space-y-6">
              {questions.map((q: CompanyQuestion) => (
                <CompanyQuestionCard key={q.id} q={q} />
              ))}
            </div>
          ) : (
            <EmptyState title="No questions yet" description="Coming soon" />
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-4">
              <Link href={page > 1 ? `/companies/${slug}?page=${page - 1}` : '#'}>
                <ChevronLeft />
              </Link>

              {[...Array(totalPages)].map((_, i) => {
                const p = i + 1;
                return (
                  <Link key={p} href={`/companies/${slug}?page=${p}`}>
                    {p}
                  </Link>
                );
              })}

              <Link href={page < totalPages ? `/companies/${slug}?page=${page + 1}` : '#'}>
                <ChevronRight />
              </Link>
            </div>
          )}
        </div>

        {/* Coding */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black">Coding Challenges</h2>

          {codingProblems.length > 0 ? (
            codingProblems.map((cp: CodingProblem) => (
              <CodingProblemCard key={cp.id} cp={cp} />
            ))
          ) : (
            <EmptyState 
              title="No coding problems yet" 
              description="Stay tuned! Coding challenges for this company are being added." 
            />
          )}

          <div className="p-4 bg-indigo-500 text-white rounded-xl">
            Tip: Focus on Collections & Multithreading
          </div>
        </div>

      </div>
    </div>
  );
}