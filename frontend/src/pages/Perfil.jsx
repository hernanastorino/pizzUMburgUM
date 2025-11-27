import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from '../styles/Perfil.module.css';

const Perfil = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@email.com',
    password: 'miPassword123',
    fechaNacimiento: '1995-08-15',
    documento: '12345678'
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
        <div className={styles.loginBox}>
          <h2 className={styles.header}>Mi Perfil</h2>
          <p className={styles.subtitle}>Información personal</p>

          <div className={styles.form}>

            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              className={styles.input}
              value={userData.nombre}
              onChange={handleChange}
            />

            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              className={styles.input}
              value={userData.apellido}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input}
              value={userData.email}
              onChange={handleChange}
            />

            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Contraseña"
                className={styles.input}
                value={userData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className={styles.eyeToggle}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  {showPassword ? (
                    <g>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </g>
                  ) : (
                    <g>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </g>
                  )}
                </svg>
              </button>
            </div>

            <input
              type="date"
              name="fechaNacimiento"
              placeholder="Fecha de Nacimiento"
              className={styles.input}
              value={userData.fechaNacimiento}
              onChange={handleChange}
            />

            <input
              type="text"
              name="documento"
              placeholder="Documento"
              className={styles.input}
              value={userData.documento}
              onChange={handleChange}
            />

            <button
              type="button"
              className={`${styles.button} ${styles.logoutButton}`} 
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>

          </div>
        </div>
      </div>
  );
};

export default Perfil;
