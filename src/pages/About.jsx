import React from "react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para la navegación
import { Container, Typography, Grid, Box, Paper, Button } from "@mui/material";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";

const About = () => {
  const navigate = useNavigate(); // Hook para redirigir al usuario

  const handleNavigateToHome = () => {
    navigate("/home"); // Redirige a la ruta '/home'
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Box textAlign="center" sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Acerca de Frescura Tica
        </Typography>
        <Typography variant="body1" color="textSecondary">
          En Frescura Tica, nos esforzamos por ofrecer los mejores productos agrícolas y orgánicos de Costa Rica.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center", bgcolor: "#e8f5e9" }}>
            <AgricultureIcon fontSize="large" color="primary" />
            <Typography variant="h5" gutterBottom>
              Nuestra Visión
            </Typography>
            <Typography variant="body1">
              Ser la tienda líder en productos agrícolas y orgánicos en Costa Rica, reconocida por nuestra calidad y
              compromiso con el medio ambiente.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center", bgcolor: "#f1f8e9" }}>
            <StarIcon fontSize="large" color="secondary" />
            <Typography variant="h5" gutterBottom>
              Nuestros Valores
            </Typography>
            <Typography variant="body1">
              <strong>Calidad:</strong> Cada producto cumple con los más altos estándares. <br />
              <strong>Sostenibilidad:</strong> Fomentamos prácticas responsables. <br />
              <strong>Transparencia:</strong> Brindamos confianza y honestidad.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box textAlign="center" sx={{ mt: 5 }}>
        <Paper elevation={1} sx={{ p: 4, bgcolor: "#fce4ec" }}>
          <VerifiedIcon fontSize="large" color="success" />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            ¡Gracias por elegir Frescura Tica!
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Juntos, hacemos la diferencia en la alimentación saludable.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNavigateToHome} // Llama a la función de redirección
            sx={{ px: 4, py: 1, borderRadius: "20px" }}
          >
            Ir a la Tienda
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default About;
