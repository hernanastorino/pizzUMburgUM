import React from 'react'
import { Link } from 'react-router-dom'

// We can create a simple CSS module for this
import styles from '../styles/BackButton.module.css'

// The 'to' prop will specify the destination (e.g., '/', '/menu')
function BackButton({ to }) {
  // If no 'to' prop is passed, default to the home page '/'
  const destination = to || '/'

  return (
    <Link to={destination} className={styles.backButton}>
      ← Volver
    </Link>
  )
}

export default BackButton