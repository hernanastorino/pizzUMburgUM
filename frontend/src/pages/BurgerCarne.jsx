import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import MenuItem from '../components/MenuItem'
import BackButton from '../components/BackButton'
import '../index.css'
import carneImg from '../assets/images/carneVaca.jpg'

const buttonStyles = {
    Small: 'btnMenu2',
    Medium: 'btnMenu1',
    Large: 'btnMenu',
}

function BurgerCarne() {
    const [menuData, setMenuData] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedId, setSelectedId] = useState(null)

    const location = useLocation();
    const isFavoriteMode = location.state?.isFavoriteMode;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/products/meats')

                const formattedData = res.data.map(item => ({
                    id: item.meatId,
                    title: item.name,
                    description: 'Selecciona el tamaño',
                    image: carneImg,
                    buttons: [
                        {
                            size: 'Small',
                            text: 'Simple<br><small>1 Carne</small>',
                            price: `$${item.priceSmall}`,
                            className: buttonStyles.Small,
                            dbValue: 1
                        },
                        {
                            size: 'Medium',
                            text: 'Doble<br><small>2 Carnes</small>',
                            price: `$${item.priceMedium}`,
                            className: buttonStyles.Medium,
                            dbValue: 2
                        },
                        {
                            size: 'Large',
                            text: 'Triple<br><small>3 Carnes</small>',
                            price: `$${item.priceLarge}`,
                            className: buttonStyles.Large,
                            dbValue: 3
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
                <h2 style={{color: 'white', textAlign: 'center', marginBottom:'30px'}}>
                    {isFavoriteMode ? "Arma tu Favorita: Elige Carne" : "Elige tu Carne"}
                </h2>
                <div className="restaurantMenu">
                    {menuData.map((item) => (
                        <MenuItem
                            key={item.id}
                            item={item}
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                            nextRoute="/burger-pan"

                            // INYECTAMOS LA BANDERA AQUÍ TAMBIÉN
                            pedidoActual={{ isFavoriteMode: isFavoriteMode }}

                            baseIdKey="meatId"
                            baseNameKey="meatName"
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default BurgerCarne