import React from "react";
import styles from "./Navbar.module.css";

const SimpleNavbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>PizzUM & BurgUM</div>
    </nav>
  );
};

export default SimpleNavbar;