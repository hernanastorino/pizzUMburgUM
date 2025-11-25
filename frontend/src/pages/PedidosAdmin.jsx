// src/pages/PedidosAdmin.jsx
import React, { useState, useEffect } from 'react';
import styles from '../styles/PedidosAdmin.module.css';

const PedidosAdmin = () => {
  const [pedidos, setPedidos] = useState([]);
  const [expandedPedido, setExpandedPedido] = useState(null);

  // Pedidos de ejemplo (movidos fuera del useEffect)
  const pedidosEjemplo = [
    {
      id: 1,
      estado: 'pendiente',
      fecha: new Date('2025-11-25T10:30:00'),
      total: 2850,
      items: [
        { nombre: 'Pizza Margherita', cantidad: 2, precio: 950 },
        { nombre: 'Coca-Cola 1.5L', cantidad: 1, precio: 450 },
        { nombre: 'Papas Fritas', cantidad: 1, precio: 500 }
      ]
    },
    {
      id: 2,
      estado: 'preparandose',
      fecha: new Date('2025-11-25T09:15:00'),
      total: 4200,
      items: [
        { nombre: 'Hamburguesa Completa', cantidad: 3, precio: 1200 },
        { nombre: 'Ensalada César', cantidad: 1, precio: 800 }
      ]
    },
    {
      id: 3,
      estado: 'enviandote',
      fecha: new Date('2025-11-25T08:45:00'),
      total: 1850,
      items: [
        { nombre: 'Sushi Roll x8', cantidad: 1, precio: 1200 },
        { nombre: 'Sopa Miso', cantidad: 1, precio: 450 }
      ]
    },
    {
      id: 4,
      estado: 'entregado',
      fecha: new Date('2025-11-24T19:30:00'),
      total: 3400,
      items: [
        { nombre: 'Pasta Carbonara', cantidad: 2, precio: 1100 },
        { nombre: 'Tiramisú', cantidad: 2, precio: 600 }
      ]
    }
  ];

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/orders");
        if (!response.ok) {
          throw new Error('Error en la respuesta');
        }
        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error("Error al cargar pedidos:", error);
        // Usar datos de ejemplo si falla
        setPedidos(pedidosEjemplo);
      }
    };

    // Comentar para usar solo datos de ejemplo
    // fetchPedidos();
    
    // Descomentar para usar datos de ejemplo directamente
    setPedidos(pedidosEjemplo);
  }, []);

  const getEstadoInfo = (estado) => {
    const estados = {
      pendiente: { emoji: '⏳', texto: 'Pendiente' },
      preparandose: { emoji: '👨‍🍳', texto: 'Preparándose' },
      enviandote: { emoji: '🚚', texto: 'Enviándose' },
      entregado: { emoji: '✅', texto: 'Entregado' }
    };

    return estados[estado] || { emoji: '📦', texto: estado };
  };

  const getSiguienteEstado = (estadoActual) => {
    const flujoEstados = {
      pendiente: 'preparandose',
      preparandose: 'enviandote',
      enviandote: 'entregado',
      entregado: null // Ya está en el estado final
    };

    return flujoEstados[estadoActual];
  };

  const avanzarEstado = async (pedidoId, estadoActual, e) => {
    e.stopPropagation(); // Evita que se expanda/colapse el pedido

    const siguienteEstado = getSiguienteEstado(estadoActual);
    
    if (!siguienteEstado) {
      alert('Este pedido ya fue entregado');
      return;
    }

    try {
      // Aquí harías el PUT al backend
      const response = await fetch(`http://localhost:8080/api/orders/${pedidoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: siguienteEstado })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar estado');
      }

      // Actualizar el estado localmente
      setPedidos(prevPedidos =>
        prevPedidos.map(pedido =>
          pedido.id === pedidoId
            ? { ...pedido, estado: siguienteEstado }
            : pedido
        )
      );

      console.log(`Pedido #${pedidoId} avanzado a: ${siguienteEstado}`);
    } catch (error) {
      console.error('Error al avanzar estado:', error);
      
      // Si falla el backend, actualizar localmente de todas formas (para demo)
      setPedidos(prevPedidos =>
        prevPedidos.map(pedido =>
          pedido.id === pedidoId
            ? { ...pedido, estado: siguienteEstado }
            : pedido
        )
      );
    }
  };

  const toggleExpand = (id) => {
    setExpandedPedido(expandedPedido === id ? null : id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerInner}>
        <h1 className={styles.title}>📦 Pedidos del Sistema</h1>

        <div className={styles.pedidosList}>
          {pedidos.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📭</div>
              <p className={styles.emptyText}>No hay pedidos en el sistema</p>
              <p className={styles.emptySubtext}>Los pedidos aparecerán aquí cuando se realicen</p>
            </div>
          ) : (
            pedidos.map((pedido) => {
              const estadoInfo = getEstadoInfo(pedido.estado);
              const isExpanded = expandedPedido === pedido.id;
              const siguienteEstado = getSiguienteEstado(pedido.estado);

              return (
                <div key={pedido.id} className={styles.pedidoCard}>
                  <div className={styles.pedidoBorder}></div>
                  
                  <div className={styles.pedidoContent}>
                    <div 
                      className={styles.pedidoHeader}
                      onClick={() => toggleExpand(pedido.id)}
                    >
                      <div className={styles.headerLeft}>
                        <span className={`${styles.arrow} ${isExpanded ? styles.arrowRotated : ''}`}>
                          ▶
                        </span>
                        <div className={styles.pedidoInfo}>
                          <h3 className={styles.pedidoNumero}>Pedido #{pedido.id}</h3>
                          <div className={styles.estadoContainer}>
                            <span className={styles.estadoEmoji}>{estadoInfo.emoji}</span>
                            <span className={styles.estadoTexto}>{estadoInfo.texto}</span>
                          </div>
                        </div>
                      </div>
                      <span className={styles.totalPedido}>
                        Total: ${pedido.total?.toLocaleString() || '0'}
                      </span>
                    </div>

                    {isExpanded && (
                      <div className={styles.itemsContainer}>
                        {pedido.items && pedido.items.map((item, index) => (
                          <div key={index} className={styles.itemCard}>
                            <div className={styles.itemInfo}>
                              <p className={styles.itemNombre}>{item.nombre}</p>
                              <p className={styles.itemDescripcion}>
                                Cantidad: {item.cantidad} × ${item.precio}
                              </p>
                            </div>
                            <p className={styles.itemPrecio}>
                              ${((item.cantidad || 0) * (item.precio || 0)).toLocaleString()}
                            </p>
                          </div>
                        ))}

                        <div className={styles.accionesContainer}>
                          {siguienteEstado ? (
                            <button
                              className={styles.btnAvanzar}
                              onClick={(e) => avanzarEstado(pedido.id, pedido.estado, e)}
                            >
                              ➡️ Avanzar a {getEstadoInfo(siguienteEstado).texto}
                            </button>
                          ) : (
                            <div className={styles.estadoFinal}>
                              ✅ Pedido completado
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