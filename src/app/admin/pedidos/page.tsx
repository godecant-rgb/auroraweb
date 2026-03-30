import Link from "next/link";
import { formatCurrencyUYU } from "@/lib/format";
import { getAdminOrders } from "@/services/admin-orders.service";

export const dynamic = "force-dynamic";

function statusLabel(status: string) {
  switch (status) {
    case "pending":
      return "Pendiente";
    case "confirmed":
      return "Confirmado";
    case "preparing":
      return "Preparando";
    case "shipped":
      return "Enviado";
    case "delivered":
      return "Entregado";
    case "cancelled":
      return "Cancelado";
    default:
      return status;
  }
}

export default async function AdminPedidosPage() {
  const orders = await getAdminOrders();

  return (
    <main className="min-h-screen bg-[#F1E7E6]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[#C8949D]">
            Aurora Admin
          </p>
          <h1 className="mt-3 text-5xl font-semibold text-[#1F1F1F]">
            Pedidos
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-[#DCCCCC] bg-white p-10 text-center text-[#666666]">
            No hay pedidos todavía.
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => {
              const customer = Array.isArray(order.customers)
                ? order.customers[0]
                : order.customers;

              return (
                <Link
                  key={order.id}
                  href={`/admin/pedidos/${order.id}`}
                  className="block rounded-[2rem] border border-[#EFE5E6] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-[#8B7E7E]">
                        Pedido #{order.id.slice(0, 8)}
                      </p>
                      <h2 className="text-xl font-medium text-[#1F1F1F]">
                        {customer?.full_name ?? "Cliente sin nombre"}
                      </h2>
                      <p className="text-sm text-[#666666]">
                        {customer?.phone ?? "-"} · {customer?.city ?? "-"}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="rounded-full bg-[#F5E3E6] px-3 py-1 text-xs font-medium text-[#B67F7F] inline-block">
                        {statusLabel(order.status)}
                      </p>
                      <p className="mt-3 text-lg font-semibold text-[#1F1F1F]">
                        {formatCurrencyUYU(order.subtotal)}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}