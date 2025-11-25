import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import borrosoImage from './assets/images/borroso.jpg'

// Pages
import Menu from './pages/Menu';
import Register from './pages/Register';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import Backoffice from './pages/Backoffice';
import Favoritos from './pages/Favoritos';
import Perfil from './pages/PagosYEnvios';
import MasaPizza from './pages/MasaPizza';
import TiposSalsa from './pages/SalsaPizza';
import TiposQueso from './pages/QuesoPizza';
import Toppings from './pages/ToppingsPizza';
import TipoCarne from './pages/BurgerCarne';
import TipoPan from './pages/BurgerPan';
import BurgerQueso from './pages/BurgerQueso';
import BurgerToppings from './pages/BurgerToppings';
import './index.css'

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    // Aplicar la imagen de fondo al body
    useEffect(() => {
        document.body.style.backgroundImage = `url(${borrosoImage})`
        document.body.style.backgroundSize = 'cover'
        document.body.style.backgroundPosition = 'center'
        document.body.style.backgroundAttachment = 'fixed'
        document.body.style.backgroundRepeat = 'no-repeat'
    }, [])

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

                    <Route path="/pagosYEnvios" element={
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

                    <Route path="/salsa-pizza" element={
                    <>
                        <Navbar />
                        <TiposSalsa />
                        <Footer />
                    </>
                    } />

                    <Route path="/queso-pizza" element={
                    <>
                        <Navbar />
                        <TiposQueso />
                        <Footer />
                    </>
                    } />

                    <Route path="/toppings-pizza" element={
                    <>
                        <Navbar />
                        <Toppings />
                        <Footer />
                    </>
                    } />

                    <Route path="/burger-carne" element={
                    <>
                        <Navbar />
                        <TipoCarne />
                        <Footer />
                    </>
                    } />

                    <Route path="/burger-pan" element={
                    <>
                        <Navbar />
                        <TipoPan />
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