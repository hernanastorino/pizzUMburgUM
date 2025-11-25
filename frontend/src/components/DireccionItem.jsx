// src/components/DireccionItem.jsx
import React, { useState } from 'react';
import styles from '../styles/PagosYEnvios.module.css';

const DireccionItem = ({ direccion, onUpdate, onDelete, onDeleteDirecto }) => {
  const [editing, setEditing] = useState(
    !direccion.nombre || !direccion.direccion || !direccion.numero
  );
  const [form, setForm] = useState({ 
    nombre: direccion.nombre || '',
    direccion: direccion.direccion || '',
    numero: direccion.numero || '',
    aptPiso: direccion.aptPiso || '',
    observaciones: direccion.observaciones || ''
  });

  const handleSave = () => {
    // Verificar si TODOS los campos están vacíos
    if (!form.nombre.trim() && !form.direccion.trim() && !form.numero.trim() && !form.aptPiso.trim() && !form.observaciones.trim()) {
      // Si TODO está vacío, eliminar DIRECTAMENTE sin modal
      onDeleteDirecto(direccion.id);
      return;
    }

    // Si hay ALGO escrito (aunque sea solo un campo), guardar normalmente
    onUpdate({ ...form, id: direccion.id });
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div className={styles.direccionItemWrapper}>
      <div className={styles.direccionItemBorder}></div>
      <div className={styles.direccionItem}>
        {editing ? (
          <>
            <div className={styles.formRow}>
              <label>Nombre</label>
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                onKeyDown={handleKeyDown}
                placeholder="Ej: Casa, Trabajo"
              />
            </div>

            <div className={styles.formRow}>
              <label>Dirección</label>
              <input
                type="text"
                value={form.direccion}
                onChange={(e) => setForm({ ...form, direccion: e.target.value })}
                onKeyDown={handleKeyDown}
                placeholder="Ej: Av. Libertador"
              />
            </div>

            <div className={styles.formRow}>
              <label>Número</label>
              <input
                type="text"
                value={form.numero}
                onChange={(e) => setForm({ ...form, numero: e.target.value })}
                onKeyDown={handleKeyDown}
                placeholder="1234"
              />
            </div>

            <div className={styles.formRow}>
              <label>Apto/Piso (opcional)</label>
              <input
                type="text"
                value={form.aptPiso}
                onChange={(e) => setForm({ ...form, aptPiso: e.target.value })}
                onKeyDown={handleKeyDown}
                placeholder="Ej: 4B"
              />
            </div>

            <div className={styles.formRow}>
              <label>Observaciones (opcional)</label>
              <input
                type="text"
                value={form.observaciones}
                onChange={(e) => setForm({ ...form, observaciones: e.target.value })}
                onKeyDown={handleKeyDown}
                placeholder="Ej: Timbre roto, golpear"
              />
            </div>

            <div className={styles.actionsRow}>
              <button className={styles.editBtn} onClick={handleSave}>
                Guardar
              </button>
              <button 
                className={styles.deleteBtn} 
                onClick={() => onDelete(direccion.id)}
              >
                ✕
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.direccionInfo}>
              {direccion.nombre && direccion.nombre.trim() !== '' && (
                <p><strong>Nombre:</strong> {direccion.nombre}</p>
              )}
              {direccion.direccion && direccion.direccion.trim() !== '' && direccion.numero && direccion.numero.trim() !== '' && (
                <p><strong>Dirección:</strong> {direccion.direccion} {direccion.numero}</p>
              )}
              {direccion.direccion && direccion.direccion.trim() !== '' && (!direccion.numero || direccion.numero.trim() === '') && (
                <p><strong>Dirección:</strong> {direccion.direccion}</p>
              )}
              {!direccion.direccion && direccion.numero && direccion.numero.trim() !== '' && (
                <p><strong>Número:</strong> {direccion.numero}</p>
              )}
              {direccion.aptPiso && direccion.aptPiso.trim() !== '' && (
                <p><strong>Apto/Piso:</strong> {direccion.aptPiso}</p>
              )}
              {direccion.observaciones && direccion.observaciones.trim() !== '' && (
                <p><strong>Obs:</strong> {direccion.observaciones}</p>
              )}
            </div>

            <div className={styles.actionsRow}>
              <button className={styles.editBtn} onClick={() => setEditing(true)}>
                Editar
              </button>
              <button 
                className={styles.deleteBtn} 
                onClick={() => onDelete(direccion.id)}
              >
                ✕
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DireccionItem;