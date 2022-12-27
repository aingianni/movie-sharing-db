import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthPage from '../AuthPage/AuthPage'
import Profile from '../Profile/Profile'

function App () {
  const [state, setState] = useState(null)
  const [user, setUser] = useState(null)

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
              <Route path='/profile' element={<Profile user={user} />} />
            </Routes>
          </>
          : <AuthPage setUser={setUser} />
      }
    </main>
  )
}

export default App
