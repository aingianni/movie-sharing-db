import { useState } from 'react'

export default function AllMovies ({ movies, getMovies }) {
  const [foundMovie, setFoundMovie] = useState(null)
  const [inputText, setInputText] = useState('')

  const deleteMovie = async (id) => {
    try {
      await fetch(`/api/movies/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      getMovies()
    } catch (error) {
      console.error(error)
    }
  }

  const inputHandler = (e) => {
    let lowerCase = e.target.value.toLowerCase()
    setInputText(lowerCase)
  }

  const filteredMovies = movies.filter((movie) => {
    if (inputText === '') {
      return movie
    } else {
      return movie.Title.toLowerCase().includes(inputText)
    }
  })

  return (
    <>
    <div className="outer">

      <div className='search-toolbar'>
        <input className="collection-search" placeholder='Search Collection' onChange={inputHandler} />
      </div>

      <div className='spacer'></div>

      <div id='movies-container'>
        {
        movies
          ? <ul>
            {
        filteredMovies.sort(function(a, b) {return a.Title.localeCompare(b.Title)}).map((movie) => {
          return (
            <li key={movie._id} className='movie-list' onClick={() => setFoundMovie(movie)}>
              <div className="all-movies-list-item">
                <div className="all-movies-img"><img src={movie.Poster} /></div>
                <div className="all-movies-title">
                  <h2>{movie.Title}</h2>
                  <h4>Director: {movie.Director}</h4>
                </div>
                <div>
                  <h5>Released: {movie.Released}</h5>
                  <h5>Rated: {movie.Rated}</h5>
                </div>
                <div>
                  <h5>Runtime: {movie.Runtime}</h5>
                  <h5>Box Office: {movie.BoxOffice}</h5>   
                </div>
                <div>
                  <button onClick={(evt) => {
                    evt.stopPropagation()
                    deleteMovie(movie._id)
                    }}>Delete</button>
                </div>
              </div>
            </li>
          )
        })
        }
          </ul>
          : 'There are no movies saved!'
      }
      </div>
    </div>
      {
        foundMovie ? 
        <div className='modal'>
        <div id='display-movie'>
            <img src={foundMovie.Poster} alt={foundMovie.Title} />
            <h1>{foundMovie.Title}</h1>
            <h4>Rated: {foundMovie.Rated} Released: {foundMovie.Released} Runtime: {foundMovie.Runtime}</h4>
            <h4>Genre: {foundMovie.Genre} Director: {foundMovie.Director}</h4>
            <p>
              {foundMovie.Plot}
            </p>
            <h4>Box Office: {foundMovie.BoxOffice}</h4>
            <button onClick={() => setFoundMovie(null)}>Close</button>
          </div>
          </div>
          : ''
      }
    </>
  )
}
