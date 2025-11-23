import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Menu from './pages/Menu';
import Register from './pages/Register';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import Backoffice from './pages/Backoffice';
import Favoritos from './pages/Favoritos';
import Perfil from './pages/Perfil';  // ← AGREGADO

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Landing Page - SIN Navbar ni Footer */}
                <Route path="/" element={<LandingPage />} />
                
                {/* Páginas con Navbar y Footer */}
                <Route path="/login" element={
                    <>
                        <Navbar />
                        <Login />
                        <Footer />
                    </>
                } />
                
                <Route path="/register" element={
                    <>
                        <Navbar />
                        <Register />
                        <Footer />
                    </>
                } />

                {/* --- ADMIN ROUTES --- */}
                <Route element={<ProtectedRoute allowedRoles={['adminRole']} />}>
                    <Route path="/backoffice" element={
                        <>
                            <Navbar />
                            <Backoffice />
                            <Footer />
                        </>
                    } />
                </Route>

                {/* --- CLIENT ROUTES --- */}
                <Route element={<ProtectedRoute allowedRoles={['clientRole']} />}>
                    <Route path="/menu" element={
                        <>
                            <Navbar />
                            <Menu />
                            <Footer />
                        </>
                    } />
                    
                    <Route path="/favoritos" element={
                        <>
                            <Navbar />
                            <Favoritos />
                            <Footer />
                        </>
                    } />

                    {/* ← RUTA PERFIL AGREGADA */}
                    <Route path="/perfil" element={
                        <>
                            <Navbar />
                            <Perfil />
                            <Footer />
                        </>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;