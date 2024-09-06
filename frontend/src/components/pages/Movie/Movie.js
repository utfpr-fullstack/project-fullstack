import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WalletIcon from '@mui/icons-material/Wallet';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';

import MovieComponent from "../../MovieComponent";
import "../Movie/MovieDetails.css";

const movieURL = "https://api.themoviedb.org/3/movie/"
const apiKey = "api_key=75494e8a3b20677db6d1758718e3be64"

const Movie = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);

    const getMovie = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        setMovie(data);
    }

    const formatCurrency = (number) => {
        return number.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    useEffect(() => {
        const movieUrl = `${movieURL}${id}?${apiKey}`;
        getMovie(movieUrl)
    }, []);


    return (
        <div className="movie__page">
            {movie && (
                <>
                    <MovieComponent movie={movie} showLink={false} />
                    <p className="movie__resume">{movie.tagline}</p>
                    <div className="movie__info">
                        <h3>
                            <WalletIcon/> Budget:
                        </h3>
                        <p>{formatCurrency(movie.budget)}</p>
                        <h3>
                            <AttachMoneyIcon/> Revenue:
                        </h3>
                        <p>{formatCurrency(movie.revenue)}</p>
                        <h3>
                            <AccessTimeIcon/> Runtime:
                        </h3>
                        <p>{movie.runtime} minutos</p>
                        <h3>
                            <DescriptionIcon/> Overview:
                        </h3>
                        <p>{movie.overview}</p>
                    </div>
                </>
            )}
        </div>
    );
};
export default Movie;