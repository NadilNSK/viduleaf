'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/components/CartProvider';
import { products, formatPrice } from '@/data/products';
import { assets } from '@/data/assets';
import { cartSubtotal } from '@/lib/cart';
import styles from '@/components/commerce.module.css';

export default function CartPage() {
  const { items, count, hydrated, setQuantity, removeItem } = useCart();
  const subtotal = cartSubtotal(items, products);
  return <div className={`container ${styles.cartPage}`}>
    <header className={styles.standardHeading}><p className="eyebrow">A little closer to greener days</p><h1>Your plant bag.</h1><p>{hydrated ? `${count} leafy ${count === 1 ? 'companion' : 'companions'}, picked by you.` : 'Getting your bag ready…'}</p></header>
    {!hydrated ? <p role="status">Loading your bag…</p> : !items.length ? <div className={styles.empty}><ShoppingBag size={38} strokeWidth={1.2} /><h2>A little room for something green.</h2><p>Your bag is empty. Find a plant that feels like you.</p><Link href="/shop" className="button">Explore our plants <ArrowRight size={17} /></Link></div> : <div className={styles.orderLayout}>
      <div className={styles.cartItems}>{items.map((item) => { const product = products.find((p) => p.id === item.productId)!; const image = assets[product.asset]; return <article className={styles.cartItem} key={item.productId}>
        <Link href={`/plants/${product.slug}`} className={styles.cartImage}><Image src={image.src} alt={image.alt} width={130} height={150} style={{ objectFit: 'cover', objectPosition: image.position }} /></Link>
        <div className={styles.cartItemInfo}><p className={styles.cardMeta}>{product.category}</p><h2><Link href={`/plants/${product.slug}`}>{product.name}</Link></h2><p>{product.size} · Pictured pot</p><span>{formatPrice(product.price)}</span><div className={styles.cartControls}><div className={styles.quantity}><button aria-label={`Decrease ${product.name} quantity`} disabled={item.quantity <= 1} onClick={() => setQuantity(product.id, item.quantity - 1)}><Minus size={14} /></button><output aria-label={`${product.name} quantity`}>{item.quantity}</output><button aria-label={`Increase ${product.name} quantity`} disabled={item.quantity >= product.stock} onClick={() => setQuantity(product.id, item.quantity + 1)}><Plus size={14} /></button></div><button className={styles.remove} onClick={() => removeItem(product.id)} aria-label={`Remove ${product.name}`}><Trash2 size={15} /><span>Remove</span></button></div></div>
        <strong className={styles.itemTotal}>{formatPrice(product.price * item.quantity)}</strong>
      </article>;})}<Link href="/shop" className="text-link">← Keep exploring</Link></div>
      <aside className={styles.summary}><p className="eyebrow">Your selection</p><h2>Order summary</h2><div className={styles.summaryLine}><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div className={styles.summaryLine}><span>Delivery</span><span>To be confirmed</span></div><p className={styles.summaryNote}>This is a preview. All products and prices are illustrative, and real orders are not open yet.</p><Link href="/checkout" className="button">Try demo checkout <ArrowRight size={17} /></Link><p className={styles.smallNote}>No payment is collected.</p></aside>
    </div>}
  </div>;
}
