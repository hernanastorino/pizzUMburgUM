import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import OrderConfirmModal from "../components/OrderConfirmModal";
import styles from "../styles/Carrito.module.css";

const Carrito = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [orderId, setOrderId] = useState(null);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    // Estados visuales existentes...
    const [isDireccionOpen, setIsDireccionOpen] = useState(false);
    const [isMetodoPagoOpen, setIsMetodoPagoOpen] = useState(false);
    const [selectedDireccion, setSelectedDireccion] = useState(null);
    const [selectedMetodoPago, setSelectedMetodoPago] = useState(null);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [numeroPedido, setNumeroPedido] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: "" });

    const direccionRef = useRef(null);
    const metodoPagoRef = useRef(null);

    // Datos mock para direcciones/pagos por ahora
    const direcciones = [{ id: 1, nombre: "Casa", direccion: "Av. Libertador 1234" }];
    const metodosPago = [{ id: 1, tipo: "Visa", numero: "**** 1234" }];

    // 1. CARGAR CARRITO REAL
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                // PEGAR ESTO
                const userEmail = localStorage.getItem('email');
                if (!userEmail) return; // O manejar error

                const userRes = await axios.get(`http://localhost:8080/api/users/${userEmail}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

// Ajusta según tu entidad (id o userId)
                const userId = userRes.data.userId || userRes.data.id;

                // Obtener Orden Pendiente
                const orderRes = await axios.post(
                    `http://localhost:8080/orders/start/user/${userId}`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                const order = orderRes.data;
                setOrderId(order.id);
                setTotal(order.total);

                // Unificar items (Creaciones + Bebidas + Sides)
                const items = [];
                if (order.itemsCreation) items.push(...order.itemsCreation.map(i => ({...i, type: 'creation'})));
                if (order.itemsBeverage) items.push(...order.itemsBeverage.map(i => ({...i, type: 'beverage'})));
                if (order.itemsSide) items.push(...order.itemsSide.map(i => ({...i, type: 'side'})));

                setCartItems(items);
                setLoading(false);

            } catch (error) {
                console.error("Error cargando carrito:", error);
                setLoading(false);
            }
        };
        fetchCart();
    }, []);

    // --- Funciones de confirmación ---
    const handlePagar = async () => {
        if (!selectedDireccion || !selectedMetodoPago) {
            alert("Selecciona dirección y pago");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            // Confirmar orden en backend
            await axios.post(
                `http://localhost:8080/orders/${orderId}/confirm?addressId=${selectedDireccion.id}&paymentId=${selectedMetodoPago.id}`, // Asumiendo IDs mock coinciden o usar reales
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setNumeroPedido(orderId);
            setShowOrderModal(true);
        } catch (error) {
            console.error("Error al pagar", error);
            alert("Error al procesar pago");
        }
    };

    // --- Renderizado (usando tus estilos existentes) ---
    if (loading) return <div style={{color:'white', padding:'50px'}}>Cargando carrito...</div>;

    return (
        <div className={styles.pageContainer}>
            <div className={styles.mainContent}>
                <div className={styles.carritoGrid}>
                    {/* Columna Items */}
                    <div className={styles.leftColumn}>
                        <div className={styles.cardWrapper}>
                            <div className={styles.cardBorder}></div>
                            <div className={styles.card}>
                                <h2 className={styles.cardTitle}>Carrito (Pedido #{orderId})</h2>

                                {cartItems.length === 0 ? (
                                    <p className={styles.emptyMessage}>Carrito vacío</p>
                                ) : (
                                    <div className={styles.itemsList}>
                                        {cartItems.map((item, index) => (
                                            <div key={index} className={styles.cartItem}>
                                                <div className={styles.itemInfo}>
                                                    {/* El backend devuelve item.name? Revisar UserDTO/OrderDTO */}
                                                    <span className={styles.itemName}>{item.name || "Producto"}</span>
                                                    <span className={styles.itemPrice}>${item.subTotal || item.price}</span>
                                                </div>
                                                <div className={styles.itemControls}>
                                                    <span className={styles.quantity}>x{item.quantity}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className={styles.totalSection}>
                                    <span className={styles.totalLabel}>Total:</span>
                                    <span className={styles.totalPrice}>${total}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna Pago/Dirección (Mantener tu lógica visual actual) */}
                    <div className={styles.rightColumn}>
                        {/* ... (Tus componentes visuales de Dropdown aquí, usando las funciones handle...) ... */}
                        {/* Para simplificar el código aquí, asumo que mantienes tu estructura visual de dropdowns */}

                        <div className={styles.cardWrapper}>
                            <div className={styles.cardBorder}></div>
                            <div className={styles.card}>
                                <h2 className={styles.cardTitle}>📍 Envío y Pago</h2>
                                <button className={styles.dropdownButton} onClick={() => setSelectedDireccion(direcciones[0])}>
                                    {selectedDireccion ? selectedDireccion.nombre : "Seleccionar Dirección (Mock)"}
                                </button>
                                <button className={styles.dropdownButton} onClick={() => setSelectedMetodoPago(metodosPago[0])} style={{marginTop:'10px'}}>
                                    {selectedMetodoPago ? selectedMetodoPago.tipo : "Seleccionar Pago (Mock)"}
                                </button>
                            </div>
                        </div>

                        <button className={styles.pagarButton} onClick={handlePagar}>
                            Confirmar Pedido
                        </button>
                    </div>

                </div>
            </div>

            <OrderConfirmModal
                isOpen={showOrderModal}
                onClose={() => setShowOrderModal(false)}
                onVerEstado={() => navigate('/pedidos')}
                numeroPedido={numeroPedido}
            />
        </div>
    );
};

export default Carrito;