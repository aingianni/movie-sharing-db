import { useState } from 'react'

export default function AllMovies ({ movies, getMovies }) {
  const [foundMovie, setFoundMovie] = useState(null)

  const deleteMovie = async (id) => {
    try {
      const response = await fetch(`/api/movies/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      setFoundMovie(data)
      getMovies()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
    <br />
      <div id='movies-container'>
        {
        movies
          ? <ul>
            {
        movies.map((movie) => {
          return (
            <li key={movie._id}>
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
                  <button onClick={() => deleteMovie(movie._id)}>Delete</button>
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
    </>
  )
}
