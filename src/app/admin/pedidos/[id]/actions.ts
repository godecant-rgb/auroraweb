"use server";

import { revalidatePath } from "next/cache";
import { updateAdminOrderStatus } from "@/services/admin-orders.service";

export async function updateOrderStatusAction(formData: FormData) {
  const orderId = String(formData.get("orderId") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!orderId || !status) return;

  await updateAdminOrderStatus(orderId, status);

  revalidatePath("/admin/pedidos");
  revalidatePath(`/admin/pedidos/${orderId}`);
}