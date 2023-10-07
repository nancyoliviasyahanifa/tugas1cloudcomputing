import './App.css'
import {getMovieList, searchMovie} from "./api"
import { useEffect, useState } from 'react'

const App = () => {
  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result)
    })
  }, [])

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
            <div className="Movie-title">{movie.title}</div>
            <div className="Movie-image">
                <img src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} />
            </div>            
            <div className="Movie-date">Release Date: {movie.release_date}</div>
            <div className="Movie-rate">Rating: {movie.vote_average}</div>
          </div>
      )
    })
  }

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q)
      setPopularMovies(query.results)
    }    
  }

  console.log({popularMovies: popularMovies})

  return (
    <div className="App">
      <header className="App-header">
        <h1>KELOMPOK 11 CLOUD COMPUTING</h1>
        <input placeholder='cari film...' 
        className='Movie-search'
        onChange={({target}) => search(target.value)}
        />
        <div className="Movie-container">
          <PopularMovieList />
        </div>        
      </header>
    </div>
  )
}

export default App;
