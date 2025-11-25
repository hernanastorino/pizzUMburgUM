import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuItem from '../components/MenuItem'
import BackButton from '../components/BackButton'
import '../index.css'

// ✅ Importa las imágenes
import masaNapolitana from '../assets/images/masaNapolitana.jpg'
import masaSinGluten from '../assets/images/masaSinGluten.jpg'
import masaIntegral from '../assets/images/masaIntegral.jpg'

const buttonStyles = {
  chica: 'btnMenu2',
  mediana: 'btnMenu1',
  grande: 'btnMenu',
}

const menuData = [
  {
    id: 1,
    title: 'Napolitana',
    description: 'Tipo de masa',
    image: masaNapolitana,
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
    image: masaSinGluten,
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
    image: masaIntegral,
    buttons: [
      { size: 'chica', text: 'Chica<br><small>20cm</small>', price: '$15', className: buttonStyles.chica },
      { size: 'mediana', text: 'Mediana<br><small>28cm</small>', price: '$15', className: buttonStyles.mediana },
      { size: 'grande', text: 'Grande<br><small>36cm</small>', price: '$15', className: buttonStyles.grande },
    ]
  },
]

function MasaPizza() {
  const [selectedId, setSelectedId] = useState(null)

  return (
    <>
      <BackButton to="/menu" />

      <div style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="restaurantMenu">
          {menuData.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              nextRoute="/salsa-pizza"
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default MasaPizza
