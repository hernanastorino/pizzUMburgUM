import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import styles from "./Navbar.module.css";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Estados visuales
    const [isChecked, setIsChecked] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    // Estados de Datos (Sincronizados con Carrito.jsx)
    const [cartItems, setCartItems] = useState([]);
    const [orderId, setOrderId] = useState(null);

    // 1. Sincronización: Cargar datos al navegar o abrir el menú
    useEffect(() => {
        fetchCart();
    }, [location.pathname, isCartOpen]);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');

            // Si no hay sesión, limpiamos y salimos
            if (!token || !email) {
                setCartItems([]);
                return;
            }

            // A. Buscar ID Usuario
            const userRes = await axios.get(`http://localhost:8080/api/users/${encodeURIComponent(email)}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userId = userRes.data.userId || userRes.data.id;

            // B. Obtener Orden Pendiente
            const orderRes = await axios.post(
                `http://localhost:8080/orders/start/user/${userId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const order = orderRes.data;
            setOrderId(order.id);

            // C. Procesamiento de Items (Lógica idéntica a Carrito.jsx)
            const rawItems = [];

            // 1. Creaciones
            const listaCreaciones = order.creations || order.itemsCreation || [];
            if (Array.isArray(listaCreaciones)) {
                rawItems.push(...listaCreaciones.map(i => {
                    const creation = i.creation || {};

                    // Arreglar nombre
                    let nombreDisplay = creation.name || i.name || "Producto";
                    if (nombreDisplay.includes("undefined")) {
                        nombreDisplay = creation.dough ? "Pizza Personalizada" : "Burger Personalizada";
                    }

                    return {
                        uniqueId: Math.random(),
                        nombre: nombreDisplay,
                        precio: i.creationSubtotal || i.subTotal || 0,
                        cantidad: i.creationQuantity || i.CreationQuantity || 1, // Clave correcta
                        tipo: 'creation',
                        productId: creation.creationId || i.id
                    };
                }));
            }

            // 2. Bebidas
            const listaBebidas = order.beverages || order.itemsBeverage || [];
            if (Array.isArray(listaBebidas)) {
                rawItems.push(...listaBebidas.map(i => {
                    const beverage = i.beverage || {};
                    return {
                        uniqueId: Math.random(),
                        nombre: beverage.name || i.name || "Bebida",
                        precio: i.beverageSubtotal || i.subTotal || 0, // Precio total de línea
                        cantidad: i.beverageQuantity || 1,
                        tipo: 'beverage',
                        productId: beverage.beverageId
                    };
                }));
            }

            // 3. Sides
            const listaSides = order.sides || order.itemsSide || [];
            if (Array.isArray(listaSides)) {
                rawItems.push(...listaSides.map(i => {
                    const side = i.side || {};
                    return {
                        uniqueId: Math.random(),
                        nombre: side.name || i.name || "Acompañamiento",
                        precio: i.sideSubtotal || i.subTotal || 0,
                        cantidad: i.sideQuantity || 1,
                        tipo: 'side',
                        productId: side.sideId
                    };
                }));
            }

            // Ordenar para que no salten al editar
            rawItems.sort((a, b) => {
                const typePriority = { 'creation': 1, 'beverage': 2, 'side': 3 };
                if (typePriority[a.tipo] !== typePriority[b.tipo]) return typePriority[a.tipo] - typePriority[b.tipo];
                return a.productId - b.productId;
            });

            setCartItems(rawItems);

        } catch (error) {
            console.error("Navbar sync error:", error);
        }
    };

    // 2. Acción: Modificar cantidad desde el dropdown
    const updateQuantity = async (item, delta) => {
        const newQuantity = item.cantidad + delta;
        if (newQuantity < 0) return;

        try {
            const token = localStorage.getItem('token');

            // Optimistic UI
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

            fetchCart(); // Recargar para asegurar consistencia

        } catch (error) {
            console.error("Error update navbar", error);
            fetchCart();
        }
    };

    // --- FUNCIONES VISUALES ---

    const getTotalItems = () => {
        return cartItems.reduce((sum, item) => sum + item.cantidad, 0);
    };

    const getTotalPrice = () => {
        // Sumamos los precios (que ya vienen calculados como subtotales de línea desde el backend o el mapeo)
        return cartItems.reduce((sum, item) => sum + item.precio, 0);
    };

    const handleVerPedido = () => {
        setIsCartOpen(false);
        navigate('/carrito');
    };

    // Handlers de UI
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) setIsProfileOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLinkClick = () => setIsChecked(false);
    const handleOverlayClick = () => setIsChecked(false);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
        if (!isCartOpen) fetchCart(); // Forzar refresco al abrir
    };

    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
    const handleNavigation = (path) => { setIsProfileOpen(false); navigate(path); };
    const handleLogout = () => { localStorage.clear(); setIsProfileOpen(false); navigate('/'); };

    return (
        <>
            {isChecked && <div className={styles.overlay} onClick={handleOverlayClick} />}
            {isCartOpen && <div className={styles.cartOverlay} onClick={() => setIsCartOpen(false)} />}

            <nav className={styles.nav}>
                <input type="checkbox" id="check" className={styles.check} checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
                <label htmlFor="check" className={styles.checkbtn}>☰</label>

                <div className={styles.logo}>PizzUM & BurgUM</div>

                <ul className={`${styles.navLinks} ${isChecked ? styles.open : ''}`}>
                    <li><Link to="/menu" className={location.pathname === '/menu' ? styles.active : ''} onClick={handleLinkClick}>Inicio</Link></li>
                    <li><Link to="/favoritos" className={location.pathname === '/favoritos' ? styles.active : ''} onClick={handleLinkClick}>💜 Favoritos</Link></li>
                    <li>
                        <Link to="#" className={styles.cartLink} onClick={(e) => { e.preventDefault(); toggleCart(); }}>
                            🛒 Carrito
                            {getTotalItems() > 0 && <span className={styles.cartBadge}>{getTotalItems()}</span>}
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className={styles.cartLink} onClick={(e) => { e.preventDefault(); toggleProfile(); }}>
                            👤 Perfil
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* DROPDOWN DEL CARRITO */}
            {isCartOpen && (
                <div className={styles.cartDropdownWrapper}>
                    <div className={styles.cartDropdownBorder}></div>
                    <div className={styles.cartDropdown}>
                        <div className={styles.cartHeader}>
                            <h3>🛒 Mi Pedido</h3>
                            <button className={styles.closeCart} onClick={() => setIsCartOpen(false)}>✕</button>
                        </div>

                        <div className={styles.cartItems}>
                            {cartItems.length === 0 ? (
                                <p className={styles.emptyMessage}>Tu carrito está vacío</p>
                            ) : (
                                cartItems.map(item => (
                                    <div key={item.uniqueId} className={styles.cartItem}>
                                        <div className={styles.itemInfo}>
                                            <span className={styles.itemName}>{item.nombre}</span>
                                            <span className={styles.itemPrice}>${item.precio}</span>
                                        </div>
                                        <div className={styles.itemControls}>
                                            <button className={styles.controlBtn} onClick={() => updateQuantity(item, -1)}>
                                                {item.cantidad === 1 ? '🗑️' : '-'}
                                            </button>
                                            <span className={styles.quantity}>{item.cantidad}</span>
                                            <button className={styles.controlBtn} onClick={() => updateQuantity(item, 1)}>+</button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className={styles.cartTotal}>
                                <span className={styles.totalLabel}>Total:</span>
                                <span className={styles.totalPrice}>${getTotalPrice()}</span>
                            </div>
                        )}

                        <button className={styles.viewOrderBtn} onClick={handleVerPedido}>
                            Ver Detalle Completo
                        </button>
                    </div>
                </div>
            )}

            {/* DROPDOWN DE PERFIL (Sin cambios lógicos) */}
            {isProfileOpen && (
                <>
                    <div className={styles.cartOverlay} onClick={() => setIsProfileOpen(false)} />
                    <div className={styles.profileDropdownWrapper} ref={profileRef}>
                        <div className={styles.profileDropdownBorder}></div>
                        <div className={styles.profileDropdown}>
                            <div className={styles.profileHeader}>
                                <h3>👤 Mi Perfil</h3>
                                <button className={styles.closeProfile} onClick={() => setIsProfileOpen(false)}>✕</button>
                            </div>

                            <div className={styles.profileItems}>
                                <button className={styles.profileItem} onClick={() => handleNavigation('/perfil')}><span>👤</span> Perfil</button>
                                <button className={styles.profileItem} onClick={() => handleNavigation('/pagosYEnvios')}><span>📍💳</span> Direcciones y Pagos</button>
                                <button className={styles.profileItem} onClick={() => handleNavigation('/pedidos')}><span>📦</span> Historial</button>
                                <button className={styles.profileItem} onClick={handleLogout} style={{ color: '#ff4444', borderTop: '1px solid #eee', marginTop: '8px', paddingTop: '12px' }}><span>🚪</span> Cerrar Sesión</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Navbar;