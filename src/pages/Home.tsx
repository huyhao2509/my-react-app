import { useState, useEffect } from "react";
import Banner from "../components/Banner/Banner";
import MoviesList from "../components/MoviesList/MoviesList";
import { getPopularMovies, getNowPlayingMovies, getUpcomingMovies, getGenres, getTopRatedMovies } from "../services/MoviesService";
import Footer from "../components/Footer/Footer";
import type { Genre, MovieSummary } from "../types/tmdb";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState<MovieSummary[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<MovieSummary[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<MovieSummary[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<MovieSummary[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const [popularData, nowPlayingData, upcomingData, topRateData, genreData] = await Promise.all([
        getPopularMovies(),
        getNowPlayingMovies(),
        getUpcomingMovies(),
        getTopRatedMovies(), 
        getGenres(),
      ]);

      setPopularMovies(popularData?.results || []);
      setNowPlayingMovies(nowPlayingData?.results || []);
      setUpcomingMovies(upcomingData?.results || []); // Đổi tên từ upcomingMovies thành upcomingData
      setTopRatedMovies(topRateData?.results || []); // Thêm dòng này
      setGenres(genreData?.genres || []);
    };

    fetchMovies();
  }, []);

  return (
    <div className="text-white">
      <Banner />

      <section className="fade-up delay-100">
        <MoviesList title="Popular Movies" data={popularMovies} genres={genres} singleRow={true} />
      </section>

      <section className="fade-up delay-200">
        <MoviesList title="Movies Now Playing" data={nowPlayingMovies} genres={genres} />
      </section>

      <section className="fade-up delay-300">
        <MoviesList title="Upcoming Movies" data={upcomingMovies} genres={genres} />
      </section>

      <section className="fade-up delay-400">
        <MoviesList title="Top Rated Movies" data={topRatedMovies} genres={genres} singleRow={true} />
      </section>

      <Footer />
    </div>
  );
};

export default Home;
