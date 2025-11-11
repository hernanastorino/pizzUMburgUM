import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuItem from '../components/MenuItem' // Reusing the component!
import BackButton from '../components/BackButton'
import styles from '../styles/Pizza.module.css' // Reusing the same styles

// 1. Define button styles for this page
const buttonStyles = {
  simple: 'btnMenu2',
  doble: 'btnMenu1',
  triple: 'btnMenu',
}

// 2. Define menu data for the burgers
const menuData = [
  {
    id: 1,
    title: 'Burger Clásica',
    description: 'Lechuga, tomate y queso',
    image: '/images/burgerClasica.jpg', // (You'll need to add this image)
    buttons: [
      { size: 'simple', text: 'Simple', price: '$10', className: buttonStyles.simple },
      { size: 'doble', text: 'Doble', price: '$14', className: buttonStyles.doble },
    ]
  },
  {
    id: 2,
    title: 'Doble Cheddar',
    description: 'Doble medalla, doble cheddar y bacon',
    image: '/images/burgerDobleCheddar.jpg', // (You'll need to add this image)
    buttons: [
      { size: 'doble', text: 'Doble', price: '$16', className: buttonStyles.doble },
      { size: 'triple', text: 'Triple', price: '$20', className: buttonStyles.triple },
    ]
  },
  {
    id: 3,
    title: 'Veggie',
    description: 'Medallón de garbanzos, lechuga y tomate',
    image: '/images/burgerVeggie.jpg', // (You'll need to add this image)
    buttons: [
      { size: 'simple', text: 'Simple', price: '$12', className: buttonStyles.simple },
    ]
  },
]

function Burger() {
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

export default Burger