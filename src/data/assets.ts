export type Asset = { src: string; alt: string; position: string; temporary: boolean };
export const assets: Record<string, Asset> = {
  hero: { src: '/images/demo/hero.png', alt: 'Sunlight falling across a calm interior filled with leafy indoor plants', position: 'center', temporary: true },
  monstera: { src: '/images/demo/monstera.png', alt: 'Illustrative Monstera in a cream ceramic pot', position: 'center', temporary: true },
  pothos: { src: '/images/demo/pothos.png', alt: 'Illustrative trailing golden pothos in a cream pot', position: 'center', temporary: true },
  snake: { src: '/images/demo/snake.png', alt: 'Illustrative snake plant in a terracotta pot', position: 'center', temporary: true },
  rubber: { src: '/images/demo/rubber.png', alt: 'Illustrative rubber plant in a cream ceramic pot', position: 'center', temporary: true },
  peace: { src: '/images/demo/peace.png', alt: 'Illustrative peace lily in a cream ceramic pot', position: 'center', temporary: true },
  zz: { src: '/images/demo/zz.png', alt: 'Illustrative ZZ plant in a sandy ceramic pot', position: 'center', temporary: true },
};
