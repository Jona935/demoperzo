'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';

export default function NuevosPage() {
  const newProducts = products.filter((p) => p.badge === 'new');

  return (
    <main>
      <Header />

      {/* Hero Banner */}
      <section style={{
        backgroundColor: 'var(--muted)',
        padding: '60px 20px',
        textAlign: 'center',
      }}>
        <div className="container">
          <h1 style={{ fontSize: '36px', marginBottom: '12px' }}>NUEVOS LLEGADOS</h1>
          <p style={{ color: 'var(--muted-foreground)', maxWidth: '500px', margin: '0 auto' }}>
            Descubre las últimas incorporaciones a nuestra colección
          </p>
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
            {newProducts.length > 0 ? (
              newProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
