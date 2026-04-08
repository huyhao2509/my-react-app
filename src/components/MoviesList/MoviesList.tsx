import React, { useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import type { Genre, MovieSummary } from '../../types/tmdb';

interface MoviesListProps {
  title: string;
  data: MovieSummary[];
  genres: Genre[];
  singleRow?: boolean;
}

const SWIPER_BREAKPOINTS = {
  320: { slidesPerView: 1 },
  640: { slidesPerView: 2 },
  1024: { slidesPerView: 3 },
  1280: { slidesPerView: 4 },
} as const;

const MoviesList: React.FC<MoviesListProps> = ({ 
  title, 
  data = [], 
  genres = [],
  singleRow = false
}) => {
  const navigate = useNavigate();
  
  const [firstRowMovies, secondRowMovies] = React.useMemo(() => {
    if (singleRow) {
      return [data, []];
    }
    const midPoint = Math.ceil(data.length / 2);
    return [data.slice(0, midPoint), data.slice(midPoint)];
  }, [data, singleRow]);

  const mapGenres = useCallback((genreIds: number[]): string => {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name || 'Unknown')
      .join(', ');
  }, [genres]);

  const MovieCard: React.FC<MovieSummary> = React.memo(({ id, title, poster_path, genre_ids }) => (
    <div className="group relative h-[340px] overflow-hidden rounded-2xl border border-white/10 bg-[#171b2a]/80 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-cyan-500/10 md:h-[370px]">
      <img
        src={poster_path ? `${import.meta.env.VITE_IMG_URL}${poster_path}` : "/banner.png"}
        alt={`Poster of ${title}`}
        className="h-full w-full object-cover aspect-[2/3] transition-transform duration-500 ease-out group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/60 to-transparent opacity-85" />
      <div className="absolute inset-x-0 bottom-0 z-20 p-4">
        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white md:text-xl">{title}</h3>
        <p className="line-clamp-1 text-xs text-gray-300 md:text-sm">{mapGenres(genre_ids)}</p>
      </div>
      <button
        className="absolute bottom-4 right-4 z-30 rounded-full border border-white/20 bg-cyan-400/80 p-3 text-black shadow-lg transition-all duration-300 opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-cyan-300"
        onClick={() => navigate(`/movie/${id}`)}
        aria-label={`Play ${title}`}
      >
        <Play size={20} />
      </button>
    </div>
  ));

  const MovieCarousel: React.FC<{ movies: MovieSummary[] }> = 
    React.memo(({ movies }) => {
    const navigationPrevRef = useRef<HTMLButtonElement>(null);
    const navigationNextRef = useRef<HTMLButtonElement>(null);

    if (movies.length === 0) return null;

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
            if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
            }
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
            className="absolute left-0 top-1/2 z-50 -translate-y-1/2 cursor-pointer rounded-full border border-white/20 bg-black/50 p-2 text-white shadow-md transition-colors hover:bg-black/70"
            aria-label="Previous slides"
          >
            ❮
          </button>
          <button
            ref={navigationNextRef}
            className="absolute right-0 top-1/2 z-50 -translate-y-1/2 cursor-pointer rounded-full border border-white/20 bg-black/50 p-2 text-white shadow-md transition-colors hover:bg-black/70"
            aria-label="Next slides"
          >
            ❯
          </button>
        </Swiper>
      </div>
    );
  });

  return (
    <div className="container mb-10 px-4 md:px-6">
      <div className="glass-panel mb-4 rounded-2xl p-4 shadow-lg md:p-5">
        <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
      </div>

      {data.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-white/5 py-8 text-center text-gray-300">No movies available</p>
      ) : (
        <>
          <MovieCarousel movies={firstRowMovies} />
          {!singleRow && <MovieCarousel movies={secondRowMovies} />}
        </>
      )}
    </div>
  );
};

export default MoviesList;
