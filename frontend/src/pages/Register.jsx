import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import BackButton from '../components/BackButton'
import styles from '../styles/Register.module.css'

function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

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
            await axios.post('http://localhost:8080/api/auth/register', {
                email: formData.email,
                password: formData.password,
                name: formData.name,
                surname: formData.lastname
            });

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