import React from 'react'
import { useNavigate } from 'react-router-dom'

function MenuItem({ item, selectedId, setSelectedId, nextRoute, pedidoActual }) {
  const { id, title, description, image, buttons } = item
  const navigate = useNavigate()

  const getButtonId = (size) => `item-${id}-${size}`

  const handleClick = (size, buttonText) => {
    const buttonId = getButtonId(size)
    console.log(`Seleccionado: ${title} - ${size}`)

    if (nextRoute) {
      const pedido = pedidoActual || {
        masa: title,
        tamaño: buttonText.replace(/<[^>]*>/g, '').split('\n')[0]
      }
      navigate(nextRoute, { state: pedido })
    } else {
      setSelectedId(buttonId)
    }
  }

  return (
    <div className="menuItem">
      <img src={image} alt={title} />
      <div className="menuItemContent">
        <div>
          <div className="title">{title}</div>
          <div className="location">{description}</div>
        </div>
        <div className="order">
          {buttons.map((btn) => {
            const buttonId = getButtonId(btn.size)
            const isConfirmed = (selectedId === buttonId)

            return (
              <div className="btnWrapper" key={btn.size}>
                <a
                  href="#"
                  className={`${btn.className} ${isConfirmed ? 'confirmado' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleClick(btn.size, btn.text)
                  }}
                >
                  {isConfirmed ? 'Confirmado' : (
                    <span dangerouslySetInnerHTML={{ __html: btn.text }} />
                  )}
                </a>
                <div className="btnBack">{btn.price}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MenuItem
