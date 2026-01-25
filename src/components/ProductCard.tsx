'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Plus } from 'lucide-react';
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

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, product.sizes[0], product.colors[0]);
  };

  const getBadgeStyle = (badge: string): React.CSSProperties => {
    switch (badge) {
      case 'sale':
        return { backgroundColor: '#ef4444' };
      case 'new':
        return { backgroundColor: 'var(--primary)' };
      case 'bestseller':
        return { backgroundColor: 'var(--secondary)' };
      default:
        return { backgroundColor: 'var(--primary)' };
    }
  };

  const getBadgeText = (badge: string) => {
    switch (badge) {
      case 'sale': return 'SALE';
      case 'new': return 'NUEVO';
      case 'bestseller': return 'TOP';
      default: return badge.toUpperCase();
    }
  };

  return (
    <>
      <div
        onClick={() => setIsQuickViewOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ cursor: 'pointer' }}
      >
        {/* Image Container */}
        <div style={{
          position: 'relative',
          aspectRatio: '3/4',
          overflow: 'hidden',
          backgroundColor: 'var(--muted)',
          marginBottom: '12px',
        }}>
          <Image
            src={isHovered && product.hoverImage ? product.hoverImage : product.image}
            alt={product.name}
            fill
            style={{
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Badge */}
          {product.badge && (
            <span style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              padding: '4px 10px',
              color: 'white',
              fontSize: '10px',
              letterSpacing: '0.1em',
              fontWeight: 600,
              ...getBadgeStyle(product.badge),
            }}>
              {getBadgeText(product.badge)}
            </span>
          )}

          {/* Discount Badge */}
          {product.originalPrice && (
            <span style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: '#ef4444',
              padding: '4px 8px',
              color: 'white',
              fontSize: '10px',
              fontWeight: 600,
            }}>
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              width: '36px',
              height: '36px',
              backgroundColor: 'white',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
            title="Agregar al carrito"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Info */}
        <div style={{ textAlign: 'center' }}>
          <h3 style={{
            fontSize: '13px',
            fontWeight: 500,
            marginBottom: '6px',
            color: 'var(--secondary)',
            lineHeight: 1.4,
          }}>
            {product.name}
          </h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}>
            <span style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--secondary)',
            }}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span style={{
                fontSize: '12px',
                color: 'var(--muted-foreground)',
                textDecoration: 'line-through',
              }}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
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
