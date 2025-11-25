import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Menu.module.css'

import pizzaImage from '../assets/images/pizza.jpg'
import burgerImage from '../assets/images/burger.jpg'
import papasImage from '../assets/images/fries.jpg'
import bebidasImage from '../assets/images/beverages.jpg'

function Menu() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <h1 className={styles.menuTitle}>¿Qué te tienta hoy?</h1>
      
      <div className={styles.categoryButtons}>
        <button 
          className={styles.categoryBtn}
          style={{ backgroundImage: `url(${pizzaImage})` }}
          onClick={() => navigate('/masa-pizza')}
        >
          Pizza
        </button>
        
        <button 
          className={styles.categoryBtn}
          style={{ backgroundImage: `url(${burgerImage})` }}
          onClick={() => navigate('/burger-carne')}
        >
          Burger
        </button>
      </div>

      <div className={styles.secondaryButtons}>
        <button 
          className={styles.secondaryBtn}
          style={{ backgroundImage: `url(${papasImage})` }}
          onClick={() => navigate('/acompanamiento')}
        >
          Acompañamiento
        </button>
        
        <button 
          className={styles.secondaryBtn}
          style={{ backgroundImage: `url(${bebidasImage})` }}
          onClick={() => navigate('/bebidas')}
        >
          Bebida
        </button>
      </div>
    </div>
  )
}

export default Menu
