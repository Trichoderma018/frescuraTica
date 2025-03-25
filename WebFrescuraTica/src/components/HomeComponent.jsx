import React from 'react'
import { 
    Box, 
    Container, 
    Grid, 
    Paper, 
    Button, 
    Card, 
    CardActionArea, 
    CardMedia, 
    CardContent 
  } from '@mui/material';
import '../styles/HomeComponent.css'

const HomeComponent = ({ productImages, conocenosImages }) => {
    return (
      <>
        <Box className="welcome-section">
          <h1 className="welcome-title">
            Bienvenido a Frescura Tica
          </h1>
          <p className="welcome-subtitle">
            Descubre una amplia variedad de productos frescos y orgánicos que promueven un estilo de vida saludable. 
            Ofrecemos calidad y sostenibilidad en cada uno de nuestros artículos.
          </p>
          <Button
            variant="contained"
            color="primary"
            className="shop-button"
            href="/orders"
          >
            COMPRA YA
          </Button>
        </Box>
  
        {/* Productos Destacados */}
        <Box className="featured-products-section">
          <Container maxWidth="lg">
            <Paper className="featured-products-paper" elevation={4}>
              <h2 className="section-title">
                Productos Destacados
              </h2>
              <p className="section-subtitle">
                ¡Explora nuestros productos más populares seleccionados especialmente para ti!
              </p>
              <Grid container spacing={3} justifyContent="center">
                {productImages.map((image, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card className="product-card">
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="250"
                          image={image}
                          alt={`Producto destacado ${index + 1}`}
                        />
                        <CardContent>
                          <h3 className="product-title">
                            Producto {index + 1}
                          </h3>
                          <p className="product-description">
                            {index + 1}. ¡Perfecto para una vida más saludable!
                          </p>
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
        <Box className="about-us-section">
          <h2 className="section-title">
            Conócenos
          </h2>
          <p className="about-us-description">
            Frescura Tica se dedica a ofrecer lo mejor en productos frescos y orgánicos, asegurando calidad y un impacto positivo en el medio ambiente.
          </p>
          <Grid container spacing={4} justifyContent="center">
            {conocenosImages.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className="about-us-card">
                  <CardMedia
                    component="img"
                    height="200"
                    image={image} 
                    alt={`Imagen ${index + 1}`}
                  />
                  <CardContent>
                    <h3 className="about-us-card-title">
                      {index === 0 ? "Calidad Garantizada" : "Sustentabilidad"}
                    </h3>
                    <p className="about-us-card-description">
                      {index === 0
                        ? "Productos con los más altos estándares de calidad."
                        : "Promovemos prácticas agrícolas responsables."}
                    </p>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </>
    );
  };
  
  export default HomeComponent;