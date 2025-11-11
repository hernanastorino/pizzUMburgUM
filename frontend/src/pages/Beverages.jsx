import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuItem from '../components/MenuItem'
import BackButton from '../components/BackButton'
import styles from '../styles/Pizza.module.css'

// 1. Define button styles
const buttonStyles = {
  ml500: 'btnMenu2',
  l1_5: 'btnMenu1',
}

// 2. Define menu data
const menuData = [
  {
    id: 1,
    title: 'Coca-Cola',
    description: 'Sabor Original',
    image: '/images/cocaCola.jpg',
    buttons: [
      { size: 'ml500', text: '500ml', price: '$4', className: buttonStyles.ml500 },
      { size: 'l1_5', text: '1.5L', price: '$7', className: buttonStyles.l1_5 },
    ]
  },
  {
    id: 2,
    title: 'Agua Mineral',
    description: 'Sin gas',
    image: '/images/agua.jpg',
    buttons: [
      { size: 'ml500', text: '500ml', price: '$3', className: buttonStyles.ml500 },
    ]
  },
]

function Beverages() { // <-- Changed from Bebidas
  // 3. This page manages its own state
  const [selectedId, setSelectedId] = useState(null)

  return (
    <>
      <BackButton to="/menu" />

      {/* Nav Menu */}
      <div className="menu">
        <nav>
          {/* ... (Same nav as above) ... */}
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

export default Beverages // <-- CORRECTED EXPORT