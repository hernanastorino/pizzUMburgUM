import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import MenuItem from '../components/MenuItem'
import BackButton from '../components/BackButton'
import salsaTomate from '../assets/images/salsaTomate.jpg'
import salsaPomadoro from '../assets/images/salsaPomadoro.jpg'
import '../index.css'


const buttonStyles = {
  chica: 'btnMenu2',
  mediana: 'btnMenu1',
  grande: 'btnMenu',
}

const salsaData = [
  {
    id: 1,
    title: 'Salsa de Tomate',
    description: 'Salsa clásica',
    image: salsaTomate,
    buttons: [
      { size: 'normal', text: 'Seleccionar', price: '$50', className: buttonStyles.grande },
    ]
  },
  {
    id: 2,
    title: 'Salsa Pomodoro',
    description: 'Salsa clásica e italiana',
    image: salsaPomadoro,
    buttons: [
      { size: 'normal', text: 'Seleccionar', price: '$80', className: buttonStyles.grande },
    ]
  },
]

function SalsaPizza() {
  const [selectedId, setSelectedId] = useState(null)
  const location = useLocation()
  const pedidoAnterior = location.state

  console.log('Pedido anterior:', pedidoAnterior)

  return (
    <>
      <BackButton to="/masa-pizza" />

      <div style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto', paddingTop: '20px' }}>
        <div className="restaurantMenu">
          {salsaData.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              nextRoute="/queso-pizza"
              pedidoActual={{
                ...pedidoAnterior,
                salsa: item.title
              }}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default SalsaPizza
