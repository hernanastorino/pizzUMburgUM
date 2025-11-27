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

function MasaPizza() {
    const [menuData, setMenuData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);

    const location = useLocation();
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
                        { size: 'Small', text: 'Chica<br><small>15cm</small>', price: `$${item.priceSmall}`, className: buttonStyles.Small, dbValue: '15cm' },
                        { size: 'Medium', text: 'Mediana<br><small>20cm</small>', price: `$${item.priceMedium}`, className: buttonStyles.Medium, dbValue: '20cm' },
                        { size: 'Large', text: 'Grande<br><small>25cm</small>', price: `$${item.priceLarge}`, className: buttonStyles.Large, dbValue: '25cm' },
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

                            // DATOS CRUCIALES:
                            pedidoActual={{ isFavoriteMode: isFavoriteMode }}
                            baseIdKey="doughId"      // <--- ESTO NO PUEDE FALTAR
                            baseNameKey="doughName"  // <--- ESTO TAMPOCO
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
export default MasaPizza;