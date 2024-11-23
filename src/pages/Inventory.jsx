import React, { useEffect, useState } from "react"; // Importamos React y hooks
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Snackbar, Alert, CircularProgress, Box, TextField, Grid } from "@mui/material"; // Importamos más componentes de MUI

const Inventory = () => {
  // Estado para almacenar los productos del inventario
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para la carga de los datos
  const [error, setError] = useState(null); // Estado para manejar errores
  const [newProduct, setNewProduct] = useState({ name: "", quantity: 0, price: 0 }); // Estado para nuevos productos
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Estado para abrir el snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Mensaje de snackbar

  // Función para obtener los productos del inventario desde la base de datos
  const fetchProducts = async () => {
    setLoading(true); // Comienza a cargar
    try {
      const response = await fetch('/api/inventory'); // URL de la API que devuelve los productos
      const data = await response.json(); // Convertimos la respuesta a JSON
      setProducts(data); // Actualizamos el estado con los productos obtenidos
      setError(null); // Limpiar el error
    } catch (err) {
      console.error("Error al obtener el inventario:", err); // Manejo de errores
      setError("Error al cargar los productos."); // Guardamos el error en el estado
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  // Función para manejar el formulario de nuevo producto
  const handleAddProduct = async () => {
    if (!newProduct.name || newProduct.quantity <= 0 || newProduct.price <= 0) {
      setSnackbarMessage("Por favor ingresa datos válidos para el producto.");
      setSnackbarOpen(true);
      return;
    }

    // Llamada a la API para agregar un producto
    try {
      const response = await fetch('/api/inventory', { // URL de la API que maneja los productos
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct), // Enviamos los datos del nuevo producto
      });

      if (!response.ok) {
        throw new Error("No se pudo agregar el producto.");
      }

      setSnackbarMessage("Producto agregado exitosamente.");
      setSnackbarOpen(true);
      fetchProducts(); // Volver a cargar los productos
      setNewProduct({ name: "", quantity: 0, price: 0 }); // Limpiar el formulario
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      setSnackbarMessage("Hubo un error al agregar el producto.");
      setSnackbarOpen(true);
    }
  };

  // useEffect para cargar los productos al montar el componente
  useEffect(() => {
    fetchProducts(); // Llamamos a la función para obtener los productos
  }, []); // Dependencias vacías para que se ejecute solo una vez

  return (
    <Container maxWidth="md" style={{ marginTop: '40px', marginBottom: '40px' }}>
      {/* Título principal de la página */}
      <Typography variant="h4" align="center" gutterBottom>
        Inventario de Productos
      </Typography>

      {/* Contenedor de productos */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Tabla para mostrar el inventario */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre del Producto</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Precio</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Mapeamos los productos para crear filas en la tabla */}
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell> {/* Formateamos el precio */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Mensaje final en caso de que no haya productos */}
          {products.length === 0 && (
            <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
              No hay productos disponibles en el inventario.
            </Typography>
          )}

          {/* Formulario para agregar nuevos productos */}
          <Box mt={4} p={2} bgcolor="#f5f5f5" borderRadius={2}>
            <Typography variant="h6" gutterBottom>
              Agregar Nuevo Producto
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Nombre del Producto"
                  variant="outlined"
                  fullWidth
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Cantidad"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={newProduct.quantity}
                  onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Precio"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddProduct}
              fullWidth
              style={{ marginTop: '20px' }}
            >
              Agregar Producto
            </Button>
          </Box>
        </>
      )}

      {/* Snackbar para mostrar el mensaje de éxito o error */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={error ? "error" : "success"}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Inventory;
