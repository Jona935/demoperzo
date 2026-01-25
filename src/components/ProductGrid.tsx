'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '@/lib/data';

interface ProductGridProps {
  title: string;
  filter?: 'new' | 'bestseller' | 'sale' | 'all';
  limit?: number;
  showLoadMore?: boolean;
}

export default function ProductGrid({
  title,
  filter = 'all',
  limit = 8,
  showLoadMore = false,
}: ProductGridProps) {
  const [visibleCount, setVisibleCount] = useState(limit);

  const filteredProducts = filter === 'all'
    ? products
    : products.filter((p) => p.badge === filter);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <section className="py-16 md:py-24" id="productos">
      <div className="container">
        <h2 className="text-3xl md:text-4xl text-center mb-12">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {showLoadMore && hasMore && (
          <div className="text-center mt-12">
            <button onClick={loadMore} className="btn btn-secondary">
              CARGAR MÁS
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
