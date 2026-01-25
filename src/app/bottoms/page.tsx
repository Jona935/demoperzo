'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';

export default function BottomsPage() {
  const bottoms = products.filter((p) => p.category === 'bottoms');

  return (
    <main>
      <Header />

      {/* Hero Banner */}
      <section style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        padding: '100px 20px',
        textAlign: 'center',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '42px', color: 'white', marginBottom: '12px' }}>BOTTOMS</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '500px', margin: '0 auto' }}>
            Pantalones, faldas y jeans de tendencia
          </p>
        </div>
      </section>

      {/* Filters */}
      <section style={{
        padding: '20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div className="container" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}>
          <p style={{ margin: 0, color: 'var(--muted-foreground)', fontSize: '14px' }}>
            {bottoms.length} productos
          </p>
          <select style={{
            padding: '10px 16px',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            fontSize: '14px',
            outline: 'none',
          }}>
            <option>Ordenar por: Destacados</option>
            <option>Precio: Menor a Mayor</option>
            <option>Precio: Mayor a Menor</option>
            <option>Más Nuevos</option>
          </select>
        </div>
      </section>

      {/* Products */}
      <section style={{ padding: '60px 20px' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '24px',
          }}>
            {bottoms.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
