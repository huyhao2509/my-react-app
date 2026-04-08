import { createContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

const FAVORITES_STORAGE_KEY = "movie-favorites";

const readFavorites = (): number[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    return storedFavorites ? (JSON.parse(storedFavorites) as number[]) : [];
  } catch {
    return [];
  }
};

export interface FavoritesContextValue {
  favoriteIds: number[];
  isFavorite: (movieId: number) => boolean;
  addFavorite: (movieId: number) => void;
  removeFavorite: (movieId: number) => void;
  toggleFavorite: (movieId: number) => void;
  clearFavorites: () => void;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => readFavorites());

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteIds,
      isFavorite: (movieId: number) => favoriteIds.includes(movieId),
      addFavorite: (movieId: number) => {
        setFavoriteIds((current) =>
          current.includes(movieId) ? current : [...current, movieId]
        );
      },
      removeFavorite: (movieId: number) => {
        setFavoriteIds((current) => current.filter((id) => id !== movieId));
      },
      toggleFavorite: (movieId: number) => {
        setFavoriteIds((current) =>
          current.includes(movieId)
            ? current.filter((id) => id !== movieId)
            : [...current, movieId]
        );
      },
      clearFavorites: () => {
        setFavoriteIds([]);
      },
    }),
    [favoriteIds]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};
