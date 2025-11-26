import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import MenuItem from '../components/MenuItem';
import BackButton from '../components/BackButton';
import '../index.css';
import salsaImg from '../assets/images/salsaTomate.jpg';

function SalsaPizza() {
    const [salsaData, setSalsaData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);

    const location = useLocation();
    const pedidoAnterior = location.state; // Trae { masaId, sizeKey, dbSize, ... }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/products/sauces');

                // Usamos el tamaño elegido en el paso anterior para mostrar el precio correcto
                const sizeKey = pedidoAnterior?.sizeKey || 'Medium'; // Default por seguridad
                const priceField = `price${sizeKey}`; // priceSmall, priceMedium...

                const formatted = res.data.map(item => ({
                    id: item.sauceId,
                    title: item.name,
                    description: 'Salsa casera',
                    image: salsaImg,
                    buttons: [
                        {
                            size: 'normal',
                            text: 'Seleccionar',
                            price: `$${item[priceField]}`, // Precio dinámico según tamaño pizza
                            className: 'btnMenu',
                            dbValue: item.sauceId
                        },
                    ]
                }));
                setSalsaData(formatted);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchData();
    }, [pedidoAnterior]);

    return (
        <>
            <BackButton to="/masa-pizza" />
            <div style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{color: 'white', textAlign: 'center', marginBottom: '30px'}}>Elige tu Salsa</h2>
                <div className="restaurantMenu">
                    {salsaData.map((item) => (
                        <MenuItem
                            key={item.id}
                            item={item}
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                            nextRoute="/queso-pizza"
                            pedidoActual={{
                                ...pedidoAnterior,
                                sauceId: item.id,
                                sauceName: item.title
                            }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default SalsaPizza;