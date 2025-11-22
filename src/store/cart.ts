import { persistentAtom } from '@nanostores/persistent';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

// Use persistentAtom to store the entire cart array as JSON
export const cartItems = persistentAtom<CartItem[]>('cart', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export function addCartItem(item: Omit<CartItem, 'quantity'>) {
  const currentItems = cartItems.get();
  const existingItem = currentItems.find((i) => i.id === item.id);

  if (existingItem) {
    cartItems.set(
      currentItems.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  } else {
    cartItems.set([...currentItems, { ...item, quantity: 1 }]);
  }
}

export function removeCartItem(itemId: string) {
  const currentItems = cartItems.get();
  cartItems.set(currentItems.filter((i) => i.id !== itemId));
}

export function updateCartItemQuantity(itemId: string, quantity: number) {
  const currentItems = cartItems.get();
  if (quantity <= 0) {
    removeCartItem(itemId);
  } else {
    cartItems.set(
      currentItems.map((i) =>
        i.id === itemId ? { ...i, quantity } : i
      )
    );
  }
}
