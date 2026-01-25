'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Minus, Plus } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store';

interface QuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickView({ product, isOpen, onClose }: QuickViewProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor);
    }
    onClose();
    setQuantity(1);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:text-[var(--primary)] transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-[3/4] bg-[var(--muted)]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-[var(--primary)] text-white px-3 py-1 text-xs tracking-wider">
                  {product.badge.toUpperCase()}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="p-8">
              <h2 className="text-2xl mb-2">{product.name}</h2>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-semibold text-[var(--primary)]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-[var(--muted-foreground)] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-[var(--muted-foreground)] mb-6">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mb-6">
                <label className="text-sm font-semibold tracking-wider block mb-2">
                  COLOR: <span className="font-normal">{selectedColor}</span>
                </label>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border text-sm transition-colors ${
                        selectedColor === color
                          ? 'border-[var(--secondary)] bg-[var(--secondary)] text-white'
                          : 'border-[var(--border)] hover:border-[var(--secondary)]'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <label className="text-sm font-semibold tracking-wider block mb-2">
                  TALLA: <span className="font-normal">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border text-sm transition-colors ${
                        selectedSize === size
                          ? 'border-[var(--secondary)] bg-[var(--secondary)] text-white'
                          : 'border-[var(--border)] hover:border-[var(--secondary)]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="text-sm font-semibold tracking-wider block mb-2">
                  CANTIDAD
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 border flex items-center justify-center hover:bg-[var(--muted)] transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-16 h-12 border-t border-b flex items-center justify-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 border flex items-center justify-center hover:bg-[var(--muted)] transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="btn btn-primary w-full mb-4"
              >
                AGREGAR AL CARRITO
              </button>

              {/* Stock Info */}
              <p className="text-sm text-[var(--muted-foreground)] text-center">
                {product.stock > 10 ? (
                  'En stock - Envío en 24-48h'
                ) : product.stock > 0 ? (
                  `¡Solo quedan ${product.stock} unidades!`
                ) : (
                  'Agotado'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
