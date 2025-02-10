const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;

const fetchFromAPI = async (endpoint: string) => {
  const url = `${API_BASE_URL}/${endpoint}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`❌ Error fetching ${endpoint}:`, error);
    return null;
  }
};

export const getPopularMovies = async (page = 1) => fetchFromAPI(`movie/popular?language=vi&page=${page}`);
export const getNowPlayingMovies = async (page = 1) => fetchFromAPI(`movie/now_playing?language=vi&page=${page}`);
export const getUpcomingMovies = async (page = 1) => fetchFromAPI(`movie/upcoming?language=vi&page=${page}`);
export const getTopRatedMovies = async (page = 1) => fetchFromAPI(`movie/top_rated?language=vi&page=${page}`);
export const getGenres = async () => fetchFromAPI("genre/movie/list?language=vi");
export const getMovieDetails = async (movieId: string) => fetchFromAPI(`movie/${movieId}?language=vi`);
export const getMovieVideos = async (movieId: string) => fetchFromAPI(`movie/${movieId}/videos`);
export const getMovieReviews = async (movieId: string) => fetchFromAPI(`movie/${movieId}/reviews?language=vi`);
