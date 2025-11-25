// src/pages/Bebidas.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import NextButton from '../components/NextButton'
// Usando imágenes placeholder
import bebidasImage from '../assets/images/beverages.jpg'
import pizzaImage from '../assets/images/pizza.jpg'

import '../index.css'

const bebidasData = [
  {
    id: 1,
    title: 'Coca Cola',
    description: '500ml',
    image: bebidasImage,
    price: '$3',
  },
  {
    id: 2,
    title: 'Sprite',
    description: '500ml',
    image: bebidasImage,
    price: '$3',
  },
  {
    id: 3,
    title: 'Fanta',
    description: '500ml',
    image: bebidasImage,
    price: '$3',
  },
  {
    id: 4,
    title: 'Agua Mineral',
    description: '500ml',
    image: bebidasImage,
    price: '$2',
  },
  {
    id: 5,
    title: 'Jugo de Naranja',
    description: 'Natural 300ml',
    image: bebidasImage,
    price: '$4',
  },
  {
    id: 6,
    title: 'Limonada',
    description: 'Natural 300ml',
    image: pizzaImage,
    price: '$4',
  },
]

function Bebidas() {
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
      alert('Selecciona al menos una bebida')
      return
    }

    const pedido = {
      tipo: 'bebida',
      items: selectedItems.map(i => ({
        nombre: i.title,
        precio: i.price
      }))
    }

    console.log('Pedido bebidas:', pedido)
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
            Bebidas seleccionadas: {selectedItems.length}
          </h3>
          {selectedItems.length > 0 && (
            <p style={{ fontSize: '1.1em' }}>
              {selectedItems.map(i => i.title).join(', ')}
            </p>
          )}
        </div>

        <div className="restaurantMenu">
          {bebidasData.map((item) => {
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

export default Bebidas