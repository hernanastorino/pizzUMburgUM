// src/pages/Backoffice.jsx
import React, { useState } from 'react';
import CategoryItem from '../components/CategoryItem';
import styles from '../styles/Backoffice.module.css';

const Backoffice = () => {
  const [menuData, setMenuData] = useState([
    {
      id: 'pizzas',
      icon: '🍕',
      title: 'Pizzas',
      subcategories: [
        { 
          id: 1, 
          name: 'Tipos de Masa',
          customTitles: ['15cm', '20cm', '25cm'],
          options: [
            { id: 1, name: 'Napolitana', price15: 60, price20: 90, price25: 100 },
            { id: 2, name: 'Integral', price15: 60, price20: 70, price25: 80 },
            { id: 3, name: 'Sin Gluten', price15: 90, price20: 100, price25: 110 }
          ]
        },
        { 
          id: 2, 
          name: 'Tipos de Salsa',
          customTitles: ['15cm', '20cm', '25cm'],
          options: [
            { id: 4, name: 'Tomate', price15: 0, price20: 0, price25: 0 },
            { id: 5, name: 'Pomodoro', price15: 40, price20: 50, price25: 60 }
          ]
        },
        { 
          id: 3, 
          name: 'Tipos de Queso',
          customTitles: ['15cm', '20cm', '25cm'],
          options: [
            { id: 6, name: 'Muzzarella', price15: 0, price20: 0, price25: 0 },
            { id: 7, name: 'Roquefort', price15: 70, price20: 80, price25: 90 },
            { id: 8, name: 'Parmesano', price15: 60, price20: 70, price25: 80 }
          ]
        },
        { 
          id: 4, 
          name: 'Toppings',
          customTitles: ['15cm', '20cm', '25cm'],
          options: [
            { id: 9, name: 'Jamón', price15: 50, price20: 60, price25: 70 },
            { id: 10, name: 'Pepperoni', price15: 60, price20: 70, price25: 80 },
            { id: 11, name: 'Champiñones', price15: 55, price20: 65, price25: 75 },
            { id: 12, name: 'Aceitunas', price15: 50, price20: 60, price25: 70 },
            { id: 13, name: 'Pimientos', price15: 50, price20: 60, price25: 70 }
          ]
        }
      ]
    },
    {
      id: 'hamburguesas',
      icon: '🍔',
      title: 'Hamburguesas',
      subcategories: [
        { 
          id: 5, 
          name: 'Tipos de Carne',
          customTitles: ['1carne', '2carne', '3carne'],
          options: [
            { id: 14, name: 'Carne de Vaca', price15: 180, price20: 210, price25: 240 },
            { id: 15, name: 'Pollo', price15: 160, price20: 190, price25: 220 },
            { id: 16, name: 'Cerdo', price15: 170, price20: 200, price25: 230 },
            { id: 17, name: 'Salmón', price15: 230, price20: 260, price25: 290 }
          ]
        },
        { 
          id: 6, 
          name: 'Tipos de Pan', 
          options: [
            { id: 18, name: 'Pan de Papa', price15: 0, price20: 0, price25: 0 },
            { id: 19, name: 'Pan Integral', price15: 40, price20: 50, price25: 60 },
            { id: 20, name: 'Pan Sin Gluten', price15: 60, price20: 70, price25: 80 }
          ]
        },
        { 
          id: 7, 
          name: 'Toppings', 
          options: [
            { id: 21, name: 'Lechuga', price15: 40, price20: 50, price25: 60 },
            { id: 22, name: 'Tomate', price15: 40, price20: 50, price25: 60 },
            { id: 23, name: 'Queso Cheddar', price15: 60, price20: 70, price25: 80 }
          ]
        },
        { 
          id: 8, 
          name: 'Aderezos', 
          options: [
            { id: 24, name: 'Ketchup', price15: 25, price20: 30, price25: 35 },
            { id: 25, name: 'Mostaza', price15: 25, price20: 30, price25: 35 },
            { id: 26, name: 'Mayonesa', price15: 25, price20: 30, price25: 35 }
          ]
        }
      ]
    },
    {
      id: 'acompanamientos',
      icon: '🍟',
      title: 'Acompañamientos',
      subcategories: [
        { 
          id: 9, 
          name: 'Otros Acompañamientos', 
          options: [
            { id: 27, name: 'Aros de Cebolla', price15: 200, price20: 220, price25: 240 },
            { id: 28, name: 'Ensalada', price15: 140, price20: 160, price25: 180 },
            { id: 29, name: 'Nuggets de Pollo', price15: 220, price20: 240, price25: 260 }
          ]
        }
      ]
    },
    {
      id: 'bebidas',
      icon: '🥤',
      title: 'Bebidas',
      subcategories: [
        { 
          id: 10, 
          name: 'Bebidas', 
          options: [
            { id: 30, name: 'Agua Mineral', price15: 80, price20: 80, price25: 80 },
            { id: 31, name: 'Jugo Natural', price15: 120, price20: 120, price25: 120 },
            { id: 32, name: 'Limonada', price15: 110, price20: 110, price25: 110 }
          ]
        }
      ]
    }
  ]);

  const handleUpdateCategory = (updatedCategory) => {
    setMenuData(prev =>
      prev.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat)
    );
  };

  return (
    <div className={styles.pageContainer}>
      <main className={styles.content}>
        <div className={styles.categoriesContainer}>
          {menuData.map(category => (
            <CategoryItem
              key={category.id}
              category={category}
              onUpdate={handleUpdateCategory}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Backoffice;