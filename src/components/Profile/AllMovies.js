import { useState } from 'react'

export default function AllMovies ({ viewUser, movies, getMovies }) {
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
    const lowerCase = e.target.value.toLowerCase()
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
      <div className='outer'>

        <div className='search-toolbar'>
          <input className='collection-search' placeholder='Search Collection' onChange={inputHandler} />
        </div>

        <div className='spacer' />

        <div id='movies-container'>
          {
        movies
          ? <ul>
            {
        filteredMovies.sort(function (a, b) { return a.Title.localeCompare(b.Title) }).map((movie) => {
          return (
            <li key={movie._id} className='movie-list' onClick={() => setFoundMovie(movie)}>
              <div className='all-movies-list-item'>
                <div className='all-movies-img-outer'><img src={movie.Poster} /></div>
                <div className='all-movies-title'>
                  <ul>
                    <li><h3>{movie.Title}</h3></li>
                    <li><h4>Director: {movie.Director}</h4></li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li><h5>Released: {movie.Released}</h5></li>
                    <li><h5>Rated: {movie.Rated}</h5></li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li><h5>Runtime: {movie.Runtime}</h5></li>
                    <li><h5>Box Office: {movie.BoxOffice}</h5></li>
                  </ul>
                </div>
                {
                  viewUser
                    ? ''
                    : <div>
                        <button className='delete-button' onClick={(evt) => {
                          evt.stopPropagation()
                          deleteMovie(movie._id)
                        }}
                        >Delete
                        </button>
                      </div>
                }
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
        foundMovie
          ? <div className='modal'>
            <div id='display-movie'>
              <img src={foundMovie.Poster} alt={foundMovie.Title} />
              <h1>{foundMovie.Title}</h1>
              <h4><span className='outer'>Rated: {foundMovie.Rated}</span> <span className='outer'>Released: {foundMovie.Released}</span></h4>
              <h4><span className='outer'>Genre: {foundMovie.Genre}</span> <span className='outer'>Director: {foundMovie.Director}</span></h4>
              <h4><span className='outer'>Runtime: {foundMovie.Runtime}</span></h4>
              <div className='outer'>
                <p>
                  {foundMovie.Plot}
                </p>
                <h4>Box Office: {foundMovie.BoxOffice}</h4>
                <div className='controls-display-movie'>
                  <button onClick={() => setFoundMovie(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
          : ''
      }
    </>
  )
}
