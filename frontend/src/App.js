import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Menu from './pages/Menu';
import Register from './pages/Register';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import Backoffice from './pages/Backoffice';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute'; // Import the new component

function App() {

    useEffect(() => {
        const loader = document.getElementById('loader-container');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, []);

    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* --- ADMIN ROUTES --- */}
                {/* Only 'adminRole' can enter here */}
                <Route element={<ProtectedRoute allowedRoles={['adminRole']} />}>
                    <Route path="/backoffice" element={<Backoffice />} />
                </Route>

                {/* --- CLIENT ROUTES --- */}
                {/* Only 'clientRole' can enter here */}
                <Route element={<ProtectedRoute allowedRoles={['clientRole']} />}>
                    <Route path="/menu" element={<Menu />} />
                    {/* Add orders, etc. */}
                </Route>

            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;

//comentario