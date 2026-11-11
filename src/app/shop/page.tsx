import { Suspense } from 'react';
import type { Metadata } from 'next';
import ShopClient from './ShopClient';
export const metadata: Metadata = { title: 'Our plants | ViduLeaf', description: 'Explore the ViduLeaf sample collection of desk, trailing, and statement plants.' };
export default function ShopPage() {
  return <Suspense fallback={<div className="container page-heading"><h1>Our little green collection.</h1><p>Loading the collection…</p></div>}><ShopClient /></Suspense>;
}
