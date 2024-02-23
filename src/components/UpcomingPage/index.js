import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Pagination from '../Pagination'
import './index.css'

const UpcomingPage = () => {
  const [movies, setMovies] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchUpcomingMovies = () => {
    const apiKey = '7bf2722327527dfd838d3972adf60e74'
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${currentPage}`

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        setMovies(data.results)
        setTotalPages(data.total_pages)
      })
      .catch(error => {
        console.error('Error fetching upcoming movies:', error)
      })
  }

  useEffect(() => {
    fetchUpcomingMovies()
  }, [currentPage])

  const handlePageChange = page => {
    setCurrentPage(page)
  }

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
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default UpcomingPage
