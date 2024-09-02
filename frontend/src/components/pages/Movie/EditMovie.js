import api from "../../../utils/api";

import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";

import styles from './AddMovie.module.css';
import MovieForm from "../../form/MovieForm";

import useMessage from '../../../hooks/useMessage.js';

function EditMovie() {

    const[pet, setPet] = useState({});
    const[token] = useState(localStorage.getItem('token') || '');
    const {id} = useParams();
    const {message} = useMessage();

    useEffect(() => {
        api.get(`/movies/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        }).then(response => {
            setPet(response.data.movie);
        })
    }, [token, id])

    return(
        <section>
           <div className={styles.addmovie_header}>
                <h1>Edit Movie</h1>
           </div>
            {pet.name &&
                <MovieForm handleSubmit={updateMovie} />
            }
        </section>

    );
}

export default EditMovie;