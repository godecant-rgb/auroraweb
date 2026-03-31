"use client";

import { useState } from "react";

type VariantFormProps = {
  productId: string;
  action: (formData: FormData) => Promise<void>;
  initialValues?: {
    id?: string;
    color: string;
    size: string;
    stock: number;
    isActive: boolean;
  };
  mode: "create" | "edit";
};

export default function VariantForm({
  productId,
  action,
  initialValues,
  mode,
}: VariantFormProps) {
  const [color, setColor] = useState(initialValues?.color ?? "");
  const [size, setSize] = useState(initialValues?.size ?? "");
  const [stock, setStock] = useState(String(initialValues?.stock ?? 0));
  const [isActive, setIsActive] = useState(initialValues?.isActive ?? true);

  return (
    <form
      action={action}
      className="rounded-[2rem] border border-[#EFE5E6] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
    >
      {mode === "edit" && initialValues?.id && (
        <input type="hidden" name="id" value={initialValues.id} />
      )}

      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="isActive" value={String(isActive)} />

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#1F1F1F]">
            Color
          </label>
          <input
            name="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full rounded-2xl border border-[#E7D8D7] bg-[#FCF9F8] px-4 py-3 text-sm outline-none transition focus:border-[#C8949D]"
            placeholder="Rosa"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#1F1F1F]">
            Talle
          </label>
          <input
            name="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full rounded-2xl border border-[#E7D8D7] bg-[#FCF9F8] px-4 py-3 text-sm outline-none transition focus:border-[#C8949D]"
            placeholder="S"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#1F1F1F]">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full rounded-2xl border border-[#E7D8D7] bg-[#FCF9F8] px-4 py-3 text-sm outline-none transition focus:border-[#C8949D]"
            required
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-2xl border border-[#EFE5E6] bg-[#FCF9F8] px-4 py-3">
        <div>
          <p className="text-sm font-medium text-[#1F1F1F]">Activa</p>
          <p className="text-xs text-[#666666]">
            Solo las variantes activas aparecen en el catálogo.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsActive((prev) => !prev)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            isActive
              ? "bg-[#D9A8AF] text-white"
              : "bg-[#ECECEC] text-[#666666]"
          }`}
        >
          {isActive ? "Activa" : "Inactiva"}
        </button>
      </div>

      <button
        type="submit"
        className="mt-5 rounded-full bg-[#D9A8AF] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#C8949D]"
      >
        {mode === "create" ? "Agregar variante" : "Guardar variante"}
      </button>
    </form>
  );
}