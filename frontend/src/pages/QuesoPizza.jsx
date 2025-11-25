import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import MenuItem from '../components/MenuItem'
import BackButton from '../components/BackButton'
import quesoMozzarella from '../assets/images/mozarella.jpg'
import quesoCheddar from '../assets/images/cheedar.jpg'
import quesoAzul from '../assets/images/roquefort.jpg'
import quesoProvolone from '../assets/images/provolone.jpg'

import '../index.css'


const buttonStyles = {
  chica: 'btnMenu2',
  mediana: 'btnMenu1',
  grande: 'btnMenu',
}

const quesoData = [
  {
    id: 1,
    title: 'Mozzarella',
    description: 'Queso clásico',
    image: quesoMozzarella,
    buttons: [
      { size: 'normal', text: 'Seleccionar', price: '$0', className: buttonStyles.chica },
    ]
  },
  {
    id: 2,
    title: 'Cheddar',
    description: 'Queso intenso',
    image: quesoCheddar,
    buttons: [
      { size: 'normal', text: 'Seleccionar', price: '$2', className: buttonStyles.chica },
    ]
  },
  {
    id: 3,
    title: 'Roquefort',
    description: 'Queso gourmet',
    image: quesoAzul,
    buttons: [
      { size: 'normal', text: 'Seleccionar', price: '$3', className: buttonStyles.chica },
    ]
  },
  {
    id: 4,
    title: 'Provolone',
    description: 'Queso ahumado',
    image: quesoProvolone,
    buttons: [
      { size: 'normal', text: 'Seleccionar', price: '$2', className: buttonStyles.chica },
    ]
  },
]

function QuesoPizza() {
  const [selectedId, setSelectedId] = useState(null)
  const location = useLocation()
  const pedidoAnterior = location.state

  console.log('Pedido anterior:', pedidoAnterior)

  return (
    <>
      <BackButton to="/salsa-pizza" />

      <div style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto', paddingTop: '20px' }}>
        <div className="restaurantMenu">
          {quesoData.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              nextRoute="/toppings-pizza"
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

export default QuesoPizza
