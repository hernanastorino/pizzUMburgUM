import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryItem from '../components/CategoryItem';
import AddOptionModal from '../components/AddOptionModal';
import styles from '../styles/Backoffice.module.css';

const Backoffice = () => {
    const [loading, setLoading] = useState(true);
    const [menuData, setMenuData] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSubCatId, setSelectedSubCatId] = useState(null);
    const [selectedSubCatName, setSelectedSubCatName] = useState('');

    const ENDPOINT_MAP = {
        1: 'doughs', 2: 'sauces', 3: 'cheeses', 4: 'toppings',
        5: 'meats', 6: 'breads', 7: 'toppings', 8: 'condiments',
        9: 'sides', 10: 'beverages'
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/catalog/options');
            const data = response.data;

            const mapOptions = (list, endpointName) => {
                if (!Array.isArray(list)) return [];

                return list
                    // CORRECCIÓN 1: Leemos 'available' (Java) o 'isAvailable' (seguridad)
                    .filter(item => item && (item.available !== false && item.isAvailable !== false))
                    .map(item => ({
                        id: item.id || item.breadId || item.meatId || item.cheeseId || item.toppingId || item.sideId || item.beverageId || item.doughId || item.sauceId || item.condimentId,
                        name: item.name || "",
                        price15: item.priceSmall || item.price || 0,
                        price20: item.priceMedium || item.price || 0,
                        price25: item.priceLarge || item.price || 0,
                        // Guardamos el estado correcto normalizando a 'isAvailable' para uso interno de React
                        isAvailable: (item.available !== undefined) ? item.available : item.isAvailable,
                        endpoint: endpointName
                    }));
            };

            const structuredData = [
                {
                    id: 'pizzas', icon: '🍕', title: 'Pizzas',
                    subcategories: [
                        { id: 1, name: 'Tipos de Masa', customTitles: ['15cm', '20cm', '25cm'], options: mapOptions(data.doughs, 'doughs') },
                        { id: 2, name: 'Tipos de Salsa', customTitles: ['Normal', 'Extra', 'Doble'], options: mapOptions(data.sauces, 'sauces') },
                        { id: 3, name: 'Tipos de Queso', customTitles: ['Base', 'Extra', 'Borde'], options: mapOptions(data.cheeses, 'cheeses') },
                        { id: 4, name: 'Toppings', customTitles: ['Chico', 'Mediano', 'Grande'], options: mapOptions(data.toppings, 'toppings') }
                    ]
                },
                {
                    id: 'hamburguesas', icon: '🍔', title: 'Hamburguesas',
                    subcategories: [
                        { id: 5, name: 'Tipos de Carne', customTitles: ['Simple', 'Doble', 'Triple'], options: mapOptions(data.meats, 'meats') },
                        { id: 6, name: 'Tipos de Pan', options: mapOptions(data.breads, 'breads') },
                        { id: 7, name: 'Toppings Extra', options: mapOptions(data.toppings, 'toppings') },
                        { id: 8, name: 'Aderezos', options: mapOptions(data.condiments, 'condiments') }
                    ]
                },
                {
                    id: 'acompanamientos', icon: '🍟', title: 'Acompañamientos',
                    subcategories: [
                        { id: 9, name: 'Opciones', options: mapOptions(data.sides, 'sides') }
                    ]
                },
                {
                    id: 'bebidas', icon: '🥤', title: 'Bebidas',
                    subcategories: [
                        { id: 10, name: 'Refrescos y Aguas', options: mapOptions(data.beverages, 'beverages') }
                    ]
                }
            ];

            setMenuData(structuredData);
            setLoading(false);
        } catch (error) {
            console.error("Error cargando catálogo:", error);
            setLoading(false);
        }
    };

    const handleOpenAddModal = (subCategoryId, subCategoryName) => {
        setSelectedSubCatId(subCategoryId);
        setSelectedSubCatName(subCategoryName);
        setIsModalOpen(true);
    };

    const handleSaveOption = async (formData, isSinglePrice) => {
        try {
            const endpoint = ENDPOINT_MAP[selectedSubCatId];

            // CORRECCIÓN 2: Enviamos 'available: true' para que Java lo entienda
            let body = {
                name: formData.name,
                available: true,   // <--- ESTO ES LO QUE JAVA ESPERA
                isAvailable: true  // <--- Enviamos este también por si acaso
            };

            if (isSinglePrice) {
                body.price = parseFloat(formData.price) || 0;
            } else {
                body.priceSmall = parseFloat(formData.priceSmall) || 0;
                body.priceMedium = parseFloat(formData.priceMedium) || 0;
                body.priceLarge = parseFloat(formData.priceLarge) || 0;
            }

            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:8080/api/products/${endpoint}`, body, {
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            });

            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            console.error("Error guardando:", error);
            alert("Error al guardar.");
        }
    };

    const handleUpdateCategory = (updatedCategory) => {
        setMenuData(prev => prev.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat));
    };

    if (loading) return <div style={{color:'white', textAlign:'center', marginTop:'50px'}}>Cargando menú...</div>;

    return (
        <div className={styles.pageContainer}>
            <main className={styles.content}>
                <div className={styles.categoriesContainer}>
                    {menuData.map(category => (
                        <CategoryItem
                            key={category.id}
                            category={category}
                            onUpdate={handleUpdateCategory}
                            onAddClick={handleOpenAddModal}
                        />
                    ))}
                </div>
                <AddOptionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveOption}
                    subCategoryName={selectedSubCatName}
                    categoryId={selectedSubCatId}
                />
            </main>
        </div>
    );
};

export default Backoffice;