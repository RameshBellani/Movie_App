import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const TopRatedPage = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const apiKey = '7bf2722327527dfd838d3972adf60e74'
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`

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
        console.error('Error fetching top-rated movies:', error)
      })
  }, [])

  return (
    <div className="rated-container">
      <h1 className="rated-Movie-Heading">Top Rated</h1>
      <ul className="rated-movie-container">
        {movies.map(movie => (
          <li key={movie.id} className="rated-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="image-rated"
            />
            <div className="rated-info">
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

export default TopRatedPage
