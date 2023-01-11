import { useState, useEffect } from 'react'

import AllMovies from '../../components/Profile/AllMovies'
import FavoriteMovies from '../../components/Profile/FavoriteMovies'
import MovieSearchBar from '../../components/Profile/MovieSearchBar'
import ProfileDisplay from '../../components/Profile/ProfileDisplay'
import Social from '../../components/Social/Social'

export default function Profile (props) {
  const [movies, setMovies] = useState([])
  const [tab, setTab] = useState(0)
  const [socialTab, setSocialTab] = useState(0)

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
        <div id='profile-container' style={{ transform: `translate(${tab}%)` }}>
          <ProfileDisplay user={props.user} setUser={props.setUser} movies={movies} setTab={setTab} tab={tab} />
        </div>
        <div id='content-container'>
          <MovieSearchBar user={props.user} getMovies={getMovies} movies={movies} />
          <FavoriteMovies user={props.user} getMovies={getMovies} movies={movies} />
          <AllMovies user={props.user} getMovies={getMovies} movies={movies} />
        </div>
        <div className='social-tab-container' style={{ transform: `translate(-${socialTab}%)` }}>
          <Social setSocialTab={setSocialTab} socialTab={socialTab} />
        </div>
      </div>
    </>
  )
}
