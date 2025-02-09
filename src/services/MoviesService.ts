const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;

const fetchFromAPI = async (endpoint: string) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${endpoint}`, options);
    return res.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
};

export const getPopularMovies = async () => fetchFromAPI("movie/popular?language=vi&page=1");
export const getNowPlayingMovies = async () => fetchFromAPI("movie/now_playing?language=vi&page=1");
export const getUpcomingMovies = async () => fetchFromAPI("movie/upcoming?language=vi&page=1");
export const getTopRatedMovies = async () => fetchFromAPI("movie/top_rated?language=vi&page=1");
export const getGenres = async () => fetchFromAPI("genre/movie/list?language=vi");
