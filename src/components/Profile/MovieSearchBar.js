import { useState } from 'react'

export default function MovieSearchBar () {
  const apiKey = '63153185'
  const [movie, setMovie] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState("")

  const getMovie = async (searchTerm) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
      )
      const data = await response.json()
      setMovie(data)
    } catch (e) {
      console.error(e)
      setErrorMessage(e.message)
    }
  }

  const handleChange = (evt) => {
    setSearchTerm(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    getMovie(searchTerm)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={searchTerm} />
        <input type="submit" value="submit" />
      </form>
    </>
  )
}
