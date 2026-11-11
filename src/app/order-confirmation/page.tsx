'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Leaf } from 'lucide-react';
import { products, formatPrice } from '@/data/products';
import { sanitiseCart, cartSubtotal, type CartItem } from '@/lib/cart';
import styles from '@/components/commerce.module.css';

type Receipt = { reference: string; items: CartItem[]; method: string };
export default function ConfirmationPage() {
  const [receipt, setReceipt] = useState<Receipt | null>(null); const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const value = JSON.parse(sessionStorage.getItem('viduleaf-demo-receipt') || 'null');
      const items = sanitiseCart(value?.items, products);
      if (value?.demo === true && typeof value.reference === 'string' && /^DEMO-[A-Z0-9]+$/.test(value.reference) && items.length && ['pickup', 'delivery'].includes(value.method)) setReceipt({reference: value.reference, items, method: value.method});
    } catch { /* A missing or invalid receipt must not become an order confirmation. */ }
    setReady(true);
  }, []);
  return <div className={`container ${styles.confirmation}`}><div className={styles.confirmationIcon}><Leaf size={34} strokeWidth={1.4} /></div><p className="eyebrow">ViduLeaf preview</p><h1>{receipt ? 'A greener beginning.' : 'Your next green chapter.'}</h1>{!ready ? <p role="status">Checking this demo session…</p> : receipt ? <><p>You have completed the sample shopping journey.</p><div className={styles.previewNotice}><strong>This was a demo, not an order.</strong><p>No order was sent, no payment was collected, and no delivery or pickup was scheduled.</p></div><div className={styles.receipt}><p className={styles.receiptReference}>{receipt.reference}</p>{receipt.items.map((item) => {const product = products.find((p) => p.id === item.productId)!; return <div className={styles.summaryLine} key={item.productId}><span>{product.name} × {item.quantity}</span><strong>{formatPrice(product.price * item.quantity)}</strong></div>;})}<div className={styles.summaryLine}><span>Sample subtotal</span><strong>{formatPrice(cartSubtotal(receipt.items, products))}</strong></div><p className={styles.smallNote}>Selected: {receipt.method === 'pickup' ? 'Shop pickup' : 'Home delivery'} · demonstration only</p></div></> : <p>There is no demo summary in this session. Explore the collection to try the shopping experience.</p>}<Link href="/shop" className="button">Back to the plants <ArrowRight size={17} /></Link></div>;
}
