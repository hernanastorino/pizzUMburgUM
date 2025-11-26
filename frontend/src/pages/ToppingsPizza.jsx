import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';
import NextButton from '../components/NextButton';
import '../index.css';
import pepperoniImg from '../assets/images/pepperoni.jpg';

function ToppingsPizza() {
    const [toppingsData, setToppingsData] = useState([]);
    const [selectedToppings, setSelectedToppings] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const pedidoAnterior = location.state;

    useEffect(() => {
        const fetchToppings = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/products/toppings');
                const sizeKey = pedidoAnterior?.sizeKey || 'Medium';
                const priceField = `price${sizeKey}`;

                const formatted = res.data.map(t => ({
                    id: t.toppingId, // ID real
                    title: t.name,
                    description: 'Agrega sabor extra',
                    image: pepperoniImg,
                    priceVal: t[priceField], // Valor numérico para cálculos
                    price: `$${t[priceField]}` // Texto para mostrar
                }));
                setToppingsData(formatted);
            } catch (err) {
                console.error("Error cargando toppings", err);
            }
        };
        fetchToppings();
    }, [pedidoAnterior]);

    const handleToppingClick = (topping) => {
        setSelectedToppings((prev) => {
            if (prev.find(t => t.id === topping.id)) {
                return prev.filter(t => t.id !== topping.id);
            }
            return [...prev, topping];
        });
    };

    const handleAgregarAlCarrito = async () => {
        try {
            // 1. Obtener User ID (Asumimos que tenemos endpoint 'me' o lo guardamos en login)
            // Para este clutch, vamos a obtener el ID llamando a /me con el token
            const token = localStorage.getItem('token');
            if (!token) {
                alert("Debes iniciar sesión");
                navigate('/login');
                return;
            }

            // PEGAR ESTO
// 1. Obtener email (Asegúrate de haberlo guardado en el Login con localStorage.setItem('email', email))
            const userEmail = localStorage.getItem('email');
            if (!userEmail) {
                alert("No se encontró el email del usuario. Por favor inicia sesión de nuevo.");
                return;
            }

// 2. Buscar usuario por email para obtener su ID
// Asumo que tu endpoint es /api/users/{email}. Si es por query param (?email=...), cámbialo.
            const userRes = await axios.get(`http://localhost:8080/api/users/${userEmail}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

// Ajusta 'userId' o 'id' según cómo se llame el campo en tu entidad User de Java
            const userId = userRes.data.userId || userRes.data.id;

            // 2. Crear la Pizza en BD
            const pizzaBody = {
                userId: userId,
                name: `Pizza ${pedidoAnterior.masaName} ${pedidoAnterior.dbSize}`, // Nombre autogenerado
                size: pedidoAnterior.dbSize, // "15cm", "20cm", etc
                doughId: pedidoAnterior.doughId,
                cheeseId: pedidoAnterior.cheeseId,
                sauceId: pedidoAnterior.sauceId,
                toppingIds: selectedToppings.map(t => t.id)
            };

            const pizzaRes = await axios.post(
                'http://localhost:8080/api/products/pizzas',
                pizzaBody,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const createdPizzaId = pizzaRes.data.id;

            // 3. Obtener/Crear Orden Pendiente
            const orderRes = await axios.post(
                `http://localhost:8080/orders/start/user/${userId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const orderId = orderRes.data.id;

            // 4. Agregar Pizza a la Orden
            await axios.post(
                `http://localhost:8080/orders/${orderId}/items/creations`,
                { productId: createdPizzaId, quantity: 1 },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("¡Pizza agregada al carrito!");
            navigate('/carrito');

        } catch (error) {
            console.error("Error al procesar pedido:", error);
            alert("Hubo un error al agregar al carrito. Revisa la consola.");
        }
    };

    const isToppingSelected = (toppingId) => selectedToppings.find(t => t.id === toppingId);

    return (
        <>
            <BackButton to="/queso-pizza" />

            {/* Botón final ahora llama a la API */}
            <NextButton
                onClick={handleAgregarAlCarrito}
                show={true} // Siempre mostrar para permitir pizzas sin toppings extra
                text="Agregar al Carrito 🛒"
            />

            <div style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{color: 'white', textAlign: 'center'}}>Elige tus Toppings</h2>
                <div className="restaurantMenu">
                    {toppingsData.map((item) => {
                        const isSelected = isToppingSelected(item.id);
                        return (
                            <div className="menuItem" key={item.id}>
                                <img src={item.image} alt={item.title} />
                                <div className="menuItemContent">
                                    <div>
                                        <div className="title">{item.title}</div>
                                        <div className="location">{item.description}</div>
                                    </div>
                                    <div className="order">
                                        <div className="btnWrapper">
                                            <a href="#" className={`btnMenu ${isSelected ? 'confirmado' : ''}`}
                                               onClick={(e) => { e.preventDefault(); handleToppingClick(item); }}>
                                                {isSelected ? 'Quitar' : 'Agregar'}
                                            </a>
                                            <div className="btnBack">{item.price}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default ToppingsPizza;