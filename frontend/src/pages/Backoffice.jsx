import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryItem from '../components/CategoryItem';
import AddOptionModal from '../components/AddOptionModal'; // Importamos el modal
import styles from '../styles/Backoffice.module.css';

const Backoffice = () => {
    const [loading, setLoading] = useState(true);
    const [menuData, setMenuData] = useState([]);

    // Estado para el Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSubCatId, setSelectedSubCatId] = useState(null);
    const [selectedSubCatName, setSelectedSubCatName] = useState('');

    // Mapeo de IDs de subcategoría -> Endpoint de la API
    const ENDPOINT_MAP = {
        1: 'doughs',      // Masa
        2: 'sauces',      // Salsa
        3: 'cheeses',     // Queso
        4: 'toppings',    // Toppings Pizza
        5: 'meats',       // Carnes
        6: 'breads',      // Panes
        7: 'toppings',    // Toppings Burger (Reusamos endpoint)
        8: 'condiments',  // Aderezos
        9: 'sides',       // Acompañamientos
        10: 'beverages'   // Bebidas
    };

    useEffect(() => {
        fetchData();
    }, []);

    // --- 1. LECTURA DE DATOS (GET) ---
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/catalog/options');
            const data = response.data;

            // Helper para mapear
            const mapOptions = (list) => {
                if (!list) return [];
                return list.map(item => ({
                    id: item.id || item.breadId || item.meatId || item.cheeseId || item.toppingId || item.sideId || item.beverageId || item.doughId || item.sauceId || item.condimentId,
                    name: item.name,
                    // Lógica de precios: Si tiene priceSmall usa ese, sino usa price (para bebidas)
                    price15: item.priceSmall || item.price || 0,
                    price20: item.priceMedium || item.price || 0,
                    price25: item.priceLarge || item.price || 0,
                    isAvailable: item.isAvailable
                }));
            };

            const structuredData = [
                {
                    id: 'pizzas',
                    icon: '🍕',
                    title: 'Pizzas',
                    subcategories: [
                        { id: 1, name: 'Tipos de Masa', customTitles: ['15cm', '20cm', '25cm'], options: mapOptions(data.doughs) },
                        { id: 2, name: 'Tipos de Salsa', customTitles: ['Normal', 'Extra', 'Doble'], options: mapOptions(data.sauces) },
                        { id: 3, name: 'Tipos de Queso', customTitles: ['Base', 'Extra', 'Borde'], options: mapOptions(data.cheeses) },
                        { id: 4, name: 'Toppings', customTitles: ['Chico', 'Mediano', 'Grande'], options: mapOptions(data.toppings) }
                    ]
                },
                {
                    id: 'hamburguesas',
                    icon: '🍔',
                    title: 'Hamburguesas',
                    subcategories: [
                        { id: 5, name: 'Tipos de Carne', customTitles: ['Simple', 'Doble', 'Triple'], options: mapOptions(data.meats) },
                        { id: 6, name: 'Tipos de Pan', customTitles: ['Simple', 'Doble', 'Triple'], options: mapOptions(data.breads) },
                        { id: 7, name: 'Toppings Extra', customTitles: ['Chico', 'Mediano', 'Grande'], options: mapOptions(data.toppings) },
                        { id: 8, name: 'Aderezos', customTitles: ['Simple', 'Doble', 'Triple'], options: mapOptions(data.condiments) }
                    ]
                },
                {
                    id: 'acompanamientos',
                    icon: '🍟',
                    title: 'Acompañamientos',
                    subcategories: [
                        { id: 9, name: 'Opciones', customTitles: ['Precio', 'Precio', 'Precio'], options: mapOptions(data.sides) }
                    ]
                },
                {
                    id: 'bebidas',
                    icon: '🥤',
                    title: 'Bebidas',
                    subcategories: [
                        { id: 10, name: 'Refrescos y Aguas', customTitles: ['Precio', 'Precio', 'Precio'], options: mapOptions(data.beverages) }
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

    // --- 2. MANEJO DEL MODAL ---
    const handleOpenAddModal = (subCategoryId, subCategoryName) => {
        setSelectedSubCatId(subCategoryId);
        setSelectedSubCatName(subCategoryName);
        setIsModalOpen(true);
    };

    // --- 3. GUARDAR EN BD (POST) ---
    const handleSaveOption = async (formData, isSinglePrice) => {
        try {
            const endpoint = ENDPOINT_MAP[selectedSubCatId];
            if (!endpoint) {
                alert("Error: Categoría no mapeada");
                return;
            }

            // Preparar el cuerpo del JSON
            let body = {
                name: formData.name,
                isAvailable: formData.isAvailable
            };

            if (isSinglePrice) {
                // Bebidas y Sides usan "price"
                body.price = parseFloat(formData.price);
            } else {
                // Pizzas y Burgers usan los 3 precios
                body.priceSmall = parseFloat(formData.priceSmall);
                body.priceMedium = parseFloat(formData.priceMedium);
                body.priceLarge = parseFloat(formData.priceLarge);
            }

            const token = localStorage.getItem('token');

            await axios.post(
                `http://localhost:8080/api/products/${endpoint}`,
                body,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Éxito: cerrar modal y recargar datos
            setIsModalOpen(false);
            alert('¡Agregado exitosamente!');
            fetchData(); // Recargamos para ver el nuevo item

        } catch (error) {
            console.error("Error guardando:", error);
            alert("Error al guardar. Revisa la consola.");
        }
    };

    const handleUpdateCategory = (updatedCategory) => {
        // Lógica existente para update visual (si la usas)
        setMenuData(prev => prev.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat));
    };

    if (loading) return <div style={{color:'white', textAlign:'center', marginTop:'50px'}}>Cargando menú...</div>;

    return (
        <div className={styles.pageContainer}>
            <main className={styles.content}>

                {/* Renderizado de Categorías */}
                <div className={styles.categoriesContainer}>
                    {menuData.map(category => (
                        <CategoryItem
                            key={category.id}
                            category={category}
                            onUpdate={handleUpdateCategory}
                            // PASAMOS LA NUEVA FUNCIÓN A CATEGORY ITEM
                            onAddClick={handleOpenAddModal}
                        />
                    ))}
                </div>

                {/* Modal de Agregar */}
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