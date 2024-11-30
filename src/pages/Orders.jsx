import React, { useState } from "react";
import { 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  IconButton, 
  List, 
  ListItem, 
  ListItemText, 
  Snackbar, 
  Alert, 
  Box
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom"; // Para redirigir a otra página

const Orders = () => {
  const [cart, setCart] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate(); // Hook para manejar la navegación

  const products = [
    { id: "tomates", name: "Tomates Orgánicos", price: 2, img: "https://via.placeholder.com/150?text=Tomates" },
    { id: "lechuga", name: "Lechuga Fresca", price: 1.5, img: "https://via.placeholder.com/150?text=Lechuga" },
    { id: "zanahorias", name: "Zanahorias Ecológicas", price: 2.5, img: "https://via.placeholder.com/150?text=Zanahorias" },
  ];

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      setSnackbarMessage(`${product.name} ha sido añadido nuevamente al carrito.`);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      setSnackbarMessage(`${product.name} ha sido añadido al carrito.`);
    }
    setOpenSnackbar(true);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    setSnackbarMessage("Producto eliminado del carrito.");
    setOpenSnackbar(true);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleConfirmOrder = () => {
    // Redirigimos a Payments.jsx pasando los datos del carrito como estado
    navigate("/payment", {
      state: {
        cart, // Los productos seleccionados
        total: calculateTotalPrice(), // Precio total
      },
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h3" align="center" gutterBottom>
        <ShoppingCartIcon fontSize="large" /> Realiza tu Pedido
      </Typography>

      <Typography variant="body1" align="center" paragraph>
        Selecciona los productos que desees añadir a tu pedido y confirma la cantidad.
      </Typography>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="150"
                image={product.img}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">Precio: ${product.price.toFixed(2)} por unidad</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(product)}
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Añadir al Carrito
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" align="center" gutterBottom>
        Tu Carrito de Compras
      </Typography>

      {cart.length > 0 ? (
        <>
          <List>
            {cart.map((item) => (
              <ListItem key={item.id} sx={{ display: "flex", justifyContent: "space-between" }}>
                <ListItemText 
                  primary={`${item.name} (x${item.quantity})`} 
                  secondary={`Precio: $${(item.price * item.quantity).toFixed(2)}`} 
                />
                <IconButton
                  color="error"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>

          <Typography variant="h6" align="right" gutterBottom>
            Total: ${calculateTotalPrice().toFixed(2)}
          </Typography>

          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleConfirmOrder} // Redirige a Payments.jsx
          >
            Confirmar Pedido
          </Button>
        </>
      ) : (
        <Typography variant="body1" align="center" paragraph>
          No tienes productos en tu carrito. ¡Agrega tus favoritos para comenzar!
        </Typography>
      )}

      {/* Snackbar para mostrar mensajes */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Footer */}
      <Box sx={{ mt: 6, py: 4, bgcolor: "#2e7d32", color: "white", textAlign: "center" }}>
        <Typography variant="body2">
          © 2024 Frescura Tica. Todos los derechos reservados.
        </Typography>
      </Box>
    </Container>
  );
};

export default Orders;
