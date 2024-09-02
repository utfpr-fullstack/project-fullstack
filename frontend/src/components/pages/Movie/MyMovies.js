import { useState, useEffect} from "react";

import { Link } from "react-router-dom";
import Image from "../../layout/Image";
import useMessage from '../../../hooks/useMessage.js';
import styles from './Dash.module.css';
import api from "../../../utils/api";

function MyMovies(){

    const [movies, setMovies] = useState([]);

    const [token]= useState(localStorage.getItem('token') || '');

    const { message } = useMessage();

    useEffect(() => {

        api.get('/movies/myMovies', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        }).then(response => {
            setMovies(response.data.movies);
        })
    }, [token])

    return (
        <section>
            <div className={styles.movielist_header}>
            <h1>My Movies</h1>
            <Link to="/movies/add">Cadastrar filme</Link>
            </div>
            <div className={styles.movielist_container}>
                {movies.length > 0 &&
                    movies.map((movie) =>(
                        <div className={styles.movielist_row} key={movie._id}>
                            <Image
                                src={`${process.env.REACT_APP_API}/img/movies/${movie.images[0]}`}
                                alt={movie.title} width="70px"
                            />
                            <span>{movie.title}</span>
                            <div className={styles.actions}>
                                <Link to={`/movies/edit/${movie._id}`}>Editar</Link>
                                <button>Excluir</button>
                            </div>
                        </div>
                    ))
                }
                {movies.length === 0 && <p>Você ainda não cadastrou nenhum filme</p>}
            </div>

        </section>
    )
}

export default MyMovies;