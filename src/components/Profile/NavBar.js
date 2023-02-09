import { logOut } from '../../utilities/users-service'
import { useNavigate } from 'react-router-dom'

import MovieSearchBar from './MovieSearchBar'

export default function NavBar ({ user, setUser, setViewUser, getMovies }) {
  const navigate = useNavigate()

  const getUser = async () => {
    try {
      const response = await fetch(`/api/users/${user._id}`)
      const data = await response.json()
      setUser(data)
    } catch (error) {
      console.error(error)
    }
  }

  function handleLogOut () {
    navigate('/')
    logOut()
    setUser(null)
    setViewUser(null)
  }

  return (
    <>
      <div className='navbar'>
        <div>
          <button onClick={() => {
            setViewUser(null)
            getUser()
            navigate('/')
          }}
          >Home
          </button>
        </div>
        <div>
          <MovieSearchBar user={user} setUser={setUser} getMovies={getMovies} setViewUser={setViewUser} />
        </div>
        <div id='profile-log-out'>
          <button onClick={handleLogOut}>Log Out</button>
        </div>
      </div>
    </>
  )
}
