import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

import { MOVIES, type Movie } from '../data/movies';

type MoviesContextType = {
  movies: Movie[];
  watchlist: string[];
  toggleWatchlist: (movieId: string) => void;
  addMovie: (movie: Movie) => void;
};

const MoviesContext = createContext<MoviesContextType | undefined>(
  undefined
);

export function MoviesProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useState<Movie[]>(MOVIES);
  const [watchlist, setWatchlist] = useState<string[]>([]);

  function toggleWatchlist(movieId: string) {
    setWatchlist((current) =>
      current.includes(movieId)
        ? current.filter((id) => id !== movieId)
        : [...current, movieId]
    );
  }

  function addMovie(movie: Movie) {
    setMovies((current) => [...current, movie]);
  }

  return (
    <MoviesContext.Provider
      value={{ movies, watchlist, toggleWatchlist, addMovie }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MoviesContext);

  if (!context) {
    throw new Error('useMovies must be used inside MoviesProvider');
  }

  return context;
}