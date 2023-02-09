import ScrollButton from './ScrollButton'
import { Uploader } from "uploader"
import { UploadButton } from "react-uploader"
import { useState, useEffect } from "react"

export default function ProfileDisplay ({ user, setUser, viewUser, movies }) {
  const [newIcon, setNewIcon] = useState("")

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

  const uploader = Uploader({
    apiKey: "public_FW25b4ADRDgcLPYsU8m7xkanr2RG",
  })

  const options = {
    multi: false,
    layout: "modal",
    editor: {
      images: {
        crop: true,
        cropShape: "rect",
      },
    },
    showFinishButton: true,
    showRemoveButton: false,
    maxFileCount: 1,
  }

  const getUser = async () => {
    try {
      const response = await fetch(`/api/users/${user._id}`)
      const data = await response.json()
      setUser(data)
    } catch (error) {
      console.error(error)
    }
  }

  const updateUser = async (icon) => {
    try {
      const response = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ icon: `${icon}` }),
      })
      const data = await response.json()
      setNewIcon("new icon set")
      setUser(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [newIcon])

  return (
    <>
      <div className='profile-content'>

    {
      viewUser ?
      // ViewUser Profile Display
        <div>
          <div className='profile-img'>
            <img src={viewUser.icon} />
          </div>
          <div className='profile-data'>
            {viewUser.name} <br />
            <span className='profile-stat-data'>{movies.length > 0 ? movies.length : 0} movies in collection.</span>
          </div>
        </div>
        :
      // User Profile Display
        <div>
          <div className='profile-img'>
            <img src={user.icon} />
            <UploadButton uploader={uploader}
                options={options}
                onComplete={(files) => files.length === 1? updateUser(files.map((x) => x.fileUrl).join("\n")) : '' }>
                  {({onClick}) =>
                    <button onClick={onClick}>
                      Upload
                    </button>
                  }
            </UploadButton>
          </div>
          <div className='profile-data'>
            {user.name} <br />
            <span className='profile-stat-data'>{movies.length > 0 ? movies.length : 0} movies in collection.</span>
          </div>
        </div>
    }

        <br />

        <div className='outer'>
          <div className='profile-stats-outer'>
            <div id='profile-stats'>
              <ul>
                <li>Favorite Director: <span className='profile-stat-data'>{movies ? favoriteDirector() : ''}</span></li>
                <li>Favorite Genre: <span className='profile-stat-data'>{movies ? favoriteGenre() : ''}</span></li>
                <li>Total Runtime: <span className='profile-stat-data'>{movies ? totalRuntime() : ''}</span></li>
              </ul>
            </div>
            <br />
            <div className='user-search-button-outer'>
              <ScrollButton />
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
