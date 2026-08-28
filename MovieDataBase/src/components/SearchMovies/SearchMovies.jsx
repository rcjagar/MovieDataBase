import React, { useState } from 'react';
import './SearchMovies.css'

function SearchMovies() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        
        if (!query.trim()) {
            setMovies([]);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const apiKey = import.meta.env.VITE_TMDB_API_KEY;
            if (!apiKey) {
                throw new Error('API key not found');
            }

            const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
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
    }

  return (
    <>
    <div className='container'>
        <form className='form' onSubmit={handleSearch}>
          <label htmlFor="query" className='label'>Search</label>
          <input 
            className='input'
            type="text" 
            name="query" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            id="query"
            placeholder="Enter movie name..." 
          />
          <button type="submit" className='button' disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>
        
        {error && <p className='error'>{error}</p>}
        
        <div className='card-list'>
          {movies.filter(movie => movie.poster_path).map(movie => (
            <div className='card' key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>{movie.overview}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SearchMovies