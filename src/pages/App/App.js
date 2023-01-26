import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthPage from '../AuthPage/AuthPage'
import Profile from '../Profile/Profile'
import ViewOtherUserProfile from '../ViewOtherUserProfile/ViewOtherUserProfile'
import { getUser } from '../../utilities/users-service'

function App () {
  const [user, setUser] = useState(getUser())
  const [viewUser, setViewUser] = useState(null)
  const [movies, setMovies] = useState([])
  const [users, setUsers] = useState([])

  const getMovies = async () => {
    try {
      const response = await fetch('/api/movies')
      const data = await response.json()
      setMovies(data.filter(movie => movie.userId === user._id))
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
  }, [user])

  return (
    <main className='App'>
      {
        user
          ? <>
            <Routes>
              <Route path='/' element={<Profile movies={movies} getMovies={getMovies} user={user} users={users} setUser={setUser} viewUser={viewUser} setViewUser={setViewUser} />} />
              <Route path='/:userId' element={
                viewUser ?
                <ViewOtherUserProfile movies={movies} setMovies={setMovies} user={user} users={users} getUsers={getUsers} setUser={setUser} viewUser={viewUser} setViewUser={setViewUser} />
                : 'Error'
              } />
            </Routes>
          </>
          : <AuthPage setUser={setUser} />
      }
    </main>
  )
}

export default App
