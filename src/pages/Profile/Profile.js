import { useState, useEffect } from 'react'

import AllMovies from '../../components/Profile/AllMovies'
import FavoriteMovies from '../../components/Profile/FavoriteMovies'
import MovieSearchBar from '../../components/Profile/MovieSearchBar'
import ProfileDisplay from '../../components/Profile/ProfileDisplay'

export default function Profile (props) {
  const [movies, setMovies] = useState([])

  const getMovies = async () => {
    try {
      const response = await fetch('/api/movies')
      const data = await response.json()
      setMovies(data.filter(movie => movie.userId === props.user._id))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <>
      <div id='main-container'>
        <div id='profile-container'>
          <ProfileDisplay user={props.user} setUser={props.setUser} movies={movies} />
        </div>
        <div id='content-container'>
          <MovieSearchBar user={props.user} getMovies={getMovies} movies={movies} />
          <FavoriteMovies user={props.user} getMovies={getMovies} movies={movies} />
          <AllMovies user={props.user} getMovies={getMovies} movies={movies} />
        </div>
      </div>
    </>
  )
}
