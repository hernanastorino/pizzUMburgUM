import React, { useState } from 'react';
import styles from '../styles/Perfil.module.css';

const DireccionItem = ({ direccion, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState({ ...direccion });

  const handleChange = (e) => {
    setEdited({ ...edited, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdate(edited);
    setIsEditing(false);
  };

  return (
    <div className={styles.direccionItemWrapper}>
      <div className={styles.direccionItemBorder}></div>
      <div className={styles.direccionItem}>
        {/* Nombre */}
        {isEditing ? (
          <div className={styles.fieldRow}>
            <label><strong>Nombre:</strong></label>
            <input
              className={styles.inputEdit}
              type="text"
              name="nombre"
              value={edited.nombre}
              onChange={handleChange}
            />
          </div>
        ) : (
          <p className={styles.fieldDisplay}>
            <strong>Nombre:</strong> {direccion.nombre}
          </p>
        )}

        {/* Dirección */}
        {isEditing ? (
          <div className={styles.fieldRow}>
            <label><strong>Dirección:</strong></label>
            <input
              className={styles.inputEdit}
              type="text"
              name="calle"
              value={edited.calle}
              onChange={handleChange}
            />
          </div>
        ) : (
          <p className={styles.fieldDisplay}>
            <strong>Dirección:</strong> {direccion.calle}
          </p>
        )}

        {/* Número */}
        {isEditing ? (
          <div className={styles.fieldRow}>
            <label><strong>Número:</strong></label>
            <input
              className={styles.inputEdit}
              type="text"
              name="numero"
              value={edited.numero}
              onChange={handleChange}
            />
          </div>
        ) : (
          <p className={styles.fieldDisplay}>
            <strong>Número:</strong> {direccion.numero}
          </p>
        )}

        {/* Ciudad (Obs) */}
        {isEditing ? (
          <div className={styles.fieldRow}>
            <label><strong>Obs:</strong></label>
            <input
              className={styles.inputEdit}
              type="text"
              name="ciudad"
              value={edited.ciudad}
              onChange={handleChange}
            />
          </div>
        ) : (
          <p className={styles.fieldDisplay}>
            <strong>Obs:</strong> {direccion.ciudad}
          </p>
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
            onClick={() => onDelete(direccion.id)}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default DireccionItem;