import React, { useState, useRef, useEffect } from 'react';
import ConfirmModal from './ConfirmModal';
import styles from '../styles/Backoffice.module.css';
import favStyles from '../styles/Favoritos.module.css';

const FavoritoItem = ({ favorito, onUpdate, onDelete, onAddToCart }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [isEditingName, setIsEditingName] = useState(false);
    const [newName, setNewName] = useState(favorito.nombre);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isEditingName && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditingName]);

    const handleSaveName = () => {
        if (newName.trim() !== "" && newName !== favorito.nombre) {
            onUpdate({ ...favorito, nombre: newName });
        } else {
            setNewName(favorito.nombre);
        }
        setIsEditingName(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.stopPropagation();
            handleSaveName();
        } else if (e.key === 'Escape') {
            e.stopPropagation();
            setNewName(favorito.nombre);
            setIsEditingName(false);
        }
    };

    return (
        <>
            <div className={styles.categoryItem}>
                <div className={styles.categoryBorder}></div>
                <div className={styles.categoryInnerWrapper}>

                    <div className={styles.categoryHeader} onClick={() => setIsOpen(!isOpen)}>
                        <div className={styles.categoryHeaderLeft}>
                            <div className={styles.categoryTitle} style={{display: 'flex', alignItems: 'center'}}>
                                <span className={`${styles.categoryIcon} ${isOpen ? styles.iconRotated : ''}`}>▶</span>
                                <span style={{fontSize: '1.5rem', marginRight: '10px'}}>
                    {favorito.tipo === 'pizza' ? '🍕' : '🍔'}
                </span>

                                {isEditingName ? (
                                    <input
                                        ref={inputRef}
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        onBlur={handleSaveName}
                                        onKeyDown={handleKeyDown}
                                        onClick={(e) => e.stopPropagation()}
                                        className={styles.subcategoryInput} // Reusamos estilo de input
                                        style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#333'}}
                                    />
                                ) : (
                                    <span
                                        onDoubleClick={(e) => {
                                            e.stopPropagation();
                                            setIsEditingName(true);
                                        }}
                                        title="Doble click para editar nombre"
                                        style={{cursor: 'text'}}
                                    >
                        {favorito.nombre}
                    </span>
                                )}
                            </div>
                        </div>

                        <div className={styles.categoryHeaderRight}>
                            <button
                                className={favStyles.actionBtn}
                                style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(255,255,255,0.5)',
                                    fontSize: '0.9rem',
                                    marginRight: '10px',
                                    color: 'white',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
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

                                <div className={favStyles.leftSection}>
                  <span className={favStyles.tipo}>
                    {favorito.tipo === 'pizza' ? 'Pizza' : 'Hamburguesa'}
                  </span>
                                    <span className={favStyles.precio}>
                    ${favorito.detalles.precioTotal}
                  </span>

                                    <button
                                        className={favStyles.actionBtn}
                                        style={{
                                            marginTop:'15px',
                                            background:'linear-gradient(45deg, #ff9800, #f57c00)',
                                            color: 'white',
                                            border:'none',
                                            width:'100%',
                                            padding:'10px',
                                            borderRadius:'8px',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                        }}
                                        onClick={onAddToCart}
                                    >
                                        Agregar al Pedido 🛒
                                    </button>
                                </div>

                                <div className={favStyles.centerSection}>
                                    <div className={favStyles.detailRow}>
                                        <span className={favStyles.label}>Ingredientes:</span>
                                        <div className={favStyles.value}>
                                            {favorito.detalles.tamaño} • {favorito.detalles.masa || favorito.detalles.pan}
                                            <br/>
                                            {favorito.detalles.queso ? `Queso: ${favorito.detalles.queso}` : ''}
                                            {favorito.detalles.salsa ? ` • Salsa: ${favorito.detalles.salsa}` : ''}
                                            <br/>
                                            Extras: {(favorito.detalles.toppings || []).join(', ') || "Sin extras"}
                                        </div>
                                    </div>
                                </div>

                                <div className={favStyles.rightSection}>
                                    <button
                                        className={favStyles.editBtn}
                                        style={{
                                            background: 'transparent', border: 'none', fontSize: '1.2rem',
                                            cursor: 'pointer', marginRight: '10px'
                                        }}
                                        onClick={() => setIsEditingName(true)}
                                        title="Editar Nombre"
                                    >
                                        ✏️
                                    </button>

                                    <button
                                        className={`${favStyles.actionBtn} ${favStyles.deleteBtn}`}
                                        style={{
                                            background: '#ff4444', color: 'white', border: 'none',
                                            width: '30px', height: '30px', borderRadius: '5px',
                                            cursor: 'pointer', fontWeight: 'bold'
                                        }}
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