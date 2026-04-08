interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControls({
  page,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  const safeTotalPages = Math.max(1, totalPages);

  return (
    <div className="mt-8 flex flex-col items-stretch justify-center gap-3 text-white sm:flex-row sm:flex-wrap sm:items-center">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Trang trước
      </button>

      <span className="rounded-xl border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
        Trang {page} / {safeTotalPages}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= safeTotalPages}
        className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Trang sau
      </button>
    </div>
  );
}
