"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export default function CartButton() {
  const { totals, isReady } = useCart();

  return (
    <Link
      href="/carrito"
      className="relative rounded-full border border-[#E7C9CD] bg-white px-4 py-2 text-sm font-medium text-[#1F1F1F] shadow-sm transition hover:bg-[#FCF9F8]"
    >
      Carrito
      {isReady && totals.totalItems > 0 && (
        <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#D9A8AF] px-1 text-xs font-semibold text-white">
          {totals.totalItems}
        </span>
      )}
    </Link>
  );
}