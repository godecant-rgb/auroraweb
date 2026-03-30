import Link from "next/link";
import ProductCard from "@/components/catalogo/ProductCard";
import { getFeaturedProducts } from "@/services/products.service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(4);

  return (
    <main className="min-h-screen bg-[#F1E7E6] text-[#1F1F1F]">
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#C8949D]">
            Aurora
          </p>

          <h1 className="mt-5 text-5xl font-semibold leading-tight md:text-6xl">
            Ropa deportiva femenina con una imagen premium
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#666666]">
            Diseñada para mujeres que quieren verse bien, sentirse cómodas y
            entrenar con estilo. Elegí tus prendas favoritas, combiná talle y
            color, y armá tu pedido online.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/catalogo"
              className="rounded-full bg-[#D9A8AF] px-7 py-3 text-sm font-medium text-white shadow-[0_10px_30px_rgba(201,148,157,0.28)] transition hover:bg-[#C8949D]"
            >
              Ver catálogo
            </Link>

            <Link
              href="/contacto"
              className="rounded-full border border-[#E7C9CD] bg-white px-7 py-3 text-sm font-medium text-[#1F1F1F] transition hover:bg-[#FCF9F8]"
            >
              Contacto
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[2.2rem] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80"
              alt="Aurora activewear"
              className="h-[520px] w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -left-6 rounded-[1.8rem] bg-white px-6 py-5 shadow-[0_14px_40px_rgba(0,0,0,0.08)]">
            <p className="text-xs uppercase tracking-[0.25em] text-[#C8949D]">
              Aurora
            </p>
            <p className="mt-2 text-sm text-[#666666]">
              Femenina · Moderna · Premium
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[2rem] border border-[#EFE5E6] bg-white p-8 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <p className="text-sm uppercase tracking-[0.2em] text-[#C8949D]">
              Diseño
            </p>
            <h2 className="mt-3 text-2xl font-medium">Estética limpia</h2>
            <p className="mt-4 leading-7 text-[#666666]">
              Una identidad femenina, moderna y elegante para destacar dentro y
              fuera del entrenamiento.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#EFE5E6] bg-white p-8 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <p className="text-sm uppercase tracking-[0.2em] text-[#C8949D]">
              Comodidad
            </p>
            <h2 className="mt-3 text-2xl font-medium">Movimiento real</h2>
            <p className="mt-4 leading-7 text-[#666666]">
              Elegí color, talle y combinación ideal para acompañarte en cada
              entrenamiento.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#EFE5E6] bg-white p-8 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <p className="text-sm uppercase tracking-[0.2em] text-[#C8949D]">
              Compra
            </p>
            <h2 className="mt-3 text-2xl font-medium">Pedido fácil</h2>
            <p className="mt-4 leading-7 text-[#666666]">
              Armás tu carrito online y confirmás tu pedido por WhatsApp de una
              forma simple y rápida.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.25em] text-[#C8949D]">
            Destacados
          </p>
          <h2 className="mt-3 text-4xl font-semibold">
            Nuestros productos favoritos
          </h2>
        </div>

        {featuredProducts.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-[#DCCCCC] bg-white p-10 text-center text-[#666666]">
            Todavía no hay productos destacados.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="rounded-[2.6rem] border border-[#EFE5E6] bg-white px-8 py-12 shadow-[0_10px_30px_rgba(0,0,0,0.04)] md:px-14">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#C8949D]">
                Nueva colección
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight">
                Entrená con prendas que también se ven increíbles
              </h2>
              <p className="mt-5 max-w-xl leading-8 text-[#666666]">
                Aurora combina rendimiento, suavidad visual y una identidad de
                marca femenina pensada para destacar.
              </p>

              <Link
                href="/catalogo"
                className="mt-8 inline-flex rounded-full bg-[#1F1F1F] px-7 py-3 text-sm font-medium text-white transition hover:bg-black"
              >
                Explorar productos
              </Link>
            </div>

            <div className="overflow-hidden rounded-[2rem] bg-[#F8F3F1]">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80"
                alt="Colección Aurora"
                className="h-[420px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
