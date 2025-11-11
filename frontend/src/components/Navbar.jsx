import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>PizzUM & BurgUM</div>
      <ul className={styles.navLinks}>
        <li><a href="#" className={styles.active}>Inicio</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#menu">Menu</a></li>
        <li><a href="#reviews">Favoritos</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
