import { useState } from 'react'
import { useEffect } from 'react';
import './App.css'
import Search from './components/Search'
import Loading from './components/Loading';
import MovieCard from './components/MovieCard';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method : 'GET',
  headers : {
    accept : 'application/json',
    Authorization : `Bearer ${API_KEY}`
  }
}


function App() {
  const [searchItem, setsearchItem] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setmovieList] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const fetchMovies = async (query = '') => {
    
    setisLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`     
      
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if(!response.ok){
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      if(data.response === 'False'){
        setErrorMessage(data.Error || 'Error fetching movies');
        setmovieList([]);
      }
      setmovieList(data.results || []);      
      console.log(data.results);
      
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies');
      
    }finally{
      setisLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(searchItem);
  }, [searchItem])



  return <main className="bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('./BG.png') " }}>
  <div className='pattern scale-90 '  />
  <div className='wrapper '>
    <header>
      <img src="./hero-img.png" alt="Hero Banner" />
      <h1>Find <span className='text-gradient' >Movies</span> You'll Enjoy Without the Hassel</h1>
      <Search searchItem = {searchItem} setsearchItem = {setsearchItem}  />
    </header>
    <section className='all-movies' >
      <h2 className='mt-[40px]' >All Movies</h2>
      
      {isLoading ? (
        <Loading />
      ) : errorMessage ? (
        <p className='text-red-500'>{errorMessage}</p>
      ) : (
        <ul>
          {movieList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </section>

  </div>
  </main>
}

export default App
