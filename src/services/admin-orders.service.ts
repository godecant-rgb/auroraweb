import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export async function getAdminOrders() {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      status,
      subtotal,
      notes,
      whatsapp_sent,
      created_at,
      updated_at,
      customers (
        id,
        full_name,
        phone,
        email,
        city
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Error al obtener pedidos: ${error.message}`);
  }

  return data ?? [];
}

export async function getAdminOrderById(orderId: string) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      status,
      subtotal,
      notes,
      whatsapp_sent,
      created_at,
      updated_at,
      customers (
        id,
        full_name,
        phone,
        email,
        city
      ),
      order_items (
        id,
        product_name,
        color,
        size,
        quantity,
        unit_price,
        line_total,
        created_at
      )
    `)
    .eq("id", orderId)
    .single();

  if (error) {
    throw new Error(`Error al obtener pedido: ${error.message}`);
  }

  return data;
}

export async function updateAdminOrderStatus(orderId: string, status: string) {
  const supabase = getSupabaseAdminClient();

  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId);

  if (error) {
    throw new Error(`Error al actualizar estado: ${error.message}`);
  }
}