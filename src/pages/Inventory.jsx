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
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda de productos
  const [editingProduct, setEditingProduct] = useState(null); // Estado para editar un producto existente

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

  // Función para manejar la edición de productos
  const handleEditProduct = async (product) => {
    setEditingProduct(product); // Establecemos el producto a editar
    setNewProduct({ name: product.name, quantity: product.quantity, price: product.price }); // Cargamos los datos del producto a editar
  };

  // Función para guardar los cambios en un producto editado
  const handleSaveEditedProduct = async () => {
    if (!newProduct.name || newProduct.quantity <= 0 || newProduct.price <= 0) {
      setSnackbarMessage("Por favor ingresa datos válidos para el producto.");
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await fetch(`/api/inventory/${editingProduct.id}`, { // URL para editar producto
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct), // Enviamos los datos editados
      });

      if (!response.ok) {
        throw new Error("No se pudo editar el producto.");
      }

      setSnackbarMessage("Producto editado exitosamente.");
      setSnackbarOpen(true);
      fetchProducts(); // Volver a cargar los productos
      setNewProduct({ name: "", quantity: 0, price: 0 }); // Limpiar el formulario
      setEditingProduct(null); // Limpiar el estado de edición
    } catch (error) {
      console.error("Error al editar el producto:", error);
      setSnackbarMessage("Hubo un error al editar el producto.");
      setSnackbarOpen(true);
    }
  };

  // Función para manejar la búsqueda de productos
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase()); // Actualizamos el estado con el valor de la búsqueda
  };

  // useEffect para cargar los productos al montar el componente
  useEffect(() => {
    fetchProducts(); // Llamamos a la función para obtener los productos
  }, []); // Dependencias vacías para que se ejecute solo una vez

  return (
    <Container maxWidth="md" style={{ marginTop: '40px', marginBottom: '40px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Inventario de Productos
      </Typography>

      {/* Barra de búsqueda */}
      <Box mb={4}>
        <TextField
          label="Buscar Producto"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
        />
      </Box>

      {/* Cargando productos */}
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
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Filtrar productos por la búsqueda */}
                {products
                  .filter(product => product.name.toLowerCase().includes(searchQuery))
                  .map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="secondary" onClick={() => handleEditProduct(product)}>
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Mensaje si no hay productos */}
          {products.length === 0 && (
            <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
              No hay productos disponibles en el inventario.
            </Typography>
          )}

          {/* Formulario para agregar o editar productos */}
          <Box mt={4} p={2} bgcolor="#f5f5f5" borderRadius={2}>
            <Typography variant="h6" gutterBottom>
              {editingProduct ? "Editar Producto" : "Agregar Nuevo Producto"}
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
              onClick={editingProduct ? handleSaveEditedProduct : handleAddProduct}
              fullWidth
              style={{ marginTop: '20px' }}
            >
              {editingProduct ? "Guardar Cambios" : "Agregar Producto"}
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
        <Alert onClose={() => setSnackbarOpen(false)} severity={error ? "error" : "success"} sx={{ width: '100%' }}>
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

export default Inventory;
