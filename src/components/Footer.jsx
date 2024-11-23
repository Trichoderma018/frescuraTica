import React from "react";
import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { Link } from "react-router-dom";
import AgricultureIcon from "@mui/icons-material/Agriculture";

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "#8B4513", py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo y descripción */}
          <Grid item xs={12} md={5}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <AgricultureIcon fontSize="large" color="primary" />
              <Typography
                component={Link}
                to="/home"
                variant="h5"
                color="primary"
                fontWeight="bold"
                underline="none"
                sx={{ textDecoration: "none" }}
              >
                Frescura Tica
              </Typography>
            </Box>
            <Typography variant="body2" paragraph>
              Ofrecemos una amplia variedad de
              productos frescos que promueven un estilo de vida saludable,
              garantizando calidad y sostenibilidad en cada uno de nuestros
              artículos.
            </Typography>
            <Typography variant="body2" paragraph>
              En Frescura Tica, nos destacamos por nuestra transparencia y
              compromiso con nuestros clientes. Sin cargos ocultos, brindamos
              una experiencia de compra confiable y satisfactoria.
            </Typography>
            <Typography variant="body2">
              ¡Únete a nosotros y descubre lo mejor de la agricultura
              costarricense!
            </Typography>
          </Grid>

          {/* Tienda */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Nuestra Tienda
            </Typography>
            <Typography variant="body2" color="textSecondary">
              San José, Costa Rica
            </Typography>
          </Grid>

          {/* Dirección */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Dirección
            </Typography>
            <Typography variant="body2" color="textSecondary">
              89 San José, San José, Costa Rica
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Celular: +506 8888-8888
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Email: frescuratica@gmail.com
            </Typography>
          </Grid>
        </Grid>

        {/* Derechos de autor */}
        <Box textAlign="center" mt={4}>
          <Typography
            variant="body2"
            color="textSecondary"
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
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
