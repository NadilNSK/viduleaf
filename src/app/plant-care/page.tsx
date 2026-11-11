import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PlantImage } from '@/components/PlantImage';
import { guides } from '@/data/guides';
import s from '@/components/content.module.css';

export const metadata: Metadata = { title: 'Plant Care', description: 'Small, useful steps for getting to know your houseplants: light, watering and settling in.' };

export default function PlantCare() {
  return <div className="container"><div className={s.intro}><span className="eyebrow">A little growing guidance</span><h1>Good care starts<br />with curiosity.</h1><p>You don&apos;t have to know everything to begin. Get to know your plants, one small habit at a time.</p></div>
    <div className={s.grid}>{guides.map(guide => <Link key={guide.slug} href={`/plant-care/${guide.slug}`} className={s.guideCard}><div className={s.guidePhoto}><PlantImage asset={guide.asset} sizes="(max-width: 640px) 100vw, 33vw" /></div><div className={s.meta}><span>{guide.category}</span><span>·</span><span>{guide.readTime}</span></div><h2>{guide.title}</h2><p>{guide.description}</p><span className="text-link">Read the guide <ArrowUpRight size={16} /></span></Link>)}</div>
    <section className={s.banner}><div><h2>A plant for your kind of space.</h2><p>Browse our sample collection and imagine a greener corner.</p></div><Link className="button" href="/shop">Explore plants <ArrowUpRight size={17} /></Link></section>
  </div>;
}
