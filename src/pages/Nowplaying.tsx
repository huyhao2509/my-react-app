import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Sparkles } from "lucide-react";
import MoviesList from "../components/MoviesList/MoviesList";
import { getGenres, getNowPlayingMovies } from "../services/MoviesService";
import type { Genre, MovieSummary } from "../types/tmdb";
import MoviesGridSkeleton from "../components/common/MoviesGridSkeleton";
import PaginationControls from "../components/common/PaginationControls";

export default function NowPlaying() {
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);

  const handlePageChange = (nextPage: number) => {
    const normalizedPage = Math.max(1, Math.min(totalPages, nextPage));
    navigate(`/nowplaying?page=${normalizedPage}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [movieData, genreData] = await Promise.all([getNowPlayingMovies(page), getGenres()]);
        setMovies(movieData?.results ?? []);
        setTotalPages(Math.max(1, movieData?.total_pages ?? 1));
        setGenres(genreData?.genres ?? []);
      } catch {
        setError("Không thể tải danh sách phim đang chiếu.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  if (loading) {
    return (
      <div className="container min-h-screen px-4 py-8 md:px-6">
        <div className="mb-6 fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/40 bg-orange-400/10 px-3 py-1 text-xs font-semibold tracking-[0.15em] text-orange-200">
            <Sparkles size={14} /> LIVE NOW
          </div>
          <h1 className="mt-3 text-3xl font-extrabold text-gradient md:text-4xl">Now Playing Movies</h1>
        </div>
        <MoviesGridSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container min-h-screen px-4 py-8 md:px-6">
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-10 text-center text-red-300">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container px-4 pt-8 md:px-6">
        <div className="mb-2 fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/40 bg-orange-400/10 px-3 py-1 text-xs font-semibold tracking-[0.15em] text-orange-200">
            <Sparkles size={14} /> LIVE NOW
          </div>
          <h1 className="mt-3 text-3xl font-extrabold text-gradient md:text-4xl">Now Playing Movies</h1>
        </div>
      </div>
      <MoviesList title="Now Playing Movies" data={movies} genres={genres} singleRow />
      <PaginationControls page={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
