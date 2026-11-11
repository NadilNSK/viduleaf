'use client';
import { useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { products, categories } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import styles from '@/components/commerce.module.css';

export default function ShopClient() {
  const params = useSearchParams();
  const q = params.get('q') || '';
  const [query, setQuery] = useState(q);
  // Back/forward navigation and shared links remain the source of committed state.
  useEffect(() => { setQuery(q); }, [q]);
  const category = params.get('category') || 'All plants';
  const size = params.get('size') || 'all';
  const sort = params.get('sort') || 'featured';
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(window.location.search);
    if (query) next.set('q', query); else next.delete('q');
    if (!value || ['all', 'All plants', 'featured'].includes(value)) next.delete(key); else next.set(key, value);
    window.history.replaceState(null, '', `/shop${next.size ? `?${next.toString()}` : ''}`);
  };
  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    update('q', query);
  };
  const clearFilters = () => { setQuery(''); window.history.replaceState(null, '', '/shop'); };
  const filtered = products.filter((p) => (category === 'All plants' || p.category === category) && (size === 'all' || p.size === size) && `${p.name} ${p.botanical}`.toLowerCase().includes(query.trim().toLowerCase()));
  const results = [...filtered].sort((a, b) => sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : sort === 'name' ? a.name.localeCompare(b.name) : 0);
  const hasFilters = !!query || category !== 'All plants' || size !== 'all';
  return <div className={`container ${styles.shop}`}>
    <header className={styles.shopIntro}><p className="eyebrow">A little green goes a long way</p><h1>Find your new<br /><em>leafy companion.</em></h1><p>For your desk, your shelves, and that corner that needs a little life.</p></header>
    <div className={styles.collectionTabs} aria-label="Plant collections">{categories.map((item) => <button key={item} aria-pressed={category === item} className={category === item ? styles.activeTab : ''} onClick={() => update('category', item)}>{item}</button>)}</div>
    <div className={styles.toolbar}>
      <form className={styles.search} role="search" onSubmit={submitSearch}><button type="submit" aria-label="Apply plant search" style={{ display: 'flex', alignItems: 'center', padding: 0, border: 0, background: 'none', color: 'inherit' }}><Search size={18} aria-hidden="true" /></button><input id="plant-search" aria-label="Search plants" type="search" placeholder="Find a plant…" value={query} onChange={(e) => setQuery(e.target.value)} /></form>
      <label className={styles.filterLabel}><SlidersHorizontal size={15} aria-hidden="true" /><span>Size</span><select aria-label="Filter by size" value={size} onChange={(e) => update('size', e.target.value)}><option value="all">Any size</option><option>Small</option><option>Medium</option></select></label>
      <label className={styles.filterLabel}><span>Sort</span><select aria-label="Sort plants" value={sort} onChange={(e) => update('sort', e.target.value)}><option value="featured">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Name: A–Z</option></select></label>
    </div>
    <div className={styles.resultLine}><span aria-live="polite">{results.length} {results.length === 1 ? 'plant' : 'plants'} to explore</span>{hasFilters && <button onClick={clearFilters}>Clear filters <X size={14} /></button>}</div>
    {results.length ? <div className={styles.productGrid}>{results.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className={styles.empty}><h2>No plants found just yet.</h2><p>Try a different name or give your filters a little room.</p><button className="button" onClick={clearFilters}>Explore all plants</button></div>}
    <p className={styles.demoNote}>Preview collection · Images, prices, and availability are illustrative.</p>
  </div>;
}
