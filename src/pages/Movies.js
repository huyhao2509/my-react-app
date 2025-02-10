import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPopularMovies } from "../services/MoviesService"; // Hàm API lấy danh sách phim phổ biến
export default function Movies() {
    const [movies, setMovies] = useState([]);
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
                }
                else {
                    setError("Không có dữ liệu phim.");
                }
            }
            catch (err) {
                setError("Có lỗi xảy ra khi tải dữ liệu phim.");
            }
            finally {
                setLoading(false);
            }
        }
        fetchMovies();
    }, []);
    if (loading) {
        return (_jsx("div", { className: "p-8 text-white text-center", children: "\u0110ang t\u1EA3i..." }));
    }
    if (error) {
        return (_jsx("div", { className: "p-8 text-white text-center text-red-500", children: error }));
    }
    return (_jsxs("div", { className: "container p-8 bg-customDark min-h-screen", children: [_jsx("h1", { className: "text-3xl font-bold text-white text-center mb-4", children: "\uD83C\uDFAC Movies" }), _jsx("div", { className: "mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4", children: movies.map((movie) => (
                // Mỗi phim được bọc bởi Link, khi bấm sẽ chuyển đến trang chi tiết phim (route: /movie/:id)
                _jsx(Link, { to: `/movie/${movie.id}`, className: "block", children: _jsxs("div", { className: "bg-gray-800 rounded-lg overflow-hidden shadow-md hover:opacity-80 transition", children: [_jsx("img", { src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, alt: movie.title, className: "w-full h-full object-cover" }), _jsx("div", { className: "p-4", children: _jsx("h2", { className: "text-xl font-semibold text-white", children: movie.title }) })] }) }, movie.id))) })] }));
}
