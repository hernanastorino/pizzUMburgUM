import React, { useState } from 'react';
import styles from '../styles/Perfil.module.css';

const Perfil = () => {
  const [userData, setUserData] = useState({
    nombre: 'Juan Pérez',
    email: 'juan.perez@email.com',
    password: 'miPassword123'
  });

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEdit = (field) => {
    setEditingField(field);
    setTempValue(userData[field]);
    if (field === 'password') {
      setShowPassword(false);
    }
  };

  const handleSave = (field) => {
    setUserData(prev => ({
      ...prev,
      [field]: tempValue
    }));
    setEditingField(null);
    setTempValue('');
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue('');
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.profileBox}>
          <h2 className={styles.header}>Mi Perfil</h2>
          <p className={styles.subtitle}>Información personal</p>

          <div className={styles.form}>
            {/* Campo de Nombre */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Nombre</label>
              <div className={styles.displayWrapper}>
                {editingField === 'nombre' ? (
                  <input
                    type="text"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className={styles.input}
                    autoFocus
                  />
                ) : (
                  <div className={styles.valueDisplay}>{userData.nombre}</div>
                )}
                <button
                  className={`${styles.editButton} ${editingField === 'nombre' ? styles.editButtonActive : ''}`}
                  onClick={() => editingField === 'nombre' ? handleSave('nombre') : handleEdit('nombre')}
                  title={editingField === 'nombre' ? "Guardar" : "Editar"}
                >
                  ✏️
                </button>
              </div>
            </div>

            {/* Campo de Email */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Email</label>
              <div className={styles.displayWrapper}>
                {editingField === 'email' ? (
                  <input
                    type="email"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className={styles.input}
                    autoFocus
                  />
                ) : (
                  <div className={styles.valueDisplay}>{userData.email}</div>
                )}
                <button
                  className={`${styles.editButton} ${editingField === 'email' ? styles.editButtonActive : ''}`}
                  onClick={() => editingField === 'email' ? handleSave('email') : handleEdit('email')}
                  title={editingField === 'email' ? "Guardar" : "Editar"}
                >
                  ✏️
                </button>
              </div>
            </div>

            {/* Campo de Contraseña */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Contraseña</label>
              <div className={styles.displayWrapper}>
                {editingField === 'password' ? (
                  <div className={styles.passwordContainer}>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className={styles.input}
                      placeholder="Contraseña"
                      autoFocus
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
                ) : (
                  <div className={styles.valueDisplay}>••••••••</div>
                )}
                <button
                  className={`${styles.editButton} ${editingField === 'password' ? styles.editButtonActive : ''}`}
                  onClick={() => editingField === 'password' ? handleSave('password') : handleEdit('password')}
                  title={editingField === 'password' ? "Guardar" : "Editar"}
                >
                  ✏️
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;