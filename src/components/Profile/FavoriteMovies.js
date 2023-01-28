import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function FavoriteMovies ({ movies }) {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <>
      <div className='carousel-container'>
      <Carousel 
      autoPlay
      infiniteLoop
      centerMode
      showThumbs={false}
      showArrows={false}
      showStatus={false}
      centerSlidePercentage={20}
      showIndicators={false}
      >
        {
          movies
            ? movies.map((movie, index) => {
              return (
                <div className='carousel-img-outer' key={index}>
                  <img className="carousel-img" src={movie.Poster} alt={`${movie.Title} poster.`} />
                </div>
              )
            })
            : ''
        }
      </Carousel>
      </div>
    </>
  )
}
