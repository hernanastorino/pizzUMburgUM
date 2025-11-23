// src/pages/Favoritos.jsx
import React, { useState } from 'react';
import FavoritoItem from '../components/FavoritoItem';
import styles from '../styles/Backoffice.module.css';

const Favoritos = () => {
  // Datos de ejemplo - estos vendrían del backend o localStorage
  const [favoritos, setFavoritos] = useState([
    {
      id: 1,
      nombre: 'Creacion 1',
      tipo: 'pizza', // 'pizza' o 'hamburguesa'
      icon: '🍕',
      detalles: {
        tamaño: '25cm',
        masa: 'Napolitana',
        salsa: 'Tomate',
        queso: 'Muzzarella',
        toppings: ['Jamón', 'Champiñones', 'Aceitunas'],
        precioTotal: 380
      }
    },
    {
      id: 2,
      nombre: 'Creacion 2',
      tipo: 'hamburguesa',
      icon: '🍔',
      detalles: {
        tamaño: '2 carnes',
        carne: 'Carne de Vaca',
        pan: 'Pan Integral',
        toppings: ['Lechuga', 'Tomate', 'Queso Cheddar'],
        aderezos: ['Ketchup', 'Mayonesa'],
        precioTotal: 450
      }
    },
    {
      id: 3,
      nombre: 'Creacion 4',
      tipo: 'pizza',
      icon: '🍕',
      detalles: {
        tamaño: '20cm',
        masa: 'Integral',
        salsa: 'Pomodoro',
        queso: 'Muzzarella',
        toppings: ['Champiñones', 'Pimientos', 'Aceitunas'],
        precioTotal: 295
      }
    }
  ]);

  const handleUpdateFavorito = (updatedFavorito) => {
    setFavoritos(prev =>
      prev.map(fav => fav.id === updatedFavorito.id ? updatedFavorito : fav)
    );
  };

  const handleDeleteFavorito = (favoritoId) => {
    setFavoritos(prev => prev.filter(fav => fav.id !== favoritoId));
  };

  return (
    <div className={styles.pageContainer}>
      <main className={styles.content}>
        <div className={styles.categoriesContainer}>
          {favoritos.length === 0 ? (
            <div style={{
              textAlign: 'center',
              color: 'white',
              fontSize: '20px',
              marginTop: '50px'
            }}>
              <p>No tienes favoritos guardados aún</p>
              <p style={{ fontSize: '16px', marginTop: '10px', opacity: 0.7 }}>
                Crea tu primera pizza o hamburguesa personalizada y guárdala como favorito
              </p>
            </div>
          ) : (
            favoritos.map(favorito => (
              <FavoritoItem
                key={favorito.id}
                favorito={favorito}
                onUpdate={handleUpdateFavorito}
                onDelete={handleDeleteFavorito}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Favoritos;