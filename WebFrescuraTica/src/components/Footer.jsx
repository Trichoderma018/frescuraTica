import React from "react";
import { Box, Container, Typography, Divider, IconButton } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import RoomIcon from "@mui/icons-material/Room";
import '../styles/Footer.css';

const Footer = () => {
  return (
    <>
      {/* Barra superior simulando césped */}
      <Box className="footer-barra">
        2024 Frescura Tica. Todos los derechos reservados.
      </Box>

      {/* Footer principal */}
      <Box component="footer" className="footer-container">
        <Container maxWidth="lg">
          <div className="footer-content">
            {/* Logo y descripción */}
            <div className="footer-section">
              <div className="footer-logo">
                <AgricultureIcon className="icon-logo" />
                <Typography variant="h4" className="footer-title">
                  Frescura Tica
                </Typography>
              </div>
              <Typography variant="body1" className="footer-text">
                Ofrecemos productos frescos y sostenibles, garantizando calidad
                en cada artículo. ¡Descubre lo mejor de la agricultura costarricense!
              </Typography>
            </div>

            {/* Información de contacto */}
            <div className="footer-section">
              <Typography variant="h5" className="footer-subtitle">
                Contáctanos
              </Typography>
              <div className="footer-item">
                <RoomIcon className="icon-contact" />
                <Typography variant="body1">
                  89 San José, San José, Costa Rica
                </Typography>
              </div>
              <div className="footer-item">
                <PhoneIcon className="icon-contact-phone" />
                <Typography variant="body1">+506 8888-8888</Typography>
              </div>
              <div className="footer-item">
                <EmailIcon className="icon-contact-email" />
                <Typography variant="body1">frescuratica@gmail.com</Typography>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="footer-section">
              <Typography variant="h5" className="footer-subtitle">
                Síguenos
              </Typography>
              <div className="footer-social">
                <IconButton href="https://facebook.com" target="_blank" >
                  <FacebookIcon  className="social-button-facebook"/>
                </IconButton>
                <IconButton href="https://instagram.com" target="_blank" >
                  <InstagramIcon className="social-button-instagram"/>
                </IconButton>
                <IconButton href="https://twitter.com" target="_blank" className="social-button-twitter">
                  <TwitterIcon className="social-button-twitter"/>
                </IconButton>
              </div>
            </div>
          </div>

          {/* Línea divisoria */}
          <Divider className="footer-divider" />

          {/* Derechos de autor */}
          <Box textAlign="center">
            <Typography variant="body2" className="footer-copyright">
              <CopyrightIcon fontSize="small" /> 
              Copyright 2024, Developed by Juan Quesada. Proyecto frontend de FWD
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
