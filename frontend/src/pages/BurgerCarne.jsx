import React, { useState } from 'react'
import MenuItem from '../components/MenuItem'
import BackButton from '../components/BackButton'
import carneVaca from '../assets/images/carneVaca.jpg'
import carnePollo from '../assets/images/carnePollo.jpg'
import carneSalmon from '../assets/images/carneSalmon.jpg'
import carneLentejas from '../assets/images/carneLentejas.jpeg'
import carneSoja from '../assets/images/carneSoja.jpg'
import carneCerdo from '../assets/images/carneCerdo.jpeg'
import '../index.css'


const buttonStyles = {
  chica: 'btnMenu2',
  mediana: 'btnMenu1',
  grande: 'btnMenu',
}

const carneData = [
  {
    id: 1,
    title: 'Carne de Vaca',
    description: 'Tipo de carne',
    image: carneVaca,
    buttons: [
      { size: 'chica', text: 'Simple<br><small>150g</small>', price: '$8', className: buttonStyles.chica },
      { size: 'mediana', text: 'Doble<br><small>300g</small>', price: '$12', className: buttonStyles.mediana },
      { size: 'grande', text: 'Triple<br><small>450g</small>', price: '$16', className: buttonStyles.grande },
    ]
  },
  {
    id: 2,
    title: 'Pollo',
    description: 'Tipo de carne',
    image: carnePollo,
    buttons: [
      { size: 'chica', text: 'Simple<br><small>150g</small>', price: '$7', className: buttonStyles.chica },
      { size: 'mediana', text: 'Doble<br><small>300g</small>', price: '$11', className: buttonStyles.mediana },
      { size: 'grande', text: 'Triple<br><small>450g</small>', price: '$15', className: buttonStyles.grande },
    ]
  },
  {
    id: 3,
    title: 'Cerdo',
    description: 'Tipo de carne',
    image: carneCerdo,
    buttons: [
      { size: 'chica', text: 'Simple<br><small>150g</small>', price: '$7', className: buttonStyles.chica },
      { size: 'mediana', text: 'Doble<br><small>300g</small>', price: '$11', className: buttonStyles.mediana },
      { size: 'grande', text: 'Triple<br><small>450g</small>', price: '$15', className: buttonStyles.grande },
    ]
  },
  {
    id: 4,
    title: 'Salmón',
    description: 'Tipo de carne',
    image: carneSalmon,
    buttons: [
      { size: 'chica', text: 'Simple<br><small>150g</small>', price: '$10', className: buttonStyles.chica },
      { size: 'mediana', text: 'Doble<br><small>300g</small>', price: '$15', className: buttonStyles.mediana },
      { size: 'grande', text: 'Triple<br><small>450g</small>', price: '$20', className: buttonStyles.grande },
    ]
  },
  {
    id: 5,
    title: 'Lentejas',
    description: 'Vegana',
    image: carneLentejas,
    buttons: [
      { size: 'chica', text: 'Simple<br><small>150g</small>', price: '$6', className: buttonStyles.chica },
      { size: 'mediana', text: 'Doble<br><small>300g</small>', price: '$10', className: buttonStyles.mediana },
      { size: 'grande', text: 'Triple<br><small>450g</small>', price: '$14', className: buttonStyles.grande },
    ]
  },
  {
    id: 6,
    title: 'Soja',
    description: 'Vegana',
    image: carneSoja,
    buttons: [
      { size: 'chica', text: 'Simple<br><small>150g</small>', price: '$6', className: buttonStyles.chica },
      { size: 'mediana', text: 'Doble<br><small>300g</small>', price: '$10', className: buttonStyles.mediana },
      { size: 'grande', text: 'Triple<br><small>450g</small>', price: '$14', className: buttonStyles.grande },
    ]
  },
]

function BurgerCarne() {
  const [selectedId, setSelectedId] = useState(null)

  return (
    <>
      <BackButton to="/menu" />

      <div style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto', paddingTop: '20px' }}>
        <div className="restaurantMenu">
          {carneData.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              nextRoute="/burger-pan"
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default BurgerCarne
