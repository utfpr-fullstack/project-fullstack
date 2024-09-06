import { useState, useEffect} from 'react';
import MovieComponent from "../../components/MovieComponent"
import "../../components/MovieGrid.css"

const movieURL = "https://api.themoviedb.org/3/movie/"
const apiKey = "api_key=75494e8a3b20677db6d1758718e3be64"

const Home = () => {
    const [topMovies, setTopMovies] = useState([]);

    const getTopMovies = async (url) => {
        const response = await fetch(url);
        const data = await response.json();

        setTopMovies(data.results);
    };

    useEffect(() => {
        const topRatedMoviesUrl = `${movieURL}top_rated?${apiKey}`;

        getTopMovies(topRatedMoviesUrl);
    }, []);


    return (
        <div className="container">
            <h2 className="container__title">Best Movies: </h2>
            <div className="container__movies">
                {topMovies.length === 0 && <p>Loading...</p>}
                {topMovies.length > 0 && topMovies.map((movie) => <MovieComponent key={movie.id} movie={movie} />)}
            </div>

        </div>
    );
};
export default Home;