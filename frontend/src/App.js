import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Home from './components/pages/Home';
import Search from './components/pages/Search';



function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={   <Register />} />
                <Route path="/" element={<Home />} />
                <Route path="search" element={<Search />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
