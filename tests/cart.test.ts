import test from 'node:test';
import assert from 'node:assert/strict';
const { sanitiseCart, changeQuantity, cartSubtotal } = await import('../src/lib/' + 'cart.ts');
const catalogue = [{ id: 'a', price: 1450, stock: 3 }, { id: 'b', price: 3200, stock: 8 }, { id: 'sold-out', price: 100, stock: 0 }];

test('untrusted browser storage cannot introduce unknown, invalid, or sold-out entries', () => {
  assert.deepEqual(sanitiseCart({ productId: 'a', quantity: 2 }, catalogue), []);
  assert.deepEqual(sanitiseCart([null, { productId: 'missing', quantity: 1 }, { productId: 'a', quantity: '2' }, { productId: 'a', quantity: NaN }, { productId: 'b', quantity: -4 }, { productId: 'b', quantity: 1.5 }, { productId: 'sold-out', quantity: 1 }], catalogue), []);
});
test('duplicate rows merge and respect stock while preserving distinct products', () => {
  assert.deepEqual(sanitiseCart([{ productId: 'a', quantity: 2 }, { productId: 'a', quantity: 2 }, { productId: 'b', quantity: 2 }], catalogue), [{ productId: 'a', quantity: 3 }, { productId: 'b', quantity: 2 }]);
});
test('quantity changes cap stock and zero removes the selected line', () => {
  const items = [{ productId: 'a', quantity: 2 }, { productId: 'b', quantity: 1 }];
  assert.deepEqual(changeQuantity(items, 'a', 0, catalogue), [{ productId: 'b', quantity: 1 }]);
  assert.equal(changeQuantity(items, 'a', 500, catalogue).find((item: { productId: string }) => item.productId === 'a').quantity, 3);
  assert.deepEqual(items, [{ productId: 'a', quantity: 2 }, { productId: 'b', quantity: 1 }]);
});
test('subtotal uses catalogue prices and reconciled quantities', () => {
  assert.equal(cartSubtotal([{ productId: 'a', quantity: 99, price: 1 }, { productId: 'b', quantity: 2 }, { productId: 'unknown', quantity: 5 }], catalogue), 10750);
});
