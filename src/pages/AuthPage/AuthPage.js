import { useState } from 'react'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import LoginForm from '../../components/LoginForm/LoginForm'

export default function AuthPage (props) {
  const [login, setLogin] = useState(true)
  const [toggleButton, setToggleButton] = useState('Sign Up')
  const [header, setHeader] = useState("Don't have an account?")
  return (
    <div className='form-container'>
      <div>
        <h2>{header}</h2>
        <button
          className='login-toggle' onClick={() => {
            if (login) {
              setLogin(null)
              setToggleButton('Login')
              setHeader('Already have an account?')
            } else {
              setLogin(true)
              setToggleButton('Sign Up')
              setHeader("Don't have an account?")
            }
          }}
        >{toggleButton}
        </button>
      </div>
      <div>
        {
          login
            ? <LoginForm setUser={props.setUser} />
            : <SignUpForm setUser={props.setUser} />
        }
      </div>
    </div>
  )
}
