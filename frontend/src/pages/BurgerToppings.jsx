import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import BackButton from '../components/BackButton'
import NextButton from '../components/NextButton'
import '../index.css'
import baconImg from '../assets/images/bacon.png'

function BurgerToppings() {
    const [toppingsData, setToppingsData] = useState([])
    const [selectedToppings, setSelectedToppings] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    const pedidoAnterior = location.state
    const isFavoriteMode = pedidoAnterior?.isFavoriteMode; // Leemos la bandera

    useEffect(() => {
        const fetchToppings = async () => {
            try {
                const token = localStorage.getItem('token')
                const res = await axios.get('http://localhost:8080/api/products/toppings', {
                    headers: { Authorization: `Bearer ${token}` }
                })

                let data = res.data
                if (typeof data === 'string') {
                    try { data = JSON.parse(data) } catch (e) { console.error(e) }
                }

                const sizeKey = pedidoAnterior?.sizeKey || 'Medium'
                const priceField = `price${sizeKey}`

                const formatted = data.map(t => ({
                    id: t.toppingId,
                    title: t.name,
                    description: 'Extra',
                    image: baconImg,
                    priceVal: t[priceField],
                    price: `$${t[priceField]}`
                }))
                setToppingsData(formatted)
            } catch (err) {
                console.error("Error cargando toppings burger", err)
            }
        }
        fetchToppings()
    }, [pedidoAnterior])

    const handleToppingClick = (topping) => {
        setSelectedToppings((prev) => {
            if (prev.find(t => t.id === topping.id)) {
                return prev.filter(t => t.id !== topping.id)
            }
            return [...prev, topping]
        })
    }

    const handleFinalizar = async () => {
        try {
            const token = localStorage.getItem('token')
            const email = localStorage.getItem('email')
            if (!token || !email) { alert("Sesión expirada"); navigate('/login'); return; }

            const userRes = await axios.get(`http://localhost:8080/api/users/${encodeURIComponent(email)}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            const userId = userRes.data.userId || userRes.data.id

            const burgerBody = {
                userId: userId,
                name: `Burger ${pedidoAnterior.meatName} x${pedidoAnterior.dbSize}`,
                meatQuantity: pedidoAnterior.dbSize,
                meatId: pedidoAnterior.meatId,
                breadId: pedidoAnterior.breadId,
                condimentId: pedidoAnterior.condimentId,
                toppingIds: selectedToppings.map(t => t.id)
            }

            const burgerRes = await axios.post(
                'http://localhost:8080/api/products/burgers',
                burgerBody,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            const createdBurgerId = burgerRes.data.id

            if (isFavoriteMode) {
                await axios.post(
                    `http://localhost:8080/users/${userId}/favorites/${createdBurgerId}`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                alert("¡Guardada en tus Favoritos! ⭐");
                navigate('/favoritos');
            } else {
                const orderRes = await axios.post(
                    `http://localhost:8080/orders/start/user/${userId}`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                await axios.post(
                    `http://localhost:8080/orders/${orderRes.data.id}/items/creations`,
                    { productId: createdBurgerId, quantity: 1 },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                alert("¡Hamburguesa agregada al pedido! 🍔");
                navigate('/menu');
            }

        } catch (error) {
            console.error("Error procesando burger:", error)
            alert("Error al guardar.")
        }
    }

    const isToppingSelected = (toppingId) => selectedToppings.find(t => t.id === toppingId)

    return (
        <>
            <BackButton to="/burger-queso" />

            <NextButton
                onClick={handleFinalizar}
                show={true}
                text={isFavoriteMode ? "Guardar Favorito ⭐" : "Agregar al Carrito 🛒"}
            />

            <div style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{color: 'white', textAlign: 'center'}}>
                    {isFavoriteMode ? "Dale el toque final a tu Favorita" : "Extras para tu Burger"}
                </h2>
                <div className="restaurantMenu">
                    {toppingsData.map((item) => {
                        const isSelected = isToppingSelected(item.id)
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
                                               onClick={(e) => { e.preventDefault(); handleToppingClick(item) }}>
                                                {isSelected ? 'Quitar' : 'Agregar'}
                                            </a>
                                            <div className="btnBack">{item.price}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default BurgerToppings