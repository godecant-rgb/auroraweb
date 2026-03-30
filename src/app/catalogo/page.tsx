import ProductCard from "@/components/catalogo/ProductCard";
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

        {products.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-[#DCCCCC] bg-white p-10 text-center text-[#7A7A7A]">
            No hay productos cargados todavía.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
