// Importación de React
import React from 'react';

// Datos de ejemplo para pagos
const payments = [
  { id: 1, type: 'Compra', date: '01-10-2024', amount: '$1,200' },
  { id: 2, type: 'Venta', date: '02-10-2024', amount: '$2,500' },
  { id: 3, type: 'Compra', date: '03-10-2024', amount: '$1,000' },
];

// Componente de listado de pagos
const PaymentList = () => {
  return (
    <div className="payment-list bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">Detalles de Pagos</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Tipo</th>
            <th className="py-2">Fecha</th>
            <th className="py-2">Monto</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="hover:bg-gray-50">
              <td className="py-2">{payment.id}</td>
              <td className="py-2">{payment.type}</td>
              <td className="py-2">{payment.date}</td>
              <td className="py-2">{payment.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentList;
