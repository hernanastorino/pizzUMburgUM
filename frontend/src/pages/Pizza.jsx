import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuItem from '../components/MenuItem'
import BackButton from '../components/BackButton'
import styles from '../styles/Pizza.module.css'

// 1. Define the button styles
const buttonStyles = {
  chica: 'btnMenu2',
  mediana: 'btnMenu1',
  grande: 'btnMenu',
}

// 2. Update menuData to include the 'buttons' array
const menuData = [
  {
    id: 1,
    title: 'Napolitana',
    description: 'Tipo de masa',
    image: '/images/masaNapolitana.jpg',
    buttons: [
      { size: 'chica', text: 'Chica<br><small>20cm</small>', price: '$15', className: buttonStyles.chica },
      { size: 'mediana', text: 'Mediana<br><small>28cm</small>', price: '$15', className: buttonStyles.mediana },
      { size: 'grande', text: 'Grande<br><small>36cm</small>', price: '$15', className: buttonStyles.grande },
    ]
  },
  {
    id: 2,
    title: 'Sin gluten',
    description: 'Tipo de masa',
    image: '/images/masaSinGluten.jpg',
    buttons: [
      { size: 'chica', text: 'Chica<br><small>20cm</small>', price: '$15', className: buttonStyles.chica },
      { size: 'mediana', text: 'Mediana<br><small>28cm</small>', price: '$15', className: buttonStyles.mediana },
      { size: 'grande', text: 'Grande<br><small>36cm</small>', price: '$15', className: buttonStyles.grande },
    ]
  },
  {
    id: 3,
    title: 'Integral',
    description: 'Tipo de masa',
    image: '/images/masaIntegral.jpg',
    buttons: [
      { size: 'chica', text: 'Chica<br><small>20cm</small>', price: '$15', className: buttonStyles.chica },
      { size: 'mediana', text: 'Mediana<br><small>28cm</small>', price: '$15', className: buttonStyles.mediana },
      { size: 'grande', text: 'Grande<br><small>36cm</small>', price: '$15', className: buttonStyles.grande },
    ]
  },
]

function Pizza() { // <-- Changed from PizzaDough
  const [selectedId, setSelectedId] = useState(null)

  return (
    <>
      <BackButton to="/menu" />

      {/* Nav Menu */}
      <div className="menu"> {/* Using global 'menu' class */}
        <nav>
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="checkbtn">☰</label> {/* Global 'checkbtn' class */}
          <label className="logo">PizzUM & BurgUM</label> {/* Global 'logo' class */}
          <ul>
            <li><Link to="/" className="active">Inicio</Link></li>
            <li><a href="#about">About</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#reviews">Favoritos</a></li>
          </ul>
        </nav>
      </div>

      {/* Restaurant Menu */}
      <div className={styles.restaurantMenu}>
        {menuData.map((item) => (
          <MenuItem
            key={item.id}
            item={item} // Pass the entire item object (which now includes buttons)
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        ))}
      </div>
    </>
  )
}

export default Pizza // <-- CORRECTED EXPORT