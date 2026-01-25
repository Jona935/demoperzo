'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
import QuickView from './QuickView';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addItem } = useCartStore();

  const handleQuickAdd = () => {
    addItem(product, product.sizes[0], product.colors[0]);
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'sale':
        return 'bg-red-500';
      case 'new':
        return 'bg-[var(--primary)]';
      case 'bestseller':
        return 'bg-[var(--secondary)]';
      case 'soldout':
        return 'bg-gray-500';
      default:
        return 'bg-[var(--primary)]';
    }
  };

  const getBadgeText = (badge: string) => {
    switch (badge) {
      case 'sale':
        return 'SALE';
      case 'new':
        return 'NUEVO';
      case 'bestseller':
        return 'TOP';
      case 'soldout':
        return 'AGOTADO';
      default:
        return badge.toUpperCase();
    }
  };

  return (
    <>
      <div
        className="product-card group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[var(--muted)] mb-4">
          <Image
            src={isHovered && product.hoverImage ? product.hoverImage : product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Badge */}
          {product.badge && (
            <span
              className={`absolute top-3 left-3 px-3 py-1 text-white text-xs tracking-wider ${getBadgeColor(
                product.badge
              )}`}
            >
              {getBadgeText(product.badge)}
            </span>
          )}

          {/* Discount Badge */}
          {product.originalPrice && (
            <span className="absolute top-3 right-3 bg-red-500 px-2 py-1 text-white text-xs">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}

          {/* Quick Actions */}
          <div className="quick-view absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 translate-y-4 transition-all duration-300 flex items-center justify-center gap-2">
            <button
              onClick={handleQuickAdd}
              className="w-10 h-10 bg-white flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-colors"
              title="Agregar al carrito"
            >
              <ShoppingBag size={18} />
            </button>
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="w-10 h-10 bg-white flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-colors"
              title="Vista rápida"
            >
              <Eye size={18} />
            </button>
            <button
              className="w-10 h-10 bg-white flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-colors"
              title="Agregar a favoritos"
            >
              <Heart size={18} />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="text-center">
          <h3 className="text-sm font-semibold mb-2 hover:text-[var(--primary)] transition-colors cursor-pointer">
            {product.name}
          </h3>
          <div className="flex items-center justify-center gap-2">
            <span className="font-semibold text-[var(--primary)]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[var(--muted-foreground)] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {/* Colors */}
          <div className="flex items-center justify-center gap-1 mt-2">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color}
                className="text-xs text-[var(--muted-foreground)]"
              >
                {color}
                {product.colors.indexOf(color) < Math.min(product.colors.length - 1, 3) && ', '}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickView
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
