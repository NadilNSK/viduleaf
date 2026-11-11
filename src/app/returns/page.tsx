import type { Metadata } from 'next';
import Link from 'next/link';
import s from '@/components/content.module.css';
export const metadata: Metadata = { title: 'Returns', robots: { index: false } };
export default function Returns() { return <div className="container"><div className={s.policy}><header className={s.intro}><span className="eyebrow">Shop information</span><h1>Returns & order support</h1></header><div className={s.notice}>Draft page — our returns policy will be published before orders open.</div><h2>Clear information before you buy</h2><p>The owner will confirm the returns process, any applicable timeframes, how to report an issue, and the available remedies before real purchases become possible.</p><p>No return period, refund promise or delivery guarantee is implied by this preview. Demonstration checkout does not create a real order.</p><Link href="/contact" className="text-link">Visit & contact information</Link></div></div>; }
