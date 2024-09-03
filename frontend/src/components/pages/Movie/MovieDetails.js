import api from "../../../utils/api";

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import styles from './MovieDetails.module.css';

import useMessage from '../../../hooks/useMessage.js';
function MovieDetails() {
    const [movie, setMovie] = useState({});
    const { id } = useParams();
    const { showMessage } = useMessage();

    const [token] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        api.get(`/movies/${id}`).then((response) => {
            setMovie(response.data.movie);
        })
    }, [id]);

    return(
        <>
            {movie.title && (
                <section className={styles.movie_details__container}>
                    <div>
                        <h1>Mais sobre o filme: {movie.title}</h1>
                    </div>
                    <div className={styles.movie_img}>
                        {movie.images.map((image, index) => (
                            <img key={index} src={`${process.env.REACT_APP_API}/img/movies/${movie.images}`}
                                 alt={movie.title}
                            />
                        ))}
                    </div>
                    <p>
                        <span className="bold">Título:</span> {movie.title}
                    </p>
                    <p>
                        <span className="bold">Descrição:</span> {movie.description}
                    </p>
                    <p>
                        <span className="bold">Runtime:</span> {movie.runtime}
                    </p>
                    <p>
                        <span className="bold">Runtime:</span> {movie.genre}
                    </p>
                </section>
            )}
        </>
    );
}

export default MovieDetails;