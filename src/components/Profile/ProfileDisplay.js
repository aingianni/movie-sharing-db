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

  const favoriteDirector = () => {
    const allDirectors = movies.reduce((acc, item) => {
      return [...acc, item.Director]
    }, [])
    const frequency = allDirectors.reduce((acc, item) => {
      acc[item] = acc[item] ? acc[item] + 1 : 1
      return acc
    }, {})
    let keys = Object.keys(frequency).sort(function(a, b) { return frequency[b] - frequency[a] })
    return keys[0]
  }

  const favoriteGenre = () => {
    const allGenres = movies.reduce((acc, item) => {
      return [...acc, item.Genre]
    }, [])
    const frequency = allGenres.reduce((acc, item) => {
      acc[item] = acc[item] ? acc[item] + 1 : 1
      return acc
    }, {})
    let keys = Object.keys(frequency).sort(function(a, b) { return frequency[b] - frequency[a] })
    return keys[0]
  }

  const totalRuntime = () => {
    const allRuntimes = movies.reduce((acc, item) => {
      return [...acc, item.Runtime]
    }, [])
    let runtimeSum = 0
    for (let i = 0; i < allRuntimes.length; i++) {
      runtimeSum += parseInt(allRuntimes[i].replace(' min', ''))
    }
    return runtimeSum + ' min'
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

      <br />

      <div id='profile-stats'>
        <ul>
          <li>Favorite Director: {movies ? favoriteDirector() : '' }</li>
          <li>Favorite Genre: {movies ? favoriteGenre() : '' }</li>
          <li>Total Runtime: {movies ? totalRuntime() : '' }</li>
        </ul>
      </div>

      <br />

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
