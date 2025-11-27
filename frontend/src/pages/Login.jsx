import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import BackButton from '../components/BackButton'
import styles from '../styles/Login.module.css'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError(null);

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email: email,
                password: password
            });

            const { token, role } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('email', email);

            if (role === 'adminRole') {
                navigate('/backoffice');
            } else {
                navigate('/menu');
            }

        } catch (err) {
            console.error('Login error:', err);
            setError('Email o contraseña incorrectos.');
        }
    }

    return (
        <>
            <BackButton to="/" />
            <div className={styles.container}>
                <div className={styles.loginBox}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        {/* ... inputs ... */}
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

                        {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}

                        <h1 className={styles.footer}>
                            ¿Aún no tenés cuenta?
                            <Link to="/register" className={styles.link}>
                                Registrarse
                            </Link>
                        </h1>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login