import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PlantImage } from '@/components/PlantImage';
import { site } from '@/data/site';
import s from '@/components/content.module.css';

export const metadata: Metadata = { title: 'Visit & Contact', description: 'Keep in touch with ViduLeaf. Contact and shop visit details will be available when the shop launches.' };
export default function Contact() {
  return <div className="container"><header className={s.intro}><span className="eyebrow">Let&apos;s talk plants</span><h1>A friendly hello.<br />A greener home.</h1><p>Whether you&apos;re imagining your first plant or a whole new corner of green, we look forward to welcoming you.</p></header><section className={s.split}><div className={s.contactPanel}><span className="eyebrow">Visit & contact</span><h2>We&apos;re getting ready.</h2><p>Our contact and visiting details will be shared here before orders open.</p><dl className={s.details}><div><dt>Visit our shop</dt><dd>{site.address || 'Location to be announced'}</dd></div><div><dt>Opening hours</dt><dd>{site.hours || 'Hours to be confirmed'}</dd></div><div><dt>Phone</dt><dd>{site.phone ? <a href={`tel:${site.phone}`}>{site.phone}</a> : 'Contact number coming soon'}</dd></div><div><dt>Email</dt><dd>{site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : 'Email address coming soon'}</dd></div></dl>{site.whatsapp ? <a href={`https://wa.me/${site.whatsapp.replace(/\D/g, '')}`} className="button" target="_blank" rel="noopener noreferrer">Chat on WhatsApp <ArrowUpRight size={16} /></a> : <Link href="/delivery" className="text-link">Delivery & pickup information <ArrowUpRight size={16} /></Link>}</div><div className={s.photo}><PlantImage asset="zz" sizes="(max-width: 640px) 100vw, 50vw" /></div></section><section className={s.banner}><div><h2>A little guidance while you wait.</h2><p>Discover simple ways to get to know your houseplants.</p></div><Link href="/plant-care" className="button">Explore plant care <ArrowUpRight size={17} /></Link></section></div>;
}
