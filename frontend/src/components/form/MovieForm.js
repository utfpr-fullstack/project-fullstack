import {useState} from "react";

import formStyles from './Form.module.css';

import Input from "./input";
import SelectMovie from "./SelectMovie";

function MovieForm({ handleSubmit, movieData, btnText }) {

    const [movie, setMovie] = useState(movieData || {});
    const [preview, setPreview] = useState([]);
    const genre = ['Ação', 'Comédia', 'Drama', 'Ficção Científica', 'Terror', 'Romance', 'Suspense', 'Documentário', 'Animação', 'Fantasia', 'Musical', 'Policial', 'Aventura', 'Faroeste', 'Guerra', 'Histórico', 'Biografia', 'Infantil', 'Nacional', 'Outros'];

    function onFileChange(e) {
        setPreview(Array.from(e.target.files));
        setMovie({...movie, images: [...e.target.files]});
    }

    function handleChange(e) {
        setMovie({...movie, [e.target.name]: e.target.value});
    }

    function handleGenre(e) {
        setMovie({...movie, genre: e.target.options[e.target.selectedIndex].text});
    }

    function submit(e) {
        e.preventDefault();
        handleSubmit(movie);
    }

    return(
        <form onSubmit={submit} className={formStyles.form_container}>
            <div className={formStyles.preview_movie_images}>
                {preview.length > 0
                    ? preview.map((img, index) =>
                        <img src={URL.createObjectURL(img)} alt={movie.name} key={`${movie.name}+${index}`}
                        />
                    )
                    : movie.images && movie.images.map((img, index) =>
                    <img src={`${process.env.REACT_APP_API}/img/movie/${img}`}
                         alt={movie.name}
                         key={`${movie.name}+${index}`}
                    />)}
            </div>
                    <Input
                text="Imagens do filme"
                type="file"
                name="images"
                handleChange={onFileChange}
                multiple={true}
            />
            <Input
                text="Nome do filme"
                type="text"
                name="title"
                placeholder="Digite o nome do filme"
                handleChange={handleChange}
                value={movie.title || ''}
            />
            <Input
                text="Descrição do filme"
                type="text"
                name="description"
                placeholder="Digite a descrição do filme"
                handleChange={handleChange}
                value={movie.description || ''}
            />
            <Input
                text="Duração do filme"
                type="text"
                name="runtime"
                placeholder="Digite a duração do filme"
                handleChange={handleChange}
                value={movie.runtime || ''}
            />
            <SelectMovie
                name="genre"
                text="Selecione o gênero"
                options={genre}
                handleChange={handleGenre}
                value={movie.genre || ''}
            />
            <input type="submit" value={btnText}/>
        </form>
    );
}

export default MovieForm;