// src/components/OrderConfirmModal.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/OrderConfirmModal.module.css';

const OrderConfirmModal = ({ isOpen, onClose, numeroPedido }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleVerEstado = () => {
    // Aquí redirige a la página de estado del pedido
    navigate(`/pedidos/${numeroPedido}`);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconWrapper}>
          <span className={styles.checkIcon}>✓</span>
        </div>
        
        <h2 className={styles.title}>¡Pedido Realizado!</h2>
        
        <p className={styles.message}>
          Tu pedido ha sido registrado exitosamente
        </p>
        
        <button 
          className={styles.verEstadoBtn}
          onClick={handleVerEstado}
        >
          Ver Estado
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmModal;