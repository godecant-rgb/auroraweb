"use server";

import { revalidatePath } from "next/cache";
import {
  createAdminCoupon,
  updateAdminCoupon,
} from "@/services/admin-coupons.service";

function parseBoolean(value: FormDataEntryValue | null) {
  return value === "true";
}

function parseNullableString(value: FormDataEntryValue | null) {
  const parsed = String(value ?? "").trim();
  return parsed.length > 0 ? parsed : null;
}

export async function createCouponAction(formData: FormData) {
  const code = String(formData.get("code") ?? "").trim();
  const discountType = String(formData.get("discountType") ?? "").trim() as
    | "percent"
    | "fixed";
  const discountValue = Number(formData.get("discountValue") ?? 0);
  const isActive = parseBoolean(formData.get("isActive"));
  const expiresAt = parseNullableString(formData.get("expiresAt"));

  if (!code || !discountType) {
    throw new Error("Código y tipo son obligatorios.");
  }

  await createAdminCoupon({
    code,
    discountType,
    discountValue,
    isActive,
    expiresAt,
  });

  revalidatePath("/admin/cupones");
}

export async function updateCouponAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const code = String(formData.get("code") ?? "").trim();
  const discountType = String(formData.get("discountType") ?? "").trim() as
    | "percent"
    | "fixed";
  const discountValue = Number(formData.get("discountValue") ?? 0);
  const isActive = parseBoolean(formData.get("isActive"));
  const expiresAt = parseNullableString(formData.get("expiresAt"));

  if (!id || !code || !discountType) {
    throw new Error("Id, código y tipo son obligatorios.");
  }

  await updateAdminCoupon({
    id,
    code,
    discountType,
    discountValue,
    isActive,
    expiresAt,
  });

  revalidatePath("/admin/cupones");
  revalidatePath(`/admin/cupones/${id}`);
}