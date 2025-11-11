import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' // 1. Import useNavigate
import axios from 'axios' // 2. Import axios
import BackButton from '../components/BackButton'
import styles from '../styles/Login.module.css'

function Login() {
  // States for form fields, error, and navigation
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null); // 3. Add error state
  const navigate = useNavigate(); // 4. Add navigate hook

  // 5. This is the new, functional handleSubmit
  const handleSubmit = async (event) => {
    event.preventDefault() // Stops the page from reloading
    setError(null);

    try {
        // Call your Spring Boot API
        const response = await axios.post('http://localhost:8080/api/auth/login', {
            email: email,       
            password: password  
        });
        
        // Save the token
        const token = response.data.token;
        localStorage.setItem('authToken', token); 
        
        // Redirect to the menu
        navigate('/menu'); 

    } catch (err) {
        console.error('Error in el login:', err);
        setError('Email o contraseña incorrectos.');
    }
  }

  return (
    <>
      <BackButton to="/" />

      <div className={styles.container}>
        <div className={styles.loginBox}>
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <span className={styles.header}>Inicia sesión</span>
            <p className={styles.subtitle}>¡El antojo te trajo de vuelta 🍔🍕!</p>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className={styles.input}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <button type="submit" className={`${styles.button} ${styles.signIn}`}>
              Ingresar
            </button>

            {/* 6. Add the error message display */}
            {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}

            <h1 className={styles.footer}>
              ¿Aún no tenés cuenta?
              <Link to="/register" className={styles.link}>
                Registrarse
              </Link>
              <div> ¡No esperes más para probar nuestras pizzas y hamburguesas! </div>
            </h1>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login