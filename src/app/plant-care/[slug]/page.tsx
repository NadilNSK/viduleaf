import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PlantImage } from '@/components/PlantImage';
import { guides } from '@/data/guides';
import s from '@/components/content.module.css';

export function generateStaticParams() { return guides.map(guide => ({ slug: guide.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const guide = guides.find(item => item.slug === slug); return { title: guide?.title || 'Guide not found', description: guide?.description }; }

export default async function CareGuide({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const guide = guides.find(item => item.slug === slug); if (!guide) notFound();
  return <div className="container"><div className={s.narrow}><Link href="/plant-care" className={s.articleBack}><ArrowLeft size={15} /> All care guides</Link><header className={s.intro}><div className={s.meta}><span>{guide.category}</span><span>·</span><span>{guide.readTime}</span></div><h1>{guide.title}</h1><p>{guide.description}</p></header><div className={s.photoWide}><PlantImage asset={guide.asset} priority sizes="(max-width: 850px) 100vw, 850px" /></div><article className={s.article}>{guide.sections.map(section => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}<div className={s.source}><p>General guidance is a starting point. Always check the requirements of your particular plant.</p><p>Further reading: <a href={guide.source.url} target="_blank" rel="noopener noreferrer">{guide.source.label} <ArrowUpRight size={13} /></a></p></div><Link href="/plant-care" className={s.articleBack}><ArrowLeft size={15} /> Explore more guides</Link></article></div></div>;
}
