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
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-xl">Đang tải...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-500 text-xl">{error}</div>;
  }

  if (!movie) return null;

  const formatDate = (date: string) => new Date(date).toLocaleDateString('vi-VN');

  return (
    <div className=" container text-white bg-customDark min-h-screen">
      <div
        className="relative w-full h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : "/placeholder-backdrop.jpg"})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder-movie.jpg"}
          alt={movie.title}
          className="w-72 h-auto rounded-lg shadow-lg"
        />
        <div className="ml-0 md:ml-6 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-400">{formatDate(movie.release_date)}</p>
          <p className="mt-2">{movie.overview || "Chưa có mô tả"}</p>

          <div className="mt-4">
            <h3 className="text-xl font-semibold">Thể loại:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="px-3 py-1 bg-blue-600 text-white rounded-lg">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <span className="text-yellow-400 font-bold text-lg">⭐ {movie.vote_average.toFixed(1)}/10</span>
          </div>
        </div>
      </div>

      {trailer && (
        <div className="container mx-auto px-4 mt-8">
          <h2 className="text-2xl font-bold mb-4">Trailer</h2>
          <div className="aspect-video">
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

      <div className="container mx-auto px-4 mt-8 pb-8">
        <h2 className="text-2xl font-bold mb-4">Đánh giá từ người xem</h2>
        {reviews.length > 0 ? (
          <Swiper modules={[Navigation, Pagination]} spaceBetween={20} slidesPerView={1} navigation pagination={{ clickable: true }} className="p-4">
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="p-6 bg-gray-800 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{review.author}</h3>
                    <span className="text-gray-400 text-sm">{formatDate(review.created_at)}</span>
                  </div>
                  <p className="text-gray-300">{review.content.length > 300 ? review.content.slice(0, 300) + "..." : review.content}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-gray-400">Chưa có đánh giá nào.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
