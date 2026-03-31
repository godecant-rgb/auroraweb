"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { formatCurrencyUYU } from "@/lib/format";
import CheckoutForm from "@/components/carrito/CheckoutForm";
import type { CouponApplyResponse } from "@/types/coupon";

export default function CarritoPage() {
  const { items, totals, updateQuantity, removeFromCart, emptyCart, isReady } =
    useCart();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCouponCode, setAppliedCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  async function handleApplyCoupon() {
    setCouponError("");
    setCouponMessage("");
    setCouponLoading(true);

    try {
      const response = await fetch("/api/coupons/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: couponCode,
          subtotal: totals.subtotal,
        }),
      });

      const data = (await response.json()) as CouponApplyResponse;

      if (!data.valid) {
        setAppliedCouponCode("");
        setDiscountAmount(0);
        setFinalTotal(totals.subtotal);
        setCouponError(data.message || "Cupón inválido.");
        return;
      }

      setAppliedCouponCode(data.code || "");
      setDiscountAmount(Number(data.discountAmount || 0));
      setFinalTotal(Number(data.finalTotal || totals.subtotal));
      setCouponMessage(data.message || "Cupón aplicado.");
    } catch {
      setAppliedCouponCode("");
      setDiscountAmount(0);
      setFinalTotal(totals.subtotal);
      setCouponError("No se pudo validar el cupón.");
    } finally {
      setCouponLoading(false);
    }
  }

  if (!isReady) {
    return (
      <main className="min-h-screen bg-[#F1E7E6]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <p className="text-[#666666]">Cargando carrito...</p>
        </div>
      </main>
    );
  }

  const totalToPay = appliedCouponCode ? finalTotal : totals.subtotal;

  return (
    <main className="min-h-screen bg-[#F1E7E6]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#C8949D]">
              Aurora
            </p>
            <h1 className="mt-3 text-5xl font-semibold text-[#1F1F1F]">
              Carrito
            </h1>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={emptyCart}
              className="rounded-full border border-[#E7C9CD] bg-white px-5 py-3 text-sm font-medium text-[#1F1F1F] transition hover:bg-[#FCF9F8]"
            >
              Vaciar carrito
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-[#DCCCCC] bg-white p-10 text-center">
            <p className="text-lg text-[#666666]">Tu carrito está vacío.</p>

            <Link
              href="/catalogo"
              className="mt-6 inline-flex rounded-full bg-[#D9A8AF] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#C8949D]"
            >
              Ir al catálogo
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 xl:grid-cols-[1.35fr_0.95fr]">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.variantId}
                  className="grid gap-4 rounded-[2rem] border border-[#EFE5E6] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] md:grid-cols-[120px_1fr_auto]"
                >
                  <div className="overflow-hidden rounded-2xl bg-[#F8F3F1]">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-[140px] w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-[140px] items-center justify-center text-sm text-[#8B7E7E]">
                        Sin imagen
                      </div>
                    )}
                  </div>

                  <div>
                    <h2 className="text-xl font-medium text-[#1F1F1F]">
                      {item.name}
                    </h2>
                    <p className="mt-2 text-sm text-[#666666]">
                      Color: {item.color}
                    </p>
                    <p className="text-sm text-[#666666]">Talle: {item.size}</p>
                    <p className="mt-3 text-lg font-semibold text-[#1F1F1F]">
                      {formatCurrencyUYU(item.unitPrice)}
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-4 md:items-end">
                    <div className="flex items-center overflow-hidden rounded-full border border-[#E7D8D7] bg-[#FCF9F8]">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity - 1)
                        }
                        className="px-4 py-2 text-sm text-[#555555] transition hover:bg-[#F5E3E6]"
                      >
                        -
                      </button>
                      <span className="min-w-[48px] text-center text-sm font-medium text-[#1F1F1F]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity + 1)
                        }
                        className="px-4 py-2 text-sm text-[#555555] transition hover:bg-[#F5E3E6]"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.variantId)}
                      className="text-sm font-medium text-[#B67F7F] transition hover:text-[#9F6666]"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <aside className="rounded-[2rem] border border-[#EFE5E6] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                <p className="text-sm uppercase tracking-[0.2em] text-[#C8949D]">
                  Resumen
                </p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between text-[#666666]">
                    <span>Productos</span>
                    <span>{totals.totalItems}</span>
                  </div>

                  <div className="flex items-center justify-between text-[#666666]">
                    <span>Subtotal</span>
                    <span>{formatCurrencyUYU(totals.subtotal)}</span>
                  </div>

                  {appliedCouponCode && discountAmount > 0 && (
                    <div className="flex items-center justify-between text-[#666666]">
                      <span>Descuento ({appliedCouponCode})</span>
                      <span>- {formatCurrencyUYU(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-lg font-semibold text-[#1F1F1F]">
                    <span>Total</span>
                    <span>{formatCurrencyUYU(totalToPay)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Cupón"
                      className="flex-1 rounded-full border border-[#E7D8D7] bg-[#FCF9F8] px-4 py-3 text-sm outline-none transition focus:border-[#C8949D]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={couponLoading}
                      className="rounded-full bg-[#1F1F1F] px-5 py-3 text-sm font-medium text-white transition hover:bg-black disabled:opacity-50"
                    >
                      {couponLoading ? "..." : "Aplicar"}
                    </button>
                  </div>

                  {couponMessage && (
                    <div className="rounded-2xl bg-[#F5E3E6] p-3 text-sm font-medium text-[#B67F7F]">
                      {couponMessage}
                    </div>
                  )}

                  {couponError && (
                    <div className="rounded-2xl bg-[#FBE9E9] p-3 text-sm font-medium text-[#B05050]">
                      {couponError}
                    </div>
                  )}
                </div>

                <Link
                  href="/catalogo"
                  className="mt-8 block w-full rounded-full border border-[#E7C9CD] bg-white px-6 py-3 text-center text-sm font-medium text-[#1F1F1F] transition hover:bg-[#FCF9F8]"
                >
                  Seguir comprando
                </Link>
              </aside>

              <CheckoutForm
                items={items}
                subtotal={totals.subtotal}
                couponCode={appliedCouponCode}
                discountAmount={discountAmount}
                totalAmount={totalToPay}
                onSuccess={emptyCart}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}