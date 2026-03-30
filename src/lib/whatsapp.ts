import type { CartItem } from "@/types/cart";

type CustomerCheckoutData = {
  fullName: string;
  phone: string;
  city: string;
  notes?: string;
};

type BuildWhatsappMessageParams = {
  items: CartItem[];
  customer: CustomerCheckoutData;
  subtotal: number;
};

export function buildWhatsappMessage({
  items,
  customer,
  subtotal,
}: BuildWhatsappMessageParams) {
  const lines = items.map(
    (item) =>
      `- ${item.name} / Color: ${item.color} / Talle: ${item.size} / Cantidad: ${item.quantity} / $${item.unitPrice * item.quantity}`,
  );

  const notesLine = customer.notes?.trim()
    ? `Observaciones: ${customer.notes.trim()}`
    : "Observaciones: -";

  return [
    "Hola, quiero confirmar este pedido de Aurora:",
    "",
    ...lines,
    "",
    `Subtotal: $${subtotal}`,
    "",
    "Mis datos:",
    `Nombre: ${customer.fullName}`,
    `Teléfono: ${customer.phone}`,
    `Ciudad: ${customer.city}`,
    notesLine,
  ].join("\n");
}

export function buildWhatsappUrl(phone: string, message: string) {
  const cleanPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}