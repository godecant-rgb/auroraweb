export type CartItem = {
  productId: string;
  variantId: string;
  name: string;
  slug: string;
  image: string | null;
  color: string;
  size: string;
  quantity: number;
  unitPrice: number;
};

export type CartTotals = {
  subtotal: number;
  totalItems: number;
};