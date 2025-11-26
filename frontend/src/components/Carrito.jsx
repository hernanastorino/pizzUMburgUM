import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import OrderConfirmModal from "../components/OrderConfirmModal";
import styles from "../styles/Carrito.module.css";

const Carrito = () => {
    const navigate = useNavigate();

    // --- STATE MANAGEMENT ---
    const [cartItems, setCartItems] = useState([]);
    const [orderId, setOrderId] = useState(null);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    // User Data State
    const [addresses, setAddresses] = useState([]);
    const [payments, setPayments] = useState([]);

    // Selection State
    const [selectedDireccion, setSelectedDireccion] = useState(null);
    const [selectedMetodoPago, setSelectedMetodoPago] = useState(null);

    // Modal State
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [numeroPedido, setNumeroPedido] = useState(null);

    // --- INITIAL LOAD ---
    useEffect(() => {
        fetchCartAndUserData();
    }, []);

    const fetchCartAndUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');

            if (!token || !email) { setLoading(false); return; }

            // 1. Get User ID
            const userRes = await axios.get(`http://localhost:8080/api/users/${encodeURIComponent(email)}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userId = userRes.data.userId || userRes.data.id;

            // 2. Load User Addresses & Payments (Parallel)
            const [addrRes, payRes] = await Promise.all([
                axios.get(`http://localhost:8080/api/addresses/user/${userId}`, { headers: { Authorization: `Bearer ${token}` } }),
                axios.get(`http://localhost:8080/api/payments/user/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
            ]);

            setAddresses(addrRes.data);
            setPayments(payRes.data);

            // Auto-select first options if available
            if (addrRes.data.length > 0 && !selectedDireccion) setSelectedDireccion(addrRes.data[0]);
            if (payRes.data.length > 0 && !selectedMetodoPago) setSelectedMetodoPago(payRes.data[0]);

            // 3. Get/Create Pending Order (Cart)
            const orderRes = await axios.post(
                `http://localhost:8080/orders/start/user/${userId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const order = orderRes.data;
            setOrderId(order.id);
            setTotal(order.total);

            // 4. Process Items for Display
            const rawItems = [];

            // --- A. CREATIONS (Pizzas & Burgers) ---
            const listaCreaciones = order.creations || order.itemsCreation || [];
            if (Array.isArray(listaCreaciones)) {
                rawItems.push(...listaCreaciones.map(i => {
                    const creation = i.creation || {};

                    // Name Logic
                    let nombreDisplay = creation.name || i.name || "Producto Personalizado";
                    if (nombreDisplay.includes("undefined")) {
                        nombreDisplay = creation.dough ? "Pizza Personalizada" : "Burger Personalizada";
                    }

                    // Details Logic
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

            // --- B. BEVERAGES ---
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

            // --- C. SIDES ---
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

            // Sort to prevent jumping items
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
            console.error("Error loading cart data:", error);
            setLoading(false);
        }
    };

    // --- ACTIONS ---

    const updateQuantity = async (item, delta) => {
        const newQuantity = item.cantidad + delta;
        if (newQuantity < 0) return;

        try {
            const token = localStorage.getItem('token');

            // Optimistic UI Update
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

            // Reload to sync totals
            fetchCartAndUserData();

        } catch (error) {
            console.error("Error updating quantity", error);
            alert("Error al actualizar. Intenta de nuevo.");
            fetchCartAndUserData();
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
                        addressId: selectedDireccion.addressId || selectedDireccion.id,
                        paymentId: selectedMetodoPago.id
                    },
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setNumeroPedido(orderId);
            setShowOrderModal(true);

        } catch (error) {
            console.error("Error confirming order", error);
            alert("Hubo un error al procesar el pedido.");
        }
    };

    if (loading) return <div style={{color:'white', padding:'50px', textAlign:'center'}}>Cargando tu pedido...</div>;

    return (
        <div className={styles.pageContainer}>
            <div className={styles.mainContent}>
                <div className={styles.carritoGrid}>

                    {/* LEFT COLUMN: ITEMS */}
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
                                                    <div className={styles.itemName} style={{fontWeight:'bold', fontSize:'1.1rem'}}>
                                                        {item.nombre}
                                                    </div>
                                                    <div style={{fontSize:'0.85rem', color:'#ccc', marginTop:'4px'}}>
                                                        {item.descripcion}
                                                    </div>
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

                                                    <span className={styles.quantity} style={{fontSize: '1.2em', fontWeight: 'bold', minWidth:'25px', textAlign:'center'}}>
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

                    {/* RIGHT COLUMN: CHECKOUT INFO */}
                    <div className={styles.rightColumn}>
                        <div className={styles.cardWrapper}>
                            <div className={styles.cardBorder}></div>
                            <div className={styles.card}>
                                <h2 className={styles.cardTitle}>📍 Envío</h2>
                                {addresses.length > 0 ? (
                                    <select
                                        className={styles.dropdownButton}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value);
                                            const found = addresses.find(a => (a.addressId || a.id) === val);
                                            setSelectedDireccion(found);
                                        }}
                                        value={selectedDireccion ? (selectedDireccion.addressId || selectedDireccion.id) : ''}
                                    >
                                        {addresses.map(a => (
                                            <option key={a.addressId || a.id} value={a.addressId || a.id}>
                                                {a.name} ({a.street} {a.doorNumber})
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <button
                                        className={styles.dropdownButton}
                                        onClick={() => navigate('/pagosYEnvios', {state: {from: '/carrito'}})}
                                        style={{background: '#ff9800', color: 'white'}}
                                    >
                                        + Agregar Dirección
                                    </button>
                                )}

                                <h2 className={styles.cardTitle} style={{marginTop:'20px'}}>💳 Pago</h2>
                                {payments.length > 0 ? (
                                    <select
                                        className={styles.dropdownButton}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value);
                                            const found = payments.find(p => p.id === val);
                                            setSelectedMetodoPago(found);
                                        }}
                                        value={selectedMetodoPago ? selectedMetodoPago.id : ''}
                                    >
                                        {payments.map(p => (
                                            <option key={p.id} value={p.id}>
                                                {p.cardName || p.tipo} (**** {p.cardNumber ? p.cardNumber.slice(-4) : '****'})
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <button
                                        className={styles.dropdownButton}
                                        onClick={() => navigate('/pagosYEnvios', {state: {from: '/carrito'}})}
                                        style={{background: '#ff9800', color: 'white'}}
                                    >
                                        + Agregar Método de Pago
                                    </button>
                                )}
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
                numeroPedido={orderId}
            />
        </div>
    );
};

export default Carrito;