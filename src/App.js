import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from './components/Header'
import TopRatedPage from './components/TopRatedPage'
import UpcomingPage from './components/UpcomingPage'
import PopularPage from './components/Home'
import SearchMoviePage from './components/SearchMoviePage'
import MovieDetailsPage from './components/MovieDetails'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={PopularPage} />
        <Route path="/top-rated" exact component={TopRatedPage} />
        <Route path="/upcoming" exact component={UpcomingPage} />
        <Route exact path="/movie/:movieId" component={MovieDetailsPage} />
        <Route exact path="/search/:query" component={SearchMoviePage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
