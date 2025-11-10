import React, { useState } from 'react';
import axios from 'axios'; // Importamos axios para hacer la llamada a la API

function LoginForm() {
    // Estados para guardar lo que el usuario escribe
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    // Esta función se llama cuando el usuario aprieta "Ingresar"
    const handleSubmit = async (event) => {
        event.preventDefault(); // Previene que la página se recargue
        setError(null); // Limpia errores anteriores

        try {
            // ¡AQUÍ ESTÁ LA MAGIA!
            // 1. Hacemos un POST a la URL de tu API de Spring Boot
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email: email,       // Esto coincide con el 'LoginRequest' de tu AuthController
                password: password  // Esto también
            });

            // 2. Si la llamada es exitosa (código 200)
            const token = response.data.token;
            console.log('¡Login exitoso! Token:', token);

            // 3. Guardamos el token en el navegador
            localStorage.setItem('authToken', token);

            // Aquí es donde "redireccionas" al usuario al menú
            // (Necesitarás 'react-router-dom' para esto, por ahora solo mostramos un alert)
            alert('¡Login exitoso! Revisa la consola para ver tu token.');

        } catch (err) {
            // 4. Si la llamada falla (ej. error 401 o 500)
            console.error('Error en el login:', err);
            setError('Email o contraseña incorrectos.');
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Ingresar</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}

export default LoginForm;