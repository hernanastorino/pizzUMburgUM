import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import MenuItem from '../components/MenuItem';
import BackButton from '../components/BackButton';
import '../index.css';
import quesoImg from '../assets/images/mozarella.jpg';

function QuesoPizza() {
    const [quesoData, setQuesoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const location = useLocation();
    const pedidoAnterior = location.state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/products/cheeses');
                const sizeKey = pedidoAnterior?.sizeKey || 'Medium';
                const priceField = `price${sizeKey}`;

                const formatted = res.data.map(item => ({
                    id: item.cheeseId,
                    title: item.name,
                    description: 'Queso premium',
                    image: quesoImg,
                    buttons: [
                        {
                            size: 'normal',
                            text: 'Seleccionar',
                            price: `$${item[priceField]}`,
                            className: 'btnMenu2',
                            dbValue: item.cheeseId
                        },
                    ]
                }));
                setQuesoData(formatted);
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
            <BackButton to="/salsa-pizza" />
            <div style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{color: 'white', textAlign: 'center', marginBottom: '30px'}}>Elige tu Queso</h2>
                <div className="restaurantMenu">
                    {quesoData.map((item) => (
                        <MenuItem
                            key={item.id}
                            item={item}
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                            nextRoute="/toppings-pizza"
                            pedidoActual={{
                                ...pedidoAnterior,
                                cheeseId: item.id,
                                cheeseName: item.title
                            }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default QuesoPizza;