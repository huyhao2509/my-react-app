import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieVideos, getMovieReviews } from "../services/MoviesService";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface MovieDetails {
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}

interface Video {
  key: string;
  site: string;
  type: string;
}

interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
}

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [trailer, setTrailer] = useState<Video | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        
        const [movieData, videos, reviewsData] = await Promise.all([
          getMovieDetails(id!),
          getMovieVideos(id!),
          getMovieReviews(id!)
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
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu phim");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-blue-500/40 rounded-full animate-bounce" />
          </div>
          <p className="text-white text-xl font-medium">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <div className="bg-red-500/10 px-6 py-4 rounded-lg border border-red-500/20">
          <p className="text-red-500 text-xl">{error}</p>
        </div>
      </div>
    );
  }

  if (!movie) return null;

  const formatDate = (date: string) => new Date(date).toLocaleDateString('vi-VN');

  return (
    <div className="container min-h-screen bg-customDark text-white">
      {/* Hero Section */}
      <div className="relative h-[600px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-1000 hover:scale-110"
          style={{
            backgroundImage: `url(${movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : "/placeholder-backdrop.jpg"})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
        </div>
        
        {/* Movie Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto flex flex-col md:flex-row items-end gap-8">
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder-movie.jpg"}
              alt={movie.title}
              className="w-64 rounded-xl shadow-2xl ring-4 ring-white/10 transform hover:scale-105 transition-all duration-300"
            />
            <div className="flex-1 mb-4">
              <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                {movie.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-lg mb-6">
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                  <span className="text-blue-400">Ngày phát hành:</span>
                  <span>{formatDate(movie.release_date)}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                  <span className="text-yellow-400">⭐</span>
                  <span>{movie.vote_average.toFixed(1)}/10</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-full 
                             hover:bg-blue-500/30 transition-colors duration-300 cursor-default"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
                {movie.overview || "Chưa có mô tả"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Section */}
      {trailer && (
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Trailer
          </h2>
          <div className="aspect-video rounded-xl overflow-hidden ring-4 ring-white/10">
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
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
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
                <div className="p-8 bg-white/5 backdrop-blur-sm rounded-xl ring-1 ring-white/20 hover:ring-white/30 transition-all">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-blue-400">{review.author}</h3>
                    <span className="text-gray-400">{formatDate(review.created_at)}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {review.content.length > 300 ? review.content.slice(0, 300) + "..." : review.content}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-xl">
            <p className="text-gray-400 text-lg">Chưa có đánh giá nào.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
