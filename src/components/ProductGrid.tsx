'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { products } from '@/lib/data';

interface ProductGridProps {
  title: string;
  filter?: 'new' | 'bestseller' | 'sale' | 'all';
  limit?: number;
  showLoadMore?: boolean;
  showViewAll?: boolean;
  viewAllLink?: string;
}

export default function ProductGrid({
  title,
  filter = 'all',
  limit = 8,
  showLoadMore = false,
  showViewAll = false,
  viewAllLink = '/nuevos',
}: ProductGridProps) {
  const [visibleCount, setVisibleCount] = useState(limit);

  const filteredProducts = filter === 'all'
    ? products
    : products.filter((p) => p.badge === filter);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <section style={{ padding: '40px 0' }} id="productos">
      <div className="container">
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
        }}>
          <h2 style={{
            fontSize: 'clamp(18px, 5vw, 28px)',
            letterSpacing: '0.15em',
            margin: 0,
          }}>
            {title}
          </h2>
          {showViewAll && (
            <Link
              href={viewAllLink}
              style={{
                fontSize: '12px',
                letterSpacing: '0.1em',
                color: 'var(--muted-foreground)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--muted-foreground)',
                paddingBottom: '2px',
              }}
            >
              VER TODO
            </Link>
          )}
        </div>

        {/* Products Grid */}
        <div className="home-products-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
        }}>
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More */}
        {showLoadMore && hasMore && (
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="btn btn-secondary"
            >
              CARGAR MÁS
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        .home-products-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (min-width: 640px) {
          .home-products-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
        }
        @media (min-width: 1024px) {
          .home-products-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}
