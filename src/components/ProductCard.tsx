import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { assets } from '@/data/assets';
import { formatPrice, type Product } from '@/data/products';
import styles from './commerce.module.css';

export function ProductCard({ product }: { product: Product }) {
  const image = assets[product.asset];
  return <article className={styles.productCard}>
    <Link href={`/plants/${product.slug}`} className={styles.productImage} aria-label={`View ${product.name}`}>
      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw" style={{ objectFit: 'cover', objectPosition: image.position }} />
      {product.badge && <span className={styles.badge}>{product.badge}</span>}
      <span className={styles.productArrow} aria-hidden="true"><ArrowUpRight size={19} /></span>
    </Link>
    <div className={styles.cardMeta}><span>{product.category}</span><span>{product.size}</span></div>
    <h3><Link href={`/plants/${product.slug}`}>{product.name}</Link></h3>
    <p className={styles.price}>{formatPrice(product.price)}</p>
  </article>;
}
export default ProductCard;
