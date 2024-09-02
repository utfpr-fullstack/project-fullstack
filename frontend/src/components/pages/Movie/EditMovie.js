import api from "../../../utils/api";

import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";

import styles from './AddMovie.module.css';
import MovieForm from "../../form/MovieForm";

import useMessage from '../../../hooks/useMessage.js';

function EditMovie() {

    const[movie, setMovie] = useState({});
    const[token] = useState(localStorage.getItem('token') || '');
    const {id} = useParams();
    const {message} = useMessage();

    useEffect(() => {
        api.get(`/movies/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        }).then(response => {
            setMovie(response.data.movie);
        })
    }, [token, id])

    async function updateMovie(movie) {
        let type = 'success';
        let msg = 'Movie updated successfully.';

        const formData = new FormData();

        await Object.keys(movie).forEach(key => {
            if (key === 'images') {
                for(let i = 0; i < movie[key].length; i++) {
                    formData.append('images', movie[key][i]);
                }
            } else {
                formData.append(key, movie[key]);
            }
        });

        const data = await api.patch(`/movies/${movie._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            },
        }).then((response) => {
            return response.data;
        })    .catch((error) => {
            type = 'error'
            msg =  error.response.data.message
        })
        message(msg, type);
    }

    return(
        <section>
            <div className={styles.addmovie_header}>
                <h1>Edit Movie</h1>
            </div>
            {movie.title && (
                <MovieForm handleSubmit={updateMovie} btnText="Atualizar" movieData={movie} />
            )}
        </section>
    );
}

export default EditMovie;