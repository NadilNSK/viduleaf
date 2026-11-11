import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Leaf, Sun, Heart, MoveUpRight } from 'lucide-react';
import { PlantImage } from '@/components/PlantImage';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { guides } from '@/data/guides';

const collections = [
  { title: 'Little spaces, leafy company.', label: 'Desk plants', asset: 'zz', detail: 'For desks, shelves & sunny little spots' },
  { title: 'Let a little green wander.', label: 'Trailing plants', asset: 'pothos', detail: 'Soft shapes with room to roam' },
  { title: 'Make room for a statement.', label: 'Statement plants', asset: 'monstera', detail: 'A beautiful presence in any room' },
];

export default function HomePage() {
  return <>
    <section className="hero">
      <PlantImage asset="hero" className="hero-image" sizes="100vw" priority />
      <div className="hero-shade" />
      <div className="container hero-content"><div className="hero-copy"><p className="eyebrow"><span className="little-line" /> ROOTED IN THE EVERYDAY</p><h1>Bring a little<br /><em>nature</em> home.</h1><p className="hero-description">A leafy corner. A calmer space. Find your kind of green and make yourself at home.</p><Link href="/shop" className="button">Find your plant <ArrowUpRight size={19} /></Link><div className="hero-footnote"><span className="hero-note-icon"><Leaf size={16} strokeWidth={1.3} /></span> A new beginning, from our family to yours.</div></div></div>
      <div className="hero-caption"><span className="caption-dot" /><div>ROOM TO GROW<small>Nature looks good on you.</small></div></div>
    </section>

    <div className="intro-strip container"><p>Good things <em>grow here.</em></p><span><Leaf size={21} strokeWidth={1.3} /> Greenery for everyday living</span><span><Heart size={20} strokeWidth={1.3} /> A family’s new beginning</span><span><Sun size={22} strokeWidth={1.3} /> A little inspiration to grow</span></div>

    <section className="section container"><div className="section-heading"><div><p className="eyebrow">FIND YOUR KIND OF GREEN</p><h2>A plant for your <em>place.</em></h2></div><p className="section-description">From a little desk companion to a room’s<br className="desktop-break" /> leafy centrepiece. Start with your space.</p></div><div className="collection-grid">{collections.map((collection, i) => <Link className={`collection-card collection-${i}`} href={`/shop?category=${encodeURIComponent(collection.label)}`} key={collection.label}><div className="collection-photo"><PlantImage asset={collection.asset} sizes="(max-width: 650px) 90vw, 33vw" fit="contain" /><span className="collection-number">0{i + 1}</span><span className="round-arrow"><ArrowUpRight size={22} strokeWidth={1.3} /></span></div><div className="collection-copy"><h3>{collection.label}</h3><p>{collection.detail}</p></div></Link>)}</div></section>

    <section className="section featured-section"><div className="container"><div className="section-heading"><div><p className="eyebrow">A FEW LEAFY INTRODUCTIONS</p><h2>Meet your new <em>favourites.</em></h2></div><Link className="text-link" href="/shop">Explore all plants <ArrowRight size={18} /></Link></div><div className="featured-grid">{products.slice(0, 4).map(product => <ProductCard key={product.id} product={product} />)}</div><p className="catalogue-note">A first look at our collection. Images, prices and availability are illustrative.</p></div></section>

    <section className="story-section container"><div className="story-photo"><PlantImage asset="rubber" sizes="(max-width: 700px) 100vw, 45vw" fit="contain" /><span className="story-photo-label">A LITTLE GREEN GOES A LONG WAY</span></div><div className="story-copy"><p className="eyebrow">HELLO, WE’RE VIDULEAF</p><h2>New roots.<br />The same <em>heart.</em></h2><p>Every new beginning needs a little room to grow. For our father, that beginning is ViduLeaf: an indoor plant shop, and a fresh chapter in the Viduneth family.</p><p>We’re creating a place to discover greenery for your home, your desk, and the corners that could use a little life.</p><Link href="/our-story" className="text-link">Get to know us <ArrowRight size={18} /></Link><span className="story-signature">From our family, with a little green.</span></div></section>

    <section className="section container journal-section"><div className="section-heading"><div><p className="eyebrow">GROW INTO IT</p><h2>A little care. <em>A lot of life.</em></h2></div><Link className="text-link" href="/plant-care">The care journal <ArrowRight size={18} /></Link></div><div className="journal-grid">{guides.map(guide => <Link href={`/plant-care/${guide.slug}`} className="journal-card" key={guide.slug}><PlantImage asset={guide.asset} sizes="(max-width: 700px) 90vw, 33vw" /><div className="journal-meta"><span>{guide.category}</span><MoveUpRight size={17} /></div><h3>{guide.title}</h3></Link>)}</div></section>

    <section className="closing-banner"><div className="container closing-inner"><div><p className="eyebrow">YOUR NEXT LITTLE BEGINNING</p><h2>There’s room for<br /><em>one more leaf.</em></h2></div><div><p>Find something green to call your own.</p><Link href="/shop" className="button button-light">Explore the collection <ArrowUpRight size={19} /></Link></div><Leaf className="closing-leaf" size={210} strokeWidth={0.5} aria-hidden="true" /></div></section>
  </>;
}
