import { notFound } from "next/navigation";
import CouponForm from "@/components/admin/CouponForm";
import { updateCouponAction } from "../actions";
import { getAdminCouponById } from "@/services/admin-coupons.service";

type AdminCuponDetallePageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminCuponDetallePage({
  params,
}: AdminCuponDetallePageProps) {
  const { id } = await params;
  const coupon = await getAdminCouponById(id);

  if (!coupon) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F1E7E6]">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[#C8949D]">
            Aurora Admin
          </p>
          <h1 className="mt-3 text-5xl font-semibold text-[#1F1F1F]">
            Editar cupón
          </h1>
        </div>

        <CouponForm
          mode="edit"
          action={updateCouponAction}
          initialValues={{
            id: coupon.id,
            code: coupon.code ?? "",
            discountType: coupon.discount_type,
            discountValue: coupon.discount_value ?? 0,
            isActive: coupon.is_active ?? true,
            expiresAt: coupon.expires_at
              ? new Date(coupon.expires_at).toISOString().slice(0, 16)
              : "",
          }}
        />
      </div>
    </main>
  );
}