import { useState } from 'react'
import * as userService from '../../utilities/users-service'

export default function LoginForm ({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = (evt) => {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value })
    setError('')
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    try {
      const user = await userService.login(credentials)
      setUser(user)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <div className='flex-ctr'>
        <form autoComplete='off' onSubmit={handleSubmit}>
          <label>
            Email <input type='email' name='email' value={credentials.email} onChange={handleChange} required />
          </label>
          <label>
            Password <input type='password' name='password' value={credentials.password} onChange={handleChange} required />
          </label>
          <button type='submit'>LOG IN</button>
        </form>
      </div>
      {
        error
          ? <h1 className='error-message'>&nbsp;{error}</h1>
          : ''
      }
    </div>
  )
}
