import React from 'react'
import { useNavigate } from 'react-router-dom'

function MenuItem({ item, selectedId, setSelectedId, nextRoute, pedidoActual, baseIdKey, baseNameKey }) {
    const { id, title, description, image, buttons } = item
    const navigate = useNavigate()

    const getButtonId = (size) => `item-${id}-${size}`

    const handleClick = (btn) => {
        const buttonId = getButtonId(btn.size)

        if (nextRoute) {
            const nuevoPedido = {
                ...pedidoActual,
                ...(baseIdKey ? {
                    [baseIdKey]: id,
                    [baseNameKey]: title,
                    sizeKey: btn.size,
                    dbSize: btn.dbValue
                } : {})
            }

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