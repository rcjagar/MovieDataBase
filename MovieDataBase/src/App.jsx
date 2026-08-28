import { useState } from "react";
import SearchMovies from "./components/SearchMovies/SearchMovies";
import "./App.css";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const showMovie = (movie) => {
    setSelectedMovie(movie);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showHome = () => {
    setSelectedMovie(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (selectedMovie) {
    const year = selectedMovie.release_date?.slice(0, 4) || "Coming soon";
    const rating = selectedMovie.vote_average ? selectedMovie.vote_average.toFixed(1) : "Not rated";

    return (
      <main className="details-page">
        {selectedMovie.backdrop_path && <div className="details-backdrop" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})` }} />}
        <div className="details-shell">
          <button className="back-button" type="button" onClick={showHome}><span aria-hidden="true">←</span> Back to movies</button>
          <article className="details-card">
            {selectedMovie.poster_path && <img className="details-poster" src={`https://image.tmdb.org/t/p/w780${selectedMovie.poster_path}`} alt={`${selectedMovie.title} poster`} />}
            <div className="details-content">
              <span className="eyebrow">Movie details</span>
              <h1>{selectedMovie.title}</h1>
              {selectedMovie.original_title !== selectedMovie.title && <p className="original-title">{selectedMovie.original_title}</p>}
              <div className="details-meta">
                <span>{year}</span><span className="rating">★ {rating}</span><span>{selectedMovie.original_language?.toUpperCase()}</span>
              </div>
              <h2>Storyline</h2>
              <p className="overview">{selectedMovie.overview || "No overview is available for this movie yet."}</p>
            </div>
          </article>
        </div>
      </main>
    );
  }

  return (
    <main className="home-page">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <div className="app-container">
        <header className="hero">
          <span className="brand-mark">CINEVAULT</span>
          <h1>Find your next <em>favorite</em> movie.</h1>
          <p>Search thousands of films, discover hidden gems, and explore every story.</p>
        </header>
        <SearchMovies onMovieSelect={showMovie} />
      </div>
    </main>
  );
}

export default App;
