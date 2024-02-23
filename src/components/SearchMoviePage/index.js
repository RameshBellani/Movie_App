import React, {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import Pagination from '../Pagination' // Import the Pagination component
import './index.css'

const SearchedMoviesPage = () => {
  const {query} = useParams()
  const [searchResults, setSearchResults] = useState([])
  const [totalPages, setTotalPages] = useState(0) // State to store total pages
  const [currentPage, setCurrentPage] = useState(1) // State to store current page

  const fetchSearchResults = () => {
    const apiKey = '7bf2722327527dfd838d3972adf60e74'
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=${currentPage}`

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        setSearchResults(data.results)
        setTotalPages(data.total_pages) // Set total pages from the API response
      })
      .catch(error => {
        console.error('Error fetching searched movies:', error)
      })
  }

  useEffect(() => {
    fetchSearchResults()
  }, [query, currentPage])

  const handlePageChange = page => {
    setCurrentPage(page) // Update the current page
  }

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
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default SearchedMoviesPage
