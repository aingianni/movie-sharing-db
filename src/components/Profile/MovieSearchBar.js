import { useState } from 'react'
import DisplayMovie from '../DisplayMovie/DisplayMovie'

export default function MovieSearchBar (props) {
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
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} value={searchTerm} />
        <input type='submit' value='submit' />
      </form>
      {
        movie
          ? <DisplayMovie movie={movie} user={props.user} setMovie={setMovie} getMovies={props.getMovies} />
          : ''
      }
    </>
  )
}
