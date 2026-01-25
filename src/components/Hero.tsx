'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920',
    subtitle: 'Nueva Colección',
    title: 'PRIMAVERA 2025',
    description: 'Descubre las últimas tendencias',
    cta: 'COMPRAR AHORA',
    link: '/nuevos',
  },
  {
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920',
    subtitle: 'Exclusivo Online',
    title: 'VESTIDOS',
    description: 'Piezas únicas para ti',
    cta: 'VER COLECCIÓN',
    link: '/vestidos',
  },
  {
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920',
    subtitle: 'Hasta 40% OFF',
    title: 'SALE',
    description: 'Los mejores precios',
    cta: 'IR A SALE',
    link: '/sale',
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

  return (
    <section style={{
      position: 'relative',
      height: '65vh',
      minHeight: '400px',
      maxHeight: '700px',
      overflow: 'hidden',
    }}>
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 0.8s ease',
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.35)',
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'white',
            padding: '20px',
          }}>
            <div style={{
              maxWidth: '500px',
              opacity: index === currentSlide ? 1 : 0,
              transform: index === currentSlide ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s ease',
            }}>
              <span style={{
                fontSize: '12px',
                letterSpacing: '0.25em',
                marginBottom: '12px',
                display: 'block',
                opacity: 0.9,
              }}>
                {slide.subtitle}
              </span>
              <h2 style={{
                fontSize: 'clamp(32px, 8vw, 56px)',
                letterSpacing: '0.15em',
                marginBottom: '12px',
                fontWeight: 400,
              }}>
                {slide.title}
              </h2>
              <p style={{
                fontSize: '14px',
                marginBottom: '24px',
                opacity: 0.9,
              }}>
                {slide.description}
              </p>
              <Link
                href={slide.link}
                style={{
                  display: 'inline-block',
                  padding: '14px 32px',
                  backgroundColor: 'white',
                  color: 'var(--secondary)',
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  transition: 'all 0.3s ease',
                }}
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Hidden on mobile */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="hero-arrow"
        style={{
          position: 'absolute',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '44px',
          height: '44px',
          backgroundColor: 'rgba(255,255,255,0.2)',
          border: 'none',
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="hero-arrow"
        style={{
          position: 'absolute',
          right: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '44px',
          height: '44px',
          backgroundColor: 'rgba(255,255,255,0.2)',
          border: 'none',
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px',
      }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: index === currentSlide ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        @media (min-width: 768px) {
          .hero-arrow {
            display: flex !important;
          }
          .hero-arrow:hover {
            background-color: rgba(255,255,255,0.4) !important;
          }
        }
      `}</style>
    </section>
  );
}
