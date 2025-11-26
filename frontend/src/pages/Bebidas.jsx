import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import BackButton from '../components/BackButton'
import NextButton from '../components/NextButton'
import bebidasImage from '../assets/images/beverages.jpg' // Imagen genérica
import '../index.css'

function Bebidas() {
    const [bebidasData, setBebidasData] = useState([])
    const [selectedItems, setSelectedItems] = useState([]) // Lista de IDs seleccionados
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBebidas = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/products/beverages')
                // Mapeamos la respuesta del backend a la estructura visual
                const formatted = res.data.map(item => ({
                    id: item.id,
                    title: item.name,
                    description: 'Refrescante',
                    image: bebidasImage,
                    price: `$${item.price}`,
                    priceVal: item.price
                }))
                setBebidasData(formatted)
                setLoading(false)
            } catch (error) {
                console.error("Error cargando bebidas:", error)
                setLoading(false)
            }
        }
        fetchBebidas()
    }, [])

    const handleItemClick = (item) => {
        // Permite selección múltiple (toggle)
        setSelectedItems((prev) => {
            if (prev.find(i => i.id === item.id)) {
                return prev.filter(i => i.id !== item.id)
            }
            return [...prev, item]
        })
    }

    const handleAgregarAlPedido = async () => {
        if (selectedItems.length === 0) return

        try {
            const token = localStorage.getItem('token')
            const email = localStorage.getItem('email')

            if (!token || !email) {
                alert("Sesión expirada")
                navigate('/login')
                return
            }

            // 1. Obtener ID de Usuario
            const userRes = await axios.get(`http://localhost:8080/api/users/${encodeURIComponent(email)}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            const userId = userRes.data.userId || userRes.data.id

            // 2. Obtener/Iniciar Orden
            const orderRes = await axios.post(
                `http://localhost:8080/orders/start/user/${userId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            )
            const orderId = orderRes.data.id

            // 3. Agregar cada bebida seleccionada a la orden
            // Usamos Promise.all para enviarlas todas juntas
            await Promise.all(selectedItems.map(item =>
                axios.post(
                    `http://localhost:8080/orders/${orderId}/items/beverages`,
                    { productId: item.id, quantity: 1 }, // Enviamos 1 por cada selección
                    { headers: { Authorization: `Bearer ${token}` } }
                )
            ))

            alert("¡Bebidas agregadas! 🥤")
            navigate('/menu')

        } catch (error) {
            console.error("Error agregando bebidas:", error)
            alert("Error al procesar el pedido.")
        }
    }

    const isItemSelected = (itemId) => {
        return selectedItems.find(i => i.id === itemId)
    }

    if (loading) return <div style={{color:'white', padding:'50px', textAlign:'center'}}>Cargando bebidas...</div>

    return (
        <>
            <BackButton to="/menu" />

            <NextButton
                onClick={handleAgregarAlPedido}
                show={selectedItems.length > 0}
                text="Agregar al Pedido"
            />

            <div style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto', paddingTop: '20px' }}>
                <h2 style={{color:'white', textAlign:'center', marginBottom:'20px'}}>Elige tus Bebidas</h2>

                {/* Resumen de selección */}
                <div style={{
                    background: 'rgba(142, 45, 226, 0.3)',
                    padding: '20px',
                    borderRadius: '10px',
                    marginBottom: '30px',
                    color: 'white',
                    textAlign: 'center'
                }}>
                    <h3 style={{ marginBottom: '10px' }}>
                        Seleccionadas: {selectedItems.length}
                    </h3>
                    {selectedItems.length > 0 && (
                        <p style={{ fontSize: '1.1em' }}>
                            {selectedItems.map(i => i.title).join(', ')}
                        </p>
                    )}
                </div>

                <div className="restaurantMenu">
                    {bebidasData.map((item) => {
                        const isSelected = isItemSelected(item.id)

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
                                            <a
                                                href="#"
                                                className={`btnMenu ${isSelected ? 'confirmado' : ''}`}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    handleItemClick(item)
                                                }}
                                            >
                                                {isSelected ? 'Seleccionado' : 'Seleccionar'}
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

export default Bebidas