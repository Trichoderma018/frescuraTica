import React from 'react'
import { useNavigate, Link } from "react-router-dom";
import '../styles/Navbarr.css'
import { Box, Typography } from '@mui/material';
function Navbarr() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      
      {/* Nubes decorativas */}
      <Box className="cloud cloud-1"></Box>
      <Box className="cloud cloud-2"></Box>
      <Box className="cloud cloud-3"></Box>
  
      <Typography
        variant="h4"
        component={Link}
        to="/"
        className="logo-title"
        id="logo-title"
      >
        FRESCURA TICA
      </Typography>
      
      <div className="navbar-content">
        <div className="search-container">
          <select className="search-dropdown" onChange={(e)=>navigate(e.target.value)}>
            <option>Páginas...</option>
            <option value={"/"}>Inicio</option>
            <option value="/about">Nosotros</option>
            <option value="/orders">Pedidos</option>
            <option value="/payment">Pagos</option>
            <option value="/inventory">Inventario</option>
          </select>
        </div>

        <div className="nav-links">
          <a href="/">INICIO</a>
          <a href="/about">NOSOTROS</a>
          <a href="/orders">PEDIDOS</a>
          <a href="/payment">PAGOS</a>
          <a href="/inventory">INVENTARIO</a>
        </div>

        <div className="right-section">
          <button className="login-button" onClick={() => navigate("/login")}>
            👤 INICIAR SESIÓN
          </button>
          <span className="help-text">Ayuda: +506 8888-8888</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbarr