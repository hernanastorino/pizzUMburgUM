import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <p className={styles.footerText}>&copy; 2025 PizzUM & BurgUM</p>
      </div>
      <div>
        <p className={styles.footerText}>Laboratorio TIC I &copy; arTICode</p>
      </div>
      <div>
        <p className={styles.footerText}>Astorino Hernán, Angeloro Valentina, Hobbins William</p>
      </div>
    </footer>
  );
};

export default Footer;