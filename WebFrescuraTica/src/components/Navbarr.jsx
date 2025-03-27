import React from 'react'
import { useNavigate } from "react-router-dom";
import '../styles/Navbarr.css'
import { 
  Box
} from '@mui/material';
function Navbarr() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      
         {/* Nubes decorativas */}
      <Box
        sx={{
          position: "absolute",
          top: "20px",
          left: "10%",
          width: "100px",
          height: "60px",
          backgroundColor: "white",
          borderRadius: "50%",
          boxShadow: "30px 10px 0 white, 60px 20px 0 white",
          animation: "moveClouds 10s linear infinite",
          zIndex: -1, // Asegura que las nubes estén detrás del contenido
          "@keyframes moveClouds": {
            "0%": { transform: "translateX(-200px)" },
            "100%": { transform: "translateX(100vw)" },
          },
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          top: "60px",
          left: "40%",
          width: "120px",
          height: "70px",
          backgroundColor: "white",
          borderRadius: "50%",
          boxShadow: "40px 20px 0 white, 80px 30px 0 white",
          animation: "moveClouds 15s linear infinite",
          zIndex: -1,
          "@keyframes moveClouds": {
            "0%": { transform: "translateX(200px)" },
            "100%": { transform: "translateX(-100vw)" },
          },
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          top: "100px",
          left: "70%",
          width: "90px",
          height: "50px",
          backgroundColor: "white",
          borderRadius: "50%",
          boxShadow: "20px 10px 0 white, 50px 15px 0 white",
          animation: "moveClouds 20s linear infinite",
          zIndex: -1,
          "@keyframes moveClouds": {
            "0%": { transform: "translateX(-150px)" },
            "100%": { transform: "translateX(120vw)" },
          },
        }}
      ></Box>
  

      <div className="navbar-content">
        <h1 className="logo">FRESCURA TICA</h1>

        <div className="nav-links">
          <a href="/">INICIO</a>
          <a href="/about">NOSOTROS</a>
          <a href="/orders">PEDIDOS</a>
          <a href="/payment">PAGOS</a>
          <a href="/inventory">INVENTARIO</a>
        </div>

        <div className="right-section">
          <span className="help-text">Ayuda: +506 8888-8888</span>
          <button className="login-button" onClick={() => navigate("/login")}>
            👤 INICIAR SESIÓN
          </button>
        </div>
      </div>

      <div className="search-container">
        <select className="search-dropdown">
          <option>Páginas...</option>
          <option value="/">Inicio</option>
          <option value="/about">Nosotros</option>
          <option value="/orders">Pedidos</option>
          <option value="/payment">Pagos</option>
          <option value="/inventory">Inventario</option>
        </select>
        <button className="search-button">🔍 Buscar</button>
      </div>
    </nav>
  );
}

export default Navbarr