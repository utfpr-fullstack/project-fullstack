import { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor';
import SearchIcon from '@mui/icons-material/Search';

import styles from './Navbar.module.css';

import { Context } from '../../context/UserContext';
const Navbar = () => {

    const { authenticating, logout } = useContext(Context);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        if(search.trim() === "") return;
        navigate(`/search?q=${search}`);
        setSearch("");
    };

    return (
        <nav className={styles.navbar}>
            <h2>
                <Link to="/"><CameraIndoorIcon fontSize="large"/> MovieAPI</Link>
            </h2>
            <ul>
                <li>
                    <Link to="/">Alugar</Link>
                </li>
                {authenticating ? (
                    <>
                        <li>
                            <Link to="/movies/myMovies">My Movies</Link>
                        </li>
                        <li>
                            <Link to="/user/profile">Profile</Link>
                        </li>
                        <li onClick={logout}>Logout</li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Cadastrar</Link>
                        </li>
                    </>
                )}
            </ul>
            <form onSubmit={submitHandler}>
                <input type="search" placeholder="Digite o nome do filme"
                       onChange={(e) => setSearch(e.target.value)} value={search}
                />
                <button type="submit">
                    <SearchIcon sx={{fontSize: 18}}/>
                </button>
            </form>
        </nav>
    )
}

export default Navbar;