import React from 'react'
import { Link } from 'react-router-dom' // Import Link
import Loader from '../components/Loader' // Import the Loader

// Import page-specific styles if you made a module for index.html
// Otherwise, global.css (from style.css) already covers it.

function Home() {
  return (
    <>
      <Loader />

      <div className="top-left-button">
        {/* Use <Link> for internal navigation */}
        <Link to="/sesion" className="sesion-button">
          <span> Iniciar Sesión</span>
        </Link>
      </div>

      <div className="top-right-button">
        <Link to="/register" className="register-button">
          <span> Registrarse</span>
        </Link>
      </div>

      {/* ... (rest of your social media buttons) ... */}
      <ul className="example-2">
        {/* ... */}
      </ul>

      <div className="content-spacer"></div>
      {/* The Footer is now in Layout.jsx, so we don't need it here */}
    </>
  )
}

export default Home