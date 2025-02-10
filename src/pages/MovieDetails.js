import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieVideos, getMovieReviews } from "../services/MoviesService";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");
                const [movieData, videos, reviewsData] = await Promise.all([
                    getMovieDetails(id),
                    getMovieVideos(id),
                    getMovieReviews(id)
                ]);
                if (movieData) {
                    setMovie(movieData);
                    document.title = `${movieData.title} - Chi tiết phim`;
                }
                if (videos?.results) {
                    const youtubeTrailer = videos.results.find((vid) => vid.site === "YouTube" && vid.type === "Trailer");
                    if (youtubeTrailer)
                        setTrailer(youtubeTrailer);
                }
                if (reviewsData?.results) {
                    setReviews(reviewsData.results);
                }
            }
            catch (err) {
                setError("Có lỗi xảy ra khi tải dữ liệu phim");
            }
            finally {
                setLoading(false);
            }
        };
        if (id)
            fetchData();
    }, [id]);
    if (loading) {
        return _jsx("div", { className: "flex items-center justify-center min-h-screen bg-gray-900 text-white text-xl", children: "\u0110ang t\u1EA3i..." });
    }
    if (error) {
        return _jsx("div", { className: "flex items-center justify-center min-h-screen bg-gray-900 text-red-500 text-xl", children: error });
    }
    if (!movie)
        return null;
    const formatDate = (date) => new Date(date).toLocaleDateString('vi-VN');
    return (_jsxs("div", { className: " container text-white bg-customDark min-h-screen", children: [_jsx("div", { className: "relative w-full h-[400px] bg-cover bg-center", style: {
                    backgroundImage: `url(${movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : "/placeholder-backdrop.jpg"})`,
                }, children: _jsx("div", { className: "absolute inset-0 bg-black bg-opacity-50" }) }), _jsxs("div", { className: "container mx-auto px-4 py-8 flex flex-col md:flex-row", children: [_jsx("img", { src: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder-movie.jpg", alt: movie.title, className: "w-72 h-auto rounded-lg shadow-lg" }), _jsxs("div", { className: "ml-0 md:ml-6 mt-4 md:mt-0", children: [_jsx("h1", { className: "text-3xl font-bold", children: movie.title }), _jsx("p", { className: "text-gray-400", children: formatDate(movie.release_date) }), _jsx("p", { className: "mt-2", children: movie.overview || "Chưa có mô tả" }), _jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "text-xl font-semibold", children: "Th\u1EC3 lo\u1EA1i:" }), _jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: movie.genres.map((genre) => (_jsx("span", { className: "px-3 py-1 bg-blue-600 text-white rounded-lg", children: genre.name }, genre.id))) })] }), _jsx("div", { className: "mt-4", children: _jsxs("span", { className: "text-yellow-400 font-bold text-lg", children: ["\u2B50 ", movie.vote_average.toFixed(1), "/10"] }) })] })] }), trailer && (_jsxs("div", { className: "container mx-auto px-4 mt-8", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Trailer" }), _jsx("div", { className: "aspect-video", children: _jsx(ReactPlayer, { url: `https://www.youtube.com/watch?v=${trailer.key}`, controls: true, width: "100%", height: "100%", onError: () => setTrailer(null) }) })] })), _jsxs("div", { className: "container mx-auto px-4 mt-8 pb-8", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "\u0110\u00E1nh gi\u00E1 t\u1EEB ng\u01B0\u1EDDi xem" }), reviews.length > 0 ? (_jsx(Swiper, { modules: [Navigation, Pagination], spaceBetween: 20, slidesPerView: 1, navigation: true, pagination: { clickable: true }, className: "p-4", children: reviews.map((review) => (_jsx(SwiperSlide, { children: _jsxs("div", { className: "p-6 bg-gray-800 rounded-lg shadow-md", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: review.author }), _jsx("span", { className: "text-gray-400 text-sm", children: formatDate(review.created_at) })] }), _jsx("p", { className: "text-gray-300", children: review.content.length > 300 ? review.content.slice(0, 300) + "..." : review.content })] }) }, review.id))) })) : (_jsx("p", { className: "text-gray-400", children: "Ch\u01B0a c\u00F3 \u0111\u00E1nh gi\u00E1 n\u00E0o." }))] })] }));
};
export default MovieDetail;
