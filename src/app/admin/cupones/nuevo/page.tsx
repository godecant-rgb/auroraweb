import CouponForm from "@/components/admin/CouponForm";
import { createCouponAction } from "../actions";

export default function AdminNuevoCuponPage() {
  return (
    <main className="min-h-screen bg-[#F1E7E6]">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[#C8949D]">
            Aurora Admin
          </p>
          <h1 className="mt-3 text-5xl font-semibold text-[#1F1F1F]">
            Nuevo cupón
          </h1>
        </div>

        <CouponForm mode="create" action={createCouponAction} />
      </div>
    </main>
  );
}