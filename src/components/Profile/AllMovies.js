import { useState, useEffect } from 'react'

export default function AllMovies (props) {
  const [movies, setMovies] = useState([])
  const [foundMovie, setFoundMovie] = useState(null)

  const getMovies = async () => {
    try {
      const response = await fetch('/api/movies')
      const data = await response.json()
      setMovies(data.filter(movie => movie.userId === props.user._id))
    } catch (error) {
      console.error(error)
    }
  }

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
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getMovies()
  }, [foundMovie])

  return (
    <>
      {
        movies ? movies.map((movie) => {
          return (
            <li key={movie._id}>
              <h2>{movie.Title}</h2>
              <br />
              <button onClick={() => deleteMovie(movie._id)}>Delete</button>
            </li>
          )
        }) :
        'There are no movies saved!'
      }
    </>
  )
}
