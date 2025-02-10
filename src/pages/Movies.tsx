import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPopularMovies } from "../services/MoviesService"; // Hàm API lấy danh sách phim phổ biến

// Định nghĩa kiểu dữ liệu cho một phim
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  // Bạn có thể thêm các trường khác như release_date, overview, v.v.
}

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");
        // Gọi API thật để lấy danh sách phim phổ biến
        const data = await getPopularMovies();
        if (data && data.results) {
          setMovies(data.results);
        } else {
          setError("Không có dữ liệu phim.");
        }
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu phim.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-white text-center">
        Đang tải...
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
    <div className="container p-8 bg-customDark min-h-screen">
      <h1 className="text-3xl font-bold text-white text-center mb-4">🎬 Movies</h1>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          // Mỗi phim được bọc bởi Link, khi bấm sẽ chuyển đến trang chi tiết phim (route: /movie/:id)
          <Link to={`/movie/${movie.id}`} key={movie.id} className="block">
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:opacity-80 transition">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-white">{movie.title}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
