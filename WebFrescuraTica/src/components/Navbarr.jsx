import React from 'react'
import { useNavigate } from "react-router-dom";
import '../styles/Navbarr.css'
function Navbarr() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="background-clouds"></div>

      <div className="navbar-content">
        <h1 className="logo">FRESCURA TICA</h1>

        <div className="nav-links">
          <a href="/">INICIO</a>
          <a href="/nosotros">NOSOTROS</a>
          <a href="/pedidos">PEDIDOS</a>
          <a href="/pagos">PAGOS</a>
          <a href="/inventario">INVENTARIO</a>
        </div>

        <div className="right-section">
          <span className="help-text">Ayuda: +506 8888-8888</span>
          <button className="login-button" onClick={() => navigate("/register")}>
            👤 INICIAR SESIÓN
          </button>
        </div>
      </div>

      <div className="search-container">
        <select className="search-dropdown">
          <option>Páginas...</option>
          <option value="/">Inicio</option>
          <option value="/nosotros">Nosotros</option>
          <option value="/pedidos">Pedidos</option>
          <option value="/pagos">Pagos</option>
          <option value="/inventario">Inventario</option>
        </select>
        <button className="search-button">🔍 Buscar</button>
      </div>
    </nav>
  );
}

export default Navbarr