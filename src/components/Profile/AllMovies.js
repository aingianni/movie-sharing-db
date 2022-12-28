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
      {
        movies
          ? <ul>
            {
        movies.map((movie) => {
          return (
            <li key={movie._id}>
              <h2>{movie.Title}</h2>
              <br />
              <button onClick={() => deleteMovie(movie._id)}>Delete</button>
            </li>
          )
        })
        }
          </ul>
          : 'There are no movies saved!'
      }
    </>
  )
}
