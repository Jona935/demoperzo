'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';
import { ChevronRight, SlidersHorizontal, X } from 'lucide-react';

interface CollectionPageProps {
  title: string;
  products: Product[];
  breadcrumb?: string;
}

export default function CollectionPage({ title, products, breadcrumb }: CollectionPageProps) {
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        return b.id.localeCompare(a.id);
      default:
        return 0;
    }
  });

  return (
    <main style={{ overflowX: 'hidden' }}>
      <Header />

      {/* Breadcrumb */}
      <div style={{
        padding: '16px 0',
        borderBottom: '1px solid var(--border)',
      }}>
        <div className="container">
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: 'var(--muted-foreground)',
          }}>
            <Link href="/" style={{ color: 'var(--muted-foreground)', textDecoration: 'none' }}>
              Inicio
            </Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--secondary)' }}>{breadcrumb || title}</span>
          </nav>
        </div>
      </div>

      {/* Collection Header */}
      <div style={{
        padding: '40px 0',
        textAlign: 'center',
      }}>
        <div className="container">
          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 42px)',
            marginBottom: '8px',
            letterSpacing: '0.2em',
          }}>
            {title}
          </h1>
          <p style={{
            color: 'var(--muted-foreground)',
            fontSize: '14px',
          }}>
            {products.length} productos
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div style={{
        padding: '12px 0',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: '60px',
        backgroundColor: 'white',
        zIndex: 20,
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}>
            {/* Filter Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="filter-btn-mobile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                border: '1px solid var(--border)',
                background: 'none',
                cursor: 'pointer',
                fontSize: '12px',
                letterSpacing: '0.1em',
              }}
            >
              <SlidersHorizontal size={16} />
              FILTRAR
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '10px 16px',
                border: '1px solid var(--border)',
                background: 'white',
                cursor: 'pointer',
                fontSize: '12px',
                letterSpacing: '0.05em',
                outline: 'none',
                minWidth: '180px',
              }}
            >
              <option value="featured">Destacados</option>
              <option value="newest">Más Nuevos</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {showFilters && (
        <>
          <div
            onClick={() => setShowFilters(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 50,
            }}
          />
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            width: '280px',
            maxWidth: '85vw',
            backgroundColor: 'white',
            zIndex: 51,
            overflowY: 'auto',
            boxShadow: '4px 0 20px rgba(0,0,0,0.1)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px',
              borderBottom: '1px solid var(--border)',
            }}>
              <h3 style={{ fontSize: '14px', letterSpacing: '0.15em' }}>FILTROS</h3>
              <button
                onClick={() => setShowFilters(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '12px', letterSpacing: '0.1em', marginBottom: '12px', color: 'var(--muted-foreground)' }}>
                  TALLA
                </h4>
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <label key={size} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ width: '16px', height: '16px' }} />
                    <span style={{ fontSize: '14px' }}>{size}</span>
                  </label>
                ))}
              </div>
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '12px', letterSpacing: '0.1em', marginBottom: '12px', color: 'var(--muted-foreground)' }}>
                  COLOR
                </h4>
                {['Negro', 'Blanco', 'Rosa', 'Beige'].map((color) => (
                  <label key={color} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ width: '16px', height: '16px' }} />
                    <span style={{ fontSize: '14px' }}>{color}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={() => setShowFilters(false)}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                APLICAR FILTROS
              </button>
            </div>
          </div>
        </>
      )}

      {/* Products Grid */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container">
          {products.length > 0 ? (
            <div className="products-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
            }}>
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
            }}>
              <p style={{ fontSize: '16px', color: 'var(--muted-foreground)', marginBottom: '20px' }}>
                No hay productos en esta categoría
              </p>
              <Link href="/" className="btn btn-secondary">
                VER TODOS LOS PRODUCTOS
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        .products-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        @media (min-width: 640px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
        }

        @media (min-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
          }
          .filter-btn-mobile {
            display: none !important;
          }
        }
      `}</style>
    </main>
  );
}
