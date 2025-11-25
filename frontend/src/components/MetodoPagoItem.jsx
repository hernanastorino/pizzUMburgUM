// src/components/MetodoPagoItem.jsx
import React, { useState } from 'react';
import styles from '../styles/PagosYEnvios.module.css';

const MetodoPagoItem = ({ metodo, onUpdate, onDelete, onDeleteDirecto }) => {
  const [isEditing, setIsEditing] = useState(
    !metodo.tipo || !metodo.numero || !metodo.titular
  );
  const [edited, setEdited] = useState({ 
    tipo: metodo.tipo || '',
    numero: metodo.numero || '',
    titular: metodo.titular || '',
    cvv: metodo.cvv || '',
    vencimiento: metodo.vencimiento || ''
  });

  const handleChange = (e) => {
    setEdited({ ...edited, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Verificar si TODOS los campos están vacíos
    if (!edited.tipo.trim() && !edited.numero.trim() && !edited.titular.trim() && !edited.cvv.trim() && !edited.vencimiento.trim()) {
      // Si TODO está vacío, eliminar DIRECTAMENTE sin modal
      onDeleteDirecto(metodo.id);
      return;
    }

    // Si hay ALGO escrito (aunque sea solo un campo), guardar normalmente
    onUpdate({ ...edited, id: metodo.id });
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
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
            
            {/* Tipo */}
            <div className={styles.fieldRow}>
              <label><strong>Tipo:</strong></label>
              <input
                className={styles.inputEdit}
                type="text"
                name="tipo"
                value={edited.tipo}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Ej: Visa, Mastercard"
              />
            </div>

            {/* Número completo */}
            <div className={styles.fieldRow}>
              <label><strong>Número:</strong></label>
              <input
                className={styles.inputEdit}
                type="text"
                name="numero"
                value={edited.numero}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                maxLength="16"
                placeholder="1234567890123456"
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
                onKeyDown={handleKeyDown}
                placeholder="Nombre del titular"
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
                onKeyDown={handleKeyDown}
                maxLength="3"
                placeholder="123"
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
                onKeyDown={handleKeyDown}
                maxLength="5"
                style={{ width: '100px' }}
              />
            </div>
          </>
        ) : (
          <>
            {/* MODO VISTA - Solo mostrar campos con contenido */}
            
            {metodo.tipo && metodo.tipo.trim() !== '' && (
              <p className={styles.fieldDisplay}>
                <strong>Tipo:</strong> {metodo.tipo}
              </p>
            )}

            {metodo.titular && metodo.titular.trim() !== '' && (
              <p className={styles.fieldDisplay}>
                <strong>Titular:</strong> {metodo.titular}
              </p>
            )}

            {metodo.numero && metodo.numero.trim() !== '' && (
              <p className={styles.fieldDisplay}>
                <strong>Número:</strong> {formatearNumero(metodo.numero)}
              </p>
            )}

            {metodo.cvv && metodo.cvv.trim() !== '' && (
              <p className={styles.fieldDisplay}>
                <strong>CVV:</strong> •••
              </p>
            )}

            {metodo.vencimiento && metodo.vencimiento.trim() !== '' && (
              <p className={styles.fieldDisplay}>
                <strong>Vencimiento:</strong> {metodo.vencimiento}
              </p>
            )}
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