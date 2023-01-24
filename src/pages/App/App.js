import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthPage from '../AuthPage/AuthPage'
import Profile from '../Profile/Profile'
import { getUser } from '../../utilities/users-service'

function App () {
  const [state, setState] = useState(null)
  const [user, setUser] = useState(getUser())

  const fetchState = async () => {
    try {
      const response = await fetch('/api/test')
      const data = await response.json()
      setState(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchState()
  }, [])

  return (
    <main className='App'>
      {
        user
          ? <>
            <Routes>
              <Route path='/' element={<Profile user={user} setUser={setUser} />} />
            </Routes>
          </>
          : <AuthPage setUser={setUser} />
      }
    </main>
  )
}

export default App
