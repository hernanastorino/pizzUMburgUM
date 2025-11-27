import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import MenuItem from '../components/MenuItem'
import BackButton from '../components/BackButton'
import '../index.css'
import quesoImg from '../assets/images/cheedar.jpg'

function BurgerQueso() {
    const [condimentData, setCondimentData] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedId, setSelectedId] = useState(null)

    const location = useLocation()
    const pedidoAnterior = location.state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/products/condiments')

                const sizeKey = pedidoAnterior?.sizeKey || 'Medium'
                const priceField = `price${sizeKey}`

                const formatted = res.data.map(item => ({
                    id: item.condimentId,
                    title: item.name,
                    description: 'Aderezo / Queso base',
                    image: quesoImg,
                    buttons: [
                        {
                            size: 'normal',
                            text: 'Seleccionar',
                            price: `$${item[priceField]}`,
                            className: 'btnMenu2',
                            dbValue: item.condimentId
                        },
                    ]
                }))
                setCondimentData(formatted)
                setLoading(false)
            } catch (err) {
                console.error(err)
                setLoading(false)
            }
        }
        fetchData()
    }, [pedidoAnterior])

    return (
        <>
            <BackButton to="/burger-pan" />
            <div style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{color: 'white', textAlign: 'center', marginBottom:'30px'}}>Elige Aderezo o Queso</h2>
                <div className="restaurantMenu">
                    {condimentData.map((item) => (
                        <MenuItem
                            key={item.id}
                            item={item}
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                            nextRoute="/burger-toppings"
                            pedidoActual={{
                                ...pedidoAnterior,
                                condimentId: item.id,
                                condimentName: item.title
                            }}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default BurgerQueso