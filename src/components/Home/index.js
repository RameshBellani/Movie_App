import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const PopularPage = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const apiKey = '7bf2722327527dfd838d3972adf60e74'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        setMovies(data.results)
      })
      .catch(error => {
        console.error('Error fetching popular movies:', error)
      })
  }, [])
  console.log(movies)
  return (
    <div className="home-container">
      <h1 className="home-Movie-Heading">Popular</h1>
      <ul className="home-movies-container">
        {movies.map(movie => (
          <li key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="image-home"
            />
            <div className="movie-info">
              <h3 className="heading-card">{movie.title}</h3>
              <p>Rating: {movie.vote_average}</p>
              <Link to={`/movie/${movie.id}`} className="details-home-btn">
                <button type="button" className="details-home-btn">
                  View Details
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PopularPage
