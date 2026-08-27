import { useState } from "react";
import SearchMovies from "./components/SearchMovies/SearchMovies";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="container">
        <h1 className="title">React Movie data base</h1>
        <SearchMovies/>
      </div>
    </>
  );
}

export default App;
