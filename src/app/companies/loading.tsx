export default function CompaniesLoading() {
  return (
    <div className="app-page section-gap animate-pulse">
      {/* Header Skeleton */}
      <div className="app-surface p-10 h-64 bg-slate-100 dark:bg-white/5" />
      
      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="app-surface h-80 bg-slate-100 dark:bg-white/5" />
        ))}
      </div>
    </div>
  );
}
