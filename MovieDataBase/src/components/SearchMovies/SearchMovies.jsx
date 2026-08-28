import { useState } from "react";
import "./SearchMovies.css";

function SearchMovies({ onMovieSelect }) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query.trim()) { setMovies([]); return; }
    setIsLoading(true); setError(null);
    try {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      if (!apiKey) throw new Error("API key not found");
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) { setError(err.message); } finally { setIsLoading(false); }
  };

  const visibleMovies = movies.filter((movie) => movie.poster_path);
  return (
    <section className="search-section" aria-label="Movie search">
      <form className="search-form" onSubmit={handleSearch}>
        <label className="sr-only" htmlFor="query">Search for a movie</label>
        <span className="search-icon" aria-hidden="true">⌕</span>
        <input className="search-input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} id="query" placeholder="Search by movie title..." />
        <button type="submit" className="search-button" disabled={isLoading}>{isLoading ? "Searching…" : "Search movies"}</button>
      </form>
      {error && <p className="error" role="alert">{error}</p>}
      {isLoading && <div className="loader" aria-label="Loading movies" />}
      {!isLoading && visibleMovies.length > 0 && <div className="results-header"><h2>Search results</h2><span>{visibleMovies.length} movies</span></div>}
      <div className="card-list">
        {visibleMovies.map((movie) => (
          <button className="movie-card" type="button" key={movie.id} onClick={() => onMovieSelect(movie)} aria-label={`View details for ${movie.title}`}>
            <div className="poster-wrap">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" loading="lazy" />
              <span className="card-rating">★ {movie.vote_average?.toFixed(1) || "—"}</span><span className="view-details">View details →</span>
            </div>
            <div className="card-copy"><h3>{movie.title}</h3><p>{movie.release_date?.slice(0, 4) || "Release date TBA"}</p></div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default SearchMovies;
