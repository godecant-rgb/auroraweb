import CatalogFilters from "@/components/catalogo/CatalogFilters";
import { getCatalogProducts } from "@/services/products.service";

export const dynamic = "force-dynamic";

export default async function CatalogoPage() {
  const products = await getCatalogProducts();

  return (
    <main className="min-h-screen bg-[#F1E7E6]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[#C8949D]">
            Aurora
          </p>

          <h1 className="mt-3 text-5xl font-semibold text-[#1F1F1F]">
            Catálogo
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-[#666666]">
            Descubrí nuestras prendas deportivas femeninas y elegí tu combinación
            ideal de color y talle.
          </p>
        </div>

        <CatalogFilters products={products} />
      </div>
    </main>
  );
}
