// src/components/FavoritoItem.jsx
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ConfirmModal from './ConfirmModal';
import styles from '../styles/Backoffice.module.css';
import favStyles from '../styles/Favoritos.module.css';

// Recibimos onAddToCart
const FavoritoItem = ({ favorito, onUpdate, onDelete, onAddToCart }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // ... (Mantén el resto de tus estados y refs igual que antes) ...
    // ... (Omitiré repetir toda la lógica de dropdowns para no hacer el código gigante,
    //      simplemente asegúrate de NO borrar tu lógica de edición existente) ...

    // Simplemente agrega este bloque en la sección de botones (rightSection)
    // dentro del return:

    /*
      <div className={favStyles.rightSection}>
         ...
      </div>
    */

    // Aquí está el componente renderizado actualizado con el botón de carrito:
    return (
        <>
            <div className={styles.categoryItem}>
                <div className={styles.categoryBorder}></div>
                <div className={styles.categoryInnerWrapper}>
                    {/* Header Click */}
                    <div className={styles.categoryHeader} onClick={() => setIsOpen(!isOpen)}>
                        <div className={styles.categoryHeaderLeft}>
                            <div className={styles.categoryTitle}>
                                <span className={`${styles.categoryIcon} ${isOpen ? styles.iconRotated : ''}`}>▶</span>
                                {favorito.tipo === 'pizza' ? '🍕' : '🍔'}
                                <span style={{marginLeft:'10px'}}>{favorito.nombre}</span>
                            </div>
                        </div>
                        {/* Botón Rápido Añadir (Opcional en cabecera) */}
                        <div className={styles.categoryHeaderRight}>
                            <button
                                className={favStyles.actionBtn}
                                style={{background:'transparent', border:'1px solid white', fontSize:'0.9rem', marginRight:'10px'}}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAddToCart();
                                }}
                            >
                                🛒 Añadir
                            </button>
                        </div>
                    </div>

                    {isOpen && (
                        <div className={styles.categoryContent}>
                            <div className={favStyles.favoritoContent}>

                                {/* IZQUIERDA: Precio y Tipo */}
                                <div className={favStyles.leftSection}>
                  <span className={favStyles.tipo}>
                    {favorito.tipo === 'pizza' ? 'Pizza' : 'Hamburguesa'}
                  </span>
                                    <span className={favStyles.precio}>${favorito.detalles.precioTotal}</span>

                                    {/* BOTÓN GRANDE AÑADIR AL CARRITO */}
                                    <button
                                        className={favStyles.actionBtn}
                                        style={{
                                            marginTop:'15px', background:'#ff9800', border:'none',
                                            width:'100%', padding:'8px', borderRadius:'5px'
                                        }}
                                        onClick={onAddToCart}
                                    >
                                        Agregar 🛒
                                    </button>
                                </div>

                                {/* CENTRO: Detalles (Tu código de visualización actual) */}
                                <div className={favStyles.centerSection}>
                                    <div className={favStyles.detailRow}>
                                        <span className={favStyles.label}>Detalles:</span>
                                        <div className={favStyles.value}>
                                            {/* Aquí renderizas tus detalles como antes */}
                                            {favorito.detalles.tamaño} • {favorito.detalles.masa || favorito.detalles.pan}
                                            <br/>
                                            {favorito.detalles.queso} • {favorito.detalles.salsa}
                                            <br/>
                                            Extras: {(favorito.detalles.toppings || []).join(', ')}
                                        </div>
                                    </div>
                                </div>

                                {/* DERECHA: Acciones Admin (Borrar) */}
                                <div className={favStyles.rightSection}>
                                    {/* Puedes mantener el botón editar si quieres, o solo borrar */}
                                    <button
                                        className={`${favStyles.actionBtn} ${favStyles.deleteBtn}`}
                                        onClick={() => setShowDeleteModal(true)}
                                        title="Eliminar Favorito"
                                    >
                                        ✕
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ConfirmModal
                isOpen={showDeleteModal}
                onConfirm={() => {
                    onDelete(favorito.id);
                    setShowDeleteModal(false);
                }}
                onCancel={() => setShowDeleteModal(false)}
                message={`¿Eliminar "${favorito.nombre}" de favoritos?`}
            />
        </>
    );
};

export default FavoritoItem;