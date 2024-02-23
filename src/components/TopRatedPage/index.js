import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Pagination from '../Pagination' // Import the Pagination component
import './index.css'

const TopRatedPage = () => {
  const [movies, setMovies] = useState([])
  const [totalPages, setTotalPages] = useState(0) // State to store total pages
  const [currentPage, setCurrentPage] = useState(1) // State to store current page

  const fetchTopRatedMovies = () => {
    const apiKey = '7bf2722327527dfd838d3972adf60e74'
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${currentPage}`

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        setMovies(data.results)
        setTotalPages(data.total_pages) // Set total pages from the API response
      })
      .catch(error => {
        console.error('Error fetching top-rated movies:', error)
      })
  }

  useEffect(() => {
    fetchTopRatedMovies()
  }, [currentPage])

  const handlePageChange = page => {
    setCurrentPage(page) // Update the current page
  }

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
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default TopRatedPage
