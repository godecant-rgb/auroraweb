import { notFound } from "next/navigation";
import { formatCurrencyUYU } from "@/lib/format";
import { getAdminOrderById } from "@/services/admin-orders.service";
import { updateOrderStatusAction } from "./actions";

type AdminPedidoDetallePageProps = {
  params: Promise<{ id: string }>;
};

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

export default async function AdminPedidoDetallePage({
  params,
}: AdminPedidoDetallePageProps) {
  const { id } = await params;
  const order = await getAdminOrderById(id);

  if (!order) {
    notFound();
  }

  const customer = Array.isArray(order.customers)
    ? order.customers[0]
    : order.customers;

  const items = Array.isArray(order.order_items) ? order.order_items : [];

  return (
    <main className="min-h-screen bg-[#F1E7E6]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-[#C8949D]">
            Aurora Admin
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-[#1F1F1F]">
            Pedido #{order.id.slice(0, 8)}
          </h1>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <section className="rounded-[2rem] border border-[#EFE5E6] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
              <h2 className="text-2xl font-medium text-[#1F1F1F]">
                Productos
              </h2>

              <div className="mt-6 space-y-4">
                {items.map((item: any) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-[#F1E7E6] bg-[#FCF9F8] p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-medium text-[#1F1F1F]">
                          {item.product_name}
                        </h3>
                        <p className="mt-2 text-sm text-[#666666]">
                          Color: {item.color}
                        </p>
                        <p className="text-sm text-[#666666]">
                          Talle: {item.size}
                        </p>
                        <p className="text-sm text-[#666666]">
                          Cantidad: {item.quantity}
                        </p>
                      </div>

                      <p className="text-lg font-semibold text-[#1F1F1F]">
                        {formatCurrencyUYU(item.line_total)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-[2rem] border border-[#EFE5E6] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
              <h2 className="text-2xl font-medium text-[#1F1F1F]">
                Cliente
              </h2>

              <div className="mt-6 space-y-3 text-sm text-[#666666]">
                <p><span className="font-medium text-[#1F1F1F]">Nombre:</span> {customer?.full_name ?? "-"}</p>
                <p><span className="font-medium text-[#1F1F1F]">Teléfono:</span> {customer?.phone ?? "-"}</p>
                <p><span className="font-medium text-[#1F1F1F]">Ciudad:</span> {customer?.city ?? "-"}</p>
                <p><span className="font-medium text-[#1F1F1F]">Notas:</span> {order.notes ?? "-"}</p>
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#EFE5E6] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
              <h2 className="text-2xl font-medium text-[#1F1F1F]">
                Estado del pedido
              </h2>

              <p className="mt-4 rounded-full bg-[#F5E3E6] px-3 py-1 text-xs font-medium text-[#B67F7F] inline-block">
                {statusLabel(order.status)}
              </p>

              <form action={updateOrderStatusAction} className="mt-6 space-y-4">
                <input type="hidden" name="orderId" value={order.id} />

                <select
                  name="status"
                  defaultValue={order.status}
                  className="w-full rounded-2xl border border-[#E7D8D7] bg-[#FCF9F8] px-4 py-3 text-sm text-[#1F1F1F] outline-none"
                >
                  <option value="pending">Pendiente</option>
                  <option value="confirmed">Confirmado</option>
                  <option value="preparing">Preparando</option>
                  <option value="shipped">Enviado</option>
                  <option value="delivered">Entregado</option>
                  <option value="cancelled">Cancelado</option>
                </select>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#D9A8AF] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#C8949D]"
                >
                  Guardar estado
                </button>
              </form>

              <div className="mt-6 border-t border-[#F1E7E6] pt-6">
                <p className="text-sm text-[#666666]">Subtotal</p>
                <p className="mt-2 text-2xl font-semibold text-[#1F1F1F]">
                  {formatCurrencyUYU(order.subtotal)}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}