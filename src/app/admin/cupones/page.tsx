import Link from "next/link";
import { getAdminCoupons } from "@/services/admin-coupons.service";

export const dynamic = "force-dynamic";

export default async function AdminCuponesPage() {
  const coupons = await getAdminCoupons();

  return (
    <main className="min-h-screen bg-[#F1E7E6]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#C8949D]">
              Aurora Admin
            </p>
            <h1 className="mt-3 text-5xl font-semibold text-[#1F1F1F]">
              Cupones
            </h1>
          </div>

          <Link
            href="/admin/cupones/nuevo"
            className="rounded-full bg-[#D9A8AF] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#C8949D]"
          >
            Nuevo cupón
          </Link>
        </div>

        {coupons.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-[#DCCCCC] bg-white p-10 text-center text-[#666666]">
            No hay cupones todavía.
          </div>
        ) : (
          <div className="space-y-4">
            {coupons.map((coupon: any) => (
              <Link
                key={coupon.id}
                href={`/admin/cupones/${coupon.id}`}
                className="block rounded-[2rem] border border-[#EFE5E6] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(0,0,0,0.06)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-[#8B7E7E]">
                      {coupon.discount_type === "percent" ? "Porcentaje" : "Monto fijo"}
                    </p>
                    <h2 className="text-2xl font-medium text-[#1F1F1F]">
                      {coupon.code}
                    </h2>
                    <p className="text-sm text-[#666666]">
                      Valor: {coupon.discount_value}
                    </p>
                    <p className="text-sm text-[#666666]">
                      Vence: {coupon.expires_at ? new Date(coupon.expires_at).toLocaleString() : "Sin vencimiento"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        coupon.is_active
                          ? "bg-[#F5E3E6] text-[#B67F7F]"
                          : "bg-[#ECECEC] text-[#666666]"
                      }`}
                    >
                      {coupon.is_active ? "Activo" : "Inactivo"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}