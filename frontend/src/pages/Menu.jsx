import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";

import pizzaMenu from "../assets/images/pizza.jpg";
import burgerMenu from "../assets/images/burger.jpg";
import friesMenu from "../assets/images/fries.jpg";
import beveragesMenu from "../assets/images/beverages.jpg";
import background from "../assets/images/blurred_bg.jpg";

function Menu() {
  const navigate = useNavigate();

  return (
    <div
      className={styles.page}
      style={{ backgroundImage: `url(${background})` }}
    >
      <button className={styles.backButton} onClick={() => navigate("/")}>
        ← Volver
      </button>

      <div id="menu">
        <h1 className={styles.menuTitle}>¿Qué te tienta hoy?</h1>
      </div>

      {/* Category Buttons */}
      <div className={styles.categoryButtons}>
        <button
          className={styles.categoryBtn}
          style={{ backgroundImage: `url(${pizzaMenu})` }}
          onClick={() => navigate("/masa-pizza")}
        >
          <span>Pizza</span>
        </button>

        <button
          className={styles.categoryBtn}
          style={{ backgroundImage: `url(${burgerMenu})` }}
          onClick={() => navigate("/burger")}
        >
          <span>Burger</span>
        </button>
      </div>

      {/* Secondary Buttons */}
      <div className={styles.secondaryButtons}>
        <button
          className={styles.secondaryBtn}
          style={{ backgroundImage: `url(${friesMenu})` }}
          onClick={() => navigate("/acompanamiento")}
        >
          <span>Acompañamiento</span>
        </button>

        <button
          className={styles.secondaryBtn}
          style={{ backgroundImage: `url(${beveragesMenu})` }}
          onClick={() => navigate("/bebidas")}
        >
          <span>Bebida</span>
        </button>
      </div>
    </div>
  );
}

export default Menu;
