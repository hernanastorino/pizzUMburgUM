import React, { useState, useEffect } from 'react';
import styles from '../styles/Register.module.css';

const AddOptionModal = ({ isOpen, onClose, onSave, subCategoryName, categoryId }) => {
    const [formData, setFormData] = useState({
        name: '',
        priceSmall: '',
        priceMedium: '',
        priceLarge: '',
        price: '',
        isAvailable: true
    });

    const singlePriceIds = [9, 10];
    const isSinglePrice = singlePriceIds.includes(categoryId);

    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: '',
                priceSmall: '',
                priceMedium: '',
                priceLarge: '',
                price: '',
                isAvailable: true
            });
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData, isSinglePrice);
    };

    if (!isOpen) return null;

    // --- ESTILOS VISUALES ---
    const modalOverlay = {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex', justifyContent: 'center',
        alignItems: 'center', zIndex: 1000,
        backdropFilter: 'blur(3px)'
    };

    const modalContent = {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        width: '500px',
        maxWidth: '90%',
        boxShadow: '0 5px 25px rgba(0,0,0,0.2)',
        color: '#333'
    };

    // ESTILO PARA INPUT NORMAL (Con color negro forzado)
    const inputStyle = {
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: '15px',
        color: 'black',       // <--- FUERZA TEXTO NEGRO
        backgroundColor: 'white', // Asegura fondo blanco
        border: '1px solid #ccc'  // Borde visible
    };

    // ESTILO PARA INPUTS FLEXIBLES (Con color negro forzado)
    const flexInputStyle = {
        flex: 1,
        width: '0',
        minWidth: '80px',
        boxSizing: 'border-box',
        color: 'black',       // <--- FUERZA TEXTO NEGRO
        backgroundColor: 'white',
        border: '1px solid #ccc'
    };

    return (
        <div style={modalOverlay}>
            <div style={modalContent}>
                <h2 style={{marginBottom: '20px', textAlign: 'center', fontWeight: '600', color: 'black'}}>
                    Agregar: {subCategoryName}
                </h2>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div style={{marginBottom: '20px'}}>
                        <label style={{fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#333'}}>Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Ej. Queso Azul"
                            className={styles.input}
                            required
                            value={formData.name}
                            onChange={handleChange}
                            style={inputStyle} // Aplica el estilo con color negro
                        />
                    </div>

                    {!isSinglePrice ? (
                        <div style={{marginBottom: '20px'}}>
                            <label style={{fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#333'}}>Precios por Tamaño:</label>
                            <div style={{display:'flex', gap:'10px'}}>
                                <input
                                    type="number"
                                    name="priceSmall"
                                    placeholder="$ Chico"
                                    className={styles.input}
                                    required
                                    value={formData.priceSmall}
                                    onChange={handleChange}
                                    style={flexInputStyle}
                                />
                                <input
                                    type="number"
                                    name="priceMedium"
                                    placeholder="$ Mediano"
                                    className={styles.input}
                                    required
                                    value={formData.priceMedium}
                                    onChange={handleChange}
                                    style={flexInputStyle}
                                />
                                <input
                                    type="number"
                                    name="priceLarge"
                                    placeholder="$ Grande"
                                    className={styles.input}
                                    required
                                    value={formData.priceLarge}
                                    onChange={handleChange}
                                    style={flexInputStyle}
                                />
                            </div>
                        </div>
                    ) : (
                        <div style={{marginBottom: '20px'}}>
                            <label style={{fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#333'}}>Precio:</label>
                            <input
                                type="number"
                                name="price"
                                placeholder="$ Precio Único"
                                className={styles.input}
                                required
                                value={formData.price}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                        </div>
                    )}

                    <div style={{margin: '20px 0', display: 'flex', alignItems: 'center', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '8px'}}>
                        <input
                            type="checkbox"
                            id="isAvailable"
                            name="isAvailable"
                            checked={formData.isAvailable}
                            onChange={handleChange}
                            style={{marginRight: '10px', width: '20px', height: '20px', cursor: 'pointer'}}
                        />
                        <label htmlFor="isAvailable" style={{cursor: 'pointer', userSelect: 'none', flex: 1, fontWeight: '500', color: 'black'}}>
                            Disponible para la venta
                        </label>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '30px'}}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                background: '#e0e0e0',
                                color: '#333',
                                padding: '10px 20px',
                                border:'none',
                                borderRadius:'6px',
                                cursor:'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            style={{
                                background: 'linear-gradient(to right, #ff9800, #ff5722)',
                                color:'white',
                                padding: '10px 25px',
                                border:'none',
                                borderRadius:'6px',
                                cursor:'pointer',
                                fontWeight: 'bold',
                                boxShadow: '0 2px 5px rgba(255, 87, 34, 0.3)'
                            }}
                        >
                            Guardar Opción
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddOptionModal;