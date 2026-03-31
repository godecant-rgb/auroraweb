"use server";

import { revalidatePath } from "next/cache";
import {
  createAdminProduct,
  createAdminVariant,
  deleteAdminVariant,
  updateAdminProduct,
  updateAdminVariant,
} from "@/services/admin-products.service";

function parseBoolean(value: FormDataEntryValue | null) {
  return value === "true";
}

function parseNullableString(value: FormDataEntryValue | null) {
  const parsed = String(value ?? "").trim();
  return parsed.length > 0 ? parsed : null;
}

export async function createProductAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Number(formData.get("price") ?? 0);
  const categoryId = parseNullableString(formData.get("categoryId"));
  const isActive = parseBoolean(formData.get("isActive"));

  if (!name || !slug) {
    throw new Error("Nombre y slug son obligatorios.");
  }

  await createAdminProduct({
    name,
    slug,
    description,
    price,
    categoryId,
    isActive,
  });

  revalidatePath("/admin/productos");
  revalidatePath("/catalogo");
}

export async function updateProductAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Number(formData.get("price") ?? 0);
  const categoryId = parseNullableString(formData.get("categoryId"));
  const isActive = parseBoolean(formData.get("isActive"));

  if (!id || !name || !slug) {
    throw new Error("Id, nombre y slug son obligatorios.");
  }

  await updateAdminProduct({
    id,
    name,
    slug,
    description,
    price,
    categoryId,
    isActive,
  });

  revalidatePath("/admin/productos");
  revalidatePath(`/admin/productos/${id}`);
  revalidatePath("/catalogo");
}

export async function createVariantAction(formData: FormData) {
  const productId = String(formData.get("productId") ?? "").trim();
  const color = String(formData.get("color") ?? "").trim();
  const size = String(formData.get("size") ?? "").trim();
  const stock = Number(formData.get("stock") ?? 0);
  const isActive = parseBoolean(formData.get("isActive"));

  if (!productId || !color || !size) {
    throw new Error("Producto, color y talle son obligatorios.");
  }

  await createAdminVariant({
    productId,
    color,
    size,
    stock,
    isActive,
  });

  revalidatePath(`/admin/productos/${productId}`);
  revalidatePath("/admin/productos");
  revalidatePath("/catalogo");
}

export async function updateVariantAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const productId = String(formData.get("productId") ?? "").trim();
  const color = String(formData.get("color") ?? "").trim();
  const size = String(formData.get("size") ?? "").trim();
  const stock = Number(formData.get("stock") ?? 0);
  const isActive = parseBoolean(formData.get("isActive"));

  if (!id || !productId || !color || !size) {
    throw new Error("Id, producto, color y talle son obligatorios.");
  }

  await updateAdminVariant({
    id,
    productId,
    color,
    size,
    stock,
    isActive,
  });

  revalidatePath(`/admin/productos/${productId}`);
  revalidatePath("/admin/productos");
  revalidatePath("/catalogo");
}

export async function deleteVariantAction(formData: FormData) {
  const variantId = String(formData.get("variantId") ?? "").trim();
  const productId = String(formData.get("productId") ?? "").trim();

  if (!variantId || !productId) {
    throw new Error("Faltan datos para eliminar la variante.");
  }

  await deleteAdminVariant(variantId);

  revalidatePath(`/admin/productos/${productId}`);
  revalidatePath("/admin/productos");
  revalidatePath("/catalogo");
}