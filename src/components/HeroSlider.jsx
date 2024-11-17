import React, { useState, useEffect } from 'react';

const slides = [
  {
    image: "/images/fruta-frescas.jpg",
    title: "Productos Frescos del Campo",
    description: "Directamente de nuestros agricultores a tu mesa"
  },
  {
    image: "/images/productos-agricolas.avif",
    title: "Frutas de Temporada",
    description: "Selección premium de frutas frescas"
  },
  {
    image: "/images/fruta-frescas.jpg",
    title: "Frutas de Temporada",
    description: "Selección premium de frutas frescas"
  },
  {
    image: "/images/canasta.avif",
    title: "Verduras Orgánicas",
    description: "Cultivadas con amor y cuidado del medio ambiente"
  }
];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    const img = new Image();
    img.src = slides[nextIndex].image;
  }, [currentIndex]);

  return (
    <div className="relative w-full h-[600px] group overflow-hidden">
      <div className="relative h-full w-full">
        <div className="absolute inset-0 transition-transform duration-500 ease-in-out">
          <img
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
            }}
            onLoad={() => setIsLoading(false)}
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60">
          <div className="flex flex-col items-center justify-center h-full text-white px-4">
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 text-center shadow-text transform transition-all duration-500 ${
              isTransitioning ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
            }`}>
              {slides[currentIndex].title}
            </h1>
            <p className={`text-xl md:text-2xl text-center max-w-3xl shadow-text transform transition-all duration-500 delay-100 ${
              isTransitioning ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
            }`}>
              {slides[currentIndex].description}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 p-4 bg-black/20 text-white rounded-full hover:bg-black/40 transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        &lt;--
      </button>
      
      <button
        onClick={nextSlide}
        className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 p-4 bg-black/20 text-white rounded-full hover:bg-black/40 transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        --&gt;
      </button>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
              index === currentIndex ? 'bg-white scale-110' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        .shadow-text {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;