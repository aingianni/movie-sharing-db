import { useState, useEffect } from 'react'

import AllMovies from '../../components/Profile/AllMovies'
import FavoriteMovies from '../../components/Profile/FavoriteMovies'
import MovieSearchBar from '../../components/Profile/MovieSearchBar'
import ProfileDisplay from '../../components/Profile/ProfileDisplay'
import Social from '../../components/Social/Social'
import ProfilePic from '../../components/ProfilePic/ProfilePic'

export default function Profile ({ user, users, setUser, viewUser, setViewUser, movies, getMovies }) {
  const [profilePic, setProfilePic] = useState(null)

  return (
    <>
      <div id='main-container'>

        <div>
          <div className='vert-spacer'></div>
          <div id='profile-container'>
          <ProfileDisplay user={user} setUser={setUser} setViewUser={null} movies={movies} setProfilePic={setProfilePic} />
          </div>
        </div>

        {
          profilePic ? <ProfilePic user={user} setUser={setUser} setProfilePic={setProfilePic} /> : ''
        }

        <div id='content-container'>
          <MovieSearchBar user={user} getMovies={getMovies} />
          <br />
          <FavoriteMovies movies={movies} />
          <br />
          <AllMovies getMovies={getMovies} movies={movies} />
        </div>

        <div>
          <div className='vert-spacer'></div>
          <div className='social-tab-container'>
          <Social users={users}  viewUser={viewUser} setViewUser={setViewUser} />
          </div>
        </div>

      </div>
    </>
  )
}
