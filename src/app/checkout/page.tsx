'use client';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, ShoppingBag, Truck } from 'lucide-react';
import { useCart } from '@/components/CartProvider';
import { products, formatPrice } from '@/data/products';
import { assets } from '@/data/assets';
import { cartSubtotal } from '@/lib/cart';
import styles from '@/components/commerce.module.css';

export default function CheckoutPage() {
  const { items, hydrated, clearCart } = useCart();
  const router = useRouter();
  const [method, setMethod] = useState('pickup');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const subtotal = cartSubtotal(items, products);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || !items.length) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (!String(data.get('name') || '').trim() || !String(data.get('phone') || '').trim() || (method === 'delivery' && !String(data.get('address') || '').trim())) {
      setError('Please complete the required fields using sample details.'); return;
    }
    setSubmitting(true); setError('');
    try {
      // Never retain personal form fields. This only records a local demonstration receipt.
      sessionStorage.setItem('viduleaf-demo-receipt', JSON.stringify({ reference: `DEMO-${Date.now().toString(36).toUpperCase()}`, items, subtotal, method, demo: true }));
      clearCart(); router.push('/order-confirmation');
    } catch { setSubmitting(false); setError('Your browser could not save this demo. Allow session storage and try again. No order was placed.'); }
  }
  return <div className={`container ${styles.cartPage}`}>
    <header className={styles.standardHeading}><p className="eyebrow">Preview the journey</p><h1>Demo checkout.</h1><p>Try the experience with sample details. Nothing is sent, ordered, or charged.</p></header>
    {!hydrated ? <p role="status">Loading your selection…</p> : !items.length ? <div className={styles.empty}><ShoppingBag size={35} /><h2>Your bag needs a little green first.</h2><Link href="/shop" className="button">Browse the collection <ArrowRight size={17} /></Link></div> : <form onSubmit={submit} className={styles.orderLayout}>
      <div className={styles.checkoutForm}>
        <section><h2><span>01</span> Your details</h2><p className={styles.formHint}>Use sample information. These details will not be saved or sent.</p><div className={styles.fieldGrid}><label>Full name <span aria-hidden="true">*</span><input name="name" required maxLength={100} autoComplete="off" placeholder="Sample name" /></label><label>Phone number <span aria-hidden="true">*</span><input type="tel" name="phone" required pattern="[+0-9\(\)\s\-]{7,25}" maxLength={25} title="Use 7–25 characters: digits, spaces, parentheses, plus signs or hyphens." autoComplete="off" placeholder="Sample phone number" /></label><label className={styles.fullField}>Email <span className={styles.optional}>(optional)</span><input type="email" name="email" maxLength={160} autoComplete="off" placeholder="name@example.com" /></label></div></section>
        <section><h2><span>02</span> A way to meet your plant</h2><fieldset className={styles.deliveryOptions}><legend className={styles.srOnly}>Choose a fulfilment method for this demo</legend><label className={method === 'pickup' ? styles.selectedDelivery : ''}><input type="radio" name="method" value="pickup" checked={method === 'pickup'} onChange={() => setMethod('pickup')} /><ShoppingBag size={23} /><span><strong>Shop pickup</strong><small>Location and times to be confirmed</small></span>{method === 'pickup' && <Check size={17} />}</label><label className={method === 'delivery' ? styles.selectedDelivery : ''}><input type="radio" name="method" value="delivery" checked={method === 'delivery'} onChange={() => setMethod('delivery')} /><Truck size={23} /><span><strong>Home delivery</strong><small>Coverage and fees to be confirmed</small></span>{method === 'delivery' && <Check size={17} />}</label></fieldset>{method === 'delivery' && <label className={styles.addressField}>Sample delivery address <span aria-hidden="true">*</span><textarea name="address" required maxLength={400} rows={3} placeholder="Enter a sample address for this demo" /></label>}</section>
        <div className={styles.previewNotice}><strong>A preview, with no commitment.</strong><p>There is no payment step yet. Completing this form creates only a temporary demonstration summary in this browser.</p></div><Link href="/cart" className="text-link">← Back to your bag</Link>
      </div>
      <aside className={styles.summary}><p className="eyebrow">Your selection</p><h2>A little green, ready.</h2><div className={styles.checkoutItems}>{items.map((item) => {const product = products.find((p) => p.id === item.productId)!; const image = assets[product.asset]; return <div key={item.productId} className={styles.checkoutItem}><Image src={image.src} alt={image.alt} width={58} height={70} style={{ objectFit: 'cover' }} /><div><strong>{product.name}</strong><span>Qty {item.quantity}</span></div><span>{formatPrice(product.price * item.quantity)}</span></div>;})}</div><div className={styles.summaryLine}><span>Sample subtotal</span><strong>{formatPrice(subtotal)}</strong></div>{method === 'delivery' && <div className={styles.summaryLine}><span>Delivery fee</span><span>Not yet configured</span></div>}<p className={styles.summaryNote}>Illustrative prices only. A final payable total is not available in this preview.</p>{error && <p role="alert" className={styles.error}>{error}</p>}<button type="submit" className="button" disabled={submitting}>{submitting ? 'Preparing demo…' : 'Complete demo'}<ArrowRight size={17} /></button><p className={styles.smallNote}>No real order will be placed.</p></aside>
    </form>}
  </div>;
}
