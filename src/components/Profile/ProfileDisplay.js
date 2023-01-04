import { useState } from 'react'

export default function ProfileDisplay ({ user, setUser, movies }) {
  const [profilePic, setProfilePic] = useState(null)
  const [inputValue, setInputValue] = useState('')

  const updateUser = async (id, updatedUser) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...updatedUser })
      })
      const data = await response.json()
      setUser(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    updateUser(user._id, {...user, "profilePic": inputValue})
    setProfilePic(null)
    setInputValue('')
  }

  return (
    <>
      <div className='profile-img' onClick={() => setProfilePic(true)}>
        <img src={
          user.profilePic.length > 2 ? 
          user.profilePic :
          'https://i.imgur.com/jUZ3hJA.jpg'
        } />
        <div className="overlay"></div>
      </div>

      <div id='profile-stats'>
        <ul>
          <li>Favorite Director</li>
          <li>Favorite Genre</li>
          <li>Total Runtime</li>
        </ul>
      </div>

      <div id='profile-log-out'>
        <button>Log Out</button>
      </div>
      
      {
        profilePic ? 
        <div className="modal">
          <div className="change-profile">
            <h2>Change Profile Photo</h2>
            <form type='submit' onSubmit={handleSubmit}>
              <input className="movie-searchbar" name='profilePic' value={inputValue} onChange={(evt) => setInputValue(evt.target.value)} />
            </form>
            <br />
            <button onClick={() => setProfilePic(null)}>Close</button>
          </div>
        </div>
        : ''
      }
    </>
  )
}
