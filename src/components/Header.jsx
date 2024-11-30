import React, { useState } from "react";
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  Box,
  Select,
  MenuItem,
  Button,
  InputBase,
  IconButton,
} from "@mui/material";
import {
  AccountCircle as AccountCircleIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { path: "/home", display: "Inicio" },
  { path: "/about", display: "Nosotros" },
  { path: "/orders", display: "Pedidos" },
  { path: "/payment", display: "Pagos" },
  { path: "/inventory", display: "Inventario" },
  
];

const Header = () => {
  const [localName, setLocalName] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // Obtener la ruta actual

  const handleLocalChange = (event) => {
    setLocalName(event.target.value);
  };

  const handleSearch = () => {
    navigate(`/search?local=${localName}`);
  };

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        background: "linear-gradient(to bottom, #87CEEB, #B0E0E6)",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Nubes animadas */}
      <Box
        sx={{
          position: "absolute",
          top: "10px",
          left: "-60px",
          width: "120px",
          height: "60px",
          backgroundColor: "#ffffff",
          borderRadius: "50%",
          opacity: 0.7,
          boxShadow: "40px 20px 0 0 #ffffff",
          animation: "float 20s infinite ease-in-out",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50px",
          right: "-80px",
          width: "160px",
          height: "80px",
          backgroundColor: "#ffffff",
          borderRadius: "50%",
          opacity: 0.7,
          boxShadow: "50px 30px 0 0 #ffffff",
          animation: "float 20s infinite ease-in-out",
          animationDelay: "5s",
        }}
      />

      {/* Sección superior del encabezado */}
      <Toolbar>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h5"
              component={Link}
              to="/home"
              sx={{
                textDecoration: "none",
                color: "primary.main",
                fontWeight: "bold",
              }}
            >
              Frescura Tica
            </Typography>
          </Box>

          {/* Información de contacto y login */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2">Ayuda: +506 8888-8888</Typography>
            <Button
              startIcon={<AccountCircleIcon />}
              variant="outlined"
              color="primary"
              component={Link}
              to="/singIn"
            >
              Iniciar Sesión
            </Button>
          </Box>
        </Container>
      </Toolbar>

      {/* Barra de navegación */}
      <Toolbar
        variant="dense"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Selector de local */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Select
              value={localName}
              onChange={handleLocalChange}
              displayEmpty
              variant="outlined"
              size="small"
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="" disabled>
                Seleccione un local
              </MenuItem>
              <MenuItem value="San Jose">San Jose - Frescura Tica</MenuItem>
            </Select>

            <Button variant="contained" color="primary" onClick={handleSearch}>
              Buscar
            </Button>
          </Box>

          {/* Menú de navegación */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navLinks.map((link) => (
              <Button
                key={link.path}
                component={Link}
                to={link.path}
                color="inherit"
                variant={location.pathname === link.path ? "contained" : "text"}
                sx={{
                  fontWeight: location.pathname === link.path ? "bold" : "normal",
                  backgroundColor:
                    location.pathname === link.path ? "#556B2F" : "transparent",
                  color:
                    location.pathname === link.path ? "#FFFFFF" : "#000000",
                  "&:hover": {
                    backgroundColor: "#6B8E23",
                    color: "#FFFFFF",
                  },
                }}
              >
                {link.display}
              </Button>
            ))}
          </Box>

          {/* Barra de búsqueda */}
          <Box
            sx={{ display: "flex", alignItems: "center", position: "relative" }}
          >
            <InputBase
              placeholder="Buscar..."
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                px: 1,
                mr: 1,
              }}
            />
            <IconButton color="primary">
              <SearchIcon />
            </IconButton>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
