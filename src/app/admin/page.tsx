import type { Metadata } from 'next';
import Link from 'next/link';
import { LockKeyhole, ArrowLeft } from 'lucide-react';
import s from '@/components/content.module.css';

export const metadata: Metadata = { title: 'Shop Management', robots: { index: false, follow: false } };
export default function Admin() {
  return <div className="container"><section className={s.owner}><LockKeyhole size={28} strokeWidth={1.5} /><h1>Shop management</h1><div className={s.notice}>Owner access has not been configured.</div><p>The private management area will be connected in the next build stage. This preview does not provide administrative access or store real orders.</p><p>The owner setup will include:</p><ul><li>Secure sign-in and permissions</li><li>Product, price and stock editing</li><li>Image replacement and page content</li><li>Order management</li></ul><Link className="button button-secondary" href="/"><ArrowLeft size={16} /> Return to the shop</Link></section></div>;
}
