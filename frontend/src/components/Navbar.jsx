import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>PizzUM & BurgUM</div>
      <ul className={styles.navLinks}>
        <li>
          <Link 
            to="/menu" 
            className={location.pathname === '/menu' ? styles.active : ''}
          >
            Inicio
          </Link>
        </li>
        <li><a href="#about">About</a></li>
        <li><a href="#menu">Menu</a></li>
        <li>
          <Link 
            to="/favoritos" 
            className={location.pathname === '/favoritos' ? styles.active : ''}
          >
            ❤️ Favoritos
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;