import React from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'


function Home() {
  return (
    <>
      <Loader />

      <div className="top-left-button">
        <Link to="/sesion" className="sesion-button">
          <span> Iniciar Sesión</span>
        </Link>
      </div>

      <div className="top-right-button">
        <Link to="/register" className="register-button">
          <span> Registrarse</span>
        </Link>
      </div>

      <ul className="example-2">
      </ul>

      <div className="content-spacer"></div>
    </>
  )
}

export default Home