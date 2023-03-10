import { useState } from 'react'
import DisplayMovie from '../DisplayMovie/DisplayMovie'

export default function MovieSearchBar ({ user, getMovies, setUser, setViewUser }) {
  const apiKey = '63153185'
  const [movie, setMovie] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const getMovie = async (searchTerm) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
      )
      const data = await response.json()
      setMovie(data)
    } catch (e) {
      console.error(e)
    }
  }

  const handleChange = (evt) => {
    setSearchTerm(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    getMovie(searchTerm)
    setSearchTerm('')
  }

  return (
    <>
      <div id='movie-search-container'>
        <form onSubmit={handleSubmit}>
          <input className='movie-searchbar' type='text' onChange={handleChange} value={searchTerm} placeholder='Search Movies' />
        </form>
      </div>
      {
        movie
          ? <DisplayMovie movie={movie} user={user} setUser={setUser} setMovie={setMovie} getMovies={getMovies} setViewUser={setViewUser} />
          : ''
      }
    </>
  )
}
