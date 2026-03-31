import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export async function getAdminCoupons() {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Error al obtener cupones: ${error.message}`);
  }

  return data ?? [];
}

export async function getAdminCouponById(couponId: string) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("id", couponId)
    .single();

  if (error) {
    throw new Error(`Error al obtener cupón: ${error.message}`);
  }

  return data;
}

type UpsertCouponInput = {
  id?: string;
  code: string;
  discountType: "percent" | "fixed";
  discountValue: number;
  isActive: boolean;
  expiresAt: string | null;
};

export async function createAdminCoupon(input: UpsertCouponInput) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("coupons")
    .insert({
      code: input.code.toUpperCase(),
      discount_type: input.discountType,
      discount_value: input.discountValue,
      is_active: input.isActive,
      expires_at: input.expiresAt,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(`Error al crear cupón: ${error.message}`);
  }

  return data;
}

export async function updateAdminCoupon(input: UpsertCouponInput) {
  const supabase = getSupabaseAdminClient();

  if (!input.id) {
    throw new Error("Falta el id del cupón.");
  }

  const { error } = await supabase
    .from("coupons")
    .update({
      code: input.code.toUpperCase(),
      discount_type: input.discountType,
      discount_value: input.discountValue,
      is_active: input.isActive,
      expires_at: input.expiresAt,
    })
    .eq("id", input.id);

  if (error) {
    throw new Error(`Error al actualizar cupón: ${error.message}`);
  }
}