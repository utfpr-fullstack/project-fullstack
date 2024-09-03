import api from '../../utils/api';

import {useState, useEffect} from 'react';

import {Link} from 'react-router-dom';

import styles from './Home.module.css';

function Home() {
    const[movies, setMovie] = useState([]);

    useEffect(() => {
        api.get('/movies').then(response => {
            setMovie(response.data.movies);
        });
    }, []);

    return(
        <section>
            <div className={styles.movie_home_header}>
                <h1>Home</h1>
                <p>Welcome to the Home page!</p>
            </div>
            <div className={styles.movie_home_container}>
                {movies.length > 0 &&
                    movies.map(movie => (
                        <div className={styles.movie_card}>
                            <div style={{backgroundImage: `url(${process.env.REACT_APP_API}/img/movies/${movie.images[0]})`}} className={styles.movie_card_img}></div>
                            <h3>{movie.title}</h3>
                            <p>
                                <span className="bold">Título:</span> {movie.title}
                            </p>
                            <Link to={`movie/${movie._id}`}>Mais detalhes</Link>
                        </div>
                    ))}
                {movies.length === 0 && (
                    <p>nao tem pet</p>
                )}
            </div>
        </section>
    );
}

export default Home;