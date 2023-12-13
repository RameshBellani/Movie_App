import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import './index.css'

const SearchedMoviesPage = () => {
  const {query} = useParams()
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const apiKey = '7bf2722327527dfd838d3972adf60e74'
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1`

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setSearchResults(data.results))
      .catch(error => console.error('Error fetching searched movies:', error))
  }, [query])

  return (
    <div className="query-container">
      <h1>Search Results for {query}</h1>
      <div className="movie-query">
        {searchResults.map(movie => (
          <div key={movie.id} className="query-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="query-image"
            />
            <div className="query-info">
              <h3>{movie.title}</h3>
              <p>Rating: {movie.vote_average}</p>
              <Link to={`/movie/${movie.id}`} className="details-home-btn">
                <button type="button" className="details-home-btn">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchedMoviesPage
