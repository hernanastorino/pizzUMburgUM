import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.module.css";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loader = document.getElementById("loader-container");
    const hasVisited = sessionStorage.getItem("hasVisitedIndex");

    if (hasVisited) {
      loader.style.display = "none";
    } else {
      sessionStorage.setItem("hasVisitedIndex", "true");

      setTimeout(() => {
        loader.classList.add("fade-out");
        setTimeout(() => {
          loader.style.display = "none";
        }, 500);
      }, 1500);
    }
  }, []);

  return (
    <div className="landing-container">
      {/* Loader */}
      <div id="loader-container">
        <div className="spinner">
          <div className="spinner1"></div>
        </div>
        <div className="loader-text">
          by{" "}
          <h1>
            <span style={{ color: "#0080FF" }}>ar</span>
            <span style={{ color: "#40C4FF" }}>TIC</span>
            <span style={{ color: "#0080FF" }}>ode</span>
          </h1>
        </div>
      </div>

      {/* Buttons */}
      <div className="top-left-button">
        <button className="sesion-button" onClick={() => navigate("/login")}>
          <span>Iniciar Sesión</span>
        </button>
      </div>

      <div className="top-right-button">
        <button className="register-button" onClick={() => navigate("/register")}>
          <span>Registrarse</span>
        </button>
      </div>

      {/* Social Media Buttons */}
      <ul className="example-2">
        <li className="icon-content">
          <a data-social="whatsapp" aria-label="Whatsapp">
            <div className="filled"></div>
            <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967..."></path>
            </svg>
          </a>
          <div className="tooltip">Whatsapp</div>
        </li>

        <li className="icon-content">
          <a data-social="facebook" aria-label="Facebook">
            <div className="filled"></div>
            <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
              <path d="M23.9981 11.9991C23.9981 5.37216..."></path>
            </svg>
          </a>
          <div className="tooltip">Facebook</div>
        </li>

        <li className="icon-content">
          <a data-social="instagram" aria-label="Instagram">
            <div className="filled"></div>
            <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16">
              <path d="M8 0C5.829 0 5.556.01..."></path>
            </svg>
          </a>
          <div className="tooltip">Instagram</div>
        </li>
      </ul>

      {/* Spacer + Footer */}
      <div className="content-spacer"></div>
    </div>
  );
};

export default LandingPage;
