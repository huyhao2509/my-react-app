import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Sparkles, Trash2 } from "lucide-react";
import { getMovieDetails } from "../services/MoviesService";
import type { MovieDetails } from "../types/tmdb";
import { useFavorites } from "../hooks/useFavorites";

export default function Favorite() {
  const [movies, setMovies] = useState<MovieDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { favoriteIds, removeFavorite, clearFavorites } = useFavorites();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        setError("");

        if (favoriteIds.length === 0) {
          setMovies([]);
          return;
        }

        const favoriteMovies = await Promise.all(
          favoriteIds.map((movieId) => getMovieDetails(String(movieId)))
        );

        setMovies(favoriteMovies.filter(Boolean) as MovieDetails[]);
      } catch {
        setError("Không thể tải danh sách phim yêu thích.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favoriteIds]);

  if (loading) {
    return (
      <div className="container min-h-screen px-4 py-8 md:px-6">
        <div className="glass-panel rounded-2xl p-10 text-center fade-scale">
          <p className="text-lg text-white">Đang tải danh sách yêu thích...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container min-h-screen px-4 py-8 md:px-6">
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-10 text-center text-red-300">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container min-h-screen px-4 py-8 text-white md:px-6">
      <div className="glass-panel mb-8 flex flex-col items-start justify-between gap-4 rounded-3xl p-6 md:flex-row md:items-center">
        <div className="fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-400/10 px-3 py-1 text-xs font-semibold tracking-[0.15em] text-cyan-200">
            <Sparkles size={14} /> YOUR LIBRARY
          </div>
          <h1 className="mt-3 flex items-center gap-2 text-3xl font-extrabold md:text-4xl">
            <Heart className="text-red-400" size={30} />
            <span className="text-gradient">Favorite Movies</span>
          </h1>
          <p className="mt-2 text-gray-300">Các phim bạn đã lưu lại trên trình duyệt này.</p>
        </div>

        {movies.length > 0 && (
          <button
            type="button"
            onClick={clearFavorites}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/15"
          >
            <Trash2 size={16} /> Xóa tất cả
          </button>
        )}
      </div>

      {movies.length === 0 ? (
        <div className="glass-panel rounded-2xl p-10 text-center fade-scale">
          <p className="text-lg text-gray-300">Chưa có phim yêu thích nào.</p>
          <p className="text-gray-500 mt-2">Mở một phim và bấm nút Yêu thích để lưu lại.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="group fade-scale overflow-hidden rounded-2xl border border-white/10 bg-[#171b2a]/80 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-cyan-500/10"
              style={{ animationDelay: `${Math.min(index * 80, 500)}ms` }}
            >
              <Link to={`/movie/${movie.id}`} className="block">
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/banner.png"}
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
              </Link>
              <div className="p-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold line-clamp-2">{movie.title}</h2>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-cyan-300/80">
                    Rating {movie.vote_average.toFixed(1)}/10
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFavorite(movie.id)}
                  className="shrink-0 rounded-full border border-red-300/20 bg-red-500/10 p-2 text-red-300 transition-colors hover:bg-red-500/20"
                  aria-label={`Remove ${movie.title} from favorites`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
