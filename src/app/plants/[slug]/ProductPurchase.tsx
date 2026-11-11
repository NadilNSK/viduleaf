'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import type { Product } from '@/data/products';
import { useCart } from '@/components/CartProvider';
import styles from '@/components/commerce.module.css';

export default function ProductPurchase({ product }: { product: Product }) {
  const { addItem, items, hydrated } = useCart();
  const [quantity, setQuantity] = useState(1); const [added, setAdded] = useState(false);
  const inCart = items.find((item) => item.productId === product.id)?.quantity || 0;
  const remaining = Math.max(0, product.stock - inCart);
  const selectedQuantity = Math.min(quantity, remaining);
  return <div>
    <div className={styles.purchaseRow}><div className={styles.quantity} aria-label="Quantity selector"><button aria-label="Decrease quantity" disabled={!hydrated || selectedQuantity <= 1} onClick={() => {setQuantity(selectedQuantity - 1); setAdded(false);}}><Minus size={16} /></button><output aria-label="Selected quantity">{selectedQuantity}</output><button aria-label="Increase quantity" disabled={!hydrated || selectedQuantity >= remaining} onClick={() => {setQuantity(selectedQuantity + 1); setAdded(false);}}><Plus size={16} /></button></div><button className="button" disabled={!hydrated || remaining === 0} onClick={() => {if (!hydrated || selectedQuantity < 1) return; addItem(product.id, selectedQuantity); setQuantity(1); setAdded(true);}}>{added ? <Check size={18} /> : <ShoppingBag size={18} />}{remaining === 0 ? 'Sample limit reached' : 'Add to bag'}</button></div>
    <div className={styles.addedMessage} aria-live="polite">{added && <>Added to your bag. <Link href="/cart">View bag →</Link></>}</div>
  </div>;
}
