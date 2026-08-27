import React from 'react';
import './SearchMovies.css'

function SearchMovies() {
  return (
    <>
    <div className='container'>
        <form className='form'>
          <label htmlFor="query" className='label'>Search</label>
          <input className='input'
            type="text" 
            name="query" 
            id="query"
            placeholder="Enter movie name..." 
          />
          <button type="submit" className='button'>Search</button>
        </form>
    </div>
    </>
  )
}

export default SearchMovies