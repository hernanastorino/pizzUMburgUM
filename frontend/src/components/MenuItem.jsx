import React from 'react'
import { useNavigate } from 'react-router-dom'

function MenuItem({ item, selectedId, setSelectedId, nextRoute, pedidoActual, baseIdKey, baseNameKey }) {
    const { id, title, description, image, buttons } = item
    const navigate = useNavigate()

    const getButtonId = (size) => `item-${id}-${size}`

    const handleClick = (btn) => {
        const buttonId = getButtonId(btn.size)

        if (nextRoute) {
            // CORRECCIÓN: Lógica simplificada y robusta
            const nuevoPedido = {
                ...pedidoActual, // 1. Mantenemos lo que ya traíamos (ej: isFavoriteMode)

                // 2. Si nos pasaron una clave base (ej: "doughId" o "meatId"), guardamos los datos de este item AHORA.
                // Esto arregla el bug: Antes solo lo hacía si pedidoActual estaba vacío.
                ...(baseIdKey ? {
                    [baseIdKey]: id,
                    [baseNameKey]: title,
                    sizeKey: btn.size,
                    dbSize: btn.dbValue
                } : {})
            }

            // 3. Si es un paso intermedio (Salsa/Queso), solo necesitamos pasar el ID específico si el componente padre lo maneja
            // (En tu caso SalsaPizza/QuesoPizza ya manejan su propia lógica de guardado en 'pedidoActual' antes de llamar a MenuItem,
            // así que esto es seguro para los pasos intermedios también).

            navigate(nextRoute, { state: nuevoPedido })
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
                        return (
                            <div className="btnWrapper" key={btn.size}>
                                <a
                                    href="#"
                                    className={btn.className}
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