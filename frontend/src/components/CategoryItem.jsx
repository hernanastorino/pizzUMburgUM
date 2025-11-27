import React, { useState } from 'react';
import Subcategory from './Subcategory';
import ConfirmModal from './ConfirmModal';
import styles from '../styles/Backoffice.module.css';

const CategoryItem = ({ category, onUpdate, onAddClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modal, setModal] = useState({ open: false, type: null, id: null, subId: null });

    const handleAddSubcategory = (e) => {
        e.stopPropagation();
        const newSub = { id: Date.now(), name: 'Nueva Subcategoría', options: [] };
        onUpdate({ ...category, subcategories: [...category.subcategories, newSub] });
        setIsOpen(true);
    };

    const handleUpdateSubcategory = (updatedSub) => {
        onUpdate({
            ...category,
            subcategories: category.subcategories.map(s => s.id === updatedSub.id ? updatedSub : s)
        });
    };

    const confirmDeleteSubcategory = (subId) => {
        setModal({ open: true, type: 'subcategory', id: subId, subId: null });
    };

    const confirmDeleteOption = (subId, optionId) => {
        setModal({ open: true, type: 'option', id: optionId, subId: subId });
    };

    const handleConfirmDelete = () => {
        if (modal.type === 'subcategory') {
            onUpdate({
                ...category,
                subcategories: category.subcategories.filter(s => s.id !== modal.id)
            });
        } else if (modal.type === 'option') {
            onUpdate({
                ...category,
                subcategories: category.subcategories.map(s =>
                    s.id === modal.subId
                        ? { ...s, options: s.options.filter(o => o.id !== modal.id) }
                        : s
                )
            });
        }
        setModal({ open: false, type: null, id: null, subId: null });
    };

    return (
        <div className={styles.categoryItem}>
            <div className={styles.categoryBorder}></div>
            <div className={styles.categoryInnerWrapper}>
                <div className={styles.categoryHeader}>
                    <div className={styles.categoryHeaderLeft} onClick={() => setIsOpen(!isOpen)}>
                        <div className={styles.categoryTitle}>
                            <span className={`${styles.categoryIcon} ${isOpen ? styles.iconRotated : ''}`}>▶</span>
                            {category.icon} {category.title}
                        </div>
                    </div>
                    <div className={styles.categoryHeaderRight}>
                        <button className={styles.addSubcategoryBtn} onClick={handleAddSubcategory} title="Agregar subcategoría">
                            +
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <div className={styles.categoryContent}>
                        <div className={styles.categoryInner}>
                            {category.subcategories.map(sub => (
                                <Subcategory
                                    key={sub.id}
                                    subcategory={sub}
                                    onUpdate={handleUpdateSubcategory}
                                    onDelete={() => confirmDeleteSubcategory(sub.id)}
                                    onDeleteOption={confirmDeleteOption}
                                    onAdd={() => onAddClick(sub.id, sub.name)}
                                />
                            ))}
                            {category.subcategories.length === 0 && (
                                <p className={styles.emptyMessage}>No hay subcategorías. Haz clic en + para agregar.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <ConfirmModal
                isOpen={modal.open}
                onConfirm={handleConfirmDelete}
                onCancel={() => setModal({ open: false, type: null, id: null, subId: null })}
                message={modal.type === 'subcategory' ? 'Se eliminará la subcategoría completa.' : 'Se eliminará esta opción.'}
            />
        </div>
    );
};

export default CategoryItem;