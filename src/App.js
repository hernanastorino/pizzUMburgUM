import React from 'react';
import LoginForm from './LoginForm'; // Importamos nuestro nuevo componente
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>PizzUM & BurgUM</h1>
                <LoginForm /> {/* ¡Aquí mostramos el formulario! */}
            </header>
        </div>
    );
}

export default App;