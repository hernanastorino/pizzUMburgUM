import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import MenuItem from '../components/MenuItem'
import BackButton from '../components/BackButton'
import quesoCheddar from '../assets/images/cheedar.jpg'
import quesoMozzarella from '../assets/images/mozarella.jpg'
import quesoAzul from '../assets/images/quesoAzul.jpg'
import quesoSuizo from '../assets/images/quesoSuizo.jpg'

import '../index.css'

const buttonStyles = {
  chica: 'btnMenu2',
  mediana: 'btnMenu1',
  grande: 'btnMenu',
}

const quesoData = [
  {
    id: 1,
    title: 'Cheddar',
    description: 'Queso clásico',
    image: quesoCheddar,
    buttons: [
      { size: 'normal', text: 'Seleccionar', price: '$0', className: buttonStyles.chica },
    
    ]
  },
  {
    id: 2,
    title: 'Mozzarella',
    description: 'Queso suave',
    image: quesoMozzarella,
    buttons: [
      { size: 'normal', text: 'Seleccionar', price: '$0', className: buttonStyles.chica },
    
    ]
  },
  {
    id: 3,
    title: 'Queso Azul',
    description: 'Queso gourmet',
    image: quesoAzul,
    buttons: [
      { size: 'normal', text: 'Seleccionar', price: '$3', className: buttonStyles.chica },
    
    ]
  },
  {
    id: 4,
    title: 'Queso Suizo',
    description: 'Queso especial',
    image: quesoSuizo,
    buttons: [
      { size: 'normal', text: 'Seleccionar', price: '$2', className: buttonStyles.chica },
    
    ]
  },
]

function BurgerQueso() {
  const [selectedId, setSelectedId] = useState(null)
  const location = useLocation()
  const pedidoAnterior = location.state

  console.log('Pedido anterior:', pedidoAnterior)

  return (
    <>
      <BackButton to="/burger-Pan" />

      <div style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto', paddingTop: '20px' }}>
        <div className="restaurantMenu">
          {quesoData.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              nextRoute="/burger-toppings"
              pedidoActual={{
                ...pedidoAnterior,
                queso: item.title
              }}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default BurgerQueso
