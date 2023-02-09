import AllMovies from '../../components/Profile/AllMovies'
import FavoriteMovies from '../../components/Profile/FavoriteMovies'
import ProfileDisplay from '../../components/Profile/ProfileDisplay'
import Social from '../../components/Social/Social'
import NavBar from '../../components/Profile/NavBar'

export default function Profile ({ user, users, setUser, viewUser, setViewUser, movies, setMovies, getMovies }) {

  return (
    <>
      <div id='main-container'>

        <div>
          <div className='vert-spacer' />
          <div id='profile-container'>
            <ProfileDisplay user={user} setUser={setUser} viewUser={viewUser} movies={movies} />
          </div>
        </div>

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
