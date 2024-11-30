import React from "react";
import { Box, Container, Grid, Typography, Divider, IconButton } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import RoomIcon from "@mui/icons-material/Room";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#8B4513", // Fondo color tierra
        color: "#000000", // Texto negro
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo y descripción */}
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <AgricultureIcon fontSize="large" sx={{ color: "#000000" }} />
              <Typography
                variant="h4"
                sx={{
                  textDecoration: "none",
                  color: "#000000",
                  fontWeight: "bold",
                  textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)", // Sombra de texto para resaltar
                }}
              >
                Frescura Tica
              </Typography>
            </Box>
            <Typography
              variant="body1"
              paragraph
              sx={{
                fontSize: "1.2rem",
                lineHeight: 1.8,
                textShadow: "1px 1px 3px rgba(255, 255, 255, 0.6)", // Sombra más sutil para el texto largo
              }}
            >
              Ofrecemos una amplia variedad de productos frescos que promueven
              un estilo de vida saludable, garantizando calidad y sostenibilidad
              en cada uno de nuestros artículos.
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{
                fontSize: "1.2rem",
                lineHeight: 1.8,
                textShadow: "1px 1px 3px rgba(255, 255, 255, 0.6)", // Sombra más sutil para el texto largo
              }}
            >
              ¡Únete a nosotros y descubre lo mejor de la agricultura costarricense!
            </Typography>
          </Grid>

          {/* Información de contacto */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: "#000000",
                textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)", // Resaltado
              }}
            >
              Contáctanos
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <RoomIcon sx={{ color: "#000000" }} />
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.2rem",
                  textShadow: "1px 1px 3px rgba(255, 255, 255, 0.6)", // Texto con sombra sutil
                }}
              >
                89 San José, San José, Costa Rica
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <PhoneIcon sx={{ color: "#000000" }} />
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.2rem",
                  textShadow: "1px 1px 3px rgba(255, 255, 255, 0.6)", // Texto con sombra sutil
                }}
              >
                +506 8888-8888
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <EmailIcon sx={{ color: "#000000" }} />
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.2rem",
                  textShadow: "1px 1px 3px rgba(255, 255, 255, 0.6)", // Texto con sombra sutil
                }}
              >
                frescuratica@gmail.com
              </Typography>
            </Box>
          </Grid>

          {/* Redes sociales */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: "#000000",
                textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)", // Resaltado
              }}
            >
              Síguenos
            </Typography>
            <Box display="flex" gap={2}>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                sx={{
                  bgcolor: "#FFF",
                  color: "#8B4513",
                  "&:hover": { bgcolor: "#6B8E23", color: "#FFF" },
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                sx={{
                  bgcolor: "#FFF",
                  color: "#8B4513",
                  "&:hover": { bgcolor: "#6B8E23", color: "#FFF" },
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                sx={{
                  bgcolor: "#FFF",
                  color: "#8B4513",
                  "&:hover": { bgcolor: "#6B8E23", color: "#FFF" },
                }}
              >
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ bgcolor: "#FFF", my: 4 }} />

        {/* Derechos de autor */}
        <Box textAlign="center">
          <Typography
            variant="body1"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              fontSize: "1.2rem",
              textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)", // Sombra para resaltar derechos
            }}
          >
            <CopyrightIcon fontSize="small" /> Copyright 2024, Developed by
            Grupo 12. Proyecto Bases de Datos 2 UAM.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
