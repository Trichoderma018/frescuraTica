import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Paper, Button } from "@mui/material";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import PeopleIcon from "@mui/icons-material/People";
import "../styles/AboutComponent.css";

const AboutComponent = () => {
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate("/home");
  };

  const handleNavigateToOrders = () => {
    navigate("/orders");
  };

  return (
    <Container className="about-container">
      <Box className="header-section">
        <h1 className="main-title">Acerca de Frescura Tica</h1>
        <p className="subtitle">
          En Frescura Tica, nos esforzamos por ofrecer los mejores productos agrícolas y orgánicos de Costa Rica.
        </p>
      </Box>

      <div className="info-cards-container">
        <div className="info-card-item">
          <Paper className="info-card vision-card">
            <AgricultureIcon fontSize="large" color="primary" />
            <h2 className="card-title">Nuestra Visión</h2>
            <p className="card-text">
              Ser la tienda líder en productos agrícolas y orgánicos en Costa Rica, reconocida por nuestra calidad y
              compromiso con el medio ambiente.
            </p>
          </Paper>
        </div>

        <div className="info-card-item">
          <Paper className="info-card values-card">
            <StarIcon fontSize="large" color="secondary" />
            <h2 className="card-title">Nuestros Valores</h2>
            <div className="card-text">
              <p><strong>Calidad:</strong> Cada producto cumple con los más altos estándares.</p>
              <p><strong>Sostenibilidad:</strong> Fomentamos prácticas responsables.</p>
              <p><strong>Transparencia:</strong> Brindamos confianza y honestidad.</p>
            </div>
          </Paper>
        </div>
      </div>

      {/* Sección sobre los creadores */}
      <Box className="leaders-section">
        <Paper className="leaders-card">
          <PeopleIcon fontSize="large" color="primary" />
          <h2 className="card-title">Conoce a Nuestros Líder</h2>
          <div className="card-text">
            <p><strong>Juan Pablo Quesada Ramírez</strong> – CEO</p>
          </div>
        </Paper>
      </Box>

      <Box className="thank-you-section">
        <Paper className="thank-you-card">
          <VerifiedIcon fontSize="large" color="success" />
          <h2 className="card-title">¡Gracias por elegir Frescura Tica!</h2>
          <p className="card-text">
            Juntos, hacemos la diferencia en la alimentación saludable.
          </p>
          <div className="buttons-container">
            <Button
              variant="contained"
              color="primary"
              onClick={handleNavigateToHome}
              className="navigation-button"
            >
              Ir al Inicio
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleNavigateToOrders}
              className="navigation-button"
            >
              Ir a Pedidos
            </Button>
          </div>
        </Paper>
      </Box>
    </Container>
  );
};

export default AboutComponent;