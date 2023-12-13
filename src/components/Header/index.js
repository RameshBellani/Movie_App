import {Link, useHistory} from 'react-router-dom'
import {useState} from 'react'
import './index.css'

const Header = () => {
  const [query, setQuery] = useState('')
  const history = useHistory()

  const handleSearch = () => {
    const trimmedQuery = query.trim()

    if (trimmedQuery !== '') {
      console.log('Search query:', trimmedQuery)
      history.push(`/search/${trimmedQuery}`)
    }
  }

  const image =
    'https://res.cloudinary.com/dwffepf9q/image/upload/v1702446823/edyzosw7mxojssyzu1li.png'

  return (
    <div className="navbar">
      <div className="heading-container">
        <img src={image} alt="logo" className="logo" />
        <h1 className="heading">movieDB</h1>
      </div>
      <div className="routes-div">
        <ul className="header-list">
          <Link to="/" className="header-list-item">
            <li>Popular</li>
          </Link>
          <Link to="/top-rated" className="header-list-item">
            <li>Top Rated</li>
          </Link>
          <Link to="/upcoming" className="header-list-item">
            <li>Upcoming</li>
          </Link>
        </ul>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            onChange={e => setQuery(e.target.value)}
          />
          <button
            type="button"
            className="search-button"
            onClick={handleSearch}
          >
            Search
          </button>
          <button type="button" className="button">
            LogOut
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
