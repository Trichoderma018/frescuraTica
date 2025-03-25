import React, { useState, useEffect } from 'react';
import '../styles/HeroSlider.css'

const slides = [
  {
    image: "../../public/assets/images/image.png",
    title: "Productos Frescos del Campo",
    description: "Directamente de nuestros agricultores a tu mesa"
  },
  {
    image: "../../public/assets/images/productos-agricolas.avif",
    title: "Frutas de Temporada",
    description: "Selección premium de frutas frescas"
  },
  {
    image: "../../public/assets/images/image.png",
    title: "Frutas de Temporada",
    description: "Selección premium de frutas frescas"
  },
  {
    image: "../../public/assets/images/canasta.avif",
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
    <div className="slider-container">
      <div className="slider-content">
        <div className="slider-image-container">
          <img
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            className={isLoading ? 'image-hidden' : 'image-visible'}
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
            }}
            onLoad={() => setIsLoading(false)}
          />
        </div>
        
        <div className="slider-overlay">
          <div className="slider-text-container">
            <h1 className={isTransitioning ? 'title-transitioning' : 'title-visible'}>
              {slides[currentIndex].title}
            </h1>
            <p className={isTransitioning ? 'description-transitioning' : 'description-visible'}>
              {slides[currentIndex].description}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="prev-button"
        aria-label="Previous slide"
      >
        &lt;--
      </button>
      
      <button
        onClick={nextSlide}
        className="next-button"
        aria-label="Next slide"
      >
        --&gt;
      </button>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={index === currentIndex ? 'dot-active' : 'dot'}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;