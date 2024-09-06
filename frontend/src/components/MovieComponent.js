import { Link } from 'react-router-dom';

import StarIcon from '@mui/icons-material/Star';

const imageBaseURL = 'https://image.tmdb.org/t/p/w500/'

const MovieComponent = ({movie, showLink = true}) => {
    return (
        <div className="movie__card">
            <img src={imageBaseURL + movie.poster_path} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>
                <StarIcon sx={{ fontSize: 18 }} /> {movie.vote_average}
            </p>
            {showLink && <Link to={`/movie/${movie.id}`}>Details</Link>}
        </div>
    );
};
export default MovieComponent;