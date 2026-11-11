'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Search, ShoppingBag, ArrowUpRight, Leaf } from 'lucide-react';
import { useCart } from '@/components/CartProvider';

export function Header() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const { count } = useCart();
  const links = [['Shop plants', '/shop'], ['Our story', '/our-story'], ['Plant care', '/plant-care'], ['Contact', '/contact']];
  return <>
    <div className="announcement"><span><Leaf size={13} aria-hidden="true" /> A fresh start, a little greener.</span><span className="preview-label">Preview collection · Sample plants & prices</span></div>
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="ViduLeaf home" onClick={() => setMenu(false)}><Image src="/brand/viduleaf-logo.png" alt="ViduLeaf" width={167} height={56} priority /></Link>
        <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href || pathname.startsWith(href + '/') ? 'page' : undefined}>{label}</Link>)}</nav>
        <div className="header-actions"><Link href="/shop#plant-search" className="icon-button" aria-label="Search plants"><Search size={20} strokeWidth={1.6} /></Link><Link href="/cart" className="icon-button cart-link" aria-label={`Shopping bag, ${count} ${count === 1 ? 'item' : 'items'}`}><ShoppingBag size={21} strokeWidth={1.6} /><span className="cart-count">{count}</span></Link><button className="icon-button mobile-menu-button" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} aria-controls="mobile-navigation" onClick={() => setMenu(!menu)}>{menu ? <X size={22} /> : <Menu size={22} />}</button></div>
      </div>
      {menu && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setMenu(false)}>{label}<ArrowUpRight size={18} /></Link>)}</nav>}
    </header>
  </>;
}
