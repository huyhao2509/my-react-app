import React, { useRef, useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
}

interface Genre {
  id: number;
  name: string;
}

interface MoviesListProps {
  title: string;
  data: Movie[];
  genres: Genre[];
}

const SWIPER_BREAKPOINTS = {
  320: { slidesPerView: 1 },
  640: { slidesPerView: 2 },
  1024: { slidesPerView: 3 },
  1280: { slidesPerView: 4 },
} as const;

const MoviesList: React.FC<MoviesListProps> = ({ title, data = [], genres = [] }) => {
  const navigate = useNavigate();
  
  const [firstRowMovies, secondRowMovies] = React.useMemo(() => {
    const midPoint = Math.ceil(data.length / 2);
    return [data.slice(0, midPoint), data.slice(midPoint)];
  }, [data]);

  const mapGenres = useCallback((genreIds: number[]): string => {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name || 'Unknown')
      .join(', ');
  }, [genres]);

  const MovieCard: React.FC<Movie> = React.memo(({ id, title, poster_path, genre_ids }) => (
    <div className="relative group overflow-hidden rounded-lg shadow-lg h-[370px]">
      <img
        src={`${import.meta.env.VITE_IMG_URL}${poster_path}`}
        alt={`Poster of ${title}`}
        className="w-full h-full object-cover aspect-[2/3] group-hover:scale-105 transition-transform duration-300 ease-in-out"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 z-20" />
      <div className="absolute inset-x-0 bottom-0 p-4 z-30">
        <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{mapGenres(genre_ids)}</p>
      </div>
      <button
        className="absolute bottom-4 right-4 z-40 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full p-3 shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
        onClick={() => navigate(`/movie/${id}`)}
        aria-label={`Play ${title}`}
      >
        <Play size={24} />
      </button>
    </div>
  ));

  const MovieCarousel: React.FC<{ movies: Movie[]; rowIndex: number }> = 
    React.memo(({ movies, rowIndex }) => {
    const navigationPrevRef = useRef<HTMLButtonElement>(null);
    const navigationNextRef = useRef<HTMLButtonElement>(null);

    return (
      <div className="relative mt-6">
        <Swiper
          spaceBetween={16}
          slidesPerView={4}
          breakpoints={SWIPER_BREAKPOINTS}
          loop={movies.length >= 5}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onSwiper={(swiper) => {
            // Reassign navigation elements on swiper initialization
            // @ts-ignore
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = navigationNextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard {...movie} />
            </SwiperSlide>
          ))}

          <button
            ref={navigationPrevRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-50 text-white p-3 bg-black/50 hover:bg-black/70 rounded-full shadow-md cursor-pointer transition-colors"
            aria-label="Previous slides"
          >
            ❮
          </button>
          <button
            ref={navigationNextRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-50 text-white p-3 bg-black/50 hover:bg-black/70 rounded-full shadow-md cursor-pointer transition-colors"
            aria-label="Next slides"
          >
            ❯
          </button>
        </Swiper>
      </div>
    );
  });

  return (
    <div className="container mb-10 p-4">
      <div className="border border-gray-700 rounded-lg bg-gradient-to-b from-gray-800/50 to-transparent p-3 mb-4">
        <h2 className="text-white text-2xl font-bold">{title}</h2>
      </div>

      {data.length === 0 ? (
        <p className="text-white text-center">No movies available</p>
      ) : (
        <>
          <MovieCarousel movies={firstRowMovies} rowIndex={0} />
          <MovieCarousel movies={secondRowMovies} rowIndex={1} />
        </>
      )}
    </div>
  );
};

export default MoviesList;
