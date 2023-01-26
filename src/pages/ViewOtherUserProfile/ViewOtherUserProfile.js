import { useState, useEffect } from 'react'

import AllMovies from '../../components/Profile/AllMovies'
import FavoriteMovies from '../../components/Profile/FavoriteMovies'
import MovieSearchBar from '../../components/Profile/MovieSearchBar'
import ProfileDisplay from '../../components/Profile/ProfileDisplay'
import Social from '../../components/Social/Social'
import ProfilePic from '../../components/ProfilePic/ProfilePic'

export default function Profile ({ user, viewUser }) {
  const [profilePic, setProfilePic] = useState(null)
  const [movies, setMovies] = useState([])
  const [users, setUsers] = useState([])
  const [tab, setTab] = useState(0)
  const [socialTab, setSocialTab] = useState(0)

  const getMovies = async () => {
    try {
      const response = await fetch('/api/movies')
      const data = await response.json()
      setMovies(data.filter(movie => movie.userId === viewUser._id))
    } catch (error) {
      console.error(error)
    }
  }

  const getUsers = async () => {
    try {
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getMovies()
    getUsers()
  }, [])

  return (
    <>
      <div id='main-container'>
        <div id='profile-container' style={{ transform: `translate(${tab}%)` }}>
          {/* <ProfileDisplay user={viewUser} setUser={null} movies={movies} setTab={setTab} tab={tab} setProfilePic={setProfilePic} /> */}
        </div>
        {
        //   profilePic ? <ProfilePic user={viewUser} setUser={null} setProfilePic={setProfilePic} /> : ''
        }
        <div id='content-container'>
          {/* <MovieSearchBar user={user} getMovies={getMovies} movies={movies} /> */}
          <FavoriteMovies user={user} getMovies={getMovies} movies={movies} />
          <AllMovies user={user} viewUser={viewUser} getMovies={getMovies} movies={movies} />
        </div>
        <div className='social-tab-container' style={{ transform: `translate(-${socialTab}%)` }}>
          {/* <Social setSocialTab={setSocialTab} socialTab={socialTab} users={users}  viewUser={viewUser} setViewUser={setViewUser} /> */}
        </div>
      </div>
    </>
  )
}