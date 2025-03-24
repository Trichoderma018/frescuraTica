import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/PaymentComponent.css";

const PaymentComponent = () => {
  // Estado para almacenar la información del pago
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState(0);
  const [sinpeReceipt, setSinpeReceipt] = useState(null);
  const [cashCode, setCashCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  
  // Obtener la ubicación actual para acceder a los datos del estado
  const location = useLocation();
  const navigate = useNavigate();

  // Cuando el componente se monta, verificar si hay datos de carrito en location.state
  useEffect(() => {
    if (location.state && location.state.total) {
      setAmount(location.state.total);
    }
  }, [location]);

  // Función para manejar el envío del formulario de pago
  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Simulamos una petición asíncrona con setTimeout
    setTimeout(() => {
      setSnackbarMessage("¡Pago realizado con éxito!");
      setSnackbarOpen(true);
      setLoading(false);
      
      // Limpiar el formulario después del pago exitoso
      setCardNumber("");
      setCardHolder("");
      setExpiryDate("");
      setCvv("");
      setSinpeReceipt(null);
      setCashCode("");
    }, 1500);
  };

  // Función para generar un código aleatorio para pagos en efectivo
  const generateCashCode = () => {
    const code = Math.floor(10000 + Math.random() * 90000);
    setCashCode(code);
    alert(`Tu código para pago en efectivo es: ${code}`);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Función para volver a la página anterior
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="payment-container">
      <div className="payment-paper">
        {/* Título principal de la página */}
        <h2 className="payment-title">Pago Seguro</h2>

        {/* Mensaje informativo */}
        <p className="payment-message">
          Completa tu información de pago para procesar tu pedido de forma segura.
        </p>

        {/* Formulario de pago */}
        <form onSubmit={handlePaymentSubmit} className="payment-form">
          <div className="payment-grid">
            {/* Columna para Pago con Tarjeta */}
            <div className="payment-column">
              <h3 className="payment-subtitle">Pago con Tarjeta</h3>
              <div className="form-group">
                <span className="input-icon">🔒</span>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Número de Tarjeta"
                  className="payment-input"
                />
              </div>
              <div className="form-group">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  placeholder="Nombre del Titular"
                  className="payment-input"
                />
              </div>
              <div className="form-row">
                <div className="form-group half">
                  <span className="input-icon">📅</span>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="Fecha de Expiración (MM/AA)"
                    className="payment-input"
                  />
                </div>
                <div className="form-group half">
                  <span className="input-icon">🔒</span>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="CVV"
                    className="payment-input-cvv"
                  />
                </div>
              </div>
            </div>

            {/* Columna para Pago en Efectivo */}
            <div className="payment-column">
              <h3 className="payment-subtitle">Pago en Efectivo</h3>
              <p className="payment-text">
                Puedes realizar tu pago en efectivo en cualquiera de nuestras sucursales o solicitarlo por Exprés (con costo adicional).
              </p>
              <button
                type="button"
                onClick={generateCashCode}
                className="payment-button secondary"
              >
                Generar Código de Pago en Efectivo
              </button>
              {cashCode && (
                <p className="payment-code">
                  Tu código es: <strong>{cashCode}</strong>
                </p>
              )}
            </div>

            {/* Columna para Sinpe Móvil */}
            <div className="payment-column">
              <h3 className="payment-subtitle">Sinpe Móvil</h3>
              <p className="payment-text">
                Realiza tu pago a través de Sinpe Móvil a:
              </p>
              <p className="payment-text bold">
                Número: 8888-8888
              </p>
              <p className="payment-text">
                A nombre de: Frescura Tica
              </p>
              <p className="payment-text">
                Por favor, sube una foto del comprobante del pago:
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSinpeReceipt(e.target.files[0])}
                className="payment-file-input"
              />
            </div>
          </div>

          {/* Campo para monto total */}
          <div className="amount-container">
            <div className="form-group">
              <span className="input-icon">💵</span>
              <input
                type="text"
                value={`₡${amount.toFixed(2)}`}
                readOnly
                className="payment-input"
                disabled
              />
            </div>
          </div>

          {/* Botón para procesar el pago */}
          <div className="button-container">
            <button
              type="button"
              onClick={handleGoBack}
              className="payment-button secondary"
            >
              Volver
            </button>
            <button
              type="submit"
              className="payment-button primary"
              disabled={loading}
            >
              {loading ? "Procesando..." : "Procesar Pago"}
            </button>
          </div>
        </form>
      </div>

      {/* Snackbar para mostrar el mensaje de éxito o error */}
      {snackbarOpen && (
        <div className={`snackbar ${snackbarMessage.includes("Error") ? "error" : "success"}`}>
          <span>{snackbarMessage}</span>
          <button onClick={handleCloseSnackbar} className="snackbar-close">×</button>
        </div>
      )}

      {/* Mensaje de pie de página */}
      <div className="payment-footer">
        <p className="payment-disclaimer">
          * Todos los pagos son procesados de forma segura.
        </p>
      </div>
    </div>
  );
};

export default PaymentComponent;