import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/PedidosAdmin.module.css';

const PedidosAdmin = () => {
    const [pedidos, setPedidos] = useState([]);
    const [expandedPedido, setExpandedPedido] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- 1. CARGAR PEDIDOS ---
    useEffect(() => {
        fetchPedidos();
    }, []);

    const fetchPedidos = async () => {
        try {
            const token = localStorage.getItem('token');
            // Ahora este endpoint devuelve la Entidad completa con todos los detalles
            const response = await axios.get("http://localhost:8080/orders", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const pedidosFormateados = response.data.map(order => {
                const itemsUnificados = [];

                // --- LÓGICA DE DETALLE IDÉNTICA AL CARRITO ---

                // A. Creaciones (Pizzas/Burgers)
                // Buscamos en itemsCreation (formato entidad)
                if (order.itemsCreation) {
                    order.itemsCreation.forEach(i => {
                        const creation = i.creation || {};

                        // 1. Nombre Bonito
                        let nombreDisplay = creation.name || i.name || "Producto";
                        if (nombreDisplay.includes('undefined')) {
                            nombreDisplay = creation.dough ? "Pizza Personalizada" : "Burger Personalizada";
                        }

                        // 2. Construir Descripción Detallada
                        const detalles = [];
                        if (creation.size) detalles.push(creation.size); // Ej: 25cm
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

                        itemsUnificados.push({
                            nombre: nombreDisplay,
                            descripcion: detalles.join(" • ") || "Sin detalles extra", // Lo mostramos bonito
                            precio: i.creationSubtotal || 0,
                            cantidad: i.creationQuantity || i.CreationQuantity || 1
                        });
                    });
                }

                // B. Bebidas
                if (order.itemsBeverage) {
                    order.itemsBeverage.forEach(i => {
                        itemsUnificados.push({
                            nombre: i.beverage?.name || "Bebida",
                            descripcion: "Bebida fría",
                            precio: i.beverageSubtotal || 0,
                            cantidad: i.beverageQuantity || 1
                        });
                    });
                }

                // C. Sides
                if (order.itemsSide) {
                    order.itemsSide.forEach(i => {
                        itemsUnificados.push({
                            nombre: i.side?.name || "Acompañamiento",
                            descripcion: "Extra",
                            precio: i.sideSubtotal || 0,
                            cantidad: i.sideQuantity || 1
                        });
                    });
                }

                return {
                    id: order.id,
                    estado: order.state,
                    fecha: order.date,
                    total: order.total,
                    // Obtenemos nombre del cliente de forma segura
                    cliente: order.client ? `${order.client.name} ${order.client.surname}` : "Cliente",
                    items: itemsUnificados
                };
            });

            // Ordenar: Más recientes primero
            setPedidos(pedidosFormateados.sort((a, b) => b.id - a.id));
            setLoading(false);

        } catch (error) {
            console.error("Error al cargar pedidos:", error);
            setLoading(false);
        }
    };

    // --- 2. GESTIÓN DE ESTADOS ---
    const getEstadoInfo = (estado) => {
        const estados = {
            'CONFIRMED':   { emoji: '⏳', texto: 'Confirmado', color: '#fbbf24' },
            'PREPARING':   { emoji: '👨‍🍳', texto: 'En Cocina', color: '#60a5fa' },
            'SENT':        { emoji: '🛵', texto: 'En Camino', color: '#a78bfa' },
            'DELIVERED':   { emoji: '✅', texto: 'Entregado', color: '#4ade80' },
            'CANCELLED':   { emoji: '❌', texto: 'Cancelado', color: '#ef4444' }
        };
        return estados[estado] || { emoji: '📦', texto: estado, color: '#ccc' };
    };

    const getSiguienteEstadoTexto = (estadoActual) => {
        const mapa = {
            'CONFIRMED': 'Preparando 👨‍🍳',
            'PREPARING': 'En Camino 🛵',
            'SENT': 'Entregado ✅',
            'DELIVERED': null
        };
        return mapa[estadoActual];
    };

    const avanzarEstado = async (pedidoId, e) => {
        e.stopPropagation();
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:8080/orders/${pedidoId}/advance`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchPedidos(); // Recargar para ver cambio
        } catch (error) {
            console.error('Error al avanzar estado:', error);
            alert("Error al avanzar estado (Verifica permisos de Admin)");
        }
    };

    const toggleExpand = (id) => {
        setExpandedPedido(expandedPedido === id ? null : id);
    };

    if (loading) return <div style={{color:'white', padding:'50px', textAlign:'center'}}>Cargando panel...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.containerInner}>
                <h1 className={styles.title}>📦 Gestión de Pedidos</h1>

                <div className={styles.pedidosList}>
                    {pedidos.length === 0 ? (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>📭</div>
                            <p className={styles.emptyText}>No hay pedidos activos</p>
                        </div>
                    ) : (
                        pedidos.map((pedido) => {
                            const estadoInfo = getEstadoInfo(pedido.estado);
                            const isExpanded = expandedPedido === pedido.id;
                            const textoSiguiente = getSiguienteEstadoTexto(pedido.estado);

                            return (
                                <div key={pedido.id} className={styles.pedidoCard}>
                                    <div className={styles.pedidoBorder}></div>

                                    <div className={styles.pedidoContent}>
                                        {/* CABECERA DEL PEDIDO */}
                                        <div className={styles.pedidoHeader} onClick={() => toggleExpand(pedido.id)}>
                                            <div className={styles.headerLeft}>
                        <span className={`${styles.arrow} ${isExpanded ? styles.arrowRotated : ''}`}>
                          ▶
                        </span>
                                                <div className={styles.pedidoInfo}>
                                                    <h3 className={styles.pedidoNumero}>
                                                        Pedido #{pedido.id}
                                                    </h3>
                                                    <div className={styles.estadoContainer}>
                                                        <span className={styles.estadoEmoji}>{estadoInfo.emoji}</span>
                                                        <span className={styles.estadoTexto} style={{color: estadoInfo.color}}>
                                {estadoInfo.texto}
                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className={styles.totalPedido}>
                        ${pedido.total?.toLocaleString()}
                      </span>
                                        </div>

                                        {/* DETALLE EXPANDIBLE */}
                                        {isExpanded && (
                                            <div className={styles.itemsContainer}>
                                                {pedido.items.map((item, index) => (
                                                    <div key={index} className={styles.itemCard}>
                                                        <div className={styles.itemInfo}>
                                                            <p className={styles.itemNombre}>
                                <span style={{fontWeight:'bold', marginRight:'8px'}}>
                                  {item.cantidad}x
                                </span>
                                                                {item.nombre}
                                                            </p>
                                                            {/* DESCRIPCIÓN DETALLADA */}
                                                            <p className={styles.itemDescripcion} style={{color: '#aaa', fontSize:'0.9rem'}}>
                                                                {item.descripcion}
                                                            </p>
                                                        </div>
                                                        <p className={styles.itemPrecio}>
                                                            ${item.precio}
                                                        </p>
                                                    </div>
                                                ))}

                                                <div className={styles.accionesContainer}>
                                                    {textoSiguiente ? (
                                                        <button
                                                            className={styles.btnAvanzar}
                                                            onClick={(e) => avanzarEstado(pedido.id, e)}
                                                        >
                                                            {textoSiguiente}
                                                        </button>
                                                    ) : (
                                                        <div className={styles.estadoFinal} style={{color:'#4ade80', fontWeight:'bold'}}>
                                                            ✅ Pedido Finalizado
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default PedidosAdmin;