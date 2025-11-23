import React, { useState } from 'react';
import styles from '../styles/Perfil.module.css';

const MetodoPagoItem = ({ metodo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState({ ...metodo });

  const handleChange = (e) => {
    setEdited({ ...edited, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdate(edited);
    setIsEditing(false);
  };

  // Ocultar dígitos de la tarjeta (mostrar solo últimos 4)
  const formatearNumero = (numero) => {
    if (!numero) return '';
    const ultimosCuatro = numero.slice(-4);
    return `•••• •••• •••• ${ultimosCuatro}`;
  };

  return (
    <div className={styles.direccionItemWrapper}>
      <div className={styles.direccionItemBorder}></div>
      <div className={styles.direccionItem}>
        
        {isEditing ? (
          <>
            {/* MODO EDICIÓN - Mostrar todo */}
            
            {/* Número completo */}
            <div className={styles.fieldRow}>
              <label><strong>Número:</strong></label>
              <input
                className={styles.inputEdit}
                type="text"
                name="numero"
                value={edited.numero}
                onChange={handleChange}
                maxLength="16"
              />
            </div>

            {/* Titular */}
            <div className={styles.fieldRow}>
              <label><strong>Titular:</strong></label>
              <input
                className={styles.inputEdit}
                type="text"
                name="titular"
                value={edited.titular}
                onChange={handleChange}
              />
            </div>

            {/* CVV y Vencimiento */}
            <div className={styles.fieldRow}>
              <label><strong>CVV:</strong></label>
              <input
                className={styles.inputEdit}
                type="text"
                name="cvv"
                value={edited.cvv}
                onChange={handleChange}
                maxLength="3"
                style={{ width: '80px', marginRight: '20px' }}
              />
              <label><strong>Venc:</strong></label>
              <input
                className={styles.inputEdit}
                type="text"
                name="vencimiento"
                placeholder="MM/AA"
                value={edited.vencimiento}
                onChange={handleChange}
                maxLength="5"
                style={{ width: '100px' }}
              />
            </div>
          </>
        ) : (
          <>
            {/* MODO VISTA - Solo mostrar tipo, titular y últimos 4 dígitos */}
            
            {/* Tipo */}
            <p className={styles.fieldDisplay}>
              <strong>Tipo:</strong> {metodo.tipo}
            </p>

            {/* Titular */}
            <p className={styles.fieldDisplay}>
              <strong>Titular:</strong> {metodo.titular}
            </p>

            {/* Últimos 4 dígitos */}
            <p className={styles.fieldDisplay}>
              <strong>Número:</strong> {formatearNumero(metodo.numero)}
            </p>
          </>
        )}

        <div className={styles.actionsRow}>
          <button
            className={styles.editBtn}
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? "Guardar" : "Editar"}
          </button>

          <button
            className={styles.deleteBtn}
            onClick={() => onDelete(metodo.id)}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default MetodoPagoItem;