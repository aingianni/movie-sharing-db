import { useState } from "react"

export default function ProfilePic ({ user, setUser, setProfilePic }) {
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
        updateUser(user._id, { ...user, profilePic: inputValue })
        setProfilePic(null)
        setInputValue('')
      }

    return (
        <div className='modal'>
            <div className='change-profile'>
              <h2>Change Profile Photo</h2>
              <form type='submit' onSubmit={handleSubmit}>
                <input className='movie-searchbar' name='profilePic' value={inputValue} onChange={(evt) => setInputValue(evt.target.value)} />
              </form>
              <br />
              <button onClick={() => setProfilePic(null)}>Close</button>
            </div>
        </div>
    )
}