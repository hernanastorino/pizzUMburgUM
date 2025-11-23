// src/components/OptionItem.jsx
import React, { useState } from "react";
import styles from "../styles/Backoffice.module.css";

const OptionItem = ({ option, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(!option.name);

  const [name, setName] = useState(option.name || "");
  const [price15, setPrice15] = useState(option.price15 !== undefined ? option.price15.toString() : "");
  const [price20, setPrice20] = useState(option.price20 !== undefined ? option.price20.toString() : "");
  const [price25, setPrice25] = useState(option.price25 !== undefined ? option.price25.toString() : "");

  const save = () => {
    onUpdate({
      ...option,
      name,
      price15: Number(price15) || 0,
      price20: Number(price20) || 0,
      price25: Number(price25) || 0,
    });
    setIsEditing(false);
  };

  const cancel = () => {
    setName(option.name || "");
    setPrice15(option.price15 !== undefined ? option.price15.toString() : "");
    setPrice20(option.price20 !== undefined ? option.price20.toString() : "");
    setPrice25(option.price25 !== undefined ? option.price25.toString() : "");
    setIsEditing(false);
  };

  const handleKeys = (e) => {
    if (e.key === "Enter") save();
    if (e.key === "Escape") cancel();
  };

  return (
    <div className={styles.optionItem}>
      
      {/* ===== COLUMNA 1 — NOMBRE ===== */}
      {isEditing ? (
        <input
          className={styles.optionInput}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeys}
          placeholder="Nombre"
          autoFocus
        />
      ) : (
        <span className={styles.optionName}>{option.name}</span>
      )}

      {/* ===== COLUMNA 2 — PRECIO 15 ===== */}
      {isEditing ? (
        <input
          className={styles.optionInputPrice}
          type="number"
          value={price15}
          onChange={(e) => setPrice15(e.target.value)}
          onKeyDown={handleKeys}
          placeholder="$0"  
        />
      ) : (
        <span 
          className={styles.optionPrice}
          style={{ color: (!option.name && option.price15 === 0) ? 'rgba(255, 255, 255, 0.4)' : '#a8dadc' }}
        >
          ${option.price15}
        </span>
      )}
      {/* ===== COLUMNA 3 — PRECIO 20 ===== */}
      {isEditing ? (
        <input
          className={styles.optionInputPrice}
          type="number"
          value={price20}
          onChange={(e) => setPrice20(e.target.value)}
          onKeyDown={handleKeys}
          placeholder="$0"
        />
      ) : (
        <span 
          className={styles.optionPrice}
          style={{ color: (!option.name && option.price20 === 0) ? 'rgba(255, 255, 255, 0.4)' : '#a8dadc' }}
        >
          ${option.price20}
        </span>
      )}

      {/* ===== COLUMNA 4 — PRECIO 25 ===== */}
      {isEditing ? (
        <input
          className={styles.optionInputPrice}
          type="number"
          value={price25}
          onChange={(e) => setPrice25(e.target.value)}
          onKeyDown={handleKeys}
          placeholder="$0"
        />
      ) : (
        <span 
          className={styles.optionPrice}
          style={{ color: (!option.name && option.price25 === 0) ? 'rgba(255, 255, 255, 0.4)' : '#a8dadc' }}
        >
          ${option.price25}
        </span>
      )}

      {/* ===== COLUMNA 5 — BOTONES ===== */}
      <div className={styles.optionActions}>
        <button
          className={`${styles.optionEdit} ${isEditing ? styles.optionEditActive : ''}`}
          onClick={() => {
            if (isEditing) {
              save();
            } else {
              setIsEditing(true);
            }
          }}
          title={isEditing ? "Guardar" : "Editar"}
        >
          ✏️
        </button>

        <button className={styles.optionRemove} onClick={onDelete} title="Eliminar">
          ✕
        </button>
      </div>
    </div>
  );
};

export default OptionItem;