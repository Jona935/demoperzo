'use client';

import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export default function Cart() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal } = useCartStore();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg tracking-[0.18em]">TU CARRITO</h3>
          <button
            onClick={closeCart}
            className="p-2 hover:text-[var(--primary)] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 h-[calc(100vh-200px)]">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={64} className="text-[var(--muted-foreground)] mb-4" />
              <p className="text-[var(--muted-foreground)] mb-4">Tu carrito está vacío</p>
              <button
                onClick={closeCart}
                className="btn btn-primary"
              >
                SEGUIR COMPRANDO
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-4 pb-4 border-b"
                >
                  <div className="relative w-24 h-32 bg-[var(--muted)] flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                    <p className="text-xs text-[var(--muted-foreground)] mb-1">
                      Talla: {item.selectedSize} | Color: {item.selectedColor}
                    </p>
                    <p className="font-semibold text-[var(--primary)] mb-2">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity - 1
                          )
                        }
                        className="w-8 h-8 border flex items-center justify-center hover:bg-[var(--muted)] transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity + 1
                          )
                        }
                        className="w-8 h-8 border flex items-center justify-center hover:bg-[var(--muted)] transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() =>
                          removeItem(item.id, item.selectedSize, item.selectedColor)
                        }
                        className="ml-auto text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] underline"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm tracking-wider">SUBTOTAL</span>
              <span className="text-lg font-semibold">{formatPrice(getTotal())}</span>
            </div>
            <button className="btn btn-primary w-full mb-2">
              FINALIZAR COMPRA
            </button>
            <button
              onClick={closeCart}
              className="w-full text-center text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] underline"
            >
              Ver carrito completo
            </button>
          </div>
        )}
      </div>
    </>
  );
}
