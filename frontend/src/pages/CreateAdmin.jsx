import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';
import styles from '../styles/Register.module.css';

function CreateAdmin() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const token = localStorage.getItem('token');
        if (!token) {
            setError("No hay sesión activa. Por favor inicia sesión nuevamente.");
            return;
        }

        try {
            console.log("Enviando datos:", formData);

            const response = await axios.post(
                'http://127.0.0.1:8080/api/users/admin',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            setSuccess('¡Admin creado exitosamente! Redirigiendo...');

            setFormData({ name: '', surname: '', email: '', password: '' });

            setTimeout(() => {
                navigate('/backoffice');
            }, 2000);

        } catch (err) {
            console.error('Error completo:', err);

            if (err.response) {
                const serverMsg = typeof err.response.data === 'string'
                    ? err.response.data
                    : err.response.data.message || JSON.stringify(err.response.data);

                if (err.response.status === 403) {
                    setError("Acceso denegado (403). Tu usuario actual no tiene permisos de Admin o el token expiró.");
                } else {
                    setError(`Error del servidor: ${serverMsg}`);
                }
            } else if (err.request) {
                setError("No hubo respuesta del servidor. Verifica que el backend esté corriendo en puerto 8080.");
            } else {
                setError("Error desconocido al preparar la petición.");
            }
        }
    };

    return (
        <>
            <BackButton to="/backoffice" />

            <div className={styles.container}>
                <div className={styles.loginBox}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <span className={styles.header}>Crear Nuevo Admin</span>

                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            className={styles.input}
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="surname"
                            placeholder="Apellido"
                            className={styles.input}
                            required
                            value={formData.surname}
                            onChange={handleChange}
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className={styles.input}
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            className={styles.input}
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <button type="submit" className={`${styles.button} ${styles.signIn}`}>
                            Crear Administrador
                        </button>

                        {error && (
                            <div style={{ color: 'red', marginTop: '10px', textAlign: 'center', background: 'rgba(255,0,0,0.1)', padding: '5px', borderRadius: '4px' }}>
                                <strong>Ups:</strong> {error}
                            </div>
                        )}

                        {success && (
                            <div style={{ color: 'green', marginTop: '10px', textAlign: 'center', background: 'rgba(0,255,0,0.1)', padding: '5px', borderRadius: '4px' }}>
                                {success}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateAdmin;