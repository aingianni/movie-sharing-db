import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function FavoriteMovies ({ movies }) {
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
          showIndicators={false}
          centerSlidePercentage={20}
        >
          {
          movies
            ? movies.sort(function (a, b) { return a.Title.localeCompare(b.Title) }).map((movie, index) => {
              return (
                <div className='carousel-img-outer' key={index}>
                  <img className='carousel-img' src={movie.Poster} alt={`${movie.Title} poster.`} />
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
