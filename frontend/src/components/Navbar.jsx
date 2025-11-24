import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const location = useLocation();
  const [isChecked, setIsChecked] = useState(false);

  const handleLinkClick = () => {
    setIsChecked(false); // Cierra el menú al hacer clic en un link
  };

  const handleOverlayClick = () => {
    setIsChecked(false); // Cierra el menú al hacer clic en el overlay
  };

  return (
    <>
      {/* Overlay que aparece cuando el menú está abierto */}
      {isChecked && (
        <div 
          className={styles.overlay}
          onClick={handleOverlayClick}
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
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
