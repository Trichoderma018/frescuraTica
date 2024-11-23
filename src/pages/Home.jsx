import React from "react";
import Helmet from "../components/Helmet.jsx";
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia } from "@mui/material";
// Importa tu componente de carrusel y slider
import HeroSlider from "../components/HeroSlider.jsx";

const Home = () => {
  return (
    <Helmet
      title="Home - Productos Agrícolas y Orgánicos"
      description="Compra los mejores productos agrícolas y orgánicos en nuestra tienda en línea."
    >
      {/* Hero Section */}
      <Box sx={{ bgcolor: "#f9f9f9", py: 4, textAlign: "center" }}>
        <HeroSlider />
        <Typography variant="h3" component="h1" sx={{ mt: 4, fontWeight: "bold" }}>
          Bienvenido a Frescura Tica
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 2, maxWidth: 600, mx: "auto" }}>
          Descubre una amplia variedad de productos frescos y orgánicos que promueven un estilo de vida saludable.
          Ofrecemos calidad y sostenibilidad en cada uno de nuestros artículos.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3, px: 4, py: 1, fontSize: "1rem", borderRadius: "25px" }}
          href="/Orders"
        >
          COMPRA YA
        </Button>
      </Box>

      {/* Carousel Section */}
      <Box sx={{ mt: 5, px: 3 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Productos Destacados
        </Typography>
        {/* Aquí puedes agregar tu componente de carrusel */}
        <Box sx={{ maxWidth: "100%", overflow: "hidden" }}>
          <HeroSlider />
        </Box>
      </Box>

      {/* About Section */}
      <Box sx={{ mt: 6, px: 3, py: 4, bgcolor: "#e8f5e9" }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Conócenos
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="200"
                image="/images/product1.jpg"
                alt="Producto fresco"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Calidad Garantizada
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Todos nuestros productos cumplen con altos estándares de calidad y frescura.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="200"
                image="/images/product2.jpg"
                alt="Producto orgánico"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Orgánico y Sustentable
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Apoyamos prácticas agrícolas que respetan el medio ambiente.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Box sx={{ mt: 6, py: 3, bgcolor: "#2e7d32", color: "white", textAlign: "center" }}>
        <Typography variant="body2">
          © 2024 Frescura Tica. Todos los derechos reservados.
        </Typography>
      </Box>
    </Helmet>
  );
};

export default Home;
