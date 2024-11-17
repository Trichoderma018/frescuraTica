// Importación de React y librerías para gráficas
import React from 'react';
import { Line } from 'react-chartjs-2';

// Componente de estadísticas de pagos
const PaymentStats = () => {
  // Datos de ejemplo para el gráfico de líneas
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Ventas',
        data: [3000, 4000, 5000, 6000, 7000, 8000],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
      {
        label: 'Compras',
        data: [2000, 3000, 4000, 3000, 4000, 5000],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  return (
    <div className="payment-stats bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">Estadísticas Mensuales</h2>
      <Line data={data} />
    </div>
  );
};

export default PaymentStats;
