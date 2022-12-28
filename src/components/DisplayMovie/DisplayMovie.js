import { getMouseEventOptions } from '@testing-library/user-event/dist/utils'

export default function DisplayMovie ({ getMovies, movie, setMovie, user }) {
  const createMovie = async () => {
    try {
      await fetch('/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Title: movie.Title,
          Rated: movie.Rated,
          Released: movie.Released,
          Runtime: movie.Runtime,
          Genre: movie.Genre,
          Director: movie.Director,
          Plot: movie.Plot,
          Poster: movie.Poster,
          BoxOffice: movie.BoxOffice,
          userId: user._id
        })
      })
      getMovies()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {
        movie
          ? <div id='display-movie'>
            <img src={movie.Poster} alt={movie.Title} />
            <h1>{movie.Title}</h1>
            <h4>Rated: {movie.Rated} Released: {movie.Released} Runtime: {movie.Runtime}</h4>
            <h4>Genre: {movie.Genre} Director: {movie.Director}</h4>
            <p>
              {movie.Plot}
            </p>
            <h4>Box Office: {movie.BoxOffice}</h4>
            <button onClick={() => {
              createMovie()
              setMovie(null)
            }}
            >Add Movie
            </button>
          </div>
          : <div>
            No movie to display.
            </div>
      }
    </>
  )
}
