import React from 'react';
import styles from '../styles/OrderConfirmModal.module.css';

const OrderConfirmModal = ({ isOpen, onClose, onVerEstado, numeroPedido }) => {
  if (!isOpen) return null;

  const handleVerEstado = () => {
    if (onVerEstado) {
      onVerEstado();
    }
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
        
        <div className={styles.buttonGroup}>
          <button 
            className={styles.verEstadoBtn}
            onClick={handleVerEstado}
          >
            📦 Ver Estado
          </button>
          
    
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmModal;