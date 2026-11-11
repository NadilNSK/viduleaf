export type CartItem = { productId: string; quantity: number };
type CatalogueItem = { id: string; price: number; stock: number };

/** Treat browser storage as untrusted input and reconcile it with current stock. */
export function sanitiseCart(value: unknown, catalogue: readonly CatalogueItem[]): CartItem[] {
  if (!Array.isArray(value)) return [];
  const merged = new Map<string, number>();
  for (const entry of value) {
    if (!entry || typeof entry !== 'object') continue;
    const { productId, quantity } = entry;
    const product = catalogue.find((p) => p.id === productId);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || product.stock < 1) continue;
    merged.set(productId, Math.min(product.stock, 99, (merged.get(productId) || 0) + quantity));
  }
  return Array.from(merged, ([productId, quantity]) => ({ productId, quantity }));
}

export function cartSubtotal(items: readonly CartItem[], catalogue: readonly CatalogueItem[]): number {
  return sanitiseCart(items, catalogue).reduce((total, item) => {
    const product = catalogue.find((p) => p.id === item.productId)!;
    return total + product.price * item.quantity;
  }, 0);
}

export function changeQuantity(items: readonly CartItem[], id: string, quantity: number, catalogue: readonly CatalogueItem[]): CartItem[] {
  const current = sanitiseCart(items, catalogue).filter((item) => item.productId !== id);
  if (!Number.isInteger(quantity) || quantity <= 0) return current;
  return sanitiseCart([...current, { productId: id, quantity }], catalogue);
}
