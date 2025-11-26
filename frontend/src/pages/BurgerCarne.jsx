import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MenuItem from '../components/MenuItem'
import BackButton from '../components/BackButton'
import '../index.css'

// Imagen por defecto
import carneImg from '../assets/images/carneVaca.jpg'

const buttonStyles = {
    Small: 'btnMenu2',  // Simple
    Medium: 'btnMenu1', // Doble
    Large: 'btnMenu',   // Triple
}

function BurgerCarne() {
    const [menuData, setMenuData] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedId, setSelectedId] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/products/meats')

                const formattedData = res.data.map(item => ({
                    id: item.meatId, // ID de la BD
                    title: item.name,
                    description: 'Selecciona el tamaño',
                    image: carneImg,
                    buttons: [
                        {
                            size: 'Small', // Clave interna para precio
                            text: 'Simple<br><small>1 Carne</small>',
                            price: `$${item.priceSmall}`,
                            className: buttonStyles.Small,
                            dbValue: 1 // meatQuantity para la BD
                        },
                        {
                            size: 'Medium',
                            text: 'Doble<br><small>2 Carnes</small>',
                            price: `$${item.priceMedium}`,
                            className: buttonStyles.Medium,
                            dbValue: 2 // meatQuantity para la BD
                        },
                        {
                            size: 'Large',
                            text: 'Triple<br><small>3 Carnes</small>',
                            price: `$${item.priceLarge}`,
                            className: buttonStyles.Large,
                            dbValue: 3 // meatQuantity para la BD
                        },
                    ]
                }))

                setMenuData(formattedData)
                setLoading(false)
            } catch (err) {
                console.error("Error cargando carnes", err)
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) return <div style={{color:'white', textAlign:'center', marginTop:'50px'}}>Cargando carnes...</div>

    return (
        <>
            <BackButton to="/menu" />
            <div style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{color: 'white', textAlign: 'center', marginBottom:'30px'}}>Elige tu Carne</h2>
                <div className="restaurantMenu">
                    {menuData.map((item) => (
                        <MenuItem
                            key={item.id}
                            item={item}
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                            nextRoute="/burger-pan"

                            // --- AGREGAR ESTO ---
                            baseIdKey="meatId"     // Para que se guarde como meatId
                            baseNameKey="meatName" // Para que se guarde como meatName
                            // --------------------
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default BurgerCarne