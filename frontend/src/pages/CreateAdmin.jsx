import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';
import styles from '../styles/Register.module.css'; // Usa los estilos de Register

function CreateAdmin() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',

    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

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

        try {
            const token = localStorage.getItem('token');
            
            const response = await axios.post(
                'http://localhost:8080/api/users/admin',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            setSuccess('¡Admin creado exitosamente!');
            setFormData({
                name: '',
                surname: '',
                email: '',
                password: '',
            
            });

            // Opcional: redirigir después de 2 segundos
            setTimeout(() => {
                navigate('/backoffice');
            }, 2000);

        } catch (err) {
            console.error('Error creating admin:', err);
            if (err.response?.data) {
                setError(err.response.data);
            } else {
                setError('Error al crear el administrador. Por favor intenta de nuevo.');
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
                        <p className={styles.subtitle}>Completa los datos del nuevo administrador</p>

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
                            <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
                                {error}
                            </p>
                        )}

                        {success && (
                            <p style={{ color: '#4CAF50', textAlign: 'center', marginTop: '10px' }}>
                                {success}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateAdmin;