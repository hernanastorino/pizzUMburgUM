import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Menu from './pages/Menu';
import Register from './pages/Register';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import Backoffice from './pages/Backoffice';
import Favoritos from './pages/Favoritos';
import Perfil from './pages/Perfil';
import MasaPizza from './pages/MasaPizza';
import TiposSalsa from './pages/TiposSalsa';
import TiposQueso from './pages/TiposQueso';
import Toppings from './pages/Toppings';
import TipoCarne from './pages/TipoCarne';
import TipoPan from './pages/TipoPan';
import BurgerSalsa from './pages/BurgerSalsa';
import BurgerQueso from './pages/BurgerQueso';
import BurgerToppings from './pages/BurgerToppings';
import './index.css'

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

                    <Route path="/perfil" element={
                        <>
                            <Navbar />
                            <Perfil />
                            <Footer />
                        </>
                    } />

                    <Route path="/masa-pizza" element={
                        <>
                            <Navbar />
                            <MasaPizza />
                            <Footer />
                        </>
                    } />


                    <Route path="/tipos-salsa" element={
                    <>
                        <Navbar />
                        <TiposSalsa />
                        <Footer />
                    </>
                    } />


                    <Route path="/tipos-queso" element={
                    <>
                        <Navbar />
                        <TiposQueso />
                        <Footer />
                    </>
                    } />

                    <Route path="/toppings" element={
                    <>
                        <Navbar />
                        <Toppings />
                        <Footer />
                    </>
                    } />

                    <Route path="/tipo-carne" element={
                    <>
                        <Navbar />
                        <TipoCarne />
                        <Footer />
                    </>
                    } />

                    <Route path="/tipo-pan" element={
                    <>
                        <Navbar />
                        <TipoPan />
                        <Footer />
                    </>
                    } />


                    <Route path="/burger-salsa" element={
                    <>
                        <Navbar />
                        <BurgerSalsa />
                        <Footer />
                    </>
                    } />


                    <Route path="/burger-queso" element={
                    <>
                        <Navbar />
                        <BurgerQueso />
                        <Footer />
                    </>
                    } />

                    

                    

                    <Route path="/burger-toppings" element={
                    <>
                        <Navbar />
                        <BurgerToppings />
                        <Footer />
                    </>
                    } />

                    
            </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;