import { useState, useEffect } from 'react';
import { useSearchParams} from "react-router-dom";
import MovieComponent from "../MovieComponent.js"

import '../MovieGrid.css';

const searchURL = "https://api.themoviedb.org/3/search/movie"
const apiKey = "api_key=75494e8a3b20677db6d1758718e3be64"

const Search = () => {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const query = searchParams.get("q");

    const getMovie = async (url) => {
        const response = await fetch(url);
        const data = await response.json();

        setMovies(data.results);
    };

    useEffect(() => {
        const search = `${searchURL}?${apiKey}&query=${query}`;

        getMovie(search);
    }, [query]);

    return (
        <div className="container">
            <h2 className="container__title">Results for: <span className="query__text">{query}</span> </h2>
            <div className="container__movies">
                {movies.length === 0 ? <p>Loading...</p> : (
                    movies.map((movie) => (
                        <MovieComponent key={movie.id} movie={movie} />
                    ))
                )}
            </div>
        </div>
    );
};
export default Search;