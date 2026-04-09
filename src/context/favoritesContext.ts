import { createContext } from "react";

export interface FavoritesContextValue {
  favoriteIds: number[];
  isFavorite: (movieId: number) => boolean;
  addFavorite: (movieId: number) => void;
  removeFavorite: (movieId: number) => void;
  toggleFavorite: (movieId: number) => void;
  clearFavorites: () => void;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null);
