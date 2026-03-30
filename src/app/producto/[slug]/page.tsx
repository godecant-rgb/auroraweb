import { notFound } from "next/navigation";
import ProductGallery from "@/components/producto/ProductGallery";
import VariantSelector from "@/components/producto/VariantSelector";
import { formatCurrencyUYU } from "@/lib/format";
import { getProductBySlug } from "@/services/products.service";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F1E7E6]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery images={product.images} productName={product.name} />

          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#C8949D]">
                {product.category?.name ?? "Aurora"}
              </p>

              <h1 className="mt-3 text-4xl font-semibold text-[#1F1F1F] md:text-5xl">
                {product.name}
              </h1>

              <p className="mt-4 text-2xl font-semibold text-[#1F1F1F]">
                {formatCurrencyUYU(product.price)}
              </p>

              {product.description && (
                <p className="mt-5 max-w-xl leading-8 text-[#666666]">
                  {product.description}
                </p>
              )}
            </div>

            <VariantSelector
              productId={product.id}
              productName={product.name}
              productSlug={product.slug}
              productPrice={product.price}
              productImage={product.images[0]?.image_url ?? null}
              variants={product.variants}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
