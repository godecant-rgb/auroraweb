import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/producto/ProductGallery";
import VariantSelector from "@/components/producto/VariantSelector";
import { formatCurrencyUYU } from "@/lib/format";
import { getProductBySlug } from "@/services/products.service";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  const firstImage = product.images[0]?.image_url;

  return {
    title: product.name,
    description:
      product.description ||
      `Comprá ${product.name} en Aurora. Elegí color, talle y armá tu pedido online.`,
    openGraph: {
      title: product.name,
      description:
        product.description ||
        `Comprá ${product.name} en Aurora. Elegí color, talle y armá tu pedido online.`,
      images: firstImage ? [{ url: firstImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description:
        product.description ||
        `Comprá ${product.name} en Aurora. Elegí color, talle y armá tu pedido online.`,
      images: firstImage ? [firstImage] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F5ECEB]">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <ProductGallery images={product.images} productName={product.name} />

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-[#E9DBDC] bg-white p-8 shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
              <p className="text-sm uppercase tracking-[0.25em] text-[#C8949D]">
                {product.category?.name ?? "Aurora"}
              </p>

              <h1 className="mt-3 text-4xl font-semibold leading-tight text-[#1F1F1F] md:text-5xl">
                {product.name}
              </h1>

              <div className="mt-5 flex items-center gap-3">
                <p className="text-3xl font-semibold text-[#1F1F1F]">
                  {formatCurrencyUYU(product.price)}
                </p>
                <span className="rounded-full bg-[#F5E3E6] px-3 py-1 text-xs font-medium text-[#B67F7F]">
                  Aurora Premium
                </span>
              </div>

              {product.description && (
                <p className="mt-6 max-w-xl leading-8 text-[#6E6161]">
                  {product.description}
                </p>
              )}

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#EFE5E6] bg-[#FCF9F8] p-4">
                  <p className="text-sm font-medium text-[#1F1F1F]">Compra simple</p>
                  <p className="mt-1 text-xs leading-6 text-[#6E6161]">
                    Elegí color, talle y cantidad en segundos.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#EFE5E6] bg-[#FCF9F8] p-4">
                  <p className="text-sm font-medium text-[#1F1F1F]">Atención rápida</p>
                  <p className="mt-1 text-xs leading-6 text-[#6E6161]">
                    Confirmación del pedido por WhatsApp.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#EFE5E6] bg-[#FCF9F8] p-4">
                  <p className="text-sm font-medium text-[#1F1F1F]">Estilo Aurora</p>
                  <p className="mt-1 text-xs leading-6 text-[#6E6161]">
                    Diseño femenino, limpio y moderno.
                  </p>
                </div>
              </div>
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
