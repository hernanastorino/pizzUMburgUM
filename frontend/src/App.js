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
import PagosYEnvios from './pages/PagosYEnvios';
import Perfil from './pages/Perfil';
import PerfilAdmin from './pages/PerfilAdmin'; // AGREGADO
import Pedidos from './pages/Pedidos';
import PedidosAdmin from './pages/PedidosAdmin';
import Acompaniamiento from './pages/Acompaniamiento';
import Bebidas from './pages/Bebidas';
import MasaPizza from './pages/MasaPizza';
import TiposSalsa from './pages/SalsaPizza';
import TiposQueso from './pages/QuesoPizza';
import Toppings from './pages/ToppingsPizza';
import TipoCarne from './pages/BurgerCarne';
import TipoPan from './pages/BurgerPan';
import BurgerQueso from './pages/BurgerQueso';
import BurgerToppings from './pages/BurgerToppings';
import Carrito from "./components/Carrito";
import CreateAdmin from './pages/CreateAdmin';
import './index.css'

// Components
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';
import SimpleNavbar from './components/SimpleNavbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Componente helper para renderizar la navbar correcta
const NavbarSwitch = () => {
    const role = localStorage.getItem('role');
    return role === 'adminRole' ? <AdminNavbar /> : <Navbar />;
};

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
                
                {/* Páginas públicas con navbar simple (solo logo) */}
                <Route path="/login" element={
                    <>
                        <SimpleNavbar />
                        <Login />
                        <Footer />
                    </>
                } />
                
                <Route path="/register" element={
                    <>
                        <SimpleNavbar />
                        <Register />
                        <Footer />
                    </>
                } />

                {/* --- ADMIN ROUTES --- */}
                <Route element={<ProtectedRoute allowedRoles={['adminRole']} />}>
                    <Route path="/backoffice" element={
                        <>
                            <AdminNavbar />
                            <Backoffice />
                            <Footer />
                        </>
                    } />

                    <Route path="/create-admin" element={
                        <>
                            <AdminNavbar />
                            <CreateAdmin />
                            <Footer />
                        </>
                    } />

                    {/* RUTA PARA PEDIDOS ADMIN */}
                    <Route path="/pedidos-admin" element={
                        <>
                            <AdminNavbar />
                            <PedidosAdmin />
                            <Footer />
                        </>
                    } />

                    {/* RUTA PARA PERFIL ADMIN */}
                    <Route path="/perfil-admin" element={
                        <>
                            <AdminNavbar />
                            <PerfilAdmin />
                            <Footer />
                        </>
                    } />
                </Route>

                {/* --- SHARED ROUTE: MENU (Admin y Client pueden acceder) --- */}
                <Route element={<ProtectedRoute allowedRoles={['adminRole', 'clientRole']} />}>
                    <Route path="/menu" element={
                        <>
                            <NavbarSwitch />
                            <Menu />
                            <Footer />
                        </>
                    } />

                    {/* Rutas de creación de productos - Admin y Client */}
                    <Route path="/masa-pizza" element={
                        <>
                            <NavbarSwitch />
                            <MasaPizza />
                            <Footer />
                        </>
                    } />

                    <Route path="/salsa-pizza" element={
                        <>
                            <NavbarSwitch />
                            <TiposSalsa />
                            <Footer />
                        </>
                    } />

                    <Route path="/queso-pizza" element={
                        <>
                            <NavbarSwitch />
                            <TiposQueso />
                            <Footer />
                        </>
                    } />

                    <Route path="/toppings-pizza" element={
                        <>
                            <NavbarSwitch />
                            <Toppings />
                            <Footer />
                        </>
                    } />

                    <Route path="/burger-carne" element={
                        <>
                            <NavbarSwitch />
                            <TipoCarne />
                            <Footer />
                        </>
                    } />

                    <Route path="/burger-pan" element={
                        <>
                            <NavbarSwitch />
                            <TipoPan />
                            <Footer />
                        </>
                    } />

                    <Route path="/burger-queso" element={
                        <>
                            <NavbarSwitch />
                            <BurgerQueso />
                            <Footer />
                        </>
                    } />

                    <Route path="/burger-toppings" element={
                        <>
                            <NavbarSwitch />
                            <BurgerToppings />
                            <Footer />
                        </>
                    } />

                    <Route path="/acompaniamiento" element={
                        <>
                            <NavbarSwitch />
                            <Acompaniamiento />
                            <Footer />
                        </>
                    } />

                    <Route path="/bebidas" element={
                        <>
                            <NavbarSwitch />
                            <Bebidas />
                            <Footer />
                        </>
                    } />

                    <Route path="/carrito" element={
                        <>
                            <NavbarSwitch />
                            <Carrito />
                            <Footer />
                        </>
                    } />
                </Route>

                {/* --- CLIENT ONLY ROUTES --- */}
                <Route element={<ProtectedRoute allowedRoles={['clientRole']} />}>
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

                    <Route path="/pagosYEnvios" element={
                        <>
                            <Navbar />
                            <PagosYEnvios />
                            <Footer />
                        </>
                    } />

                    <Route path="/pedidos" element={
                        <>
                            <Navbar />
                            <Pedidos />
                            <Footer />
                        </>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;