import { useState, useEffect} from "react";

import { Link } from "react-router-dom";
function MyMovies(){

    const [movies, setMovies] = useState([]);

    return (
        <section>
            <h1>My Movies</h1>
            <Link to="/movies/add">Cadastras filme</Link>
            <div>
                {movies.length > 0 && <p>Meus filmes cadastrados</p>}
                {movies.length === 0 && <p>Você ainda não cadastrou nenhum filme</p>}
            </div>
        </section>
    )
}

export default MyMovies;