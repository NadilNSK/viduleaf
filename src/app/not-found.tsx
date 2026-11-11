import Link from 'next/link';
import { Sprout } from 'lucide-react';
export default function NotFound() { return <section className="container empty-page"><Sprout size={44} strokeWidth={1} /><p className="eyebrow">A LITTLE OFF THE GARDEN PATH</p><h1>This page hasn’t taken root.</h1><p>Let’s find you something green instead.</p><Link href="/shop" className="button">Explore the plants</Link></section>; }
