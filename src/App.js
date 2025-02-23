import { useState } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./conponent/MovieCard";

const API_URL = 'https://www.omdbapi.com?apikey=fb8e60f6';

const App = () => {

    const [movies, setMovies] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    function returSearchTerm() {
        if (searchTerm !== '') {
            searchMovies(searchTerm)
        }
    }

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input placeholder="Search for movies" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} />
                <img src={SearchIcon} alt="search-icon" onClick={() => { returSearchTerm(searchTerm) }} />
            </div>

            <div className="container">
                {
                    movies.length > 0 ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default App;