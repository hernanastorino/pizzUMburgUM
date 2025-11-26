import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Pedidos.module.css';

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedPedido, setExpandedPedido] = useState(null);

    useEffect(() => {
        fetchPedidos();
    }, []);

    const fetchPedidos = async () => {
        try {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');

            if (!token || !email) {
                setLoading(false);
                return;
            }

            // 1. Obtener ID del Usuario
            const userRes = await axios.get(`http://localhost:8080/api/users/${encodeURIComponent(email)}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userId = userRes.data.userId || userRes.data.id;

            // 2. Obtener Historial de Órdenes
            const ordersRes = await axios.get(`http://localhost:8080/orders/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // 3. Transformar datos para la vista
            const ordersMapped = ordersRes.data
                // Filtramos PENDING porque es el carrito activo, no un pedido realizado
                .filter(order => order.state !== 'PENDING')
                .map(order => {
                    const items = [];

                    // Procesar Creaciones (Pizzas/Burgers)
                    if (order.itemsCreation) {
                        order.itemsCreation.forEach(i => {
                            const creation = i.creation || {};

                            // Generar descripción bonita
                            const detalles = [];
                            if (creation.size) detalles.push(creation.size);
                            if (creation.dough) detalles.push(creation.dough.name);
                            if (creation.meat) detalles.push(creation.meat.name);
                            // ... puedes agregar más detalles si quieres

                            let nombre = creation.name || "Producto Personalizado";
                            if (nombre.includes('undefined')) nombre = creation.dough ? "Pizza a medida" : "Burger a medida";

                            items.push({
                                nombre: nombre,
                                info: detalles.join(', ') || 'Personalizado',
                                precio: i.creationSubtotal || 0,
                                cantidad: i.creationQuantity || 1
                            });
                        });
                    }

                    // Procesar Bebidas
                    if (order.itemsBeverage) {
                        order.itemsBeverage.forEach(i => {
                            items.push({
                                nombre: i.beverage?.name || "Bebida",
                                info: `x${i.beverageQuantity}`,
                                precio: i.beverageSubtotal || 0
                            });
                        });
                    }

                    // Procesar Sides
                    if (order.itemsSide) {
                        order.itemsSide.forEach(i => {
                            items.push({
                                nombre: i.side?.name || "Acompañamiento",
                                info: `x${i.sideQuantity}`,
                                precio: i.sideSubtotal || 0
                            });
                        });
                    }

                    return {
                        id: order.id,
                        estado: order.state, // CONFIRMED, PREPARING, SENT, DELIVERED
                        total: order.total,
                        items: items
                    };
                });

            // Ordenar por ID descendente (lo más nuevo primero)
            setPedidos(ordersMapped.sort((a, b) => b.id - a.id));
            setLoading(false);

        } catch (error) {
            console.error("Error cargando pedidos:", error);
            setLoading(false);
        }
    };

    const getEstadoInfo = (estado) => {
        // Mapeo de estados del Backend (Java Enum) a Frontend Visual
        const estados = {
            'CONFIRMED':   { texto: 'Confirmado',   color: '#fbbf24', emoji: '⏳' }, // Amarillo
            'PREPARING':   { texto: 'Preparando',   color: '#60a5fa', emoji: '👨‍🍳' }, // Azul
            'SENT':        { texto: 'En Camino',    color: '#a78bfa', emoji: '🛵' }, // Violeta
            'DELIVERED':   { texto: 'Entregado',    color: '#4ade80', emoji: '✅' }, // Verde
            'CANCELLED':   { texto: 'Cancelado',    color: '#ef4444', emoji: '❌' }  // Rojo
        };
        return estados[estado] || { texto: estado, color: '#ccc', emoji: '❓' };
    };

    const togglePedido = (id) => {
        setExpandedPedido(expandedPedido === id ? null : id);
    };

    if (loading) return <div style={{color:'white', padding:'50px', textAlign:'center'}}>Cargando historial...</div>;

    return (
        <div className={styles.pedidosWrapper}>
            <div className={styles.pedidosContainer}>
                <h1 className={styles.pageTitle}>📦 Mis Pedidos</h1>

                <div className={styles.pedidosList}>
                    {pedidos.map(pedido => {
                        const estadoInfo = getEstadoInfo(pedido.estado);
                        const isExpanded = expandedPedido === pedido.id;

                        return (
                            <div key={pedido.id} className={styles.pedidoCard}>
                                <div className={styles.pedidoBorder}></div>

                                <div className={styles.pedidoContent}>
                                    <div
                                        className={styles.pedidoHeader}
                                        onClick={() => togglePedido(pedido.id)}
                                    >
                                        <div className={styles.headerLeft}>
                      <span className={`${styles.arrow} ${isExpanded ? styles.arrowRotated : ''}`}>
                        ▶
                      </span>
                                            <div className={styles.pedidoInfo}>
                                                <h3 className={styles.pedidoNumero}>Pedido #{pedido.id}</h3>
                                                <div className={styles.estadoContainer}>
                                                    <span className={styles.estadoEmoji}>{estadoInfo.emoji}</span>
                                                    <span
                                                        className={styles.estadoTexto}
                                                        style={{ color: estadoInfo.color, textShadow: `0 0 10px ${estadoInfo.color}` }}
                                                    >
                            {estadoInfo.texto}
                          </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.totalPedido}>
                                            Total: ${pedido.total}
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <div className={styles.itemsContainer}>
                                            {pedido.items.map((item, idx) => (
                                                <div key={idx} className={styles.itemCard}>
                                                    <div className={styles.itemInfo}>
                                                        <div className={styles.itemNombre}>{item.nombre}</div>
                                                        <div className={styles.itemDescripcion}>{item.info}</div>
                                                    </div>
                                                    <div className={styles.itemPrecio}>${item.precio}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {pedidos.length === 0 && (
                    <div className={styles.emptyState}>
                        <p className={styles.emptyIcon}>📦</p>
                        <p className={styles.emptyText}>No tienes pedidos realizados</p>
                        <p className={styles.emptySubtext}>
                            ¡Ve al menú y pide tu primera pizza!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Pedidos;