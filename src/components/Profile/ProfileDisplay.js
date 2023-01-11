import { useState } from 'react'
import { logOut } from '../../utilities/users-service'

export default function ProfileDisplay ({ user, setUser, movies, setTab, tab }) {
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
    updateUser(user._id, { ...user, profilePic: inputValue })
    setProfilePic(null)
    setInputValue('')
  }

  function handleLogOut () {
    logOut()
    setUser(null)
  }

  const favoriteDirector = () => {
    const allDirectors = movies.reduce((acc, item) => {
      return [...acc, item.Director]
    }, [])
    const frequency = allDirectors.reduce((acc, item) => {
      acc[item] = acc[item] ? acc[item] + 1 : 1
      return acc
    }, {})
    const keys = Object.keys(frequency).sort(function (a, b) { return frequency[b] - frequency[a] })
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
    const keys = Object.keys(frequency).sort(function (a, b) { return frequency[b] - frequency[a] })
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

  const handleTab = () => {
    if (tab === 0) {
      return 82
    } else {
      return 0
    }
  }

  return (
    <>
    <div className='chevron-holder' onClick={() => setTab(handleTab())}>
      <span class="chevron left"></span>
    </div>

    <div>
      <div>
        <div className='profile-img' onClick={() => setProfilePic(true)}>
          <img src={
              user.profilePic.length > 2
                ? user.profilePic
                : 'https://i.imgur.com/jUZ3hJA.jpg'
}
          />
        </div>
        <div className='profile-data'>
          {user.name} <br />
          <span className='profile-stat-data'>{movies.length > 0 ? movies.length : 0} movies in collection.</span>
        </div>
      </div>

      <br />

      <div className='outer'>
        <div id='profile-stats'>
          <ul>
            <li><h4>Favorite Director:</h4> <span className='profile-stat-data'>{movies ? favoriteDirector() : ''}</span></li>
            <li><h4>Favorite Genre:</h4> <span className='profile-stat-data'>{movies ? favoriteGenre() : ''}</span></li>
            <li><h4>Total Runtime:</h4> <span className='profile-stat-data'>{movies ? totalRuntime() : ''}</span></li>
          </ul>
        </div>

        <br />

        <div id='profile-log-out'>
          <button onClick={handleLogOut}>Log Out</button>
        </div>
      </div>
    </div>

      {
        profilePic
          ? <div className='modal'>
            <div className='change-profile'>
              <h2>Change Profile Photo</h2>
              <form type='submit' onSubmit={handleSubmit}>
                <input className='movie-searchbar' name='profilePic' value={inputValue} onChange={(evt) => setInputValue(evt.target.value)} />
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
