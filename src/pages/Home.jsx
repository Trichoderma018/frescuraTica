import React from "react";
import Helmet from "../components/Helmet.jsx";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
  Paper,
  IconButton,
  CardActionArea,
} from "@mui/material";
import HeroSlider from "../components/HeroSlider.jsx";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const Home = () => {
  const productImages = [
    "/images/fruta-frescas.jpg",
    "/images/canasta.avif",
    "/images/productos-agricolas.avif",
  ]
  const conocenosImages = [
    "/images/productos-agricolas-inspeccion.jpg",  
    "/images/verduras.jpg",    
  ];
  
  ;

  return (
    <Helmet
      title="Home - Productos Agrícolas y Orgánicos"
      description="Compra los mejores productos agrícolas y orgánicos en nuestra tienda en línea."
    >
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "linear-gradient(to bottom, #e8f5e9, #f1f8e9)",
          py: 6,
          textAlign: "center",
        }}
      >
        <HeroSlider />
        <Typography variant="h3" component="h1" sx={{ mt: 4, fontWeight: "bold" }}>
          Bienvenido a Frescura Tica
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            mt: 2,
            maxWidth: 600,
            mx: "auto",
            fontSize: "1.2rem",
            color: "#4caf50",
          }}
        >
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

      {/* Productos Destacados */}
      <Box sx={{ mt: 6 }}>
        <Container maxWidth="lg">
          <Paper elevation={4} sx={{ py: 5, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
              Productos Destacados
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
              ¡Explora nuestros productos más populares seleccionados especialmente para ti!
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              {productImages.map((image, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      boxShadow: 3,
                      borderRadius: 2,
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="250"
                        image={image}
                        alt={`Producto destacado ${index + 1}`}
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Producto {index + 1}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Descripción breve del producto {index + 1}. ¡Perfecto para una vida más saludable!
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* Conócenos */}
   

<Box sx={{ mt: 6, px: 3, py: 4, bgcolor: "#e8f5e9", textAlign: "center" }}>
  <Typography variant="h4" gutterBottom>
    Conócenos
  </Typography>
  <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: "auto" }}>
    Frescura Tica se dedica a ofrecer lo mejor en productos frescos y orgánicos, asegurando calidad y un impacto positivo en el medio ambiente.
  </Typography>
  <Grid container spacing={4} justifyContent="center">
    {conocenosImages.map((image, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card sx={{ boxShadow: 3 }}>
          <CardMedia
            component="img"
            height="200"
            image={image} // Aquí usamos las imágenes del array
            alt={`Imagen ${index + 1}`}
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {index === 0 ? "Calidad Garantizada" : "Sustentabilidad"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {index === 0
                ? "Productos con los más altos estándares de calidad."
                : "Promovemos prácticas agrícolas responsables."}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
</Box>


      {/* Footer */}
      <Box sx={{ mt: 6, py: 4, bgcolor: "#2e7d32", color: "white", textAlign: "center" }}>
  
        
        <Typography variant="body2">
          © 2024 Frescura Tica. Todos los derechos reservados.
        </Typography>
      </Box>
    </Helmet>
  );
};

export default Home;
