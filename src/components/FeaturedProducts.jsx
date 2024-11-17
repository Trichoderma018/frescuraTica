import React from 'react';

const FeaturedProducts = () => {
  const products = [
    {
      name: "Frutas Frescas",
      description: "Selección de frutas de temporada cultivadas con amor",
      icon: "🍎",
      features: ["100% Naturales", "Sin pesticidas", "De temporada"]
    },
    {
      name: "Verduras Orgánicas",
      description: "Cultivo sostenible y saludable para tu bienestar",
      icon: "🥬",
      features: ["Certificado orgánico", "Cultivo local", "Máxima frescura"]
    },
    {
      name: "Productos Locales",
      description: "Apoyando a agricultores locales y su desarrollo",
      icon: "🌾",
      features: ["Comercio justo", "Apoyo local", "Calidad premium"]
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-green-800">
          Nuestros Productos Destacados
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Descubre nuestra selección de productos premium, cultivados con las mejores prácticas agrícolas
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-6xl mb-6 text-center transform hover:scale-110 transition-transform duration-300">
                {product.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center text-green-800">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                {product.description}
              </p>
              <ul className="space-y-3">
                {product.features.map((feature, idx) => (
                  <li 
                    key={idx} 
                    className="flex items-center text-gray-700 bg-green-50 p-2 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <span className="mr-2 text-green-600">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;