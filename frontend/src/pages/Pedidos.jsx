// src/pages/Pedidos.jsx
import React, { useState } from 'react';
import styles from '../styles/Pedidos.module.css';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      estado: 'preparandose',
      total: 850,
      items: [
        { nombre: 'Creación 1', info: 'Pizza 25cm, Napolitana', precio: 380 },
        { nombre: 'Bebida 1', info: 'Coca Cola 500ml', precio: 150 },
        { nombre: 'Creación 2', info: 'Hamburguesa 2 carnes', precio: 320 }
      ]
    },
    {
      id: 2,
      estado: 'pendiente',
      total: 450,
      items: [
        { nombre: 'Creación 4', info: 'Pizza 20cm, Integral', precio: 295 },
        { nombre: 'Bebida 2', info: 'Fanta 500ml', precio: 155 }
      ]
    },
    {
      id: 3,
      estado: 'entregado',
      total: 680,
      items: [
        { nombre: 'Creación 3', info: 'Hamburguesa simple', precio: 280 },
        { nombre: 'Papas Fritas', info: 'Porción grande', precio: 200 },
        { nombre: 'Bebida 3', info: 'Sprite 500ml', precio: 200 }
      ]
    }
  ]);

  const [expandedPedido, setExpandedPedido] = useState(null);

  const getEstadoInfo = (estado) => {
    const estados = {
      pendiente: {  texto: 'Pendiente', color: '#fbbf24' },
      preparandose: {  texto: 'Preparándose', color: '#60a5fa' },
      enviandote: {  texto: 'Enviándote', color: '#a78bfa' },
      entregado: { texto: 'Entregado', color: '#4ade80' }
    };
    return estados[estado] || estados.pendiente;
  };

  const togglePedido = (id) => {
    setExpandedPedido(expandedPedido === id ? null : id);
  };

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
            <p className={styles.emptyText}>No tienes pedidos aún</p>
            <p className={styles.emptySubtext}>
              Realiza tu primer pedido y lo verás aquí
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pedidos;