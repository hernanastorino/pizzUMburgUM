// src/pages/Acompaniamiento.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import NextButton from '../components/NextButton'
// Usando imágenes placeholder - reemplaza con tus propias imágenes
import papasImage from '../assets/images/fries.jpg'
import burgerImage from '../assets/images/burger.jpg'
import pizzaImage from '../assets/images/pizza.jpg'

import '../index.css'

const acompanamientosData = [
  {
    id: 1,
    title: 'Papas Fritas Clásicas',
    description: 'Porción grande crujientes',
    image: papasImage,
    price: '$5',
  },
  {
    id: 2,
    title: 'Papas en Gajo',
    description: 'Con especias y romero',
    image: papasImage,
    price: '$6',
  },
  {
    id: 3,
    title: 'Aros de Cebolla',
    description: 'Crujientes empanados',
    image: papasImage,
    price: '$5',
  },
  {
    id: 4,
    title: 'Nuggets de Pollo',
    description: '8 unidades',
    image: burgerImage,
    price: '$7',
  },
  {
    id: 5,
    title: 'Ensalada César',
    description: 'Fresca y saludable',
    image: pizzaImage,
    price: '$6',
  },
  {
    id: 6,
    title: 'Papas con Cheddar y Bacon',
    description: 'Deluxe con salsa',
    image: papasImage,
    price: '$8',
  },
]

function Acompaniamiento() {
  const [selectedItems, setSelectedItems] = useState([])
  const navigate = useNavigate()

  const handleItemClick = (item) => {
    setSelectedItems((prev) => {
      if (prev.find(i => i.id === item.id)) {
        return prev.filter(i => i.id !== item.id)
      }
      return [...prev, item]
    })
  }

  const handleContinuar = () => {
    if (selectedItems.length === 0) {
      alert('Selecciona al menos un acompañamiento')
      return
    }

    const pedido = {
      tipo: 'acompañamiento',
      items: selectedItems.map(i => ({
        nombre: i.title,
        precio: i.price
      }))
    }

    console.log('Pedido acompañamiento:', pedido)
    navigate('/menu', { state: pedido })
  }

  const isItemSelected = (itemId) => {
    return selectedItems.find(i => i.id === itemId)
  }

  return (
    <>
      <BackButton to="/menu" />

      <NextButton 
        onClick={handleContinuar}
        show={selectedItems.length > 0}
      />

      <div style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto', paddingTop: '20px' }}>
        <div style={{
          background: 'rgba(142, 45, 226, 0.3)',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '30px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ marginBottom: '10px' }}>
            Acompañamientos seleccionados: {selectedItems.length}
          </h3>
          {selectedItems.length > 0 && (
            <p style={{ fontSize: '1.1em' }}>
              {selectedItems.map(i => i.title).join(', ')}
            </p>
          )}
        </div>

        <div className="restaurantMenu">
          {acompanamientosData.map((item) => {
            const isSelected = isItemSelected(item.id)

            return (
              <div className="menuItem" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="menuItemContent">
                  <div>
                    <div className="title">{item.title}</div>
                    <div className="location">{item.description}</div>
                  </div>
                  <div className="order">
                    <div className="btnWrapper">
                      <a
                        href="#"
                        className={`btnMenu ${isSelected ? 'confirmado' : ''}`}
                        onClick={(e) => {
                          e.preventDefault()
                          handleItemClick(item)
                        }}
                      >
                        {isSelected ? 'Seleccionado' : 'Seleccionar'}
                      </a>
                      <div className="btnBack">{item.price}</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Acompaniamiento