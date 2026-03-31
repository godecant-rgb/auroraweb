import { NextResponse } from "next/server";
import { validateCoupon } from "@/services/coupons.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const code = String(body.code ?? "");
    const subtotal = Number(body.subtotal ?? 0);

    const result = await validateCoupon(code, subtotal);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Coupon API error:", error);

    return NextResponse.json(
      {
        valid: false,
        message: "No se pudo validar el cupón.",
        discountAmount: 0,
        finalTotal: 0,
      },
      { status: 500 },
    );
  }
}