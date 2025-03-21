import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import llamados from "../services/llamados";
import '../styles/OrdersComponet.css';

const OrdersComponet = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    cargarInventario();
  }, []);

  const cargarInventario = async () => {
    try {
      const data = await llamados.GetData("inventario");
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener el inventario:", error);
    }
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    setSnackbarMessage(`${product.nombre} ha sido añadido al carrito.`);
    setOpenSnackbar(true);
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    setSnackbarMessage("Producto eliminado del carrito.");
    setOpenSnackbar(true);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.precio * item.quantity, 0);
  };

  const handleConfirmOrder = () => {
    navigate("/payment", {
      state: {
        cart,
        total: calculateTotalPrice(),
      },
    });
  };

  return (
    <Container className="orders-container">
      <h1 className="orders-title">
        <ShoppingCartIcon className="cart-icon" /> Realiza tu Pedido
      </h1>
      <p className="orders-description">
        Selecciona los productos que desees añadir a tu pedido y confirma la cantidad.
      </p>

      <div className="products-grid">
        {products.map((product) => (
          <Card key={product.id} className="product-card">
            <img src={product.url} alt={product.nombre} className="product-image" />
            <CardContent className="product-info">
              <h2 className="product-name">{product.nombre}</h2>
              <p className="product-price">Precio: ₡{product.precio} por unidad</p>
              <Button onClick={() => handleAddToCart(product)} className="add-to-cart-btn">
                Añadir al Carrito
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="cart-title">Tu Carrito de Compras</h2>
      
      {cart.length > 0 ? (
        <>
          <List className="cart-list">
            {cart.map((item) => (
              <ListItem key={item.id} className="cart-item">
                <ListItemText 
                  primary={`${item.nombre} (x${item.quantity})`} 
                  secondary={`Precio: ₡${(item.precio * item.quantity).toFixed(2)}`} 
                  className="cart-item-text"
                />
                <IconButton onClick={() => handleRemoveFromCart(item.id)} className="remove-cart-btn">
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <p className="cart-total">Total: ₡{calculateTotalPrice().toFixed(2)}</p>
          <Button onClick={handleConfirmOrder} className="confirm-order-btn">
            Confirmar Pedido
          </Button>
        </>
      ) : (
        <p className="empty-cart-message">
          No tienes productos en tu carrito. ¡Agrega tus favoritos para comenzar!
        </p>
      )}

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="success" className="snackbar-alert">{snackbarMessage}</Alert>
      </Snackbar>
    </Container>
  );
};

export default OrdersComponet;
