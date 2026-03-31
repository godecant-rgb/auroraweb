import type { CartItem, CartTotals } from "@/types/cart";

const CART_STORAGE_KEY = "aurora_cart";

export function getCartStorageKey() {
  return CART_STORAGE_KEY;
}

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];
    return parsed as CartItem[];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function addItemToCart(items: CartItem[], newItem: CartItem): CartItem[] {
  const existingIndex = items.findIndex(
    (item) =>
      item.productId === newItem.productId &&
      item.variantId === newItem.variantId,
  );

  if (existingIndex >= 0) {
    const updated = [...items];
    updated[existingIndex] = {
      ...updated[existingIndex],
      quantity: Math.max(
        1,
        updated[existingIndex].quantity + newItem.quantity,
      ),
    };
    return updated;
  }

  return [...items, newItem];
}

export function removeItemFromCart(
  items: CartItem[],
  variantId: string,
): CartItem[] {
  return items.filter((item) => item.variantId !== variantId);
}

export function updateCartItemQuantity(
  items: CartItem[],
  variantId: string,
  quantity: number,
): CartItem[] {
  if (quantity <= 0) {
    return removeItemFromCart(items, variantId);
  }

  return items.map((item) =>
    item.variantId === variantId ? { ...item, quantity: Math.max(1, quantity) } : item,
  );
}

export function clearCart() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CART_STORAGE_KEY);
}

export function getCartTotals(items: CartItem[]): CartTotals {
  return items.reduce(
    (acc, item) => {
      acc.totalItems += item.quantity;
      acc.subtotal += item.unitPrice * item.quantity;
      return acc;
    },
    { subtotal: 0, totalItems: 0 },
  );
}