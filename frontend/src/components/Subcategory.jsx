// src/components/Subcategory.jsx
import React, { useState } from 'react';
import OptionItem from './OptionItem';
import styles from '../styles/Backoffice.module.css';

// 1. Recibimos la prop 'onAdd' que viene desde Backoffice -> CategoryItem
const Subcategory = ({ subcategory, onUpdate, onDelete, onDeleteOption, onAdd }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditingName, setIsEditingName] = useState(!subcategory.name || subcategory.name === 'Nueva Subcategoría');
    const [name, setName] = useState(subcategory.name || '');

    // TÍTULOS DE COLUMNAS
    const [title1, setTitle1] = useState(subcategory.customTitles?.[0] || '');
    const [title2, setTitle2] = useState(subcategory.customTitles?.[1] || '');
    const [title3, setTitle3] = useState(subcategory.customTitles?.[2] || '');
    const [editingTitle, setEditingTitle] = useState(null);

    // 2. Modificamos el manejador del botón "+"
    const handleAddOption = (e) => {
        e.stopPropagation();

        // Si tenemos la función onAdd (que abre el modal), la usamos.
        if (onAdd) {
            onAdd();
            setIsOpen(true); // Abrimos la lista para ver el nuevo item cuando se agregue
        } else {
            // Fallback por seguridad (comportamiento antiguo)
            const newOption = { id: Date.now(), name: '' };
            onUpdate({ ...subcategory, options: [...subcategory.options, newOption] });
            setIsOpen(true);
        }
    };

    const handleUpdateOption = (updatedOption) => {
        onUpdate({
            ...subcategory,
            options: subcategory.options.map(opt => opt.id === updatedOption.id ? updatedOption : opt)
        });
    };

    const handleDeleteOption = (optionId) => {
        onDeleteOption(subcategory.id, optionId);
    };

    const handleSaveName = () => {
        if (name.trim()) {
            onUpdate({ ...subcategory, name: name.trim() });
        } else {
            setName(subcategory.name);
        }
        setIsEditingName(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSaveName();
        if (e.key === 'Escape') {
            setName(subcategory.name);
            setIsEditingName(false);
        }
    };

    const handleTitleKeyDown = (e) => {
        if (e.key === 'Enter') setEditingTitle(null);
        if (e.key === 'Escape') setEditingTitle(null);
    };

    return (
        <div className={`${styles.subcategory} ${isOpen ? styles.subcategoryActive : ''}`}>
            <div className={styles.subcategoryHeader}>
                <div className={styles.subcategoryLeft} onClick={() => setIsOpen(!isOpen)}>
                    <span className={`${styles.subcategoryArrow} ${isOpen ? styles.arrowRotated : ''}`}>▶</span>

                    <div className={styles.subcategoryInfo}>
                        {isEditingName ? (
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                onBlur={handleSaveName}
                                onKeyDown={handleKeyDown}
                                className={styles.subcategoryInput}
                                placeholder="Ej: Tipos de Masa"
                                autoFocus
                                onClick={e => e.stopPropagation()}
                            />
                        ) : (
                            <span
                                className={styles.subcategoryTitle}
                                onDoubleClick={(e) => { e.stopPropagation(); setIsEditingName(true); }}
                            >
                {subcategory.name}
              </span>
                        )}
                    </div>
                </div>

                <div className={styles.subcategoryRight}>
                    {/* Este botón ahora abrirá tu Modal de Base de Datos */}
                    <button
                        className={styles.subcategoryAddOption}
                        onClick={handleAddOption}
                        title="Agregar opción a Base de Datos"
                        style={{backgroundColor: '#4CAF50', color: 'white'}} // Un toque de color para resaltar que es funcional
                    >
                        +
                    </button>

                    <button className={styles.subcategoryDelete} onClick={(e) => { e.stopPropagation(); onDelete(); }} title="Eliminar">✕</button>
                </div>
            </div>

            {isOpen && (
                <div className={styles.subcategoryContent}>
                    <div className={styles.subcategoryInner}>

                        {/* ENCABEZADO ALINEADO */}
                        {subcategory.customTitles && (
                            <div className={styles.optionsHeader}>
                                {/* COLUMNA 1 */}
                                {editingTitle === 'title1' ? (
                                    <input
                                        value={title1}
                                        onChange={e => setTitle1(e.target.value)}
                                        onBlur={() => setEditingTitle(null)}
                                        onKeyDown={handleTitleKeyDown}
                                        className={styles.titleInput}
                                        autoFocus
                                    />
                                ) : (
                                    <span
                                        onDoubleClick={() => setEditingTitle('title1')}
                                        style={{ cursor: "pointer" }}
                                    >
                    {title1}
                  </span>
                                )}

                                {/* COLUMNA 2 */}
                                {editingTitle === 'title2' ? (
                                    <input
                                        value={title2}
                                        onChange={e => setTitle2(e.target.value)}
                                        onBlur={() => setEditingTitle(null)}
                                        onKeyDown={handleTitleKeyDown}
                                        className={styles.titleInput}
                                        autoFocus
                                    />
                                ) : (
                                    <span
                                        onDoubleClick={() => setEditingTitle('title2')}
                                        style={{ cursor: "pointer" }}
                                    >
                    {title2}
                  </span>
                                )}

                                {/* COLUMNA 3 */}
                                {editingTitle === 'title3' ? (
                                    <input
                                        value={title3}
                                        onChange={e => setTitle3(e.target.value)}
                                        onBlur={() => setEditingTitle(null)}
                                        onKeyDown={handleTitleKeyDown}
                                        className={styles.titleInput}
                                        autoFocus
                                    />
                                ) : (
                                    <span
                                        onDoubleClick={() => setEditingTitle('title3')}
                                        style={{ cursor: "pointer" }}
                                    >
                    {title3}
                  </span>
                                )}
                            </div>
                        )}

                        <div className={styles.optionsList}>
                            {subcategory.options.map(option => (
                                <OptionItem
                                    key={option.id}
                                    option={option}
                                    onUpdate={handleUpdateOption}
                                    onDelete={() => handleDeleteOption(option.id)}
                                />
                            ))}

                            {subcategory.options.length === 0 && (
                                <p className={styles.emptyMessage}>No hay opciones. Haz clic en + para agregar.</p>
                            )}
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Subcategory;