import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Leaf, Sun, Package } from 'lucide-react';
import { products, formatPrice } from '@/data/products';
import { assets } from '@/data/assets';
import { ProductCard } from '@/components/ProductCard';
import ProductPurchase from './ProductPurchase';
import styles from '@/components/commerce.module.css';

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const product = products.find((p) => p.slug === slug);
  return { title: `${product?.name || 'Plant'} | ViduLeaf`, description: product?.description };
}
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  const image = assets[product.asset];
  return <div className={`container ${styles.productPage}`}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/shop">Our plants</Link><span>/</span><span>{product.name}</span></nav>
    <div className={styles.productDetail}>
      <div className={styles.detailImage}><Image src={image.src} alt={image.alt} fill priority sizes="(max-width: 760px) 100vw, 50vw" style={{ objectFit: 'cover', objectPosition: image.position }} /><span className={styles.detailImageCaption}>Illustrative plant photograph</span></div>
      <div className={styles.productInfo}><p className="eyebrow">{product.category}</p><h1>{product.name}</h1><p className={styles.botanical}>{product.botanical}</p><p className={styles.detailPrice}>{formatPrice(product.price)}</p><p className={styles.description}>{product.description}</p>
        <div className={styles.facts}><div><Leaf size={20} /><span>Size<strong>{product.size}</strong></span></div><div><Sun size={20} /><span>Position<strong>{product.light}</strong></span></div><div><Package size={20} /><span>Presentation<strong>Plant + pictured pot</strong></span></div></div>
        <ProductPurchase product={product} />
        <p className={styles.demoNote}>Sample product · Price, size, pot, and stock will be confirmed before launch.</p>
        <details className={styles.accordion}><summary>A little care goes a long way</summary><p>Each plant has its own needs. Explore our introductory care guides and check the specific guidance supplied with your plant.</p><Link href="/plant-care" className="text-link">Explore plant care →</Link></details>
        <details className={styles.accordion}><summary>Delivery & pickup</summary><p>Delivery areas, charges, and collection times are still being confirmed. This preview does not accept real orders.</p><Link href="/delivery" className="text-link">Delivery information →</Link></details>
      </div>
    </div>
    <section className={styles.related}><div className={styles.relatedHeading}><h2>A few more green favourites.</h2><Link href="/shop" className="text-link">Explore all plants →</Link></div><div className={styles.relatedGrid}>{products.filter((p) => p.id !== product.id).slice(0, 3).map((p) => <ProductCard key={p.id} product={p} />)}</div></section>
  </div>;
}
