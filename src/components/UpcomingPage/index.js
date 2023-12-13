import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const UpcomingPage = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const apiKey = '7bf2722327527dfd838d3972adf60e74'
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`

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
        console.error('Error fetching upcoming movies:', error)
      })
  }, [])

  return (
    <div className="upcoming-container">
      <h1 className="up-Movie-Heading">Upcoming</h1>
      <ul className="up-movies-container">
        {movies.map(movie => (
          <li key={movie.id} className="up-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="image-up"
            />
            <div className="up-info">
              <h3>{movie.title}</h3>
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

export default UpcomingPage
