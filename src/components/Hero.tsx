'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920',
    subtitle: 'Nueva Colección',
    title: 'PRIMAVERA 2025',
    description: 'Descubre las últimas tendencias en moda femenina',
    cta: 'COMPRAR AHORA',
  },
  {
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920',
    subtitle: 'Exclusivo Online',
    title: 'VESTIDOS DE ENSUEÑO',
    description: 'Piezas únicas para momentos especiales',
    cta: 'VER COLECCIÓN',
  },
  {
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920',
    subtitle: 'Hasta 40% OFF',
    title: 'SALE DE TEMPORADA',
    description: 'Los mejores estilos a precios increíbles',
    cta: 'IR A SALE',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center text-center text-white">
            <div
              className={`max-w-2xl px-4 transition-all duration-700 ${
                index === currentSlide
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="text-sm md:text-base tracking-[0.3em] mb-4 block">
                {slide.subtitle}
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-[0.2em] mb-4">
                {slide.title}
              </h2>
              <p className="text-base md:text-lg mb-8 opacity-90">
                {slide.description}
              </p>
              <a href="#productos" className="btn btn-primary bg-white text-[var(--secondary)] hover:bg-[var(--primary)] hover:text-white">
                {slide.cta}
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
