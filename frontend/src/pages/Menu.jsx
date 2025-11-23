import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Menu.module.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Menu() {
  const navigate = useNavigate()

  // ✅ Referencia directa a public/images/
  const pizzaImage = '/images/pizzaMenu3.jpg'
  const burgerImage = '/images/burgerMenu.jpg'
  const papasImage = '/images/papasMenu3.jpg'
  const bebidasImage = '/images/bebidasMenu2.jpg'

  return (
    <>
      <Navbar />
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
            onClick={() => navigate('/tipo-carne')}
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
      <Footer />
    </>
  )
}

export default Menu