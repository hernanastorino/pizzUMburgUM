import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

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

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleNavigation = (path) => {
    setIsProfileOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <>
      {isChecked && (
        <div 
          className={styles.overlay}
          onClick={handleOverlayClick}
        />
      )}

      {isProfileOpen && (
        <div 
          className={styles.cartOverlay}
          onClick={() => setIsProfileOpen(false)}
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
        <div className={styles.logo}>PizzUM & BurgUM - Admin</div>
        <ul className={`${styles.navLinks} ${isChecked ? styles.open : ''}`}>
          <li>
            <Link 
              to="/backoffice" 
              className={location.pathname === '/backoffice' ? styles.active : ''}
              onClick={handleLinkClick}
            >
              🏢 Backoffice
            </Link>
          </li>
          <li>
            <Link 
              to="/create-admin" 
              className={location.pathname === '/create-admin' ? styles.active : ''}
              onClick={handleLinkClick}
            >
              👥 Crear Admin
            </Link>
          </li>
          <li>
            <Link 
              to="/pedidos-admin" 
              className={location.pathname === '/pedidos-admin' ? styles.active : ''}
              onClick={handleLinkClick}
            >
              📦 Pedidos del Sistema
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
              👤 Admin
            </Link>
          </li>
        </ul>
      </nav>

      {isProfileOpen && (
        <>
          <div className={styles.profileDropdownWrapper} ref={profileRef}>
            <div className={styles.profileDropdownBorder}></div>
            <div className={styles.profileDropdown}>
              <div className={styles.profileHeader}>
                <h3>👤 Admin Panel</h3>
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
                  onClick={() => handleNavigation('/perfil-admin')}
                >
                  <span>👤</span> Mi Perfil
                </button>
        
                <button 
                  className={styles.profileItem}
                  onClick={handleLogout}
                  style={{ color: '#ff4444', borderTop: '1px solid #eee', marginTop: '8px', paddingTop: '12px' }}
                >
                  <span>🚪</span> Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminNavbar;