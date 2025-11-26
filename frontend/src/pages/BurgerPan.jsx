import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import MenuItem from '../components/MenuItem'
import BackButton from '../components/BackButton'
import '../index.css'
import panImg from '../assets/images/panPapa.jpg'

function BurgerPan() {
    const [panData, setPanData] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedId, setSelectedId] = useState(null)

    const location = useLocation()
    const pedidoAnterior = location.state // Trae { meatId, sizeKey (Small/Medium/Large), dbSize (1/2/3)... }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/products/breads')

                // Usamos el tamaño elegido (Small/Medium/Large) para mostrar el precio correcto del pan
                const sizeKey = pedidoAnterior?.sizeKey || 'Medium'
                const priceField = `price${sizeKey}`

                const formatted = res.data.map(item => ({
                    id: item.breadId,
                    title: item.name,
                    description: 'Pan fresco',
                    image: panImg,
                    buttons: [
                        {
                            size: 'normal',
                            text: 'Seleccionar',
                            price: `$${item[priceField]}`,
                            className: 'btnMenu',
                            dbValue: item.breadId
                        },
                    ]
                }))
                setPanData(formatted)
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
            <BackButton to="/burger-carne" />
            <div style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{color: 'white', textAlign: 'center', marginBottom:'30px'}}>Elige tu Pan</h2>
                <div className="restaurantMenu">
                    {panData.map((item) => (
                        <MenuItem
                            key={item.id}
                            item={item}
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                            nextRoute="/burger-queso"
                            pedidoActual={{
                                ...pedidoAnterior,
                                breadId: item.id,
                                breadName: item.title
                            }}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default BurgerPan