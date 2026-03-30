export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type Customer = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  city: string | null;
  created_at: string;
};

export type Order = {
  id: string;
  customer_id: string | null;
  status: OrderStatus;
  subtotal: number;
  notes: string | null;
  whatsapp_sent: boolean;
  created_at: string;
  updated_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string | null;
  variant_id: string | null;
  product_name: string;
  color: string;
  size: string;
  quantity: number;
  unit_price: number;
  line_total: number;
  created_at: string;
};
