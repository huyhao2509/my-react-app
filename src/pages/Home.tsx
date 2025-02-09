import { useState, useEffect } from "react";
import Banner from "../components/Banner/Banner";
import MoviesList from "../components/MoviesList/MoviesList";
import { getPopularMovies, getNowPlayingMovies, getGenres } from "../services/MoviesService";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const [popularData, nowPlayingData, genreData] = await Promise.all([
        getPopularMovies(),
        getNowPlayingMovies(),
        getGenres(),
      ]);

    setPopularMovies(popularData?.results || []);
    setNowPlayingMovies(nowPlayingData?.results || []);
    setGenres(genreData?.genres || []);
    };

    fetchMovies();
  }, []);

  return (
    <div className=" bg-customDark text-white">
      <Banner />
      <MoviesList title="Popular Movies" data={popularMovies} genres={genres}  />
      <MoviesList title="Movies Now Playing" data={nowPlayingMovies} genres={genres} rows={2} />
    </div>
  );
};

export default Home;
