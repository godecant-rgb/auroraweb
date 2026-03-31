import { formatCurrencyUYU } from "@/lib/format";
import { getAdminDashboardStats } from "@/services/admin-dashboard.service";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getAdminDashboardStats();

  return (
    <main className="min-h-screen bg-[#F1E7E6]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[#C8949D]">
            Aurora Admin
          </p>
          <h1 className="mt-3 text-5xl font-semibold text-[#1F1F1F]">
            Dashboard
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-[2rem] border border-[#EFE5E6] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <p className="text-sm uppercase tracking-[0.2em] text-[#C8949D]">
              Pedidos
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-[#1F1F1F]">
              {stats.totalOrders}
            </h2>
          </div>

          <div className="rounded-[2rem] border border-[#EFE5E6] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <p className="text-sm uppercase tracking-[0.2em] text-[#C8949D]">
              Pendientes
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-[#1F1F1F]">
              {stats.pendingOrders}
            </h2>
          </div>

          <div className="rounded-[2rem] border border-[#EFE5E6] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <p className="text-sm uppercase tracking-[0.2em] text-[#C8949D]">
              Entregados
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-[#1F1F1F]">
              {stats.deliveredOrders}
            </h2>
          </div>

          <div className="rounded-[2rem] border border-[#EFE5E6] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <p className="text-sm uppercase tracking-[0.2em] text-[#C8949D]">
              Total vendido
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#1F1F1F]">
              {formatCurrencyUYU(stats.totalRevenue)}
            </h2>
          </div>

          <div className="rounded-[2rem] border border-[#EFE5E6] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <p className="text-sm uppercase tracking-[0.2em] text-[#C8949D]">
              Ticket promedio
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#1F1F1F]">
              {formatCurrencyUYU(stats.averageTicket)}
            </h2>
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-[#EFE5E6] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <p className="text-sm uppercase tracking-[0.2em] text-[#C8949D]">
              Venta del mes
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-[#1F1F1F]">
              {formatCurrencyUYU(stats.monthRevenue)}
            </h2>
          </div>

          <section className="rounded-[2rem] border border-[#EFE5E6] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <p className="text-sm uppercase tracking-[0.2em] text-[#C8949D]">
              Más vendidos
            </p>

            <div className="mt-6 space-y-4">
              {stats.topProducts.length === 0 ? (
                <p className="text-[#666666]">Todavía no hay ventas registradas.</p>
              ) : (
                stats.topProducts.map((product, index) => (
                  <div
                    key={`${product.product_name}-${index}`}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#F1E7E6] bg-[#FCF9F8] p-4"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-[#1F1F1F]">
                        {product.product_name}
                      </h3>
                      <p className="text-sm text-[#666666]">
                        Unidades vendidas: {product.total_quantity}
                      </p>
                    </div>

                    <p className="text-lg font-semibold text-[#1F1F1F]">
                      {formatCurrencyUYU(product.total_sales)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}