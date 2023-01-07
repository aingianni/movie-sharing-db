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
      <div className='modal'>
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
            <div className='controls-display-movie'>
              <button onClick={() => {
                createMovie()
                setMovie(null)
              }}
              >Add Movie
              </button>
              <button onClick={() => setMovie(null)}>Close</button>
            </div>
          </div>
          : <div>
            No movie to display.
            </div>
      }
      </div>
    </>
  )
}
