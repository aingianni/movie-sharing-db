import { useState, useEffect } from 'react'

import AllMovies from '../../components/Profile/AllMovies'
import FavoriteMovies from '../../components/Profile/FavoriteMovies'
import ProfileDisplay from '../../components/Profile/ProfileDisplay'
import Social from '../../components/Social/Social'

export default function Profile ({ user, users, setUser, viewUser, setViewUser, movies, setMovies  }) {
  const getViewUserMovies = async () => {
    try {
      const response = await fetch('/api/movies')
      const data = await response.json()
      setMovies(data.filter(movie => movie.userId === viewUser._id))
      console.log('getViewUserMovies has run on the view user page')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getViewUserMovies()
  }, [viewUser])

  return (
    <>
      <div id='main-container'>

        <div>
          <div className='vert-spacer'></div>
          <div id='profile-container'>
            <ProfileDisplay user={user} viewUser={viewUser} setUser={setUser} movies={movies} />
          </div>
        </div>

        <div id='content-container'>
          <FavoriteMovies user={user} movies={movies} />
          <br />
          <AllMovies viewUser={viewUser} movies={movies} />
        </div>

        <div>
          <div className='vert-spacer'></div>
          <div className='social-tab-container'>
          <Social users={users} viewUser={viewUser} setViewUser={setViewUser} />
          </div>
        </div>

      </div>
    </>
  )
}