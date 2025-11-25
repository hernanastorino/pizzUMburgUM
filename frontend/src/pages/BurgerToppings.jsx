import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import NextButton from '../components/NextButton'
import '../index.css'
import salsaKetchup from '../assets/images/ketchup.jpg'
import salsaMostaza from '../assets/images/mostaza.jpeg'
import salsaMayonesa from '../assets/images/mayonesa.jpg'
import salsaBBQ from '../assets/images/bbq.jpg'
import lechuga from '../assets/images/lechuga.jpg'
import tomate from '../assets/images/tomate.jpeg'
import pepinillos from '../assets/images/pepinillo.jpg'
import bacon from '../assets/images/bacon.png'
import huevo from '../assets/images/huevoFrito.jpeg'
import cebolla from '../assets/images/cebolla.jpg'


const salsaData = [
  {
    id: 1,
    title: 'Ketchup',
    description: 'Salsa clásica',
    image: salsaKetchup,
    price: '$0',
  },
  {
    id: 2,
    title: 'Mostaza',
    description: 'Salsa picante',
    image: salsaMostaza,
    price: '$0',
  },
  {
    id: 3,
    title: 'Mayonesa',
    description: 'Salsa cremosa',
    image: salsaMayonesa,
    price: '$0',
  },
  {
    id: 4,
    title: 'Salsa BBQ',
    description: 'Salsa ahumada',
    image: salsaBBQ,
    price: '$2',
  },
]

const toppingsData = [
  { id: 5, title: 'Lechuga', description: 'Fresca', image: lechuga, price: '$1' },
  { id: 6, title: 'Tomate', description: 'Rodajas', image: tomate, price: '$1' },
  { id: 7, title: 'Cebolla', description: 'Caramelizada', image: cebolla, price: '$1' },
  { id: 8, title: 'Pepinillos', description: 'Encurtidos', image: pepinillos, price: '$1' },
  { id: 9, title: 'Bacon', description: 'Crocante', image: bacon, price: '$3' },
  { id: 10, title: 'Huevo Frito', description: 'Agregado', image: huevo, price: '$2' },
]

function BurgerToppings() {
  const [selectedSalsas, setSelectedSalsas] = useState([])
  const [selectedToppings, setSelectedToppings] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
  const pedidoAnterior = location.state

  console.log('Pedido anterior:', pedidoAnterior)

  const handleSalsaClick = (salsa) => {
    setSelectedSalsas((prev) => {
      if (prev.find(s => s.id === salsa.id)) {
        return prev.filter(s => s.id !== salsa.id)
      }
      return [...prev, salsa]
    })
  }

  const handleToppingClick = (topping) => {
    setSelectedToppings((prev) => {
      if (prev.find(t => t.id === topping.id)) {
        return prev.filter(t => t.id !== topping.id)
      }
      return [...prev, topping]
    })
  }

  const handleContinuar = () => {
    if (selectedSalsas.length === 0 && selectedToppings.length === 0) {
      alert('Selecciona al menos una salsa o un topping')
      return
    }

    const pedidoCompleto = {
      ...pedidoAnterior,
      salsas: selectedSalsas.map(s => s.title),
      toppings: selectedToppings.map(t => t.title)
    }

    navigate('/menu', { state: pedidoCompleto })
  }

  const isSalsaSelected = (salsaId) => {
    return selectedSalsas.find(s => s.id === salsaId)
  }

  const isToppingSelected = (toppingId) => {
    return selectedToppings.find(t => t.id === toppingId)
  }

  return (
    <>
      <BackButton to="/burger-queso" />
      
      <NextButton 
        onClick={handleContinuar}
        show={selectedSalsas.length > 0 || selectedToppings.length > 0}
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
            Salsas seleccionadas: {selectedSalsas.length} | Toppings seleccionados: {selectedToppings.length}
          </h3>
          {selectedSalsas.length > 0 && (
            <p style={{ fontSize: '1.1em' }}>
              <strong>Salsas:</strong> {selectedSalsas.map(s => s.title).join(', ')}
            </p>
          )}
          {selectedToppings.length > 0 && (
            <p style={{ fontSize: '1.1em' }}>
              <strong>Toppings:</strong> {selectedToppings.map(t => t.title).join(', ')}
            </p>
          )}
        </div>

        <div className="restaurantMenu">
          {salsaData.map((item) => {
            const isSelected = isSalsaSelected(item.id)

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
                          handleSalsaClick(item)
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

export default BurgerToppings
