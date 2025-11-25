// src/pages/PagosYEnvios.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DireccionItem from '../components/DireccionItem';
import MetodoPagoItem from '../components/MetodoPagoItem';
import ConfirmModal from '../components/ConfirmModal';
import perfilStyles from '../styles/PagosYEnvios.module.css';

const PagosYEnvios = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromCarrito = location.state?.from === '/carrito';

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

  const [showModalDireccion, setShowModalDireccion] = useState(false);
  const [showModalPago, setShowModalPago] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDeleteDireccionDirecto = (id) => {
    setDirecciones(prev => prev.filter(d => d.id !== id));
  };

  const handleDeleteDireccion = (id) => {
    setItemToDelete(id);
    setShowModalDireccion(true);
  };

  const confirmDeleteDireccion = () => {
    setDirecciones(prev => prev.filter(d => d.id !== itemToDelete));
    setShowModalDireccion(false);
    setItemToDelete(null);
  };

  const handleDeletePagoDirecto = (id) => {
    setMetodosPago(prev => prev.filter(m => m.id !== id));
  };

  const handleDeletePago = (id) => {
    setItemToDelete(id);
    setShowModalPago(true);
  };

  const confirmDeletePago = () => {
    setMetodosPago(prev => prev.filter(m => m.id !== itemToDelete));
    setShowModalPago(false);
    setItemToDelete(null);
  };

  const handleAddDireccion = () => {
    const newId = Math.max(...direcciones.map(d => d.id), 0) + 1;
    setDirecciones(prev => [...prev, {
      id: newId,
      nombre: '',
      direccion: '',
      numero: '',
      aptPiso: '',
      observaciones: ''
    }]);
  };

  const handleAddPago = () => {
    const newId = Math.max(...metodosPago.map(m => m.id), 0) + 1;
    setMetodosPago(prev => [...prev, {
      id: newId,
      tipo: '',
      numero: '',
      titular: '',
      cvv: '',
      vencimiento: ''
    }]);
  };

  // Cuando se guarda/actualiza una dirección
  const handleUpdateDireccion = (dx) => {
    setDirecciones(prev => prev.map(p => p.id === dx.id ? dx : p));
    
    // Si viene del carrito Y tiene al menos un campo lleno, redirigir
    if (fromCarrito) {
      const tieneDatos = dx.nombre || dx.direccion || dx.numero || dx.aptPiso || dx.observaciones;
      if (tieneDatos) {
        setTimeout(() => {
          navigate('/carrito');
        }, 100);
      }
    }
  };

  // Cuando se guarda/actualiza un método de pago
  const handleUpdateMetodoPago = (mx) => {
    setMetodosPago(prev => prev.map(p => p.id === mx.id ? mx : p));
    
    // Si viene del carrito Y tiene al menos un campo lleno, redirigir
    if (fromCarrito) {
      const tieneDatos = mx.tipo || mx.numero || mx.titular || mx.cvv || mx.vencimiento;
      if (tieneDatos) {
        setTimeout(() => {
          navigate('/carrito');
        }, 100);
      }
    }
  };

  return (
    <div className={perfilStyles.perfilWrapper}>
      <div className={perfilStyles.perfilGrid}>

        <div className={perfilStyles.itemCard}>
          <div className={perfilStyles.cardHeader}>
            <div className={perfilStyles.cardHeaderLeft}>
              <span className={perfilStyles.cardIcon}>📍</span>
              <span className={perfilStyles.cardTitle}>Direcciones</span>
            </div>
            <button 
              className={perfilStyles.addButton}
              onClick={handleAddDireccion}
              title="Agregar dirección"
            >
              +
            </button>
          </div>

          <div className={perfilStyles.cardContent}>
            {direcciones.map(d => (
              <DireccionItem
                key={d.id}
                direccion={d}
                onUpdate={handleUpdateDireccion}
                onDelete={handleDeleteDireccion}
                onDeleteDirecto={handleDeleteDireccionDirecto}
              />
            ))}
          </div>
        </div>

        <div className={perfilStyles.itemCard}>
          <div className={perfilStyles.cardHeader}>
            <div className={perfilStyles.cardHeaderLeft}>
              <span className={perfilStyles.cardIcon}>💳</span>
              <span className={perfilStyles.cardTitle}>Métodos de Pago</span>
            </div>
            <button 
              className={perfilStyles.addButton}
              onClick={handleAddPago}
              title="Agregar método de pago"
            >
              +
            </button>
          </div>

          <div className={perfilStyles.cardContent}>
            {metodosPago.map(m => (
              <MetodoPagoItem
                key={m.id}
                metodo={m}
                onUpdate={handleUpdateMetodoPago}
                onDelete={handleDeletePago}
                onDeleteDirecto={handleDeletePagoDirecto}
              />
            ))}
          </div>
        </div>

      </div>

      {showModalDireccion && (
        <ConfirmModal
          isOpen={showModalDireccion}
          message="¿Estás seguro de que deseas eliminar esta dirección?"
          onConfirm={confirmDeleteDireccion}
          onCancel={() => setShowModalDireccion(false)}
        />
      )}

      {showModalPago && (
        <ConfirmModal
          isOpen={showModalPago}
          message="¿Estás seguro de que deseas eliminar este método de pago?"
          onConfirm={confirmDeletePago}
          onCancel={() => setShowModalPago(false)}
        />
      )}
    </div>
  );
};

export default PagosYEnvios;