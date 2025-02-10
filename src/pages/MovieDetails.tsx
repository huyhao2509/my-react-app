import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/MoviesService";

interface MovieDetails {
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        const data = await getMovieDetails(id!);
        if (data) {
          setMovie(data);
          document.title = `${data.title} - Movie Details`;
        } else {
          setError("Không thể tải thông tin phim");
        }
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải dữ liệu");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchMovieDetails();
  }, [id]);

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen bg-customDark">
      <div className="text-white text-xl">Đang tải...</div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen bg-customDark">
      <div className="text-red-500 text-xl">{error}</div>
    </div>
  );

  if (!movie) return null;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('vi-VN');
  };

  return (
    <div className="text-white bg-customDark min-h-screen">
      <div
        className="container relative w-full h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-72 h-auto rounded-lg shadow-lg"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-movie.jpg';
          }}
        />
        <div className="ml-0 md:ml-6 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-400">{formatDate(movie.release_date)}</p>
          <p className="mt-2">{movie.overview || "Chưa có mô tả"}</p>

          <div className="mt-4">
            <h3 className="text-xl font-semibold">Thể loại:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <span className="text-yellow-400 font-bold text-lg">
              ⭐ {movie.vote_average.toFixed(1)}/10
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
