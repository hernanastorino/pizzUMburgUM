// src/pages/Perfil.jsx
import React, { useState } from 'react';
import DireccionItem from '../components/DireccionItem';
import MetodoPagoItem from '../components/MetodoPagoItem';
import perfilStyles from '../styles/Perfil.module.css';

const Perfil = () => {
  const [direcciones, setDirecciones] = useState([
    {
      id: 1,
      nombre: 'Casa',
      direccion: 'Av. Libertador',
      numero: '1234',
      aptPiso: '4B',
      observaciones: 'Timbre roto, golpear'
    },
    {
      id: 2,
      nombre: 'Trabajo',
      direccion: 'Calle San Martín',
      numero: '567',
      aptPiso: '',
      observaciones: 'Preguntar por Juan'
    }
  ]);

  const [metodosPago, setMetodosPago] = useState([
  { 
    id: 1, 
    tipo: 'Visa',
    numero: '4532789012341234',
    titular: 'Juan Pérez',
    cvv: '123',
    vencimiento: '12/25'
  },
  { 
    id: 2, 
    tipo: 'Mastercard',
    numero: '5412345678901234',
    titular: 'María González',
    cvv: '456',
    vencimiento: '08/26'
  }
]);


  return (
    <div className={perfilStyles.perfilWrapper}>
      <div className={perfilStyles.perfilGrid}>

        {/* 🔹 CAJA GENERAL DE DIRECCIONES */}
        <div className={perfilStyles.itemCard}>
          <div className={perfilStyles.cardHeader}>
            <div className={perfilStyles.cardHeaderLeft}>
              <span className={perfilStyles.cardIcon}>📍</span>
              <span className={perfilStyles.cardTitle}>Direcciones</span>
            </div>
          </div>

          <div className={perfilStyles.cardContent}>
            {direcciones.map(d => (
              <DireccionItem
                key={d.id}
                direccion={d}
                onUpdate={(dx) =>
                  setDirecciones(prev => prev.map(p => p.id === dx.id ? dx : p))
                }
                onDelete={(id) =>
                  setDirecciones(prev => prev.filter(p => p.id !== id))
                }
              />
            ))}
          </div>
        </div>

        {/* 🔹 CAJA GENERAL MÉTODOS DE PAGO */}
        <div className={perfilStyles.itemCard}>
          <div className={perfilStyles.cardHeader}>
            <div className={perfilStyles.cardHeaderLeft}>
              <span className={perfilStyles.cardIcon}>💳</span>
              <span className={perfilStyles.cardTitle}>Métodos de Pago</span>
            </div>
          </div>

          <div className={perfilStyles.cardContent}>
            {metodosPago.map(m => (
              <MetodoPagoItem
                key={m.id}
                metodo={m}
                onUpdate={(mx) =>
                  setMetodosPago(prev => prev.map(p => p.id === mx.id ? mx : p))
                }
                onDelete={(id) =>
                  setMetodosPago(prev => prev.filter(p => p.id !== id))
                }
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Perfil;
