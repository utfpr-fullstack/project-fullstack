import api from '../../../utils/api';

import styles from './AddMovie.module.css';

import { useState } from 'react';
import {useNavigate} from "react-router-dom";

import useMessage from '../../../hooks/useMessage.js';

import MovieForm from '../../form/MovieForm';

function AddMovie() {
    const[token] = useState(localStorage.getItem('token') || '');
    const { message } = useMessage();
    const navigate = useNavigate();

    async function registerMovie(movie) {
        let msg = 'Movie registered successfully.'
        let type = 'success'

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

        const data = await api.post('/movies/save', formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            },
        }).then((response) => {
            return response.data;
        })
            .catch((error) => {
                type = 'error'
                msg =  error.response.data.message
            })
        message(msg, type);

        if(type !== 'error') navigate('/movies/myMovies');
    }

    return (
        <section className={styles.addmovie_header}>
            <div>
                <h1>Cadastre um filme</h1>
            </div>
            <p>form</p>
            <MovieForm handleSubmit={registerMovie} btnText="Cadastrar filme" />
        </section>
    );
}

export default AddMovie;