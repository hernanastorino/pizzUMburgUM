import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import DireccionItem from '../components/DireccionItem';
import MetodoPagoItem from '../components/MetodoPagoItem';
import ConfirmModal from '../components/ConfirmModal';
import perfilStyles from '../styles/PagosYEnvios.module.css';

const PagosYEnvios = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fromCarrito = location.state?.from === '/carrito';

    const [direcciones, setDirecciones] = useState([]);
    const [metodosPago, setMetodosPago] = useState([]);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    const [showModalDireccion, setShowModalDireccion] = useState(false);
    const [showModalPago, setShowModalPago] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    // 1. Fetch Initial Data
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');

            if (!token || !email) return;

            // Get User ID
            const userRes = await axios.get(`http://localhost:8080/api/users/${encodeURIComponent(email)}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const uid = userRes.data.userId || userRes.data.id;
            setUserId(uid);

            // Get Addresses
            const addrRes = await axios.get(`http://localhost:8080/api/addresses/user/${uid}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Map API response to Frontend format if needed
            const mappedAddr = addrRes.data.map(a => ({
                id: a.addressId,
                nombre: a.name,
                direccion: a.street,
                numero: a.doorNumber,
                aptPiso: a.aptNumber,
                observaciones: a.indications
            }));
            setDirecciones(mappedAddr);

            // Get Payments
            const payRes = await axios.get(`http://localhost:8080/api/payments/user/${uid}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMetodosPago(payRes.data); // Payment structure matches mostly

            setLoading(false);
        } catch (error) {
            console.error("Error fetching user data", error);
            setLoading(false);
        }
    };

    // --- HANDLERS FOR ADDRESSES ---

    const handleAddDireccion = () => {
        // Add a temporary item with negative ID to indicate it's new
        setDirecciones(prev => [...prev, {
            id: -Date.now(), // temp ID
            nombre: '',
            direccion: '',
            numero: '',
            aptPiso: '',
            observaciones: '',
            isNew: true // Flag to know it needs POST
        }]);
    };

    const handleUpdateDireccion = async (dx) => {
        try {
            const token = localStorage.getItem('token');

            // Map frontend format back to backend format
            const payload = {
                name: dx.nombre,
                street: dx.direccion,
                doorNumber: dx.numero,
                aptNumber: dx.aptPiso,
                indications: dx.observaciones
            };

            if (dx.id < 0) {
                // CREATE (POST)
                await axios.post(`http://localhost:8080/api/addresses/user/${userId}`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                // UPDATE (PUT)
                await axios.put(`http://localhost:8080/api/addresses/${dx.id}`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }

            // Reload data to get real IDs
            fetchData();

            // Redirect if came from cart
            if (fromCarrito) setTimeout(() => navigate('/carrito'), 500);

        } catch (error) {
            console.error("Error saving address", error);
            alert("Error al guardar la dirección");
        }
    };

    const handleDeleteDireccion = (id) => {
        setItemToDelete(id);
        setShowModalDireccion(true);
    };

    const handleDeleteDireccionDirecto = (id) => {
        // For cancelling a new unsaved item
        setDirecciones(prev => prev.filter(d => d.id !== id));
    };

    const confirmDeleteDireccion = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8080/api/addresses/${itemToDelete}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setDirecciones(prev => prev.filter(d => d.id !== itemToDelete));
            setShowModalDireccion(false);
            setItemToDelete(null);
        } catch (error) {
            console.error("Error deleting address", error);
        }
    };

    // --- HANDLERS FOR PAYMENTS ---

    const handleAddPago = () => {
        setMetodosPago(prev => [...prev, {
            id: -Date.now(),
            tipo: '',
            numero: '', // Note: Backend expects 'cardNumber'
            titular: '', // Backend: 'ownerName'
            cvv: '',
            vencimiento: '', // Backend doesn't seem to store expiry based on your Entity, but let's keep it in UI
            isNew: true
        }]);
    };

    const handleUpdateMetodoPago = async (mx) => {
        try {
            const token = localStorage.getItem('token');

            const payload = {
                cardName: mx.tipo,
                cardNumber: mx.numero,
                ownerName: mx.titular,
                cvv: mx.cvv
                // Note: If your backend entity doesn't have expiry, we can't save it yet.
            };

            if (mx.id < 0) {
                // CREATE
                await axios.post(`http://localhost:8080/api/payments/user/${userId}`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                // UPDATE
                await axios.put(`http://localhost:8080/api/payments/${mx.id}`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }

            fetchData();
            if (fromCarrito) setTimeout(() => navigate('/carrito'), 500);

        } catch (error) {
            console.error("Error saving payment", error);
            alert("Error al guardar el pago (Revisa que el número no esté duplicado)");
        }
    };

    const handleDeletePago = (id) => {
        setItemToDelete(id);
        setShowModalPago(true);
    };

    const handleDeletePagoDirecto = (id) => {
        setMetodosPago(prev => prev.filter(m => m.id !== id));
    };

    const confirmDeletePago = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8080/api/payments/${itemToDelete}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMetodosPago(prev => prev.filter(m => m.id !== itemToDelete));
            setShowModalPago(false);
            setItemToDelete(null);
        } catch (error) {
            console.error("Error deleting payment", error);
        }
    };

    if (loading) return <div style={{color:'white', padding:'50px'}}>Cargando tus datos...</div>;

    return (
        <div className={perfilStyles.perfilWrapper}>
            <div className={perfilStyles.perfilGrid}>

                {/* DIRECCIONES */}
                <div className={perfilStyles.itemCard}>
                    <div className={perfilStyles.cardHeader}>
                        <div className={perfilStyles.cardHeaderLeft}>
                            <span className={perfilStyles.cardIcon}>📍</span>
                            <span className={perfilStyles.cardTitle}>Direcciones</span>
                        </div>
                        <button className={perfilStyles.addButton} onClick={handleAddDireccion}>+</button>
                    </div>
                    <div className={perfilStyles.cardContent}>
                        {direcciones.map(d => (
                            <DireccionItem
                                key={d.id}
                                direccion={d}
                                onUpdate={handleUpdateDireccion}
                                onDelete={handleDeleteDireccion}
                                onDeleteDirecto={handleDeleteDireccionDirecto}
                            />
                        ))}
                    </div>
                </div>

                {/* PAGOS */}
                <div className={perfilStyles.itemCard}>
                    <div className={perfilStyles.cardHeader}>
                        <div className={perfilStyles.cardHeaderLeft}>
                            <span className={perfilStyles.cardIcon}>💳</span>
                            <span className={perfilStyles.cardTitle}>Métodos de Pago</span>
                        </div>
                        <button className={perfilStyles.addButton} onClick={handleAddPago}>+</button>
                    </div>
                    <div className={perfilStyles.cardContent}>
                        {metodosPago.map(m => (
                            <MetodoPagoItem
                                key={m.id}
                                // Map backend fields to component props if necessary, or adjust component
                                metodo={{
                                    ...m,
                                    tipo: m.cardName || m.tipo,
                                    numero: m.cardNumber || m.numero,
                                    titular: m.ownerName || m.titular
                                }}
                                onUpdate={handleUpdateMetodoPago}
                                onDelete={handleDeletePago}
                                onDeleteDirecto={handleDeletePagoDirecto}
                            />
                        ))}
                    </div>
                </div>

            </div>

            {showModalDireccion && (
                <ConfirmModal
                    isOpen={showModalDireccion}
                    message="¿Eliminar esta dirección?"
                    onConfirm={confirmDeleteDireccion}
                    onCancel={() => setShowModalDireccion(false)}
                />
            )}

            {showModalPago && (
                <ConfirmModal
                    isOpen={showModalPago}
                    message="¿Eliminar este método de pago?"
                    onConfirm={confirmDeletePago}
                    onCancel={() => setShowModalPago(false)}
                />
            )}
        </div>
    );
};

export default PagosYEnvios;