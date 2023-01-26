import { logOut } from '../../utilities/users-service'
import { useNavigate } from 'react-router-dom'

export default function ProfileDisplay ({ user, setUser, viewUser, setViewUser, movies, setProfilePic }) {
  const navigate = useNavigate()

  function handleLogOut () {
    logOut()
    setUser(null)
    setViewUser(null)
    navigate('/')
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
      return [...acc, item.Genre.replace(/,/g, '')]
    }, [])
    const allGenresSplit = []
    allGenres.forEach(element => {
      const arr = element.split(' ')
      arr.forEach(ele => allGenresSplit.push(ele))
    })
    const frequency = allGenresSplit.reduce((acc, item) => {
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

  return (
    <>
    <div>

    {
      viewUser ? 
      // ViewUser Profile Display
      <div>
        <div className='profile-img'>
          <img src={viewUser.profilePic}/>
        </div>
        <div className='profile-data'>
          {viewUser.name} <br />
          <span className='profile-stat-data'>{movies.length > 0 ? movies.length : 0} movies in collection.</span>
        </div>
      </div>
      :
      // User Profile Display
      <div>
        <div className='profile-img' onClick={() => setProfilePic(true)}>
          <img src={user.profilePic}/>
        </div>
        <div className='profile-data'>
          {user.name} <br />
          <span className='profile-stat-data'>{movies.length > 0 ? movies.length : 0} movies in collection.</span>
        </div>
      </div>
    }

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
    </>
  )
}
