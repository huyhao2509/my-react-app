import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';  
import 'swiper/css/navigation'; 
import { Navigation } from 'swiper'; 


interface Movie {
  id: number;
  title: string;
  genre: string | string[]; // genre có thể là mảng hoặc chuỗi
  poster_path: string;
}

interface MoviesListProps {
  title: string;
  data: Movie[]; // data là mảng các đối tượng Movie
}

const MoviesList: React.FC<MoviesListProps> = ({ title, data = [] }) => {
  return (
    <div className="container mb-10">
      {/* Thanh tiêu đề với viền riêng */}
      <div className="border border-gray-800 rounded-sm bg-gradient-to-b from-gray-800/50 to-transparent p-3">
        <h2 className="text-white text-xl font-medium">{title}</h2>
      </div>

      {/* Danh sách hình ảnh với Swiper */}
      <Swiper
        spaceBetween={10} 
        slidesPerView={5} 
        navigation 
        loop 
        breakpoints={{
          1024: {
            slidesPerView: 5,
          },
          768: {
            slidesPerView: 3,
          },
          480: {
            slidesPerView: 2,
          },
        }}
      >
        {data.length > 0 ? (
          data.map((item) => {
            const genres =
              Array.isArray(item.genre) ? item.genre.join(', ') : item.genre; // Xử lý nếu genre là mảng
            return (
              <SwiperSlide key={item.id}>
                <div className="relative w-[250px] h-[290px] group overflow-hidden">
                  {/* Overlay mờ */}
                  <div className="transition-transform duration-500 ease-in-out">
                    <div className="absolute top-0 left-0 w-full h-full bg-black/10 z-10" />
                    {/* Hình ảnh */}
                    <img
                      src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`}
                      alt={`Poster of ${item.title}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out z-0"
                    />
                    {/* Tên và thể loại phim */}
                    <div className="absolute bottom-4 left-5 z-20">
                      <p className="text-white font-bold text-2xl">{item.title}</p>
                      <p className="text-white text-lg font-normal">{genres}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <p className="text-white">No movies available</p> // Nếu không có dữ liệu, hiển thị thông báo
        )}
      </Swiper>
    </div>
  );
};

export default MoviesList;
