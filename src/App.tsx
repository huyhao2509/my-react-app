import { useState, useEffect } from 'react';
import Banner from './components/Banner/Banner';
import MoviesList from './components/MoviesList/MoviesList';
import Navbar from './components/Navbar/Navbar';
import React from 'react';

function App() {
  const [movie, setMovie] = useState([]);  // Movies for the Popular section
  const [movieNow, setMovieNow] = useState([]); // Movies for the Now Playing section
  const [genre, setGenre] = useState([]); // Genre list

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
      const url3 = 'https://api.themoviedb.org/3/genre/movie/list?language=vi';

      try {
        const [res1, res2, res3] = await Promise.all([
          fetch(url1, options),
          fetch(url2, options),
          fetch(url3, options)
        ]);

        const data1 = await res1.json(); // Popular movies
        const data2 = await res2.json(); // Now playing movies
        const data3 = await res3.json(); // Genre list

        // Cập nhật state với dữ liệu nhận được từ API
        setMovie(data1.results.slice(0, 10)); // Cập nhật popular movies
        setMovieNow(data2.results.slice(0, 10)); // Cập nhật now playing movies
        setGenre(data3.genres); // Cập nhật genre list

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
      <MoviesList title="Popular Movies" data={movie} genres={genre} />
      {/* <MoviesList title="Movies Now Playing" data={movieNow} getGenres={getGenres} /> */}
    </div>
  );
}

export default App;
