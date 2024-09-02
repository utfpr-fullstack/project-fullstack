import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import Message from "./components/layout/Message";

import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Home from './components/pages/Home';
import Search from './components/pages/Search';
import Profile from './components/pages/User/Profile';
import AddMovie from "./components/pages/Movie/AddMovie";
import MyMovies from './components/pages/Movie/MyMovies';

import { UserProvider } from './context/UserContext';

function App() {
    return (
        <Router>
            <UserProvider>
                <Navbar />
                <Message />
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/user/profile" element={<Profile />} />
                        <Route path="/movies/myMovies" element={<MyMovies />} />
                        <Route path="/movies/add" element={<AddMovie />} />
                    </Routes>
                </Container>
                <Footer />
            </UserProvider>
        </Router>
    );
}

export default App;
