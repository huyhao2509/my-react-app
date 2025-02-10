import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
const SWIPER_BREAKPOINTS = {
    320: { slidesPerView: 1 },
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1280: { slidesPerView: 4 },
};
const MoviesList = ({ title, data = [], genres = [], singleRow = false // Giá trị mặc định là false
 }) => {
    const navigate = useNavigate();
    const [firstRowMovies, secondRowMovies] = React.useMemo(() => {
        if (singleRow) {
            // Nếu là single row, trả về tất cả movies trong hàng đầu tiên
            return [data, []];
        }
        // Nếu không, chia đều thành 2 hàng như cũ
        const midPoint = Math.ceil(data.length / 2);
        return [data.slice(0, midPoint), data.slice(midPoint)];
    }, [data, singleRow]);
    const mapGenres = useCallback((genreIds) => {
        return genreIds
            .map((id) => genres.find((genre) => genre.id === id)?.name || 'Unknown')
            .join(', ');
    }, [genres]);
    const MovieCard = React.memo(({ id, title, poster_path, genre_ids }) => (_jsxs("div", { className: "relative group overflow-hidden rounded-lg shadow-lg h-[370px]", children: [_jsx("img", { src: `${import.meta.env.VITE_IMG_URL}${poster_path}`, alt: `Poster of ${title}`, className: "w-full h-full object-cover aspect-[2/3] group-hover:scale-105 transition-transform duration-300 ease-in-out", loading: "lazy" }), _jsx("div", { className: "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 z-20" }), _jsxs("div", { className: "absolute inset-x-0 bottom-0 p-4 z-30", children: [_jsx("h3", { className: "text-white text-xl font-bold mb-2", children: title }), _jsx("p", { className: "text-gray-300 text-sm", children: mapGenres(genre_ids) })] }), _jsx("button", { className: "absolute bottom-4 right-4 z-40 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full p-3 shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0", onClick: () => navigate(`/movie/${id}`), "aria-label": `Play ${title}`, children: _jsx(Play, { size: 24 }) })] })));
    const MovieCarousel = React.memo(({ movies, rowIndex }) => {
        const navigationPrevRef = useRef(null);
        const navigationNextRef = useRef(null);
        if (movies.length === 0)
            return null; // Không render nếu không có phim
        return (_jsx("div", { className: "relative mt-6", children: _jsxs(Swiper, { spaceBetween: 16, slidesPerView: 4, breakpoints: SWIPER_BREAKPOINTS, loop: movies.length >= 5, autoplay: { delay: 4000, disableOnInteraction: false }, modules: [Navigation, Autoplay], navigation: {
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }, onSwiper: (swiper) => {
                    // @ts-ignore
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    // @ts-ignore
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }, children: [movies.map((movie) => (_jsx(SwiperSlide, { children: _jsx(MovieCard, { ...movie }) }, movie.id))), _jsx("button", { ref: navigationPrevRef, className: "absolute left-0 top-1/2 -translate-y-1/2 z-50 text-white p-3 bg-black/50 hover:bg-black/70 rounded-full shadow-md cursor-pointer transition-colors", "aria-label": "Previous slides", children: "\u276E" }), _jsx("button", { ref: navigationNextRef, className: "absolute right-0 top-1/2 -translate-y-1/2 z-50 text-white p-3 bg-black/50 hover:bg-black/70 rounded-full shadow-md cursor-pointer transition-colors", "aria-label": "Next slides", children: "\u276F" })] }) }));
    });
    return (_jsxs("div", { className: "container mb-10 p-4", children: [_jsx("div", { className: "border border-gray-700 rounded-lg bg-gradient-to-b from-gray-800/50 to-transparent p-3 mb-4", children: _jsx("h2", { className: "text-white text-2xl font-bold", children: title }) }), data.length === 0 ? (_jsx("p", { className: "text-white text-center", children: "No movies available" })) : (_jsxs(_Fragment, { children: [_jsx(MovieCarousel, { movies: firstRowMovies, rowIndex: 0 }), !singleRow && _jsx(MovieCarousel, { movies: secondRowMovies, rowIndex: 1 })] }))] }));
};
export default MoviesList;
