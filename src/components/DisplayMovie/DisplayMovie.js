export default function DisplayMovie (props) {
  return (
    <>
      {
        props.movie ?
        <div id="display-movie">
            <img src={props.movie.Poster} alt={props.movie.Title} />
            <h1>{props.movie.Title}</h1>
            <h4>Rated: {props.movie.Rated} Released: {props.movie.Released} Runtime: {props.movie.Runtime}</h4>
            <h4>Genre: {props.movie.Genre} Director: {props.movie.Director}</h4>
            <p>
                {props.movie.Plot}
            </p>
            <h4>Box Office: {props.movie.BoxOffice}</h4>
            <form>
                <input type="submit" value="Add Movie" />
            </form>
        </div> 
        :
        <div>
            No movie to display.
        </div>
      }
    </>
  )
}
