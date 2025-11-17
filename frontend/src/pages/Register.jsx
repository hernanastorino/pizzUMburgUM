import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' // Import useNavigate
import axios from 'axios' // Import axios
import BackButton from '../components/BackButton'
import styles from '../styles/Register.module.css'

function Register() {
    const navigate = useNavigate(); // Hook for redirection
    const [error, setError] = useState(null); // State for error messages

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

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError(null)

        try {
            // 1. Send data to Spring Boot
            // Note: We only send the fields that the Backend supports right now.
            await axios.post('http://localhost:8080/api/auth/register', {
                email: formData.email,
                password: formData.password,
                name: formData.name,
                surname: formData.lastname // Map 'lastname' (React) to 'surname' (Java)
            });

            // 2. On success, redirect to Login so they can get a Token
            alert('¡Registro exitoso! Por favor inicia sesión.');
            navigate('/login');

        } catch (err) {
            console.error('Error registering:', err);
            setError('Hubo un error al registrarse. Intenta con otro email.');
        }
    }

    return (
        <>
            <BackButton to="/" />

            <div className={styles.container}>
                <div className={styles.loginBox}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <span className={styles.header}>Registrate</span>
                        <p className={styles.subtitle}>¡Dale, registrate y probá lo bueno de verdad! 🍔🍕</p>

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

                        {/* These fields exist in the form but NOT in the database yet.
                We keep them in the UI, but they won't be saved until you update the User entity. */}
                        <input
                            type="date" name="birthDate" placeholder="Fecha de Nacimiento"
                            className={styles.input}
                            value={formData.birthDate} onChange={handleChange}
                        />
                        <input
                            type="text" name="document" placeholder="Documento"
                            className={styles.input}
                            value={formData.document} onChange={handleChange}
                        />
                        <input
                            type="text" name="address" placeholder="Direccion"
                            className={styles.input}
                            value={formData.address} onChange={handleChange}
                        />
                        <input
                            type="text" name="cardNumber" placeholder="Numero de Tarjeta"
                            className={styles.input}
                            value={formData.cardNumber} onChange={handleChange}
                        />

                        <button type="submit" className={`${styles.button} ${styles.signIn}`}>
                            Registrarse
                        </button>

                        {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}

                        <p className={styles.footer}>
                            ¿Ya tenés cuenta?
                            {/* Changed /sesion to /login to match your App.js routes */}
                            <Link to="/login" className={styles.link}>
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