import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../styles/BackButton.module.css'

function BackButton({ to }) {
  const destination = to || '/'

  return (
    <Link to={destination} className={styles.backButton}>
      ← Volver
    </Link>
  )
}

export default BackButton