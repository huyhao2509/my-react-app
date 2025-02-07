import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules'; // Sử dụng đường dẫn mới
import 'swiper/css';
import 'swiper/css/navigation';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
}

interface MoviesListProps {
  title: string;
  data: Movie[];
  genres: Genre[];
}

interface Genre {
  id: number;
  name: string;
}

const MoviesList: React.FC<MoviesListProps> = ({ title, data = [], genres = [] }) => {
  // Hàm ánh xạ genre_ids thành tên thể loại
  const mapGenres = (genreIds: number[]): string => {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name || 'Unknown')
      .join(', ');
  };

  return (
    <div className="container mb-10 p-4">
      {/* Section Header */}
      <div className="border border-gray-700 rounded-lg bg-gradient-to-b from-gray-800/50 to-transparent p-3 mb-4">
        <h2 className="text-white text-2xl font-bold">{title}</h2>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        spaceBetween={16}
        slidesPerView={4}
        navigation
        loop
        autoplay={{ delay: 5000 }}
        modules={[Navigation, Autoplay]}
        breakpoints={{
          1024: { slidesPerView: 4 },
          768: { slidesPerView: 3 },
          480: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
      >
        {data.length > 0 ? (
          data.map((item) => {
            // Sử dụng hàm mapGenres với item.genre_ids để lấy tên thể loại
            const genreNames = mapGenres(item.genre_ids);

            return (
              <SwiperSlide key={item.id}>
                <div className="relative group overflow-hidden rounded-lg shadow-lg">
                  {/* Movie Poster */}
                  <img
                    src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`}
                    alt={`Poster of ${item.title}`}
                    className="w-full h-[370px] object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-300"></div>

                  {/* Movie Details */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-between">
                    {/* Movie Title */}
                    <h3 className="text-white text-xl font-bold whitespace-normal break-words drop-shadow-lg">
                      {item.title}
                    </h3>

                    {/* Movie Genre */}
                    <p className="text-gray-300 text-sm mt-2">{genreNames}</p>

                    {/* Play Button */}
                    <div className="flex justify-end mt-2">
                      <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-full p-3 shadow-lg transition-transform duration-300"
                        onClick={() => console.log(`Play movie: ${item.title}`)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 3l14 9-14 9V3z" />
                        </svg>
                      </button>
                    </div>
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
