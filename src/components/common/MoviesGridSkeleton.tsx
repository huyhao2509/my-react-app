interface MoviesGridSkeletonProps {
  count?: number;
}

export default function MoviesGridSkeleton({ count = 6 }: MoviesGridSkeletonProps) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-[#171b2a]/80"
        >
          <div className="h-[330px] bg-slate-700/50" />
          <div className="space-y-3 p-4">
            <div className="h-4 rounded bg-slate-700/70" />
            <div className="h-3 w-2/3 rounded bg-slate-700/50" />
          </div>
        </div>
      ))}
    </div>
  );
}
