import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PlantImage } from '@/components/PlantImage';
import s from '@/components/content.module.css';

export const metadata: Metadata = { title: 'Our Story', description: 'A new chapter for the Viduneth family. Meet the idea behind ViduLeaf.' };

export default function OurStory() {
  return <div className="container">
    <div className={s.intro}><span className="eyebrow">Rooted in family</span><h1>A little idea.<br />A greener beginning.</h1><p>ViduLeaf began with a father&apos;s new indoor plant shop and the simple wish to bring more greenery into everyday spaces.</p></div>
    <section className={s.split} aria-labelledby="story-heading">
      <div><div className={s.photo}><PlantImage asset="pothos" sizes="(max-width: 640px) 100vw, 50vw" /></div><p className={s.caption}>Botanical imagery for our first website preview.</p></div>
      <div className={s.copy}><span className="eyebrow">The ViduLeaf story</span><h2 id="story-heading">Growing a new branch of Viduneth.</h2><p>Our name carries a connection to Viduneth, our family&apos;s education centre. ViduLeaf is a new expression of that family story, with plants at its heart.</p><p>We&apos;re creating a place to discover plants for a favourite shelf, a quiet desk, or a sunny corner. A place where a little greenery can become part of the way you live.</p><blockquote className={s.quote}>“Bring nature home.”</blockquote><Link className="button" href="/shop">Explore the collection <ArrowUpRight size={17} /></Link></div>
    </section>
    <section className={s.banner}><div><h2>Every plant is a beginning.</h2><p>Start with a space you love. Find a plant to make it your own.</p></div><Link className="button button-secondary" href="/plant-care">A little growing guidance <ArrowUpRight size={17} /></Link></section>
  </div>;
}
