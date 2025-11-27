import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FavoritoItem from '../components/FavoritoItem';
import styles from '../styles/Backoffice.module.css'; // Reusamos estilos de contenedor

const Favoritos = () => {
    const [favoritos, setFavoritos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFavoritos();
    }, []);

    const fetchFavoritos = async () => {
        try {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');

            if (!token || !email) { setLoading(false); return; }

            // 1. Obtener ID Usuario
            const userRes = await axios.get(`http://localhost:8080/api/users/${encodeURIComponent(email)}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userId = userRes.data.userId || userRes.data.id;

            // 2. Obtener Favoritos
            const favRes = await axios.get(`http://localhost:8080/users/${userId}/favorites`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // 3. Mapear datos
            const mapped = favRes.data.map(fav => ({
                id: fav.id, // ID del favorito
                creationId: fav.creationId, // ID del producto real
                nombre: fav.nombre,
                tipo: fav.tipo, // 'pizza' o 'hamburguesa'
                icon: fav.tipo === 'pizza' ? '🍕' : '🍔',
                detalles: {
                    ...fav.detalles,
                    precioTotal: fav.precioTotal
                }
            }));

            setFavoritos(mapped);
            setLoading(false);

        } catch (error) {
            console.error("Error cargando favoritos:", error);
            setLoading(false);
        }
    };

    // --- ACCIONES ---

    const handleCreateNew = () => {
        // AQUÍ INICIA EL MODO FAVORITO
        navigate('/menu', { state: { isFavoriteMode: true } });
    };

    const handleAddToCart = async (favorito) => {
        try {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');

            if (!token || !email) {
                alert("Por favor inicia sesión.");
                return;
            }

            // 1. Obtener ID Usuario
            const userRes = await axios.get(`http://localhost:8080/api/users/${encodeURIComponent(email)}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userId = userRes.data.userId || userRes.data.id;

            // 2. Obtener Orden Activa
            const orderRes = await axios.post(
                `http://localhost:8080/orders/start/user/${userId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const orderId = orderRes.data.id;

            console.log("Agregando favorito:", favorito.nombre, "ID Creación:", favorito.creationId);

            // 3. Agregar Item
            await axios.post(
                `http://localhost:8080/orders/${orderId}/items/creations`,
                {
                    productId: favorito.creationId, // Asegúrate que esto no sea null
                    quantity: 1
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert(`¡${favorito.nombre} agregada al carrito! 🛒`);

        } catch (error) {
            console.error("Error agregando al carrito:", error);
            // Mostrar mensaje específico si el backend nos dice qué pasó
            const mensaje = error.response?.data?.message || error.response?.data || "Error desconocido";
            alert(`No se pudo agregar: ${mensaje}`);
        }
    };

    const handleDeleteFavorito = async (favoritoId) => {
        try {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');
            const userRes = await axios.get(`http://localhost:8080/api/users/${encodeURIComponent(email)}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userId = userRes.data.userId || userRes.data.id;

            // Buscamos el objeto local para sacar el creationId necesario para el endpoint actual
            const favToDelete = favoritos.find(f => f.id === favoritoId);
            if(!favToDelete) return;

            await axios.delete(`http://localhost:8080/users/${userId}/favorites/${favToDelete.creationId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setFavoritos(prev => prev.filter(fav => fav.id !== favoritoId));

        } catch (error) {
            console.error("Error borrando favorito:", error);
        }
    };

    const handleUpdateFavorito = async (updatedFav) => {
        // Simulación de actualización en frontend
        setFavoritos(prev => prev.map(f => f.id === updatedFav.id ? updatedFav : f));
        alert("Edición guardada (Nota: Para cambios profundos de ingredientes, crea un nuevo favorito)");
    };

    if (loading) return <div style={{color:'white', padding:'50px', textAlign:'center'}}>Cargando favoritos...</div>;

    return (
        <div className={styles.pageContainer}>
            <main className={styles.content}>

                {/* BOTÓN CREAR NUEVO */}
                <div style={{display:'flex', justifyContent:'center', marginBottom:'20px'}}>
                    <button
                        onClick={handleCreateNew}
                        style={{
                            background: '#4CAF50', color: 'white', padding: '10px 20px',
                            border:'none', borderRadius:'8px', fontSize:'16px', cursor:'pointer',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.3)', fontWeight: 'bold'
                        }}
                    >
                        + Crear Nueva Favorita
                    </button>
                </div>

                <div className={styles.categoriesContainer}>
                    {favoritos.length === 0 ? (
                        <div style={{ textAlign: 'center', color: 'white', marginTop: '50px' }}>
                            <p style={{fontSize:'20px'}}>No tienes favoritos guardados aún</p>
                            <p style={{opacity:0.7}}>Haz clic arriba para crear tu primera obra maestra.</p>
                        </div>
                    ) : (
                        favoritos.map(favorito => (
                            <FavoritoItem
                                key={favorito.id}
                                favorito={favorito}
                                onUpdate={handleUpdateFavorito}
                                onDelete={handleDeleteFavorito}
                                onAddToCart={() => handleAddToCart(favorito)}
                            />
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default Favoritos;