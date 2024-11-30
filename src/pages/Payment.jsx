import React, { useState } from "react"; // Importamos React y useState para manejar el estado
import { Container, Typography, TextField, Button, Grid, Paper, Box, Divider, InputAdornment, Snackbar, Alert, CircularProgress } from "@mui/material"; // Importamos componentes de MUI

const Payment = () => {
  // Estado para almacenar la información del pago
  const [cardNumber, setCardNumber] = useState(""); // Número de tarjeta
  const [cardHolder, setCardHolder] = useState(""); // Nombre del titular de la tarjeta
  const [expiryDate, setExpiryDate] = useState(""); // Fecha de expiración
  const [cvv, setCvv] = useState(""); // Código CVV
  const [amount, setAmount] = useState(0); // Monto total a pagar (debería venir de los pedidos)
  const [sinpeReceipt, setSinpeReceipt] = useState(null); // Estado para almacenar el comprobante de Sinpe Móvil
  const [cashCode, setCashCode] = useState(""); // Código para pago en efectivo
  const [loading, setLoading] = useState(false); // Estado de carga
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Estado para mostrar el Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Mensaje del Snackbar

  // Función para manejar el envío del formulario de pago
  const handlePaymentSubmit = async (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    setLoading(true); // Activar el estado de carga

    const paymentData = {
      cardNumber,
      cardHolder,
      expiryDate,
      cvv,
      amount,
      sinpeReceipt: sinpeReceipt ? sinpeReceipt.name : null, // Solo enviamos el nombre del archivo si existe
      cashCode: cashCode || null, // Incluimos el código de pago en efectivo si existe
    };

    try {
      // Enviar los datos del pago al servidor
      const response = await fetch('/api/payment', { // URL de la API que maneja los pagos
        method: 'POST', // Método HTTP para enviar datos
        headers: {
          'Content-Type': 'application/json', // Tipo de contenido que estamos enviando
        },
        body: JSON.stringify(paymentData), // Convertir el objeto a JSON
      });

      if (!response.ok) {
        throw new Error('Error al procesar el pago'); // Manejo de errores si la respuesta no es OK
      }

      setSnackbarMessage('Pago realizado con éxito!'); // Mensaje de éxito
      setSnackbarOpen(true); // Abrir Snackbar
    } catch (error) {
      console.error("Error al procesar el pago:", error); // Manejo de errores en consola
      setSnackbarMessage('Error al procesar el pago, intente nuevamente.'); // Mensaje de error
      setSnackbarOpen(true); // Abrir Snackbar
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  // Función para generar un código aleatorio para pagos en efectivo.
  const generateCashCode = () => {
    const code = Math.floor(10000 + Math.random() * 90000); // Genera un número aleatorio entre 10000 y 99999.
    setCashCode(code); // Actualiza el estado con el nuevo código generado.
    alert(`Tu código para pago en efectivo es: ${code}`); // Muestra el código al usuario.
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '40px', marginBottom: '40px' }}>
      <Paper elevation={5} style={{ padding: '20px' }}>
        {/* Título principal de la página */}
        <Typography variant="h4" align="center" gutterBottom>
          Pago Seguro
        </Typography>

        {/* Mensaje informativo */}
        <Typography variant="body1" align="center" paragraph>
          Completa tu información de pago para procesar tu pedido de forma segura.
        </Typography>

        {/* Formulario de pago */}
        <form onSubmit={handlePaymentSubmit}>
          <Grid container spacing={3}>
            {/* Columna para Pago con Tarjeta */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Pago con Tarjeta
              </Typography>
              <TextField 
                label="Número de Tarjeta"
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                fullWidth
                required
                style={{ marginBottom: '16px' }}  // Añadido margen
                InputProps={{
                  startAdornment: <InputAdornment position="start">🔒</InputAdornment>,
                }}
              />
              <TextField 
                label="Nombre del Titular"
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                fullWidth
                required
                style={{ marginBottom: '16px' }}  // Añadido margen
                InputProps={{
                  startAdornment: <InputAdornment position="start">👤</InputAdornment>,
                }}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField 
                    label="Fecha de Expiración (MM/AA)"
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    fullWidth
                    required
                    style={{ marginBottom: '16px' }}  // Añadido margen
                    InputProps={{
                      startAdornment: <InputAdornment position="start">📅</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField 
                    label="CVV"
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    fullWidth
                    required
                    style={{ marginBottom: '16px' }}  // Añadido margen
                    InputProps={{
                      startAdornment: <InputAdornment position="start">🔒</InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Columna para Pago en Efectivo */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Pago en Efectivo
              </Typography>
              <Typography variant="body1">
                Puedes realizar tu pago en efectivo en cualquiera de nuestras sucursales o solicitarlo por Exprés (con costo adicional).
              </Typography>
              <Button variant="contained" color="secondary" onClick={generateCashCode} fullWidth style={{ marginBottom: '16px' }}>
                Generar Código de Pago en Efectivo
              </Button>
              {cashCode && (
                <Typography variant="body2" style={{ marginTop: '10px', fontWeight: 'bold' }}>
                  Tu código es: {cashCode}
                </Typography>
              )}
            </Grid>

            {/* Columna para Sinpe Móvil */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Sinpe Móvil
              </Typography>
              <Typography variant="body1">
                Realiza tu pago a través de Sinpe Móvil a:
              </Typography>
              <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                Número: 8888-8888
              </Typography>
              <Typography variant="body1">
                A nombre de: Frescura Tica
              </Typography>
              <Typography variant="body1">
                Por favor, sube una foto del comprobante del pago:
              </Typography>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setSinpeReceipt(e.target.files[0])}
                style={{ marginBottom: '16px' }}  // Añadido margen
              />
            </Grid>

            {/* Campo para monto total */}
            <Grid item xs={12}>
              <TextField 
                label="Monto Total"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                disabled
                style={{ marginBottom: '16px' }}  // Añadido margen
                InputProps={{
                  startAdornment: <InputAdornment position="start">💵</InputAdornment>,
                }}
              />
            </Grid>

            {/* Botón para procesar el pago */}
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Procesar Pago'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Snackbar para mostrar el mensaje de éxito o error */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={loading ? "info" : snackbarMessage.includes('Error') ? "error" : "success"}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Mensaje de pie de página o información adicional */}
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          * Todos los pagos son procesados de forma segura.
        </Typography>
      </Box>
    </Container>
  );
};

export default Payment;
