import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import VariantForm from "@/components/admin/VariantForm";
import VariantCard from "@/components/admin/VariantCard";
import {
  createVariantAction,
  updateProductAction,
} from "../actions";
import {
  getAdminCategories,
  getAdminProductById,
} from "@/services/admin-products.service";

type AdminProductoDetallePageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminProductoDetallePage({
  params,
}: AdminProductoDetallePageProps) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    getAdminProductById(id),
    getAdminCategories(),
  ]);

  if (!product) {
    notFound();
  }

  const variants = Array.isArray(product.product_variants)
    ? product.product_variants
    : [];

  return (
    <main className="min-h-screen bg-[#F1E7E6]">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[#C8949D]">
            Aurora Admin
          </p>
          <h1 className="mt-3 text-5xl font-semibold text-[#1F1F1F]">
            Editar producto
          </h1>
        </div>

        <div className="space-y-8">
          <ProductForm
            mode="edit"
            categories={categories}
            action={updateProductAction}
            initialValues={{
              id: product.id,
              name: product.name ?? "",
              slug: product.slug ?? "",
              description: product.description ?? "",
              price: product.price ?? 0,
              categoryId: product.category_id ?? "",
              isActive: product.is_active ?? true,
            }}
          />

          <section className="space-y-5">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#C8949D]">
                Variantes
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-[#1F1F1F]">
                Color, talle y stock
              </h2>
            </div>

            <VariantForm
              productId={product.id}
              mode="create"
              action={createVariantAction}
            />

            <div className="space-y-4">
              {variants.length === 0 ? (
                <div className="rounded-[2rem] border border-dashed border-[#DCCCCC] bg-white p-8 text-center text-[#666666]">
                  Este producto todavía no tiene variantes.
                </div>
              ) : (
                variants.map((variant: any) => (
                  <VariantCard
                    key={variant.id}
                    productId={product.id}
                    variant={variant}
                  />
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}