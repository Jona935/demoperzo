'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';

export default function SalePage() {
  const saleProducts = products.filter((p) => p.badge === 'sale' || p.originalPrice);

  return (
    <main>
      <Header />

      {/* Hero Banner */}
      <section style={{
        backgroundColor: 'var(--primary)',
        padding: '80px 20px',
        textAlign: 'center',
      }}>
        <div className="container">
          <span style={{
            display: 'inline-block',
            backgroundColor: 'white',
            color: 'var(--primary)',
            padding: '8px 20px',
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            marginBottom: '20px',
          }}>
            HASTA 40% OFF
          </span>
          <h1 style={{ fontSize: '48px', color: 'white', marginBottom: '12px' }}>SALE</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '500px', margin: '0 auto', fontSize: '18px' }}>
            Los mejores estilos a precios increíbles. ¡No te los pierdas!
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
            {saleProducts.length} productos en oferta
          </p>
          <select style={{
            padding: '10px 16px',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            fontSize: '14px',
            outline: 'none',
          }}>
            <option>Ordenar por: Mayor Descuento</option>
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
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
