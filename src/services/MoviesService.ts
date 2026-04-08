import { fetchFromAPI } from "./tmdbClient";
import type {
  ApiListResponse,
  GenreListResponse,
  MovieDetails,
  MovieSummary,
  Review,
  Video,
} from "../types/tmdb";

export const getPopularMovies = async (page = 1) =>
  fetchFromAPI<ApiListResponse<MovieSummary>>(`movie/popular?language=vi&page=${page}`);
export const searchMovies = async (query: string, page = 1) =>
  fetchFromAPI<ApiListResponse<MovieSummary>>(
    `search/movie?query=${encodeURIComponent(query)}&language=vi&page=${page}`
  );
export const getNowPlayingMovies = async (page = 1) =>
  fetchFromAPI<ApiListResponse<MovieSummary>>(`movie/now_playing?language=vi&page=${page}`);
export const getUpcomingMovies = async (page = 1) =>
  fetchFromAPI<ApiListResponse<MovieSummary>>(`movie/upcoming?language=vi&page=${page}`);
export const getTopRatedMovies = async (page = 1) =>
  fetchFromAPI<ApiListResponse<MovieSummary>>(`movie/top_rated?language=vi&page=${page}`);
export const getGenres = async () =>
  fetchFromAPI<GenreListResponse>("genre/movie/list?language=vi");
export const getMovieDetails = async (movieId: string) =>
  fetchFromAPI<MovieDetails>(`movie/${movieId}?language=vi`);
export const getSimilarMovies = async (movieId: string, page = 1) =>
  fetchFromAPI<ApiListResponse<MovieSummary>>(
    `movie/${movieId}/similar?language=vi&page=${page}`
  );
export const getMovieVideos = async (movieId: string) =>
  fetchFromAPI<{ results: Video[] }>(`movie/${movieId}/videos`);
export const getMovieReviews = async (movieId: string) =>
  fetchFromAPI<{ results: Review[] }>(`movie/${movieId}/reviews?language=vi`);
