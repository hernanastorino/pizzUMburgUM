import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuItem from '../components/MenuItem'
import BackButton from '../components/BackButton'
import styles from '../styles/Pizza.module.css'

const buttonStyles = {
  ml500: 'btnMenu2',
  l1_5: 'btnMenu1',
}

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

function Beverages() {
  const [selectedId, setSelectedId] = useState(null)

  return (
    <>
      <BackButton to="/menu" />

      <div className="menu">
        <nav>
           <input type="checkbox" id="check" />
          <label htmlFor="check" className="checkbtn">☰</label>
          <label className="logo">PizzUM & BurgUM</label>
          <ul>
            <li><Link to="/" className="active">Inicio</Link></li>
          </ul>
        </nav>
      </div>

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

export default Beverages