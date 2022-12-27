import AllMovies from '../../components/Profile/AllMovies'
import FavoriteMovies from '../../components/Profile/FavoriteMovies'
import MovieSearchBar from '../../components/Profile/MovieSearchBar'
import ProfileDisplay from '../../components/Profile/ProfileDisplay'

export default function Profile (props) {
  return (
    <>
      <div id='main-container'>
        <div>
          <ProfileDisplay />
        </div>
        <div>
          <MovieSearchBar user={props.user} />
          <FavoriteMovies />
          <AllMovies user={props.user} />
        </div>
      </div>
    </>
  )
}
