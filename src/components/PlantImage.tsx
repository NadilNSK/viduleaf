import Image from 'next/image';
import { assets } from '@/data/assets';

export function PlantImage({ asset, className = '', sizes = '(max-width: 700px) 100vw, 50vw', priority = false, fit = 'cover' }: { asset: string; className?: string; sizes?: string; priority?: boolean; fit?: 'cover' | 'contain' }) {
  const image = assets[asset];
  if (!image) return null;
  return <div className={`plant-image ${className}`}><Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} style={{ objectFit: fit, objectPosition: image.position }} /></div>;
}
