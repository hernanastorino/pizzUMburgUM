import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import MenuItem from '../components/MenuItem'
import BackButton from '../components/BackButton'
import panPapa from '../assets/images/panPapa.jpg'
import panIntegral from '../assets/images/panIntegral.jpg'
import panSinGluten from '../assets/images/panSinGluten.jpg'
import '../index.css'


const buttonStyles = {
  chica: 'btnMenu2',
  mediana: 'btnMenu1',
  grande: 'btnMenu',
}

const panData = [
  {
    id: 1,
    title: 'Pan de Papa',
    description: 'Pan clásico',
    image: panPapa,
    buttons: [
      { size: 'normal', text: 'Seleccionar', price: '$0', className: buttonStyles.chica },
    ]
  },
  {
    id: 2,
    title: 'Pan Integral',
    description: 'Pan saludable',
    image: panIntegral,
    buttons: [
      { size: 'normal', text: 'Seleccionar', price: '$1', className: buttonStyles.chica },
    ]
  },
  {
    id: 3,
    title: 'Pan Sin Gluten',
    description: 'Pan celíaco',
    image: panSinGluten,
    buttons: [
      { size: 'normal', text: 'Seleccionar', price: '$2', className: buttonStyles.chica },
    ]
  },
]

function BurgerPan() {
  const [selectedId, setSelectedId] = useState(null)
  const location = useLocation()
  const pedidoAnterior = location.state

  console.log('Pedido anterior:', pedidoAnterior)

  return (
    <>
      <BackButton to="/burger-carne" />

      <div style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto', paddingTop: '20px' }}>
        <div className="restaurantMenu">
          {panData.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              nextRoute="/burger-queso"
              pedidoActual={{
                ...pedidoAnterior,
                pan: item.title
              }}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default BurgerPan
