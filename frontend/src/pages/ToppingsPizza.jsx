import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import NextButton from '../components/NextButton'
import pepperoni from '../assets/images/pepperoni.jpg'
import jamon from '../assets/images/jamon.jpeg'
import champinones from '../assets/images/mushrooms.jpg'
import aceitunas from '../assets/images/aceitunas.jpg'
import pimenton from '../assets/images/pimenton.jpg'
import cebolla from '../assets/images/cebolla.jpg'


import '../index.css'

const toppingsData = [
  {
    id: 1,
    title: 'Pepperoni',
    description: 'Topping clásico',
    image: pepperoni,
    price: '$2',
  },
  {
    id: 2,
    title: 'Jamón',
    description: 'Jamón cocido',
    image: jamon,
    price: '$2',
  },
  {
    id: 3,
    title: 'Champiñones',
    description: 'Hongos frescos',
    image: champinones,
    price: '$2',
  },
  {
    id: 4,
    title: 'Aceitunas',
    description: 'Aceitunas negras',
    image: aceitunas,
    price: '$1',
  },
  {
    id: 5,
    title: 'Pimentón',
    description: 'Pimentón verde/rojo',
    image: pimenton,
    price: '$1',
  },
  {
    id: 6,
    title: 'Cebolla',
    description: 'Cebolla morada',
    image: cebolla,
    price: '$1',
  },
]

function ToppingsPizza() {
  const [selectedToppings, setSelectedToppings] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
  const pedidoAnterior = location.state

  console.log('Pedido anterior:', pedidoAnterior)

  const handleToppingClick = (topping) => {
    setSelectedToppings((prev) => {
      if (prev.find(t => t.id === topping.id)) {
        return prev.filter(t => t.id !== topping.id)
      }
      return [...prev, topping]
    })
  }

  const handleContinuar = () => {
    if (selectedToppings.length === 0) {
      alert('Selecciona al menos un topping')
      return
    }

    const pedidoCompleto = {
      ...pedidoAnterior,
      toppings: selectedToppings.map(t => t.title)
    }

    navigate('/menu', { state: pedidoCompleto })
  }

  const isToppingSelected = (toppingId) => {
    return selectedToppings.find(t => t.id === toppingId)
  }

  return (
    <>
      <BackButton to="/queso-pizza" />

      <NextButton 
        onClick={handleContinuar}
        show={selectedToppings.length > 0}
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
            Toppings seleccionados: {selectedToppings.length}
          </h3>
          {selectedToppings.length > 0 && (
            <p style={{ fontSize: '1.1em' }}>
              {selectedToppings.map(t => t.title).join(', ')}
            </p>
          )}
        </div>

        <div className="restaurantMenu">
          {toppingsData.map((item) => {
            const isSelected = isToppingSelected(item.id)

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
                          handleToppingClick(item)
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

export default ToppingsPizza
