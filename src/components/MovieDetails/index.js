import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import './index.css'

const MovieDetailsPage = () => {
  const {movieId} = useParams()
  const [movieDetails, setMovieDetails] = useState({})
  const [cast, setCast] = useState([])

  useEffect(() => {
    const apiKey = '7bf2722327527dfd838d3972adf60e74'
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
    const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`

    fetch(movieDetailsUrl)
      .then(response => response.json())
      .then(data => setMovieDetails(data))
      .catch(error => console.error('Error fetching movie details:', error))

    fetch(castUrl)
      .then(response => response.json())
      .then(data => setCast(data.cast))
      .catch(error => console.error('Error fetching cast details:', error))
  }, [movieId])

  return (
    <div className="container">
      <h1 className="heading-movie">{movieDetails.title}</h1>
      <div className="movie-details">
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className="movie-img"
        />
        <div className="details">
          <p>
            <span className="span-content">Ratings:</span>{' '}
            {movieDetails.vote_average}
          </p>
          <p>
            <span className="span-content">Duration: </span>
            {movieDetails.runtime} mins
          </p>
          <p>
            <span className="span-content">Genre: </span>
            {movieDetails.genres?.map(genre => genre.name).join(', ')}
          </p>
          <p>
            <span className="span-content">Release Date: </span>
            {movieDetails.release_date}
          </p>
          <p>
            <span className="span-content">Overview: </span>
            {movieDetails.overview}
          </p>
        </div>
      </div>
      <div className="cast-details">
        <h2>Cast</h2>
        <ul className="cast-list">
          {cast.map(actor => (
            <li key={actor.id} className="cast-card">
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className="image-cast"
              />
              <div>
                <p>
                  <span className="span-content">Name: </span>
                  {actor.name}
                </p>
                <p>
                  <span className="span-content">Character: </span>
                  {actor.character}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MovieDetailsPage
