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

    // Estados visuales
    const [selectedDireccion, setSelectedDireccion] = useState(null);
    const [selectedMetodoPago, setSelectedMetodoPago] = useState(null);
    const [showOrderModal, setShowOrderModal] = useState(false);

    // --- FIX 1: Add missing state ---
    const [numeroPedido, setNumeroPedido] = useState(null);

    const [addresses, setAddresses] = useState([]);
    const [payments, setPayments] = useState([]);

    // --- FIX 2: Define mock data (or use your real fetched data 'addresses'/'payments') ---
    // For now, let's keep these mocks to satisfy the linter and matching your JSX below.
    // Ideally, you should replace uses of 'direcciones' with 'addresses' and 'metodosPago' with 'payments'
    // once your fetchUserData works.
    const direcciones = [{ id: 1, nombre: "Casa", direccion: "Av. Libertador 1234" }];
    const metodosPago = [{ id: 1, tipo: "Visa", numero: "**** 1234" }];

    // Inside fetchCart or a new useEffect
    const fetchUserData = async (userId, token) => {
        try {
            // Fetch Addresses
            const addrRes = await axios.get(`http://localhost:8080/api/addresses/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAddresses(addrRes.data);
            // Auto-select first if available
            if (addrRes.data.length > 0) setSelectedDireccion(addrRes.data[0]);
            // Fallback to mock if empty (optional logic)
            else setSelectedDireccion(direcciones[0]);

            // Fetch Payments
            const payRes = await axios.get(`http://localhost:8080/api/payments/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPayments(payRes.data);
            if (payRes.data.length > 0) setSelectedMetodoPago(payRes.data[0]);
            else setSelectedMetodoPago(metodosPago[0]);

        } catch (e) {
            console.error("Error loading user info", e);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');

            if (!token || !email) { setLoading(false); return; }

            const userRes = await axios.get(`http://localhost:8080/api/users/${encodeURIComponent(email)}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userId = userRes.data.userId || userRes.data.id;

            // Call user data fetch
            fetchUserData(userId, token);

            const orderRes = await axios.post(
                `http://localhost:8080/orders/start/user/${userId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const order = orderRes.data;
            setOrderId(order.id);
            setTotal(order.total);

            const rawItems = [];

            // 1. CREACIONES
            const listaCreaciones = order.creations || order.itemsCreation || [];
            if (Array.isArray(listaCreaciones)) {
                rawItems.push(...listaCreaciones.map(i => {
                    const creation = i.creation || {};
                    let nombreDisplay = creation.name || i.name || "Producto Personalizado";

                    if (nombreDisplay.includes("undefined")) {
                        nombreDisplay = creation.dough ? "Pizza Personalizada" : "Burger Personalizada";
                    }

                    const detalles = [];
                    if (creation.size) detalles.push(`Tamaño: ${creation.size}`);
                    if (creation.dough) detalles.push(creation.dough.name);
                    if (creation.sauce) detalles.push(creation.sauce.name);
                    if (creation.cheese) detalles.push(creation.cheese.name);
                    if (creation.meat) detalles.push(creation.meat.name);
                    if (creation.bread) detalles.push(creation.bread.name);
                    if (creation.toppings && creation.toppings.length > 0) {
                        const toppingsNames = creation.toppings.map(t => t.name).join(", ");
                        detalles.push(`Extras: ${toppingsNames}`);
                    }
                    if (creation.condiment) detalles.push(`Aderezo: ${creation.condiment.name}`);

                    return {
                        uniqueId: Math.random(),
                        nombre: nombreDisplay,
                        descripcion: detalles.join(" • "),
                        precio: i.creationSubtotal || i.subTotal || 0,
                        cantidad: i.creationQuantity || i.CreationQuantity || 1,
                        tipo: 'creation',
                        productId: creation.creationId || i.id
                    };
                }));
            }

            // 2. BEBIDAS
            const listaBebidas = order.beverages || order.itemsBeverage || [];
            if (Array.isArray(listaBebidas)) {
                rawItems.push(...listaBebidas.map(i => {
                    const beverage = i.beverage || {};
                    return {
                        uniqueId: Math.random(),
                        nombre: beverage.name || i.name || "Bebida",
                        descripcion: "Bebida fría",
                        precio: i.beverageSubtotal || i.subTotal || 0,
                        cantidad: i.beverageQuantity || 1,
                        tipo: 'beverage',
                        productId: beverage.beverageId
                    };
                }));
            }

            // 3. SIDES
            const listaSides = order.sides || order.itemsSide || [];
            if (Array.isArray(listaSides)) {
                rawItems.push(...listaSides.map(i => {
                    const side = i.side || {};
                    return {
                        uniqueId: Math.random(),
                        nombre: side.name || i.name || "Acompañamiento",
                        descripcion: "Extra",
                        precio: i.sideSubtotal || i.subTotal || 0,
                        cantidad: i.sideQuantity || 1,
                        tipo: 'side',
                        productId: side.sideId
                    };
                }));
            }

            // Ordenamiento estable
            rawItems.sort((a, b) => {
                const typePriority = { 'creation': 1, 'beverage': 2, 'side': 3 };
                if (typePriority[a.tipo] !== typePriority[b.tipo]) {
                    return typePriority[a.tipo] - typePriority[b.tipo];
                }
                return a.productId - b.productId;
            });

            setCartItems(rawItems);
            setLoading(false);

        } catch (error) {
            console.error("Error cargando carrito:", error);
            setLoading(false);
        }
    };

    const updateQuantity = async (item, delta) => {
        const newQuantity = item.cantidad + delta;

        if (newQuantity < 0) return;

        try {
            const token = localStorage.getItem('token');

            setCartItems(prev => prev.map(i =>
                i.uniqueId === item.uniqueId ? { ...i, cantidad: newQuantity } : i
            ).filter(i => i.cantidad > 0));

            await axios.post('http://localhost:8080/api/orders/items/update', {
                orderId: orderId,
                productId: item.productId,
                type: item.tipo,
                quantity: newQuantity
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            fetchCart();

        } catch (error) {
            console.error("Error actualizando cantidad", error);
            alert("Error al actualizar. Intenta de nuevo.");
            fetchCart();
        }
    };

    const handlePagar = async () => {
        if (!selectedDireccion || !selectedMetodoPago) {
            alert("Por favor selecciona una dirección y un método de pago.");
            return;
        }

        if (cartItems.length === 0) {
            alert("El carrito está vacío.");
            return;
        }

        try {
            const token = localStorage.getItem('token');

            await axios.post(
                `http://localhost:8080/orders/${orderId}/confirm`,
                null,
                {
                    params: {
                        addressId: selectedDireccion.id || selectedDireccion.addressId, // Handle potential ID field naming diff
                        paymentId: selectedMetodoPago.id
                    },
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setNumeroPedido(orderId);
            setShowOrderModal(true);

        } catch (error) {
            console.error("Error confirming order", error);
            alert("Hubo un error al procesar el pedido. Intenta nuevamente.");
        }
    };

    if (loading) return <div style={{color:'white', padding:'50px', textAlign:'center'}}>Cargando...</div>;

    return (
        <div className={styles.pageContainer}>
            <div className={styles.mainContent}>
                <div className={styles.carritoGrid}>
                    <div className={styles.leftColumn}>
                        <div className={styles.cardWrapper}>
                            <div className={styles.cardBorder}></div>
                            <div className={styles.card}>
                                <h2 className={styles.cardTitle}>Tu Pedido #{orderId}</h2>

                                {cartItems.length === 0 ? (
                                    <p className={styles.emptyMessage}>Carrito vacío.</p>
                                ) : (
                                    <div className={styles.itemsList}>
                                        {cartItems.map((item) => (
                                            <div key={item.uniqueId} className={styles.cartItem}>
                                                <div className={styles.itemInfo}>
                                                    <div className={styles.itemName} style={{fontWeight:'bold'}}>{item.nombre}</div>
                                                    <div style={{fontSize:'0.8rem', color:'#aaa'}}>{item.descripcion}</div>
                                                    <div className={styles.itemPrice}>${item.precio}</div>
                                                </div>

                                                <div className={styles.itemControls} style={{display:'flex', alignItems:'center', gap:'10px'}}>
                                                    <button
                                                        onClick={() => updateQuantity(item, -1)}
                                                        style={{
                                                            background: '#ff4444', color:'white', border:'none',
                                                            width:'30px', height:'30px', borderRadius:'5px', cursor:'pointer', fontSize:'1.2rem'
                                                        }}
                                                    >
                                                        {item.cantidad === 1 ? '🗑️' : '-'}
                                                    </button>

                                                    <span className={styles.quantity} style={{fontSize: '1.2em', fontWeight: 'bold', minWidth:'20px', textAlign:'center'}}>
                                                        {item.cantidad}
                                                    </span>

                                                    <button
                                                        onClick={() => updateQuantity(item, 1)}
                                                        style={{
                                                            background: '#4CAF50', color:'white', border:'none',
                                                            width:'30px', height:'30px', borderRadius:'5px', cursor:'pointer', fontSize:'1.2rem'
                                                        }}
                                                    >
                                                        +
                                                    </button>
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

                    <div className={styles.rightColumn}>
                        <div className={styles.cardWrapper}>
                            <div className={styles.cardBorder}></div>
                            <div className={styles.card}>
                                <h2 className={styles.cardTitle}>📍 Envío y Pago</h2>
                                <button className={styles.dropdownButton}>
                                    {selectedDireccion ? selectedDireccion.nombre : direcciones[0].nombre}
                                </button>
                                <button className={styles.dropdownButton} style={{marginTop:'10px'}}>
                                    {selectedMetodoPago ? (selectedMetodoPago.cardName || selectedMetodoPago.tipo) : metodosPago[0].tipo}
                                </button>
                            </div>
                        </div>
                        <button className={styles.pagarButton} onClick={handlePagar}>Confirmar Pedido</button>
                    </div>
                </div>
            </div>

            <OrderConfirmModal
                isOpen={showOrderModal}
                onClose={() => setShowOrderModal(false)}
                onVerEstado={() => navigate('/pedidos')}
                numeroPedido={orderId}
            />
        </div>
    );
};

export default Carrito;