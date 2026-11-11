'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { products } from '@/data/products';
import { sanitiseCart, changeQuantity, type CartItem } from '@/lib/cart';

type CartContextValue = {
  items: CartItem[]; count: number; hydrated: boolean;
  addItem: (id: string, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void; clearCart: () => void;
};
const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'viduleaf-demo-cart-v1';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    try { setItems(sanitiseCart(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'), products)); }
    catch { setItems([]); }
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* The current cart still works if storage is unavailable. */ }
  }, [items, hydrated]);

  const addItem = useCallback((id: string, quantity = 1) => {
    if (!Number.isInteger(quantity) || quantity < 1) return;
    setItems((current) => changeQuantity(current, id, (current.find((item) => item.productId === id)?.quantity || 0) + quantity, products));
  }, []);
  const setQuantity = useCallback((id: string, quantity: number) => setItems((current) => changeQuantity(current, id, quantity, products)), []);
  const removeItem = useCallback((id: string) => setItems((current) => current.filter((item) => item.productId !== id)), []);
  const clearCart = useCallback(() => setItems([]), []);
  const value = useMemo(() => ({ items, count: items.reduce((n, item) => n + item.quantity, 0), hydrated, addItem, setQuantity, removeItem, clearCart }), [items, hydrated, addItem, setQuantity, removeItem, clearCart]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
