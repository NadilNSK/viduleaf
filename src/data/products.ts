export type Product = {
  id: string; slug: string; name: string; botanical: string; asset: string;
  category: 'Desk plants' | 'Trailing plants' | 'Statement plants';
  price: number; size: string; light: string; description: string; badge?: string;
  demo: true; stock: number;
};
export const products: Product[] = [
  { id: 'vl-001', slug: 'monstera-deliciosa', name: 'Monstera Deliciosa', botanical: 'Monstera deliciosa', asset: 'monstera', category: 'Statement plants', price: 3200, size: 'Medium', light: 'Bright indirect light', description: 'Sculptural leaves and an easy, expansive shape. A leafy focal point for a favourite corner.', badge: 'A statement piece', demo: true, stock: 8 },
  { id: 'vl-002', slug: 'golden-pothos', name: 'Golden Pothos', botanical: 'Epipremnum aureum', asset: 'pothos', category: 'Trailing plants', price: 1450, size: 'Small', light: 'Indirect light', description: 'A cascade of heart-shaped leaves with touches of gold. Lovely on a shelf or beside your desk.', badge: 'Small-space favourite', demo: true, stock: 12 },
  { id: 'vl-003', slug: 'snake-plant', name: 'Snake Plant', botanical: 'Dracaena trifasciata', asset: 'snake', category: 'Desk plants', price: 1850, size: 'Small', light: 'Indirect light', description: 'Upright, architectural leaves bring a little structure to your space. Paired here with an earthy pot.', demo: true, stock: 10 },
  { id: 'vl-004', slug: 'rubber-plant', name: 'Rubber Plant', botanical: 'Ficus elastica', asset: 'rubber', category: 'Statement plants', price: 2900, size: 'Medium', light: 'Bright indirect light', description: 'Glossy, deep-green leaves with a quiet presence. A beautiful companion for a bright living space.', demo: true, stock: 6 },
  { id: 'vl-005', slug: 'peace-lily', name: 'Peace Lily', botanical: 'Spathiphyllum', asset: 'peace', category: 'Desk plants', price: 2200, size: 'Medium', light: 'Indirect light', description: 'Soft white blooms among generous green leaves. A gentle botanical accent for your home.', demo: true, stock: 7 },
  { id: 'vl-006', slug: 'zz-plant', name: 'ZZ Plant', botanical: 'Zamioculcas zamiifolia', asset: 'zz', category: 'Desk plants', price: 2400, size: 'Small', light: 'Indirect light', description: 'A graceful arrangement of glossy leaves. Compact greenery that gives a desk or side table a lift.', badge: 'Desk companion', demo: true, stock: 9 },
];
export const categories = ['All plants', 'Desk plants', 'Trailing plants', 'Statement plants'] as const;
export const formatPrice = (amount: number) => new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(amount);
