"use client";

import { useState } from "react";

type CouponFormProps = {
  mode: "create" | "edit";
  action: (formData: FormData) => Promise<void>;
  initialValues?: {
    id?: string;
    code: string;
    discountType: "percent" | "fixed";
    discountValue: number;
    isActive: boolean;
    expiresAt: string;
  };
};

export default function CouponForm({
  mode,
  action,
  initialValues,
}: CouponFormProps) {
  const [code, setCode] = useState(initialValues?.code ?? "");
  const [discountType, setDiscountType] = useState<"percent" | "fixed">(
    initialValues?.discountType ?? "percent",
  );
  const [discountValue, setDiscountValue] = useState(
    String(initialValues?.discountValue ?? 0),
  );
  const [isActive, setIsActive] = useState(initialValues?.isActive ?? true);
  const [expiresAt, setExpiresAt] = useState(initialValues?.expiresAt ?? "");

  return (
    <form
      action={action}
      className="rounded-[2rem] border border-[#EFE5E6] bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
    >
      {mode === "edit" && initialValues?.id && (
        <input type="hidden" name="id" value={initialValues.id} />
      )}

      <input type="hidden" name="isActive" value={String(isActive)} />

      <div className="grid gap-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#1F1F1F]">
            Código
          </label>
          <input
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="w-full rounded-2xl border border-[#E7D8D7] bg-[#FCF9F8] px-4 py-3 text-sm outline-none transition focus:border-[#C8949D]"
            placeholder="AURORA10"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#1F1F1F]">
            Tipo de descuento
          </label>
          <select
            name="discountType"
            value={discountType}
            onChange={(e) =>
              setDiscountType(e.target.value as "percent" | "fixed")
            }
            className="w-full rounded-2xl border border-[#E7D8D7] bg-[#FCF9F8] px-4 py-3 text-sm outline-none transition focus:border-[#C8949D]"
          >
            <option value="percent">Porcentaje</option>
            <option value="fixed">Monto fijo</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#1F1F1F]">
            Valor
          </label>
          <input
            type="number"
            name="discountValue"
            min="0"
            step="0.01"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            className="w-full rounded-2xl border border-[#E7D8D7] bg-[#FCF9F8] px-4 py-3 text-sm outline-none transition focus:border-[#C8949D]"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#1F1F1F]">
            Vencimiento
          </label>
          <input
            type="datetime-local"
            name="expiresAt"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            className="w-full rounded-2xl border border-[#E7D8D7] bg-[#FCF9F8] px-4 py-3 text-sm outline-none transition focus:border-[#C8949D]"
          />
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-[#EFE5E6] bg-[#FCF9F8] px-4 py-3">
          <div>
            <p className="text-sm font-medium text-[#1F1F1F]">Activo</p>
            <p className="text-xs text-[#666666]">
              Si está inactivo, no se puede usar.
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
            {isActive ? "Activo" : "Inactivo"}
          </button>
        </div>

        <button
          type="submit"
          className="mt-2 rounded-full bg-[#D9A8AF] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#C8949D]"
        >
          {mode === "create" ? "Crear cupón" : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
}