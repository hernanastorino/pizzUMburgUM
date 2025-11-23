// src/components/FavoritoItem.jsx
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import ConfirmModal from './ConfirmModal';
import styles from '../styles/Backoffice.module.css';
import favStyles from '../styles/Favoritos.module.css';

const FavoritoItem = ({ favorito, onUpdate, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editedNombre, setEditedNombre] = useState(favorito.nombre);
  const [editedDetalles, setEditedDetalles] = useState({ ...favorito.detalles });

  const [showTamañoDropdown, setShowTamañoDropdown] = useState(false);
  const [showOpcionesDropdown, setShowOpcionesDropdown] = useState(false);
  const [showToppingsDropdown, setShowToppingsDropdown] = useState(false);
  const [tamañoPosition, setTamañoPosition] = useState({ top: 0, left: 0 });
  const [opcionesPosition, setOpcionesPosition] = useState({ top: 0, left: 0 });
  const [toppingsPosition, setToppingsPosition] = useState({ top: 0, left: 0 });

  const tamañoRef = useRef(null);
  const opcionesRef = useRef(null);
  const toppingsRef = useRef(null);
  const tamañoMenuRef = useRef(null);
  const opcionesMenuRef = useRef(null);
  const toppingsMenuRef = useRef(null);

  const handleDropdownClick = (e, setter, setPosition) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const menuHeight = 220;
    
    setPosition({
      top: rect.top - menuHeight - 5,
      left: rect.left
    });
    setter(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tamañoRef.current && !tamañoRef.current.contains(event.target) &&
        tamañoMenuRef.current && !tamañoMenuRef.current.contains(event.target)) {
        setShowTamañoDropdown(false);
      }
      if (opcionesRef.current && !opcionesRef.current.contains(event.target) &&
        opcionesMenuRef.current && !opcionesMenuRef.current.contains(event.target)) {
        setShowOpcionesDropdown(false);
      }
      if (toppingsRef.current && !toppingsRef.current.contains(event.target) &&
        toppingsMenuRef.current && !toppingsMenuRef.current.contains(event.target)) {
        setShowToppingsDropdown(false);
      }
    };

    const handleScroll = (event) => {
      const isScrollInsideMenu =
        (tamañoMenuRef.current && tamañoMenuRef.current.contains(event.target)) ||
        (opcionesMenuRef.current && opcionesMenuRef.current.contains(event.target)) ||
        (toppingsMenuRef.current && toppingsMenuRef.current.contains(event.target));

      if (!isScrollInsideMenu) {
        setShowTamañoDropdown(false);
        setShowOpcionesDropdown(false);
        setShowToppingsDropdown(false);
      }
    };

    if (showTamañoDropdown || showOpcionesDropdown || showToppingsDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [showTamañoDropdown, showOpcionesDropdown, showToppingsDropdown]);

  const opcionesPizza = {
    tamaños: ['15cm', '20cm', '25cm'],
    masas: ['Napolitana', 'Integral', 'Sin Gluten'],
    toppings: ['Jamón', 'Pepperoni', 'Champiñones', 'Aceitunas', 'Pimientos']
  };

  const opcionesHamburguesa = {
    tamaños: ['1 carne', '2 carnes', '3 carnes'],
    panes: ['Pan de Papa', 'Pan Integral', 'Pan Sin Gluten'],
    toppings: ['Lechuga', 'Tomate', 'Queso Cheddar']
  };

  const handleSave = () => {
    onUpdate({
      ...favorito,
      nombre: editedNombre.trim() || favorito.nombre,
      detalles: editedDetalles
    });
    setIsEditing(false);
    setShowTamañoDropdown(false);
    setShowOpcionesDropdown(false);
    setShowToppingsDropdown(false);
  };

  const handleCancel = () => {
    setEditedNombre(favorito.nombre);
    setEditedDetalles({ ...favorito.detalles });
    setIsEditing(false);
    setShowTamañoDropdown(false);
    setShowOpcionesDropdown(false);
    setShowToppingsDropdown(false);
  };

  const toggleTopping = (topping) => {
    const currentToppings = editedDetalles.toppings || [];
    if (currentToppings.includes(topping)) {
      setEditedDetalles({
        ...editedDetalles,
        toppings: currentToppings.filter(t => t !== topping)
      });
    } else {
      setEditedDetalles({
        ...editedDetalles,
        toppings: [...currentToppings, topping]
      });
    }
  };

  const getOpciones = () => {
    const detalles = isEditing ? editedDetalles : favorito.detalles;
    if (favorito.tipo === 'pizza') {
      return { masa: detalles.masa, salsa: detalles.salsa, queso: detalles.queso };
    } else {
      return { carne: detalles.carne, pan: detalles.pan };
    }
  };

  const getToppings = () => {
    const detalles = isEditing ? editedDetalles : favorito.detalles;
    return detalles.toppings || [];
  };

  const renderOpciones = () => {
    const opciones = getOpciones();
    if (isEditing) {
      if (favorito.tipo === 'pizza') {
        return (
          <div className={favStyles.dropdownWrapper} ref={opcionesRef}>
            <button
              className={favStyles.dropdownButton}
              onClick={(e) => handleDropdownClick(e, setShowOpcionesDropdown, setOpcionesPosition)}
            >
              {editedDetalles.masa} ▼
            </button>
            {showOpcionesDropdown && createPortal(
              <div
                ref={opcionesMenuRef}
                className={favStyles.dropdownMenu}
                style={{
                  position: 'fixed',
                  top: `${opcionesPosition.top}px`,
                  left: `${opcionesPosition.left}px`
                }}
              >
                {opcionesPizza.masas.map(masa => (
                  <div
                    key={masa}
                    className={favStyles.dropdownItem}
                    onClick={() => {
                      setEditedDetalles({ ...editedDetalles, masa });
                      setShowOpcionesDropdown(false);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className={favStyles.checkbox}>
                      {editedDetalles.masa === masa ? '☑' : '☐'}
                    </span>
                    {masa}
                  </div>
                ))}
              </div>,
              document.body
            )}
          </div>
        );
      } else {
        return (
          <div className={favStyles.dropdownWrapper} ref={opcionesRef}>
            <button
              className={favStyles.dropdownButton}
              onClick={(e) => handleDropdownClick(e, setShowOpcionesDropdown, setOpcionesPosition)}
            >
              {editedDetalles.pan} ▼
            </button>
            {showOpcionesDropdown && createPortal(
              <div
                ref={opcionesMenuRef}
                className={favStyles.dropdownMenu}
                style={{
                  position: 'fixed',
                  top: `${opcionesPosition.top}px`,
                  left: `${opcionesPosition.left}px`
                }}
              >
                {opcionesHamburguesa.panes.map(pan => (
                  <div
                    key={pan}
                    className={favStyles.dropdownItem}
                    onClick={() => {
                      setEditedDetalles({ ...editedDetalles, pan });
                      setShowOpcionesDropdown(false);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className={favStyles.checkbox}>
                      {editedDetalles.pan === pan ? '☑' : '☐'}
                    </span>
                    {pan}
                  </div>
                ))}
              </div>,
              document.body
            )}
          </div>
        );
      }
    } else {
      if (favorito.tipo === 'pizza') {
        return <span className={favStyles.value}>{opciones.masa}, {opciones.salsa}, {opciones.queso}</span>;
      } else {
        return <span className={favStyles.value}>{opciones.carne}, {opciones.pan}</span>;
      }
    }
  };

  return (
    <>
      <div className={styles.categoryItem}>
        <div className={styles.categoryBorder}></div>
        <div className={styles.categoryInnerWrapper}>
          <div className={styles.categoryHeader} onClick={() => !isEditing && setIsOpen(!isOpen)}>
            <div className={styles.categoryHeaderLeft}>
              <div className={styles.categoryTitle}>
                <span className={`${styles.categoryIcon} ${isOpen ? styles.iconRotated : ''}`}>▶</span>
                {favorito.tipo === 'pizza' ? '🍕' : '🍔'}
                <span>{favorito.nombre}</span>
              </div>
            </div>
          </div>

          {isOpen && (
            <div className={styles.categoryContent}>
              <div className={favStyles.favoritoContent}>
                <div className={favStyles.leftSection}>
                  <span className={favStyles.tipo}>
                    {favorito.tipo === 'pizza' ? 'Pizza' : 'Hamburguesa'}
                  </span>
                  <span className={favStyles.precio}>${favorito.detalles.precioTotal}</span>
                </div>

                <div className={favStyles.centerSection}>
                  <div className={favStyles.detailRow}>
                    <span className={favStyles.label}>Nombre:</span>
                    {isEditing ? (
                      <input
                        className={favStyles.editInput}
                        value={editedNombre}
                        onChange={(e) => setEditedNombre(e.target.value)}
                      />
                    ) : (
                      <span className={favStyles.value}>{favorito.nombre}</span>
                    )}
                  </div>

                  <div className={favStyles.detailRow}>
                    <span className={favStyles.label}>Tamaño:</span>
                    {isEditing ? (
                      <div className={favStyles.dropdownWrapper} ref={tamañoRef}>
                        <button
                          className={favStyles.dropdownButton}
                          onClick={(e) => handleDropdownClick(e, setShowTamañoDropdown, setTamañoPosition)}
                        >
                          {editedDetalles.tamaño} ▼
                        </button>
                        {showTamañoDropdown && createPortal(
                          <div
                            ref={tamañoMenuRef}
                            className={favStyles.dropdownMenu}
                            style={{
                              position: 'fixed',
                              top: `${tamañoPosition.top}px`,
                              left: `${tamañoPosition.left}px`
                            }}
                          >
                            {(favorito.tipo === 'pizza' ? opcionesPizza.tamaños : opcionesHamburguesa.tamaños).map(tam => (
                              <div
                                key={tam}
                                className={favStyles.dropdownItem}
                                onClick={() => {
                                  setEditedDetalles({ ...editedDetalles, tamaño: tam });
                                  setShowTamañoDropdown(false);
                                }}
                                style={{ cursor: 'pointer' }}
                              >
                                <span className={favStyles.checkbox}>
                                  {editedDetalles.tamaño === tam ? '☑' : '☐'}
                                </span>
                                {tam}
                              </div>
                            ))}
                          </div>,
                          document.body
                        )}
                      </div>
                    ) : (
                      <span className={favStyles.value}>{favorito.detalles.tamaño}</span>
                    )}
                  </div>

                  <div className={favStyles.detailRow}>
                    <span className={favStyles.label}>Opciones:</span>
                    {renderOpciones()}
                  </div>

                  <div className={favStyles.detailRow}>
                    <span className={favStyles.label}>Toppings:</span>
                    {isEditing ? (
                      <div className={favStyles.dropdownWrapper} ref={toppingsRef}>
                        <button
                          className={favStyles.dropdownButton}
                          onClick={(e) => handleDropdownClick(e, setShowToppingsDropdown, setToppingsPosition)}
                        >
                          Editar Toppings ▼
                        </button>
                        {showToppingsDropdown && createPortal(
                          <div
                            ref={toppingsMenuRef}
                            className={favStyles.dropdownMenu}
                            style={{
                              position: 'fixed',
                              top: `${toppingsPosition.top}px`,
                              left: `${toppingsPosition.left}px`
                            }}
                          >
                            {(favorito.tipo === 'pizza' ? opcionesPizza.toppings : opcionesHamburguesa.toppings).map(topping => (
                              <div
                                key={topping}
                                className={favStyles.dropdownItem}
                                onClick={() => toggleTopping(topping)}
                                style={{ cursor: 'pointer' }}
                              >
                                <span className={favStyles.checkbox}>
                                  {(editedDetalles.toppings || []).includes(topping) ? '☑' : '☐'}
                                </span>
                                {topping}
                              </div>
                            ))}
                          </div>,
                          document.body
                        )}
                      </div>
                    ) : (
                      <div className={favStyles.toppingsList}>
                        {getToppings().map((item, index) => (
                          <span
                            key={index}
                            className={favStyles.toppingChip}
                            style={{ cursor: 'default' }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className={favStyles.rightSection}>
                  <button
                    className={favStyles.actionBtn}
                    onClick={() => {
                      if (isEditing) {
                        handleSave();
                      } else {
                        setIsEditing(true);
                      }
                    }}
                    title={isEditing ? "Guardar" : "Editar"}
                  >
                    {isEditing ? '✓' : '✏️'}
                  </button>
                  <button
                    className={`${favStyles.actionBtn} ${favStyles.deleteBtn}`}
                    onClick={() => {
                      if (isEditing) {
                        handleCancel();
                      } else {
                        setShowDeleteModal(true);
                      }
                    }}
                    title={isEditing ? "Cancelar" : "Eliminar"}
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
        message={`¿Seguro que quieres eliminar "${favorito.nombre}"?`}
      />
    </>
  );
};

export default FavoritoItem;