import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export async function validateCoupon(code: string, subtotal: number) {
  const supabase = getSupabaseAdminClient();

  const normalizedCode = code.trim().toUpperCase();

  if (!normalizedCode) {
    return {
      valid: false,
      message: "Ingresá un cupón.",
      discountAmount: 0,
      finalTotal: subtotal,
    };
  }

  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("code", normalizedCode)
    .eq("is_active", true)
    .single();

  if (error || !data) {
    return {
      valid: false,
      message: "Cupón inválido.",
      discountAmount: 0,
      finalTotal: subtotal,
    };
  }

  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return {
      valid: false,
      message: "El cupón está vencido.",
      discountAmount: 0,
      finalTotal: subtotal,
    };
  }

  let discountAmount = 0;

  if (data.discount_type === "percent") {
    discountAmount = subtotal * (Number(data.discount_value) / 100);
  } else if (data.discount_type === "fixed") {
    discountAmount = Number(data.discount_value);
  }

  discountAmount = Math.min(discountAmount, subtotal);
  const finalTotal = Math.max(subtotal - discountAmount, 0);

  return {
    valid: true,
    code: normalizedCode,
    discountAmount,
    finalTotal,
    message: "Cupón aplicado correctamente.",
  };
}