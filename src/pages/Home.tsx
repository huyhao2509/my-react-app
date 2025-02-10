import { useState, useEffect } from "react";
import Banner from "../components/Banner/Banner";
import MoviesList from "../components/MoviesList/MoviesList";
import { getPopularMovies, getNowPlayingMovies, getUpcomingMovies, getGenres, getTopRatedMovies } from "../services/MoviesService";
import Footer from "../components/Footer/Footer";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genres, setGenres] = useState([]);

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
    <div className="bg-customDark text-white">
      <Banner />
      <MoviesList title="Popular Movies" data={popularMovies} genres={genres} singleRow={true} />
      <MoviesList title="Movies Now Playing" data={nowPlayingMovies} genres={genres}  />
      <MoviesList title="Upcoming Movies" data={upcomingMovies} genres={genres}  />
      <MoviesList title="Top Rated Movies" data={topRatedMovies} genres={genres} singleRow={true} /> 
      <Footer />
    </div>
  );
};

export default Home;
