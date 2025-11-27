import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuItem from '../components/MenuItem'
import BackButton from '../components/BackButton'
import styles from '../styles/Pizza.module.css' 

const buttonStyles = {
  regular: 'btnMenu2',
  grande: 'btnMenu1',
}

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

function Sides() {
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

export default Sides