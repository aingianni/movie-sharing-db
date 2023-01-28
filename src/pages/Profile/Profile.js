import { useState, useEffect } from 'react'

import AllMovies from '../../components/Profile/AllMovies'
import FavoriteMovies from '../../components/Profile/FavoriteMovies'
import ProfileDisplay from '../../components/Profile/ProfileDisplay'
import Social from '../../components/Social/Social'
import ProfilePic from '../../components/ProfilePic/ProfilePic'
import NavBar from '../../components/Profile/NavBar'

export default function Profile ({ user, users, setUser, viewUser, setViewUser, movies, setMovies, getMovies }) {
  const [profilePic, setProfilePic] = useState(null)

  return (
    <>
      <div id='main-container'>

        <div>
          <div className='vert-spacer' />
          <div id='profile-container'>
            <ProfileDisplay user={user} viewUser={viewUser} movies={movies} setProfilePic={setProfilePic} />
          </div>
        </div>

        {
          profilePic ? <ProfilePic user={user} setUser={setUser} setProfilePic={setProfilePic} /> : ''
        }

        <div id='content-container'>
          <NavBar user={user} setUser={setUser} setViewUser={setViewUser} getMovies={getMovies} />
          <br />
          <FavoriteMovies movies={movies} />
          <br />
          <AllMovies getMovies={getMovies} movies={movies} />
        </div>

        <div className='social-tab-holder-main'>
          <div className='vert-spacer' />
          <div className='social-tab-container'>
            <Social users={users} viewUser={viewUser} setViewUser={setViewUser} />
          </div>
        </div>

      </div>
    </>
  )
}
