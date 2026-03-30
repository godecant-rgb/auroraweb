"use client";

import { useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/types/cart";
import {
  addItemToCart,
  clearCart,
  getCartTotals,
  readCart,
  removeItemFromCart,
  saveCart,
  updateCartItemQuantity,
} from "@/lib/cart";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedItems = readCart();
    setItems(storedItems);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    saveCart(items);
  }, [items, isReady]);

  const totals = useMemo(() => getCartTotals(items), [items]);

  function addToCart(item: CartItem) {
    setItems((prev) => addItemToCart(prev, item));
  }

  function removeFromCart(variantId: string) {
    setItems((prev) => removeItemFromCart(prev, variantId));
  }

  function updateQuantity(variantId: string, quantity: number) {
    setItems((prev) => updateCartItemQuantity(prev, variantId, quantity));
  }

  function emptyCart() {
    setItems([]);
    clearCart();
  }

  return {
    items,
    isReady,
    totals,
    addToCart,
    removeFromCart,
    updateQuantity,
    emptyCart,
  };
}