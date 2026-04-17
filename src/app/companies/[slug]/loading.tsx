export default function CompanyDetailLoading() {
  return (
    <div className="app-page section-gap animate-pulse">
      {/* Header Skeleton */}
      <div className="h-10 w-32 bg-slate-100 dark:bg-white/5 rounded-xl mb-4" />
      <div className="app-surface h-48 bg-slate-100 dark:bg-white/5" />
      
      {/* Questions Skeleton */}
      <div className="space-y-6 pt-10">
        {[1, 2, 3].map((i) => (
          <div key={i} className="app-surface h-52 bg-slate-100 dark:bg-white/5" />
        ))}
      </div>
    </div>
  );
}
