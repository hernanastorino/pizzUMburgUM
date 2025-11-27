import React, { useState } from "react";
import axios from 'axios';
import styles from "../styles/Backoffice.module.css";

const OptionItem = ({ option, onUpdate, onDelete }) => {
    const safeOption = option || {};

    const [isEditing, setIsEditing] = useState(!safeOption.name);
    const [name, setName] = useState(safeOption.name || "");
    const [price15, setPrice15] = useState(safeOption.price15 !== undefined ? safeOption.price15.toString() : "");
    const [price20, setPrice20] = useState(safeOption.price20 !== undefined ? safeOption.price20.toString() : "");
    const [price25, setPrice25] = useState(safeOption.price25 !== undefined ? safeOption.price25.toString() : "");

    if (!option || !option.id) return null;

    const save = async () => {
        try {
            const token = localStorage.getItem('token');
            const endpoint = option.endpoint;

            const isSinglePrice = ['beverages', 'sides'].includes(endpoint);

            let body = {
                name: name,
                available: true,
                isAvailable: true
            };

            if (isSinglePrice) {
                body.price = parseFloat(price15) || 0;
            } else {
                body.priceSmall = parseFloat(price15) || 0;
                body.priceMedium = parseFloat(price20) || 0;
                body.priceLarge = parseFloat(price25) || 0;
            }

            await axios.put(`http://localhost:8080/api/products/${endpoint}/${option.id}`, body, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            onUpdate({
                ...option,
                name,
                price15: Number(price15) || 0,
                price20: Number(price20) || 0,
                price25: Number(price25) || 0,
            });
            setIsEditing(false);

        } catch (error) {
            console.error("Error al actualizar:", error);
            alert("Error al guardar cambios.");
        }
    };

    const handleDeleteDirect = async () => {
        if (!window.confirm(`¿Eliminar "${option.name}"?`)) return;

        try {
            const token = localStorage.getItem('token');
            const endpoint = option.endpoint;

            await axios.delete(`http://localhost:8080/api/products/${endpoint}/${option.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            onDelete();

        } catch (error) {
            console.error("Error al eliminar:", error);
            alert("Error al eliminar el producto.");
        }
    };

    const cancel = () => {
        setName(safeOption.name || "");
        setPrice15(safeOption.price15 !== undefined ? safeOption.price15.toString() : "");
        setPrice20(safeOption.price20 !== undefined ? safeOption.price20.toString() : "");
        setPrice25(safeOption.price25 !== undefined ? safeOption.price25.toString() : "");
        setIsEditing(false);
    };

    const handleKeys = (e) => {
        if (e.key === "Enter") save();
        if (e.key === "Escape") cancel();
    };

    return (
        <div className={styles.optionItem}>
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

            {isEditing ? (
                <input
                    className={styles.optionInputPrice}
                    type="number"
                    value={price20}
                    onChange={(e) => setPrice20(e.target.value)}
                    onKeyDown={handleKeys}
                    placeholder="$0"
                    disabled={['beverages', 'sides'].includes(option.endpoint)}
                    style={['beverages', 'sides'].includes(option.endpoint) ? {opacity: 0.3} : {}}
                />
            ) : (
                <span
                    className={styles.optionPrice}
                    style={{ color: (!option.name && option.price20 === 0) ? 'rgba(255, 255, 255, 0.4)' : '#a8dadc' }}
                >
          ${option.price20}
        </span>
            )}

            {isEditing ? (
                <input
                    className={styles.optionInputPrice}
                    type="number"
                    value={price25}
                    onChange={(e) => setPrice25(e.target.value)}
                    onKeyDown={handleKeys}
                    placeholder="$0"
                    disabled={['beverages', 'sides'].includes(option.endpoint)}
                    style={['beverages', 'sides'].includes(option.endpoint) ? {opacity: 0.3} : {}}
                />
            ) : (
                <span
                    className={styles.optionPrice}
                    style={{ color: (!option.name && option.price25 === 0) ? 'rgba(255, 255, 255, 0.4)' : '#a8dadc' }}
                >
          ${option.price25}
        </span>
            )}

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
                    {isEditing ? "💾" : "✏️"}
                </button>

                <button
                    className={styles.optionRemove}
                    onClick={handleDeleteDirect}
                    title="Eliminar"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default OptionItem;