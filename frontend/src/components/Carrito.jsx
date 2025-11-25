import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import OrderConfirmModal from "../components/OrderConfirmModal";
import styles from "../styles/Carrito.module.css";

const Carrito = () => {
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState([
    { id: 1, nombre: "Creación 1", precio: 100, cantidad: 1 },
    { id: 2, nombre: "Bebida 1", precio: 100, cantidad: 1 }
  ]);

  const [isDireccionOpen, setIsDireccionOpen] = useState(false);
  const [isMetodoPagoOpen, setIsMetodoPagoOpen] = useState(false);
  const [selectedDireccion, setSelectedDireccion] = useState(null);
  const [selectedMetodoPago, setSelectedMetodoPago] = useState(null);
  
  // Estado para el modal de pedido realizado
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [numeroPedido, setNumeroPedido] = useState(null);
  
  // Estado para notificaciones personalizadas
  const [notification, setNotification] = useState({ show: false, message: "" });

  const direccionRef = useRef(null);
  const metodoPagoRef = useRef(null);

  const direcciones = [
    { id: 1, nombre: "Casa", direccion: "Av. Libertador 1234" },
    { id: 2, nombre: "Trabajo", direccion: "Calle San Martín 567" }
  ];

  const metodosPago = [
    { id: 1, tipo: "Visa", numero: "**** 1234" },
    { id: 2, tipo: "Mastercard", numero: "**** 5678" }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (direccionRef.current && !direccionRef.current.contains(event.target)) {
        setIsDireccionOpen(false);
      }
      if (metodoPagoRef.current && !metodoPagoRef.current.contains(event.target)) {
        setIsMetodoPagoOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Auto-ocultar notificación después de 3 segundos
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const showNotification = (message) => {
    setNotification({ show: true, message });
  };

  const incrementItem = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    ));
  };

  const decrementItem = (id) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        if (item.cantidad > 1) {
          return { ...item, cantidad: item.cantidad - 1 };
        }
        return null;
      }
      return item;
    }).filter(item => item !== null));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  };

  const handleSelectDireccion = (direccion) => {
    setSelectedDireccion(direccion);
    setIsDireccionOpen(false);
  };

  const handleSelectMetodoPago = (metodo) => {
    setSelectedMetodoPago(metodo);
    setIsMetodoPagoOpen(false);
  };

  const handleAgregarDireccion = () => {
    navigate('/pagosYEnvios', { state: { from: '/carrito' } });
  };

  const handleAgregarMetodoPago = () => {
    navigate('/pagosYEnvios', { state: { from: '/carrito' } });
  };

  const handlePagar = () => {
    // Validar que haya seleccionado dirección y método de pago
    if (!selectedDireccion) {
      showNotification("📍 Por favor selecciona una dirección de envío");
      return;
    }
    
    if (!selectedMetodoPago) {
      showNotification("💳 Por favor selecciona un método de pago");
      return;
    }

    // Generar número de pedido (temporal)
    const numeroPedidoGenerado = Math.floor(100000 + Math.random() * 900000);
    setNumeroPedido(numeroPedidoGenerado);
    
    // Mostrar modal de confirmación
    setShowOrderModal(true);
  };

  const handleCloseModal = () => {
    setShowOrderModal(false);
    // Opcionalmente puedes limpiar el carrito aquí
    // setCartItems([]);
  };

  // Nueva función para ir a Pedidos
  const handleVerEstado = () => {
    setShowOrderModal(false);
    navigate('/pedidos');
  };

  const toggleDireccion = () => {
    setIsDireccionOpen(!isDireccionOpen);
    setIsMetodoPagoOpen(false);
  };

  const toggleMetodoPago = () => {
    setIsMetodoPagoOpen(!isMetodoPagoOpen);
    setIsDireccionOpen(false);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainContent}>
        <div className={styles.carritoGrid}>
          {/* Columna Izquierda - Items del carrito */}
          <div className={styles.leftColumn}>
            <div className={styles.cardWrapper}>
              <div className={styles.cardBorder}></div>
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>Carrito</h2>
                
                {cartItems.length === 0 ? (
                  <p className={styles.emptyMessage}>El carrito está vacío</p>
                ) : (
                  <div className={styles.itemsList}>
                    {cartItems.map(item => (
                      <div key={item.id} className={styles.cartItem}>
                        <div className={styles.itemInfo}>
                          <span className={styles.itemName}>{item.nombre}</span>
                          <span className={styles.itemPrice}>${item.precio * item.cantidad}</span>
                        </div>
                        <div className={styles.itemControls}>
                          <button 
                            className={styles.controlBtn}
                            onClick={() => decrementItem(item.id)}
                          >
                            -
                          </button>
                          <span className={styles.quantity}>{item.cantidad}</span>
                          <button 
                            className={styles.controlBtn}
                            onClick={() => incrementItem(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className={styles.totalSection}>
                  <span className={styles.totalLabel}>Total:</span>
                  <span className={styles.totalPrice}>${getTotalPrice()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha - Dirección y Método de Pago */}
          <div className={styles.rightColumn}>
            {/* Tarjeta de Dirección - Dropdown */}
            <div className={styles.cardWrapper}>
              <div className={styles.cardBorder}></div>
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>📍 Dirección</h2>
                
                <div className={styles.dropdownWrapper} ref={direccionRef}>
                  <button 
                    className={styles.dropdownButton}
                    onClick={toggleDireccion}
                  >
                    <span>{selectedDireccion ? selectedDireccion.nombre : "Seleccionar dirección"}</span>
                    <span className={styles.dropdownArrow}>▼</span>
                  </button>
                  
                  {isDireccionOpen && (
                    <div className={styles.dropdownMenu}>
                      {direcciones.map(dir => (
                        <div 
                          key={dir.id}
                          className={styles.dropdownItem}
                          onClick={() => handleSelectDireccion(dir)}
                        >
                          <div>
                            <div className={styles.dropdownItemTitle}>{dir.nombre}</div>
                            <div className={styles.dropdownItemSubtitle}>{dir.direccion}</div>
                          </div>
                        </div>
                      ))}
                      <button 
                        className={styles.addButtonDropdown}
                        onClick={handleAgregarDireccion}
                      >
                        + Agregar dirección
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tarjeta de Método de Pago - Dropdown */}
            <div className={styles.cardWrapper}>
              <div className={styles.cardBorder}></div>
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>💳 Método de Pago</h2>
                
                <div className={styles.dropdownWrapper} ref={metodoPagoRef}>
                  <button 
                    className={styles.dropdownButton}
                    onClick={toggleMetodoPago}
                  >
                    <span>{selectedMetodoPago ? `${selectedMetodoPago.tipo} ${selectedMetodoPago.numero}` : "Seleccionar método"}</span>
                    <span className={styles.dropdownArrow}>▼</span>
                  </button>
                  
                  {isMetodoPagoOpen && (
                    <div className={styles.dropdownMenu}>
                      {metodosPago.map(metodo => (
                        <div 
                          key={metodo.id}
                          className={styles.dropdownItem}
                          onClick={() => handleSelectMetodoPago(metodo)}
                        >
                          <div>
                            <div className={styles.dropdownItemTitle}>{metodo.tipo}</div>
                            <div className={styles.dropdownItemSubtitle}>{metodo.numero}</div>
                          </div>
                        </div>
                      ))}
                      <button 
                        className={styles.addButtonDropdown}
                        onClick={handleAgregarMetodoPago}
                      >
                        + Agregar método de pago
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Botón Pagar */}
            <button 
              className={styles.pagarButton}
              onClick={handlePagar}
            >
              Pagar
            </button>
          </div>
        </div>
      </div>

      {/* Notificación Toast */}
      {notification.show && (
        <div className={styles.notification}>
          {notification.message}
        </div>
      )}

      {/* Modal de Pedido Realizado */}
      <OrderConfirmModal 
        isOpen={showOrderModal}
        onClose={handleCloseModal}
        onVerEstado={handleVerEstado}
        numeroPedido={numeroPedido}
      />
    </div>
  );
};

export default Carrito;