import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton'
import styles from '../styles/Register.module.css' // We will create this

function Register() {
  // 1. Use a single state object for all fields
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    birthDate: '',
    document: '',
    address: '',
    cardNumber: '',
  })

  // 2. A single handler function to update the state object
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // 3. Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault() // Stop page reload
    console.log('Registering with:', formData)
    // Here you would send the formData to your server
  }

  return (
    <>
      <BackButton to="/" />

      <div className={styles.container}>
        <div className={styles.loginBox}>
          {/* 4. Use the onSubmit handler */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <span className={styles.header}>Registrate</span>
            <p className={styles.subtitle}>¡Dale, registrate y probá lo bueno de verdad! 🍔🍕</p>

            {/* 5. Connect all inputs to state using the 'name' attribute.
              The 'name' MUST match the key in the 'formData' object.
            */}
            <input
              type="text" name="name" placeholder="Nombre"
              className={styles.input} required
              value={formData.name} onChange={handleChange}
            />
            <input
              type="text" name="lastname" placeholder="Apellido"
              className={styles.input} required
              value={formData.lastname} onChange={handleChange}
            />
            <input
              type="email" name="email" placeholder="Email"
              className={styles.input} required
              value={formData.email} onChange={handleChange}
            />
            <div className={styles.passwordContainer}>
              <input
                type="password" name="password" placeholder="Contraseña"
                className={styles.input} required
                value={formData.password} onChange={handleChange}
              />
            </div>
            <input
              type="date" name="birthDate" placeholder="Fecha de Nacimiento"
              className={styles.input} required
              value={formData.birthDate} onChange={handleChange}
            />
            <input
              type="text" name="document" placeholder="Documento"
              className={styles.input} required
              value={formData.document} onChange={handleChange}
            />
            <input
              type="text" name="address" placeholder="Direccion"
              className={styles.input} required
              value={formData.address} onChange={handleChange}
            />
            <input
              type="text" name="cardNumber" placeholder="Numero de Tarjeta"
              className={styles.input} required
              value={formData.cardNumber} onChange={handleChange}
            />

            <button type="submit" className={`${styles.button} ${styles.signIn}`}>
              Registrarse
            </button>

            <p className={styles.footer}>
              ¿Ya tenés cuenta?
              <Link to="/sesion" className={styles.link}>
                Iniciar Sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register