import React from 'react';
import styles from '../styles/Backoffice.module.css';

const ConfirmModal = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>¿Estás seguro?</h2>
        <p className={styles.modalMessage}>{message}</p>

        <div className={styles.modalButtons}>
          <button className={`${styles.modalBtn} ${styles.modalBtnYes}`} onClick={onConfirm}>
            Sí, eliminar
          </button>
          <button className={`${styles.modalBtn} ${styles.modalBtnNo}`} onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
