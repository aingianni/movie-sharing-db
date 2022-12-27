import { useState, useEffect } from 'react'

export default function DisplayMovie (props) {
  const [movies, setMovies] = useState([])
  const [foundMovie, setFoundMovie] = useState(null)
  const [newMovie, setNewMovie] = useState({
    Title: '',
    Rated: '',
    Released: '',
    Runtime: '',
    Genre: '',
    Director: '',
    Plot: '',
    Poster: '',
    BoxOffice: ''
  })

  const getMovies = async () => {
    try {
      const response = await fetch('/api/movies')
      const data = await response.json()
      setMovies(data)
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

  const createMovie = async () => {
    try {
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Title: props.movie.Title,
          Rated: props.movie.Rated,
          Released: props.movie.Released,
          Runtime: props.movie.Runtime,
          Genre: props.movie.Genre,
          Director: props.movie.Director,
          Plot: props.movie.Plot,
          Poster: props.movie.Poster,
          BoxOffice: props.movie.BoxOffice
        })
      })
      const data = await response.json()
      setFoundMovie(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {
        props.movie
          ? <div id='display-movie'>
            <img src={props.movie.Poster} alt={props.movie.Title} />
            <h1>{props.movie.Title}</h1>
            <h4>Rated: {props.movie.Rated} Released: {props.movie.Released} Runtime: {props.movie.Runtime}</h4>
            <h4>Genre: {props.movie.Genre} Director: {props.movie.Director}</h4>
            <p>
              {props.movie.Plot}
            </p>
            <h4>Box Office: {props.movie.BoxOffice}</h4>
            <form onSubmit={createMovie}>
              <input type='submit' value='Add Movie' />
            </form>
          </div>
          : <div>
            No movie to display.
            </div>
      }
    </>
  )
}
