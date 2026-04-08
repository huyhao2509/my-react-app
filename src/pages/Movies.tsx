import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getPopularMovies, searchMovies } from "../services/MoviesService";
import type { MovieSummary } from "../types/tmdb";
import MoviesGridSkeleton from "../components/common/MoviesGridSkeleton";
import PaginationControls from "../components/common/PaginationControls";

export default function Movies() {
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.trim() ?? "";
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);

  const handlePageChange = (nextPage: number) => {
    const normalizedPage = Math.max(1, Math.min(totalPages, nextPage));
    const params = new URLSearchParams(searchParams);
    params.set("page", String(normalizedPage));
    navigate(`/movies?${params.toString()}`);
  };

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");
        const data = query ? await searchMovies(query, page) : await getPopularMovies(page);
        if (data && data.results) {
          setMovies(data.results);
          setTotalPages(Math.max(1, data.total_pages || 1));
        } else {
          setMovies([]);
          setTotalPages(1);
          setError("Không có dữ liệu phim.");
        }
      } catch {
        setError("Có lỗi xảy ra khi tải dữ liệu phim.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query, page]);

  if (loading) {
    return (
      <div className="container min-h-screen px-4 py-8 md:px-6">
        <h1 className="text-center text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl">
          {query ? `Search results for "${query}"` : "Discover Movies"}
        </h1>
        <p className="mt-2 text-center text-sm text-gray-400 md:text-base">
          Bộ sưu tập phim được cập nhật theo thời gian thực.
        </p>
        <MoviesGridSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-white text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container min-h-screen px-4 py-8 md:px-6">
      <h1 className="text-center text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl">
        {query ? `Search results for "${query}"` : "Discover Movies"}
      </h1>
      <p className="mt-2 text-center text-sm text-gray-400 md:text-base">
        {query ? "Kết quả tìm kiếm theo từ khóa của bạn." : "Chọn phim bạn thích và khám phá ngay."}
      </p>

      {movies.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-gray-300 backdrop-blur-md">
          Không tìm thấy phim phù hợp.
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {movies.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id} className="block">
                <div className="group overflow-hidden rounded-2xl border border-white/10 bg-[#171b2a]/80 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-cyan-500/10">
                  <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/banner.png"}
                    alt={movie.title}
                    className="h-[280px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[330px]"
                  />
                  <div className="p-4">
                    <h2 className="line-clamp-2 text-lg font-semibold text-white">{movie.title}</h2>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-cyan-300/80">Movie Details</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <PaginationControls page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
}
