"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { ProductVariant } from "@/types/product";
import { uniqueStrings } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

type VariantSelectorProps = {
  productId: string;
  productName: string;
  productSlug: string;
  productPrice: number;
  productImage: string | null;
  variants: ProductVariant[];
};

export default function VariantSelector({
  productId,
  productName,
  productSlug,
  productPrice,
  productImage,
  variants,
}: VariantSelectorProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const colors = useMemo(
    () => uniqueStrings(variants.map((variant) => variant.color)),
    [variants],
  );

  const [selectedColor, setSelectedColor] = useState<string>(colors[0] ?? "");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [addedMessage, setAddedMessage] = useState<string>("");

  const sizesForColor = useMemo(
    () => variants.filter((variant) => variant.color === selectedColor),
    [variants, selectedColor],
  );

  const selectedVariant = variants.find(
    (variant) =>
      variant.color === selectedColor && variant.size === selectedSize,
  );

  function handleAddToCart() {
    if (!selectedVariant || selectedVariant.stock <= 0) return;

    addToCart({
      productId,
      variantId: selectedVariant.id,
      name: productName,
      slug: productSlug,
      image: productImage,
      color: selectedVariant.color,
      size: selectedVariant.size,
      quantity,
      unitPrice: productPrice,
    });

    setAddedMessage("Producto agregado al carrito.");
    setTimeout(() => setAddedMessage(""), 2500);
  }

  return (
    <div className="space-y-6 rounded-[2rem] border border-[#EFE5E6] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
      <div>
        <p className="mb-3 text-sm font-medium text-[#1F1F1F]">Color</p>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => {
                setSelectedColor(color);
                setSelectedSize("");
                setQuantity(1);
              }}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                selectedColor === color
                  ? "border-[#1F1F1F] bg-[#1F1F1F] text-white"
                  : "border-[#E7D8D7] bg-white text-[#555555] hover:border-[#C8949D]"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-[#1F1F1F]">Talle</p>
        <div className="flex flex-wrap gap-2">
          {sizesForColor.map((variant) => (
            <button
              key={variant.id}
              type="button"
              disabled={variant.stock <= 0}
              onClick={() => {
                setSelectedSize(variant.size);
                setQuantity(1);
              }}
              className={`rounded-xl border px-4 py-2 text-sm transition ${
                selectedSize === variant.size
                  ? "border-[#D9A8AF] bg-[#D9A8AF] text-white"
                  : "border-[#E7D8D7] bg-white text-[#555555]"
              } ${variant.stock <= 0 ? "cursor-not-allowed opacity-40" : "hover:border-[#C8949D]"}`}
            >
              {variant.size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-[#1F1F1F]">Cantidad</p>
        <div className="flex w-fit items-center overflow-hidden rounded-full border border-[#E7D8D7] bg-[#FCF9F8]">
          <button
            type="button"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="px-4 py-2 text-sm text-[#555555] transition hover:bg-[#F5E3E6]"
          >
            -
          </button>
          <span className="min-w-[48px] text-center text-sm font-medium text-[#1F1F1F]">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => {
              const maxStock = selectedVariant?.stock ?? 1;
              setQuantity((prev) => Math.min(maxStock, prev + 1));
            }}
            className="px-4 py-2 text-sm text-[#555555] transition hover:bg-[#F5E3E6]"
          >
            +
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-[#F8F3F1] p-4 text-sm text-[#666666]">
        {selectedVariant ? (
          selectedVariant.stock > 0 ? (
            <span>Stock disponible: {selectedVariant.stock}</span>
          ) : (
            <span>Sin stock</span>
          )
        ) : (
          <span>Elegí color y talle para continuar.</span>
        )}
      </div>

      {addedMessage && (
        <div className="rounded-2xl bg-[#F5E3E6] p-4 text-sm font-medium text-[#B67F7F]">
          {addedMessage}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!selectedVariant || selectedVariant.stock <= 0}
          onClick={handleAddToCart}
          className="rounded-full bg-[#D9A8AF] px-6 py-3 text-sm font-medium text-white shadow-[0_10px_30px_rgba(201,148,157,0.28)] transition hover:bg-[#C8949D] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Agregar al carrito
        </button>

        <button
          type="button"
          onClick={() => router.push("/carrito")}
          className="rounded-full border border-[#E7C9CD] bg-white px-6 py-3 text-sm font-medium text-[#1F1F1F] transition hover:bg-[#FCF9F8]"
        >
          Ver carrito
        </button>
      </div>
    </div>
  );
}
