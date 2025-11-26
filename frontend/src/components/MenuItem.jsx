import React from 'react'
import { useNavigate } from 'react-router-dom'

function MenuItem({ item, selectedId, setSelectedId, nextRoute, pedidoActual }) {
    const { id, title, description, image, buttons } = item
    const navigate = useNavigate()

    const getButtonId = (size) => `item-${id}-${size}`

    const handleClick = (btn) => {
        const buttonId = getButtonId(btn.size)

        // Si hay nextRoute, es navegación (Masa, Salsa, Queso)
        if (nextRoute) {
            // Construimos el objeto de estado acumulativo
            const nuevoPedido = {
                ...pedidoActual,
                // Si estamos en Masa (primer paso), guardamos datos base
                ...(pedidoActual ? {} : {
                    doughId: id,
                    doughName: title,
                    sizeKey: btn.size, // "Small", "Medium"
                    dbSize: btn.dbValue // "15cm", "20cm"
                })
            }
            navigate(nextRoute, { state: nuevoPedido })
        } else {
            // Selección simple (si se usara en otro contexto)
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
                        // Lógica visual básica
                        const isConfirmed = false;

                        return (
                            <div className="btnWrapper" key={btn.size}>
                                <a
                                    href="#"
                                    className={`${btn.className} ${isConfirmed ? 'confirmado' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleClick(btn)
                                    }}
                                >
                                    <span dangerouslySetInnerHTML={{ __html: btn.text }} />
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