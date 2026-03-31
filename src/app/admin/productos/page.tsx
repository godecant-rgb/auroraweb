import Link from "next/link";
import { formatCurrencyUYU } from "@/lib/format";
import { getAdminProducts } from "@/services/admin-products.service";

export const dynamic = "force-dynamic";

export default async function AdminProductosPage() {
  const products = await getAdminProducts();

  return (
    <main className="min-h-screen bg-[#F1E7E6]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#C8949D]">
              Aurora Admin
            </p>
            <h1 className="mt-3 text-5xl font-semibold text-[#1F1F1F]">
              Productos
            </h1>
          </div>

          <Link
            href="/admin/productos/nuevo"
            className="rounded-full bg-[#D9A8AF] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#C8949D]"
          >
            Nuevo producto
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-[#DCCCCC] bg-white p-10 text-center text-[#666666]">
            No hay productos todavía.
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product: any) => {
              const category = Array.isArray(product.categories)
                ? product.categories[0]
                : product.categories;

              const variants = Array.isArray(product.product_variants)
                ? product.product_variants
                : [];

              const totalStock = variants
                .filter((variant: any) => variant.is_active)
                .reduce((acc: number, variant: any) => acc + (variant.stock ?? 0), 0);

              return (
                <Link
                  key={product.id}
                  href={`/admin/productos/${product.id}`}
                  className="block rounded-[2rem] border border-[#EFE5E6] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-[#8B7E7E]">
                        {category?.name ?? "Sin categoría"}
                      </p>
                      <h2 className="text-2xl font-medium text-[#1F1F1F]">
                        {product.name}
                      </h2>
                      <p className="text-sm text-[#666666]">
                        Slug: {product.slug}
                      </p>
                      <p className="text-sm text-[#666666]">
                        Stock total: {totalStock}
                      </p>
                    </div>

                    <div className="text-right">
                      <p
                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                          product.is_active
                            ? "bg-[#F5E3E6] text-[#B67F7F]"
                            : "bg-[#ECECEC] text-[#666666]"
                        }`}
                      >
                        {product.is_active ? "Activo" : "Inactivo"}
                      </p>

                      <p className="mt-3 text-xl font-semibold text-[#1F1F1F]">
                        {formatCurrencyUYU(product.price)}
                      </p>
                    </div>
                  </div>

                  {product.description && (
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-[#666666]">
                      {product.description}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}