export type CheckoutFormData = {
  fullName: string;
  phone: string;
  city: string;
  notes: string;
};

export type CheckoutResponse = {
  success: boolean;
  whatsappUrl?: string;
  orderId?: string;
  error?: string;
};