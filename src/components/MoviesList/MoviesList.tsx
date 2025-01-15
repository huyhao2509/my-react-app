import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'; // Sử dụng đường dẫn mới
import 'swiper/css';
import 'swiper/css/navigation';

interface Movie {
  id: number;
  title: string;
  genre: string | string[];
  poster_path: string;
}

interface MoviesListProps {
  title: string;
  data: Movie[];
}

const MoviesList: React.FC<MoviesListProps> = ({ title, data = [] }) => {
  return (
    <div className="container mb-10 px-4">
      {/* Section Header */}
      <div className="border border-gray-700 rounded-lg bg-gradient-to-b from-gray-800/50 to-transparent p-3 mb-5">
        <h2 className="text-white text-2xl font-semibold">{title}</h2>
      </div>

      {/* Swiper */}
      <Swiper
        spaceBetween={16}
        slidesPerView={5}
        navigation
        loop
        modules={[Navigation]}
        breakpoints={{
          1024: { slidesPerView: 5 },
          768: { slidesPerView: 3 },
          480: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
      >
        {data.length > 0 ? (
          data.map((item) => {
            const genres =
              Array.isArray(item.genre) ? item.genre.join(', ') : item.genre;
            return (
              <SwiperSlide key={item.id}>
                <div className="relative w-full h-[350px] group overflow-hidden rounded-lg shadow-md">
                  {/* Movie Poster */}
                  <img
                    src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`}
                    alt={`Poster of ${item.title}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg"
                  />
                  {/* Movie Details */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 via-black/60 to-transparent text-center">
                    <p className="text-white font-bold text-lg truncate">
                      {item.title}
                    </p>
                    <p className="text-gray-300 text-sm truncate">{genres}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <p className="text-white text-center">No movies available</p>
        )}
      </Swiper>
    </div>
  );
};

export default MoviesList;
