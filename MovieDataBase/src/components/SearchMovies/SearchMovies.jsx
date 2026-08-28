import React from 'react';
import { useMovieSearch } from '../../hooks/useMovieSearch';
import './SearchMovies.css'

function SearchMovies() {
    const { query, setQuery, movies, isLoading, error, searchMovies } = useMovieSearch();

    const handleSearch = async (e) => {
        e.preventDefault();
        await searchMovies(query);
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