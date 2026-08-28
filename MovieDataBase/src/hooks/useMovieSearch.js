import { useState } from 'react';

export const useMovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMovies = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env?.VITE_TMDB_API_KEY;
      if (!apiKey) {
        throw new Error('API key not found. Please add VITE_TMDB_API_KEY to .env.local');
      }

      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}`;
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      setError(err.message);
      console.error('Error searching movies:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    query,
    setQuery,
    movies,
    isLoading,
    error,
    searchMovies
  };
};
