import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const [cartItems, setCartItems] = useState([
    { id: 1, nombre: "Creación 1", precio: 100, cantidad: 1 },
    { id: 2, nombre: "Bebida 1", precio: 100, cantidad: 1 }
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setIsChecked(false);
  };

  const handleOverlayClick = () => {
    setIsChecked(false);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleNavigation = (path) => {
    setIsProfileOpen(false);
    navigate(path);
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

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.cantidad, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  };

  const handleVerPedido = () => {
    setIsCartOpen(false);
    navigate('/carrito');
  };

  return (
    <>
      {isChecked && (
        <div 
          className={styles.overlay}
          onClick={handleOverlayClick}
        />
      )}

      {isCartOpen && (
        <div 
          className={styles.cartOverlay}
          onClick={() => setIsCartOpen(false)}
        />
      )}

      <nav className={styles.nav}>
        <input 
          type="checkbox" 
          id="check" 
          className={styles.check}
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <label htmlFor="check" className={styles.checkbtn}>
          ☰
        </label>
        <div className={styles.logo}>PizzUM & BurgUM</div>
        <ul className={`${styles.navLinks} ${isChecked ? styles.open : ''}`}>
          <li>
            <Link 
              to="/menu" 
              className={location.pathname === '/menu' ? styles.active : ''}
              onClick={handleLinkClick}
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link 
              to="/favoritos" 
              className={location.pathname === '/favoritos' ? styles.active : ''}
              onClick={handleLinkClick}
            >
              💜 Favoritos
            </Link>
          </li>
          <li>
            <Link 
              to="#" 
              className={styles.cartLink}
              onClick={(e) => {
                e.preventDefault();
                toggleCart();
              }}
            >
              🛒 Carrito
              {getTotalItems() > 0 && (
                <span className={styles.cartBadge}>{getTotalItems()}</span>
              )}
            </Link>
          </li>
          <li>
            <Link 
              to="#" 
              className={styles.cartLink}
              onClick={(e) => {
                e.preventDefault();
                toggleProfile();
              }}
            >
              👤 Perfil
            </Link>
          </li>
        </ul>
      </nav>

      {isCartOpen && (
        <div className={styles.cartDropdownWrapper}>
          <div className={styles.cartDropdownBorder}></div>
          <div className={styles.cartDropdown}>
            <div className={styles.cartHeader}>
              <h3>🛒 Mi Carrito</h3>
              <button 
                className={styles.closeCart}
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>
            
            <div className={styles.cartItems}>
              {cartItems.length === 0 ? (
                <p className={styles.emptyMessage}>El carrito está vacío</p>
              ) : (
                cartItems.map(item => (
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
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className={styles.cartTotal}>
                <span className={styles.totalLabel}>Total:</span>
                <span className={styles.totalPrice}>${getTotalPrice()}</span>
              </div>
            )}

            <button 
              className={styles.viewOrderBtn}
              onClick={handleVerPedido}
            >
              Ver Pedido
            </button>
          </div>
        </div>
      )}

      {isProfileOpen && (
        <>
          <div 
            className={styles.cartOverlay}
            onClick={() => setIsProfileOpen(false)}
          />
          <div className={styles.profileDropdownWrapper} ref={profileRef}>
            <div className={styles.profileDropdownBorder}></div>
            <div className={styles.profileDropdown}>
              <div className={styles.profileHeader}>
                <h3>👤 Mi Perfil</h3>
                <button 
                  className={styles.closeProfile}
                  onClick={() => setIsProfileOpen(false)}
                >
                  ✕
                </button>
              </div>
              
              <div className={styles.profileItems}>
                <button 
                  className={styles.profileItem}
                  onClick={() => handleNavigation('/perfil')}
                >
                  <span>👤</span> Perfil
                </button>
                <button 
                  className={styles.profileItem}
                  onClick={() => handleNavigation('/pagosYEnvios')}
                >
                  <span>📍💳</span> Direcciones y Pagos
                </button>
                <button 
                  className={styles.profileItem}
                  onClick={() => handleNavigation('/pedidos')}
                >
                  <span>📦</span> Pedidos
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;