"use client";

import { useState } from "react";
import type { CartItem } from "@/types/cart";
import type { CheckoutFormData, CheckoutResponse } from "@/types/checkout";

type CheckoutFormProps = {
  items: CartItem[];
  subtotal: number;
  couponCode?: string;
  discountAmount?: number;
  totalAmount?: number;
  onSuccess?: () => void;
};

const initialForm: CheckoutFormData = {
  fullName: "",
  phone: "",
  city: "",
  notes: "",
};

export default function CheckoutForm({
  items,
  subtotal,
  couponCode,
  discountAmount = 0,
  totalAmount,
  onSuccess,
}: CheckoutFormProps) {
  const [form, setForm] = useState<CheckoutFormData>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function updateField<K extends keyof CheckoutFormData>(
    key: K,
    value: CheckoutFormData[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!form.fullName.trim() || !form.phone.trim() || !form.city.trim()) {
      setErrorMessage("Completá nombre, teléfono y ciudad.");
      return;
    }

    if (items.length === 0) {
      setErrorMessage("El carrito está vacío.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: form,
          items,
          couponCode: couponCode || undefined,
        }),
      });

      const data = (await response.json()) as CheckoutResponse;

      if (!response.ok || !data.success || !data.whatsappUrl) {
        throw new Error(data.error || "No se pudo confirmar el pedido.");
      }

      setSuccessMessage("Pedido guardado. Te estamos redirigiendo a WhatsApp...");

      if (onSuccess) onSuccess();

      window.location.href = data.whatsappUrl;
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Ocurrió un error al confirmar el pedido.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-[#EFE5E6] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
    >
      <p className="text-sm uppercase tracking-[0.2em] text-[#C8949D]">
        Confirmar pedido
      </p>

      <div className="mt-6 grid gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#1F1F1F]">
            Nombre completo
          </label>
          <input
            type="text"
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            className="w-full rounded-2xl border border-[#E7D8D7] bg-[#FCF9F8] px-4 py-3 text-sm text-[#1F1F1F] outline-none transition focus:border-[#C8949D]"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#1F1F1F]">
            Teléfono
          </label>
          <input
            type="text"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className="w-full rounded-2xl border border-[#E7D8D7] bg-[#FCF9F8] px-4 py-3 text-sm text-[#1F1F1F] outline-none transition focus:border-[#C8949D]"
            placeholder="099123456"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#1F1F1F]">
            Ciudad
          </label>
          <input
            type="text"
            value={form.city}
            onChange={(e) => updateField("city", e.target.value)}
            className="w-full rounded-2xl border border-[#E7D8D7] bg-[#FCF9F8] px-4 py-3 text-sm text-[#1F1F1F] outline-none transition focus:border-[#C8949D]"
            placeholder="Montevideo"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#1F1F1F]">
            Observaciones
          </label>
          <textarea
            value={form.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            rows={4}
            className="w-full rounded-2xl border border-[#E7D8D7] bg-[#FCF9F8] px-4 py-3 text-sm text-[#1F1F1F] outline-none transition focus:border-[#C8949D]"
            placeholder="Ej: envío a domicilio, horario, referencia, etc."
          />
        </div>
      </div>

      <div className="mt-6 space-y-2 rounded-2xl bg-[#F8F3F1] p-4 text-sm text-[#666666]">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>

        {couponCode && discountAmount > 0 && (
          <div className="flex items-center justify-between">
            <span>Descuento ({couponCode})</span>
            <span>- ${discountAmount}</span>
          </div>
        )}

        <div className="flex items-center justify-between font-semibold text-[#1F1F1F]">
          <span>Total</span>
          <span>${totalAmount ?? subtotal}</span>
        </div>
      </div>

      {errorMessage && (
        <div className="mt-4 rounded-2xl bg-[#FBE9E9] p-4 text-sm font-medium text-[#B05050]">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="mt-4 rounded-2xl bg-[#F5E3E6] p-4 text-sm font-medium text-[#B67F7F]">
          {successMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full rounded-full bg-[#D9A8AF] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#C8949D] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Procesando..." : "Confirmar por WhatsApp"}
      </button>
    </form>
  );
}