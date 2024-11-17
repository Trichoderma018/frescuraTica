// Importación de React
import React from 'react';

// Componente de resumen de pagos
const PaymentSummary = () => {
  return (
    <div className="payment-summary bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">Resumen de Pagos</h2>
      <div className="text-center space-y-2">
        <p className="text-lg">Total Ventas: <span className="font-semibold">$25,000</span></p>
        <p className="text-lg">Total Compras: <span className="font-semibold">$15,000</span></p>
        <p className="text-lg">Ganancias: <span className="font-semibold text-green-600">$10,000</span></p>
      </div>
    </div>
  );
};

export default PaymentSummary;

