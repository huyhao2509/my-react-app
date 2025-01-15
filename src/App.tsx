import { useState, useEffect } from 'react';
import Banner from './components/Banner/Banner';
import MoviesList from './components/MoviesList/MoviesList';
import Navbar from './components/Navbar/Navbar';
import React from 'react';

function App() {
  const [movie, setMovie] = useState([]);  // Movies for the Popular section
  const [movieNow, setMovieNow] = useState([]); // Movies for the Now Playing section

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        }
      };
      const url1 = 'https://api.themoviedb.org/3/movie/popular?language=vi&page=1';
      const url2 = 'https://api.themoviedb.org/3/movie/now_playing?language=vi&page=1';

      try {
        const [res1, res2] = await Promise.all([
          fetch(url1, options),
          fetch(url2, options)
        ]);

        const data1 = await res1.json(); // Popular movies
        const data2 = await res2.json(); // Now playing movies

        // Cập nhật state với dữ liệu nhận được từ API
        setMovie(data1.results); // Cập nhật popular movies
        setMovieNow(data2.results); // Cập nhật now playing movies

      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, []); // Chạy khi component mount

  return (
    <div className="bg-customDark">
      <Navbar />
      <Banner />
      <MoviesList title="Popular Movies" data={movie} />
      <MoviesList title="Movies Now Playing" data={movieNow} />
    </div>
  );
}

export default App;
