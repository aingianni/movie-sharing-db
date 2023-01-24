import { logOut } from '../../utilities/users-service'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'

export default function ProfileDisplay ({ user, setUser, movies, setTab, tab, setProfilePic }) {
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
      <ArrowCircleLeftIcon />
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
    </>
  )
}
