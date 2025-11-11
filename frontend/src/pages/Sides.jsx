import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuItem from '../components/MenuItem'
import BackButton from '../components/BackButton'
import styles from '../styles/Pizza.module.css' 

// 1. Define button styles for this page
const buttonStyles = {
  regular: 'btnMenu2',
  grande: 'btnMenu1',
}

// 2. Define menu data for this page
const menuData = [
  {
    id: 1,
    title: 'Papas Fritas',
    description: 'Con cheddar y bacon',
    image: '/images/papasConCheddar.jpg',
    buttons: [
      { size: 'regular', text: 'Regular', price: '$8', className: buttonStyles.regular },
      { size: 'grande', text: 'Grande', price: '$12', className: buttonStyles.grande },
    ]
  },
  {
    id: 2,
    title: 'Nuggets',
    description: 'De pollo, con salsa barbacoa',
    image: '/images/nuggets.jpg',
    buttons: [
      { size: 'regular', text: 'x8 Piezas', price: '$7', className: buttonStyles.regular },
      { size: 'grande', text: 'x12 Piezas', price: '$10', className: buttonStyles.grande },
    ]
  },
]

function Sides() { // <-- Changed from Acompanamiento
  // 3. This page manages its own independent state
  const [selectedId, setSelectedId] = useState(null)

  return (
    <>
      <BackButton to="/menu" />

      {/* Nav Menu */}
      <div className="menu">
        <nav>
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="checkbtn">☰</label>
          <label className="logo">PizzUM & BurgUM</label>
          <ul>
            <li><Link to="/" className="active">Inicio</Link></li>
            {/* ... other nav links ... */}
          </ul>
        </nav>
      </div>

      {/* 4. Render the menu items */}
      <div className={styles.restaurantMenu}>
        {menuData.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        ))}
      </div>
    </>
  )
}

export default Sides // <-- CORRECTED EXPORT