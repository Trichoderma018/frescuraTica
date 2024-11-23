import React, { useState } from 'react';
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
  IconButton
} from '@mui/material';
import { 
  AccountCircle as AccountCircleIcon, 
  Search as SearchIcon, 
  Menu as MenuIcon 
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const navLinks = [
  { path: '/home', display: 'Inicio' },
  { path: '/about', display: 'Nosotros' },
  { path: '/orders', display: 'Pedidos' },
  { path: '/payment', display: 'Pagos' },
  { path: '/inventory', display: 'Inventario' }
];

const Header = () => {
  const [localName, setLocalName] = useState('');
  const navigate = useNavigate();

  const handleLocalChange = (event) => {
    setLocalName(event.target.value);
  };

  const handleSearch = () => {
    navigate(`/search?local=${localName}`);
  };

  return (
    <AppBar 
      position="static" 
      color="default" 
      elevation={1} 
      sx={{ backgroundColor: '#8A9A5B' }}
    >
      {/* Sección superior del encabezado */}
      <Toolbar>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography 
              variant="h5" 
              component={Link} 
              to="/home" 
              sx={{ 
                textDecoration: 'none', 
                color: 'primary.main',
                fontWeight: 'bold'
              }}
            >
              Frescura Tica
            </Typography>
          </Box>

          {/* Información de contacto y login */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">
              Ayuda: +506 8888-8888
            </Typography>
            <Button 
              startIcon={<AccountCircleIcon />} 
              variant="outlined" 
              color="primary"
              component={Link}
              to="/signin"
            >
              Iniciar Sesión
            </Button>
          </Box>
        </Container>
      </Toolbar>

      {/* Barra de navegación */}
      <Toolbar variant="dense" sx={{ backgroundColor: '#8A9A5B' }}>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Selector de local */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Select
              value={localName}
              onChange={handleLocalChange}
              displayEmpty
              variant="outlined"
              size="small"
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="" disabled>Seleccione un local</MenuItem>
              <MenuItem value="San Jose">San Jose - Frescura Tica</MenuItem>
            </Select>

            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSearch}
            >
              Buscar
            </Button>
          </Box>

          {/* Menú de navegación */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {navLinks.map((link) => (
              <Button
                key={link.path}
                component={Link}
                to={link.path}
                color="#black"
                variant="text"
              >
                {link.display}
              </Button>
            ))}
          </Box>

          {/* Barra de búsqueda */}
          <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <InputBase
              placeholder="Buscar..."
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                px: 1,
                mr: 1
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