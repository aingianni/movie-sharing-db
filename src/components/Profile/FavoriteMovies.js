import { useState, useEffect } from 'react'

export default function FavoriteMovies ({ movies }) {
  const [index, setIndex] = useState(0)

  const scroll = () => {
    if (index === movies.length - 1) {
      return setIndex(0)
    }
    return setIndex(index + 1)
  }

  useEffect(() => {
    const interval = setInterval(() => { scroll() }, 3000)
    return () => clearInterval(interval)
  })

  return (
    <>
      <div className='carousel-container'>
        {
          movies
            ? movies.map((movie) => {
              return (
                <div className='carousel-item' style={{ transform: `translate(-${index * 100}%)` }} key={movie._id}>
                  <img src={movie.Poster} />
                </div>
              )
            })
            : ''
        }
      </div>
    </>
  )
}
