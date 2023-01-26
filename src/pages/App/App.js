import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthPage from '../AuthPage/AuthPage'
import Profile from '../Profile/Profile'
import ViewOtherUserProfile from '../ViewOtherUserProfile/ViewOtherUserProfile'
import { getUser } from '../../utilities/users-service'

function App () {
  const [user, setUser] = useState(getUser())
  const [viewUser, setViewUser] = useState(null)

  useEffect(() => {}, [])

  return (
    <main className='App'>
      {
        user
          ? <>
            <Routes>
              <Route path='/' element={<Profile user={user} setUser={setUser} viewUser={viewUser} setViewUser={setViewUser} />} />
              <Route path='/:userId' element={<ViewOtherUserProfile user={user} viewUser={viewUser} setViewUser={setViewUser} />} />
            </Routes>
          </>
          : <AuthPage setUser={setUser} />
      }
    </main>
  )
}

export default App
