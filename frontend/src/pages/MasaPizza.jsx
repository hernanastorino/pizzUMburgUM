import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import MenuItem from '../components/MenuItem';
import BackButton from '../components/BackButton';
import '../index.css';
import masaImg from '../assets/images/masaNapolitana.jpg';

const buttonStyles = {
    Small: 'btnMenu2',
    Medium: 'btnMenu1',
    Large: 'btnMenu',
};

const sizeMap = {
    Small: { label: 'Chica<br><small>15cm</small>', dbValue: '15cm' },
    Medium: { label: 'Mediana<br><small>20cm</small>', dbValue: '20cm' },
    Large: { label: 'Grande<br><small>25cm</small>', dbValue: '25cm' }
};

function MasaPizza() {
    const [menuData, setMenuData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);

    const location = useLocation();
    // Recibimos la bandera del menú
    const isFavoriteMode = location.state?.isFavoriteMode;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/products/doughs');

                const formattedData = res.data.map(item => ({
                    id: item.doughId,
                    title: item.name,
                    description: 'Masa fresca artesanal',
                    image: masaImg,
                    buttons: [
                        {
                            size: 'Small',
                            text: sizeMap.Small.label,
                            price: `$${item.priceSmall}`,
                            className: buttonStyles.Small,
                            dbValue: sizeMap.Small.dbValue
                        },
                        {
                            size: 'Medium',
                            text: sizeMap.Medium.label,
                            price: `$${item.priceMedium}`,
                            className: buttonStyles.Medium,
                            dbValue: sizeMap.Medium.dbValue
                        },
                        {
                            size: 'Large',
                            text: sizeMap.Large.label,
                            price: `$${item.priceLarge}`,
                            className: buttonStyles.Large,
                            dbValue: sizeMap.Large.dbValue
                        },
                    ]
                }));

                setMenuData(formattedData);
                setLoading(false);
            } catch (err) {
                console.error("Error cargando masas", err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div style={{color:'white', textAlign:'center', marginTop:'50px'}}>Cargando masas...</div>;

    return (
        <>
            <BackButton to="/menu" />
            <div style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{color: 'white', textAlign: 'center', marginBottom: '30px'}}>
                    {isFavoriteMode ? "Arma tu Favorita: Elige Masa" : "Elige tu Masa"}
                </h2>
                <div className="restaurantMenu">
                    {menuData.map((item) => (
                        <MenuItem
                            key={item.id}
                            item={item}
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                            nextRoute="/salsa-pizza"

                            // INYECTAMOS LA BANDERA EN EL PEDIDO
                            pedidoActual={{ isFavoriteMode: isFavoriteMode }}

                            baseIdKey="doughId"
                            baseNameKey="doughName"
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default MasaPizza;