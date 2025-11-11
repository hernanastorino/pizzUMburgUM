import React from 'react'
import styles from '../styles/Pizza.module.css' // We can keep using these styles

// This component is now 100% reusable
// It will render whatever buttons you pass in its 'item.buttons' prop
function MenuItem({ item, selectedId, setSelectedId }) {
  // We now get 'title', 'description', 'image', and 'buttons' from the item
  const { id, title, description, image, buttons } = item

  // Helper function to create a unique ID for each button
  const getButtonId = (size) => `item-${id}-${size}`

  // Helper function to handle the click
  const handleClick = (size) => {
    const buttonId = getButtonId(size)
    setSelectedId(buttonId)
    console.log(`Pedido confirmado: ${title} - ${size}`)
  }

  return (
    <div className={styles.menuItem}>
      <img src={image} alt={title} />
      <div className={styles.menuItemContent}>
        <div>
          <div className={styles.title}>{title}</div>
          <div className={styles.location}>{description}</div>
        </div>
        <div className={styles.order}>
          {/*
           * This is the main change.
           * We now map over the 'buttons' array passed in the 'item' prop.
           */}
          {buttons.map((btn) => {
            const buttonId = getButtonId(btn.size)
            const isConfirmed = (selectedId === buttonId)

            return (
              <div className={styles.btnWrapper} key={btn.size}>
                <a
                  href="#"
                  // Use the className from the button data
                  className={`${styles[btn.className]} ${isConfirmed ? styles.confirmado : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleClick(btn.size)
                  }}
                >
                  {isConfirmed ? 'Confirmado' : (
                    // Use the text from the button data
                    <span dangerouslySetInnerHTML={{ __html: btn.text }} />
                  )}
                </a>
                {/* Use the price from the button data */}
                <div className={styles.btnBack}>{btn.price}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MenuItem