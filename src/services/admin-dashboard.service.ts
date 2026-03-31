import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export async function getAdminDashboardStats() {
  const supabase = getSupabaseAdminClient();

  const [{ data: orders, error: ordersError }, { data: orderItems, error: itemsError }] =
    await Promise.all([
      supabase
        .from("orders")
        .select("id, status, total_amount, subtotal, discount_amount, created_at"),
      supabase
        .from("order_items")
        .select("product_name, quantity, line_total"),
    ]);

  if (ordersError) {
    throw new Error(`Error al obtener pedidos: ${ordersError.message}`);
  }

  if (itemsError) {
    throw new Error(`Error al obtener items: ${itemsError.message}`);
  }

  const safeOrders = orders ?? [];
  const safeItems = orderItems ?? [];

  const totalOrders = safeOrders.length;
  const pendingOrders = safeOrders.filter((order) => order.status === "pending").length;
  const deliveredOrders = safeOrders.filter((order) => order.status === "delivered").length;

  const totalRevenue = safeOrders.reduce((acc, order) => {
    const totalAmount =
      typeof order.total_amount === "number" ? order.total_amount : null;
    const subtotal =
      typeof order.subtotal === "number" ? order.subtotal : 0;
    const discountAmount =
      typeof order.discount_amount === "number" ? order.discount_amount : 0;

    const finalAmount =
      totalAmount !== null && totalAmount > 0
        ? totalAmount
        : Math.max(subtotal - discountAmount, 0);

    return acc + finalAmount;
  }, 0);

  const averageTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthRevenue = safeOrders.reduce((acc, order) => {
    const orderDate = new Date(order.created_at);
    const isCurrentMonth =
      orderDate.getMonth() === currentMonth &&
      orderDate.getFullYear() === currentYear;

    if (!isCurrentMonth) return acc;

    const totalAmount =
      typeof order.total_amount === "number" ? order.total_amount : null;
    const subtotal =
      typeof order.subtotal === "number" ? order.subtotal : 0;
    const discountAmount =
      typeof order.discount_amount === "number" ? order.discount_amount : 0;

    const finalAmount =
      totalAmount !== null && totalAmount > 0
        ? totalAmount
        : Math.max(subtotal - discountAmount, 0);

    return acc + finalAmount;
  }, 0);

  const productMap = new Map<
    string,
    { product_name: string; total_quantity: number; total_sales: number }
  >();

  for (const item of safeItems) {
    const current = productMap.get(item.product_name) ?? {
      product_name: item.product_name,
      total_quantity: 0,
      total_sales: 0,
    };

    current.total_quantity += item.quantity ?? 0;
    current.total_sales += item.line_total ?? 0;

    productMap.set(item.product_name, current);
  }

  const topProducts = [...productMap.values()]
    .sort((a, b) => b.total_quantity - a.total_quantity)
    .slice(0, 5);

  return {
    totalOrders,
    pendingOrders,
    deliveredOrders,
    totalRevenue,
    averageTicket,
    monthRevenue,
    topProducts,
  };
}