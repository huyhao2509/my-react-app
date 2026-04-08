import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails, getMovieVideos, getMovieReviews, getSimilarMovies } from "../services/MoviesService";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import { Check, Heart, HeartOff, Play, Share2 } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { MovieDetails, MovieSummary, Review, Video } from "../types/tmdb";
import { useFavorites } from "../hooks/useFavorites";
import MoviesGridSkeleton from "../components/common/MoviesGridSkeleton";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [trailer, setTrailer] = useState<Video | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [similarMovies, setSimilarMovies] = useState<MovieSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [shareToast, setShareToast] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();
  const trailerSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Không tìm thấy id phim");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        
        const [movieData, videos, reviewsData, similarData] = await Promise.all([
          getMovieDetails(id),
          getMovieVideos(id),
          getMovieReviews(id),
          getSimilarMovies(id),
        ]);

        if (movieData) {
          setMovie(movieData);
          document.title = `${movieData.title} - Chi tiết phim`;
        }

        if (videos?.results) {
          const youtubeTrailer = videos.results.find(
            (vid: Video) => vid.site === "YouTube" && vid.type === "Trailer"
          );
          if (youtubeTrailer) setTrailer(youtubeTrailer);
        }

        if (reviewsData?.results) {
          setReviews(reviewsData.results);
        }

        if (similarData?.results) {
          setSimilarMovies(similarData.results.slice(0, 8));
        }
      } catch {
        setError("Có lỗi xảy ra khi tải dữ liệu phim");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="container min-h-screen px-4 py-6 pb-24 text-white md:px-6 md:pb-8">
        <div className="animate-pulse h-[520px] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#171b2a]/80 md:h-[620px]" />
        <div className="mt-10 h-8 w-48 animate-pulse rounded bg-slate-700/60" />
        <div className="mt-5 aspect-video w-full animate-pulse rounded-2xl border border-white/10 bg-[#171b2a]/80" />
        <div className="mt-10 h-8 w-56 animate-pulse rounded bg-slate-700/60" />
        <div className="mt-5 space-y-4">
          <div className="h-28 animate-pulse rounded-2xl border border-white/10 bg-[#171b2a]/80" />
          <div className="h-28 animate-pulse rounded-2xl border border-white/10 bg-[#171b2a]/80" />
        </div>
        <MoviesGridSkeleton count={4} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#0f111a] to-black px-4">
        <div className="bg-red-500/10 px-6 py-4 rounded-lg border border-red-500/20">
          <p className="text-red-500 text-xl">{error}</p>
        </div>
      </div>
    );
  }

  if (!movie) return null;

  const formatDate = (date: string) => new Date(date).toLocaleDateString('vi-VN');
  const scrollToTrailer = () => {
    trailerSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleShare = async () => {
    const shareData = {
      title: movie.title,
      text: `Xem phim ${movie.title} trên MovieVennie`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareToast("Đã mở chia sẻ");
        window.setTimeout(() => setShareToast(""), 1800);
        return;
      }

      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setShareToast("Đã copy link phim");
      window.setTimeout(() => setCopied(false), 1800);
      window.setTimeout(() => setShareToast(""), 1800);
    } catch {
      // Ignore share cancellation errors.
    }
  };

  return (
    <div className="container min-h-screen px-4 py-6 pb-24 text-white md:px-6 md:pb-8">
      {shareToast && (
        <div className="fixed right-4 top-4 z-50 fade-scale">
          <div className="glass-panel inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-cyan-100 shadow-xl">
            <Check size={16} /> {shareToast}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-[520px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl md:h-[620px]">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000 hover:scale-110"
          style={{
            backgroundImage: `url(${movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : "/banner.png"})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#090b12] via-[#090b12]/80 to-transparent" />
        </div>
        
        {/* Movie Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="container mx-auto flex flex-col md:flex-row items-end gap-6 md:gap-8">
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/banner.png"}
              alt={movie.title}
              className="w-40 rounded-2xl shadow-2xl ring-2 ring-white/20 transition-all duration-300 hover:scale-105 sm:w-52 md:w-64"
            />
            <div className="mb-2 flex-1 md:mb-4">
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gradient md:mb-6 md:text-5xl">
                {movie.title}
              </h1>
              <div className="mb-6 flex flex-wrap gap-3 text-sm md:gap-4 md:text-base">
                <div className="glass-panel flex items-center gap-2 rounded-full px-4 py-2">
                  <span className="text-cyan-300">Ngày phát hành:</span>
                  <span>{formatDate(movie.release_date)}</span>
                </div>
                <div className="glass-panel flex items-center gap-2 rounded-full px-4 py-2">
                  <span className="text-orange-300">⭐</span>
                  <span>{movie.vote_average.toFixed(1)}/10</span>
                </div>
                <button
                  type="button"
                  onClick={() => toggleFavorite(movie.id)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 transition-colors duration-300 ${
                    isFavorite(movie.id)
                      ? "bg-red-500/20 border-red-400/40 text-red-300"
                      : "glass-panel text-gray-100 hover:bg-white/10"
                  }`}
                >
                  {isFavorite(movie.id) ? <HeartOff size={18} /> : <Heart size={18} />}
                  <span>{isFavorite(movie.id) ? "Bỏ yêu thích" : "Yêu thích"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="glass-panel flex items-center gap-2 rounded-full border px-4 py-2 text-gray-100 transition hover:bg-white/10"
                >
                  {copied ? <Check size={18} /> : <Share2 size={18} />}
                  <span>{copied ? "Đã copy link" : "Chia sẻ"}</span>
                </button>
              </div>
              <div className="mb-6 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="cursor-default rounded-full border border-cyan-400/30 bg-cyan-400/15 px-3 py-1 text-xs text-cyan-200 transition-colors duration-300 hover:bg-cyan-400/20 md:px-4 md:py-2 md:text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className="max-w-3xl text-sm leading-relaxed text-gray-200 md:text-lg">
                {movie.overview || "Chưa có mô tả"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Section */}
      {trailer && (
        <div ref={trailerSectionRef} className="container mx-auto px-0 py-12 md:py-16">
          <h2 className="mb-6 text-2xl font-bold text-gradient md:mb-8 md:text-3xl">
            Trailer
          </h2>
          <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 shadow-xl">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer.key}`}
              controls
              width="100%"
              height="100%"
              onError={() => setTrailer(null)}
            />
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="container mx-auto px-0 py-12 md:py-16">
        <h2 className="mb-6 text-2xl font-bold text-gradient md:mb-8 md:text-3xl">
          Đánh giá từ người xem
        </h2>
        {reviews.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="p-4"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="glass-panel rounded-2xl p-5 transition-all hover:border-white/30 md:p-8">
                  <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-lg font-semibold text-cyan-300 md:text-xl">{review.author}</h3>
                    <span className="text-sm text-gray-400">{formatDate(review.created_at)}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-300 md:text-base">
                    {review.content.length > 300 ? review.content.slice(0, 300) + "..." : review.content}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="glass-panel rounded-2xl py-12 text-center">
            <p className="text-gray-400 text-lg">Chưa có đánh giá nào.</p>
          </div>
        )}
      </div>

      {/* Similar Movies */}
      {similarMovies.length > 0 && (
        <div className="container mx-auto px-0 py-6 md:py-10">
          <h2 className="mb-6 text-2xl font-bold text-gradient md:mb-8 md:text-3xl">
            Similar Movies
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {similarMovies.map((similarMovie) => (
              <Link
                key={similarMovie.id}
                to={`/movie/${similarMovie.id}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#171b2a]/80 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40"
              >
                <img
                  src={
                    similarMovie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`
                      : "/banner.png"
                  }
                  alt={similarMovie.title}
                  loading="lazy"
                  className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-64"
                />
                <div className="p-3">
                  <h3 className="line-clamp-2 text-sm font-semibold text-white sm:text-base">
                    {similarMovie.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Sticky Action */}
      <div className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-1.5rem)] -translate-x-1/2 md:hidden">
        <div className="glass-panel flex items-center gap-3 rounded-2xl p-2">
          <button
            type="button"
            onClick={() => toggleFavorite(movie.id)}
            className={`flex-1 rounded-xl px-3 py-3 text-sm font-semibold transition ${
              isFavorite(movie.id)
                ? "bg-red-500/20 text-red-300 border border-red-400/30"
                : "bg-white/10 text-white border border-white/15"
            }`}
          >
            <span className="inline-flex items-center justify-center gap-2">
              {isFavorite(movie.id) ? <HeartOff size={16} /> : <Heart size={16} />}
              {isFavorite(movie.id) ? "Bỏ thích" : "Yêu thích"}
            </span>
          </button>
          {trailer && (
            <button
              type="button"
              onClick={scrollToTrailer}
              className="flex-1 rounded-xl border border-cyan-300/40 bg-cyan-400/20 px-3 py-3 text-sm font-semibold text-cyan-100"
            >
              <span className="inline-flex items-center justify-center gap-2">
                <Play size={16} /> Trailer
              </span>
            </button>
          )}
          <button
            type="button"
            onClick={handleShare}
            className="rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-sm font-semibold text-white"
            aria-label="Chia sẻ phim"
          >
            {copied ? <Check size={16} /> : <Share2 size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
