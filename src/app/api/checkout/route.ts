import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { buildWhatsappMessage, buildWhatsappUrl } from "@/lib/whatsapp";
import { WHATSAPP_PHONE } from "@/lib/constants";
import { validateCoupon } from "@/services/coupons.service";
import type { CartItem } from "@/types/cart";

type RequestBody = {
  customer: {
    fullName: string;
    phone: string;
    city: string;
    notes?: string;
  };
  items: CartItem[];
  couponCode?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;
    const { customer, items, couponCode } = body;

    if (!customer?.fullName?.trim()) {
      return NextResponse.json(
        { success: false, error: "Falta el nombre." },
        { status: 400 },
      );
    }

    if (!customer?.phone?.trim()) {
      return NextResponse.json(
        { success: false, error: "Falta el teléfono." },
        { status: 400 },
      );
    }

    if (!customer?.city?.trim()) {
      return NextResponse.json(
        { success: false, error: "Falta la ciudad." },
        { status: 400 },
      );
    }

    if (!items?.length) {
      return NextResponse.json(
        { success: false, error: "El carrito está vacío." },
        { status: 400 },
      );
    }

    if (!WHATSAPP_PHONE) {
      return NextResponse.json(
        { success: false, error: "Falta configurar NEXT_PUBLIC_WHATSAPP_PHONE." },
        { status: 500 },
      );
    }

    const supabase = getSupabaseAdminClient();

    const subtotal = items.reduce(
      (acc, item) => acc + item.unitPrice * item.quantity,
      0,
    );

    const couponResult = couponCode
      ? await validateCoupon(couponCode, subtotal)
      : {
          valid: false,
          code: undefined,
          discountAmount: 0,
          finalTotal: subtotal,
        };

    const discountAmount = couponResult.valid
      ? Number(couponResult.discountAmount ?? 0)
      : 0;

    const totalAmount = couponResult.valid
      ? Number(couponResult.finalTotal ?? subtotal)
      : subtotal;

    const { data: customerData, error: customerError } = await supabase
      .from("customers")
      .insert({
        full_name: customer.fullName.trim(),
        phone: customer.phone.trim(),
        city: customer.city.trim(),
      })
      .select("id")
      .single();

    if (customerError) {
      return NextResponse.json(
        { success: false, error: `Error al crear cliente: ${customerError.message}` },
        { status: 500 },
      );
    }

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_id: customerData.id,
        status: "pending",
        subtotal,
        discount_code: couponResult.valid ? couponResult.code : null,
        discount_amount: discountAmount,
        total_amount: totalAmount,
        notes: customer.notes?.trim() || null,
        whatsapp_sent: false,
      })
      .select("id")
      .single();

    if (orderError) {
      return NextResponse.json(
        { success: false, error: `Error al crear pedido: ${orderError.message}` },
        { status: 500 },
      );
    }

    const orderItems = items.map((item) => ({
      order_id: orderData.id,
      product_id: item.productId,
      variant_id: item.variantId,
      product_name: item.name,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      line_total: item.unitPrice * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      return NextResponse.json(
        { success: false, error: `Error al guardar items: ${itemsError.message}` },
        { status: 500 },
      );
    }

    const message = buildWhatsappMessage({
      items,
      customer,
      subtotal: totalAmount,
    });

    const whatsappUrl = buildWhatsappUrl(WHATSAPP_PHONE, message);

    await supabase
      .from("orders")
      .update({ whatsapp_sent: true })
      .eq("id", orderData.id);

    return NextResponse.json({
      success: true,
      whatsappUrl,
      orderId: orderData.id,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error inesperado en checkout.";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}