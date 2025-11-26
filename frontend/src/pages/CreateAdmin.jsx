import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';
import styles from '../styles/Register.module.css'; // Usamos los estilos que ya tienes

function CreateAdmin() {
    const navigate = useNavigate();

    // Estado inicial vacío
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

        // 1. Validar que tengamos token (el admin debe estar logueado)
        const token = localStorage.getItem('token');
        if (!token) {
            setError("No hay sesión activa. Por favor inicia sesión nuevamente.");
            return;
        }

        try {
            // 2. Llamada a la API
            console.log("Enviando datos:", formData); // Para depuración

            const response = await axios.post(
                'http://127.0.0.1:8080/api/users/admin',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Header Clave
                        'Content-Type': 'application/json'
                    }
                }
            );

            // 3. Éxito
            setSuccess('¡Admin creado exitosamente! Redirigiendo...');

            // Limpiar form
            setFormData({ name: '', surname: '', email: '', password: '' });

            setTimeout(() => {
                navigate('/backoffice');
            }, 2000);

        } catch (err) {
            console.error('Error completo:', err);

            // 4. Manejo de errores específico para que no te quedes ciego
            if (err.response) {
                // El servidor respondió con un error (ej. 400 Bad Request o 403 Forbidden)
                // A veces el mensaje viene en err.response.data (string) o err.response.data.message
                const serverMsg = typeof err.response.data === 'string'
                    ? err.response.data
                    : err.response.data.message || JSON.stringify(err.response.data);

                if (err.response.status === 403) {
                    setError("Acceso denegado (403). Tu usuario actual no tiene permisos de Admin o el token expiró.");
                } else {
                    setError(`Error del servidor: ${serverMsg}`);
                }
            } else if (err.request) {
                // No hubo respuesta (servidor apagado o error de red)
                setError("No hubo respuesta del servidor. Verifica que el backend esté corriendo en puerto 8080.");
            } else {
                setError("Error desconocido al preparar la petición.");
            }
        }
    };

    return (
        <>
            {/* Usamos tu Navbar de Admin en App.js, así que aquí solo necesitamos volver */}
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

                        {/* Mensajes de Error/Éxito */}
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