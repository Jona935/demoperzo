import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from './types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: string, color: string) => void;
  removeItem: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, size, color) => {
        const items = get().items;
        const existingItem = items.find(
          (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id && item.selectedSize === size && item.selectedColor === color
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { ...product, quantity: 1, selectedSize: size, selectedColor: color }],
          });
        }
        get().openCart();
      },

      removeItem: (id, size, color) => {
        set({
          items: get().items.filter(
            (item) => !(item.id === id && item.selectedSize === size && item.selectedColor === color)
          ),
        });
      },

      updateQuantity: (id, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, size, color);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id && item.selectedSize === size && item.selectedColor === color
              ? { ...item, quantity }
              : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
