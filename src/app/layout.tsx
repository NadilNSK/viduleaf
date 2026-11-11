import type { Metadata } from 'next';
import { CartProvider } from '@/components/CartProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'ViduLeaf — Bring nature home', template: '%s | ViduLeaf' },
  description: 'A little green for the spaces you love. Discover the ViduLeaf indoor plant shop preview, a new beginning in the Viduneth family.',
  robots: { index: false, follow: false },
  icons: { icon: '/brand/viduleaf-logo.png' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body><CartProvider><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content">{children}</main><Footer /></CartProvider></body></html>;
}
