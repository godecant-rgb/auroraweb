"use client";

import { useState } from "react";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type ProductFormProps = {
  mode: "create" | "edit";
  categories: Category[];
  initialValues?: {
    id?: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    categoryId: string;
    isActive: boolean;
  };
  action: (formData: FormData) => Promise<void>;
};

export default function ProductForm({
  mode,
  categories,
  initialValues,
  action,
}: ProductFormProps) {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [slug, setSlug] = useState(initialValues?.slug ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [price, setPrice] = useState(String(initialValues?.price ?? 0));
  const [categoryId, setCategoryId] = useState(initialValues?.categoryId ?? "");
  const [isActive, setIsActive] = useState(initialValues?.isActive ?? true);

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
            Nombre
          </label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-[#E7D8D7] bg-[#FCF9F8] px-4 py-3 text-sm outline-none transition focus:border-[#C8949D]"
            placeholder="Ej: Top Aurora Move"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#1F1F1F]">
            Slug
          </label>
          <input
            name="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full rounded-2xl border border-[#E7D8D7] bg-[#FCF9F8] px-4 py-3 text-sm outline-none transition focus:border-[#C8949D]"
            placeholder="ej-top-aurora-move"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#1F1F1F]">
            Descripción
          </label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full rounded-2xl border border-[#E7D8D7] bg-[#FCF9F8] px-4 py-3 text-sm outline-none transition focus:border-[#C8949D]"
            placeholder="Descripción del producto"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#1F1F1F]">
            Precio
          </label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            step="1"
            className="w-full rounded-2xl border border-[#E7D8D7] bg-[#FCF9F8] px-4 py-3 text-sm outline-none transition focus:border-[#C8949D]"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#1F1F1F]">
            Categoría
          </label>
          <select
            name="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full rounded-2xl border border-[#E7D8D7] bg-[#FCF9F8] px-4 py-3 text-sm outline-none transition focus:border-[#C8949D]"
          >
            <option value="">Sin categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-[#EFE5E6] bg-[#FCF9F8] px-4 py-3">
          <div>
            <p className="text-sm font-medium text-[#1F1F1F]">Activo</p>
            <p className="text-xs text-[#666666]">
              Si está inactivo, no aparece en el catálogo.
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
          {mode === "create" ? "Crear producto" : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
}