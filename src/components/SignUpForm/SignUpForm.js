import { Component } from 'react'
import { signUp } from '../../utilities/users-service'

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    profilePic: '',
    error: ''
  }

  handleSubmit = async (evt) => {
    evt.preventDefault()
    try {
      const formData = { ...this.state }
      delete formData.error
      delete formData.confirm
      const user = await signUp(formData)
      this.props.setUser(user)
    } catch (error) {
      this.setState({ error: 'Sign Up Failed' })
    }
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render () {
    const disable = this.state.password !== this.state.confirm
    return (
      <div>
        <div className='flex-ctr'>
          <form autoComplete='off' onSubmit={this.handleSubmit}>
            <label>
              Name <input type='text' name='name' value={this.state.name} onChange={this.handleChange} required />
            </label>
            <label>
              Email <input type='email' name='email' value={this.state.email} onChange={this.handleChange} required />
            </label>
            <label>
              Password <input type='password' name='password' value={this.state.password} onChange={this.handleChange} required />
            </label>
            <label>
              Confirm <input type='password' name='confirm' value={this.state.confirm} onChange={this.handleChange} required />
            </label>
            <button type='submit' disabled={disable}>SIGN UP</button>
          </form>
        </div>
        {
          this.state.error
            ? <p className='error-message'>&nbsp;{this.state.error}</p>
            : ''
        }
      </div>
    )
  }
}
