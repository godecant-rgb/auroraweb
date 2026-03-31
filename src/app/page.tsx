import Link from "next/link";
import ProductCard from "@/components/catalogo/ProductCard";
import { getFeaturedProducts } from "@/services/products.service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(4);

  return (
    <main className="min-h-screen bg-[#F5ECEB] text-[#1F1F1F]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,168,175,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(200,148,157,0.14),transparent_30%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E7D8D7] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#B67F7F] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#D9A8AF]" />
              Aurora Activewear
            </div>

            <h1 className="mt-6 max-w-2xl text-5xl font-semibold leading-[1.05] md:text-6xl">
              Rendimiento, feminidad y una estética premium en una sola marca
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#6E6161]">
              Aurora combina diseño limpio, comodidad real y una imagen moderna
              para mujeres que quieren entrenar sintiéndose seguras, cómodas y
              bien vestidas.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/catalogo"
                className="rounded-full bg-[#1F1F1F] px-7 py-3 text-sm font-medium text-white shadow-[0_12px_30px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:bg-black"
              >
                Comprar ahora
              </Link>

              <Link
                href="/catalogo"
                className="rounded-full border border-[#DDBCC1] bg-white px-7 py-3 text-sm font-medium text-[#1F1F1F] transition hover:bg-[#FFF9F8]"
              >
                Ver colección
              </Link>
            </div>

            <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#E9DCDD] bg-white/80 p-4 backdrop-blur">
                <p className="text-2xl font-semibold">+ premium</p>
                <p className="mt-1 text-sm text-[#6E6161]">Estética femenina cuidada</p>
              </div>
              <div className="rounded-2xl border border-[#E9DCDD] bg-white/80 p-4 backdrop-blur">
                <p className="text-2xl font-semibold">Color + talle</p>
                <p className="mt-1 text-sm text-[#6E6161]">Compra simple y clara</p>
              </div>
              <div className="rounded-2xl border border-[#E9DCDD] bg-white/80 p-4 backdrop-blur">
                <p className="text-2xl font-semibold">WhatsApp</p>
                <p className="mt-1 text-sm text-[#6E6161]">Confirmación rápida</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-8 hidden h-28 w-28 rounded-full bg-[#EBCFD3] blur-2xl md:block" />
            <div className="absolute -bottom-6 right-6 hidden h-36 w-36 rounded-full bg-[#F4DADF] blur-3xl md:block" />

            <div className="relative overflow-hidden rounded-[2.25rem] border border-white/50 bg-white shadow-[0_24px_70px_rgba(0,0,0,0.12)]">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80"
                alt="Aurora activewear"
                className="h-[560px] w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-5 left-5 rounded-[1.5rem] border border-[#EFE5E6] bg-white/95 px-5 py-4 shadow-[0_12px_30px_rgba(0,0,0,0.08)] backdrop-blur">
              <p className="text-xs uppercase tracking-[0.25em] text-[#C8949D]">
                Aurora
              </p>
              <p className="mt-2 text-sm text-[#6E6161]">
                Nueva colección · imagen premium · compra simple
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[2rem] bg-[#1F1F1F] p-8 text-white shadow-[0_16px_40px_rgba(0,0,0,0.14)]">
            <p className="text-sm uppercase tracking-[0.22em] text-[#EABAC1]">
              Diseño
            </p>
            <h2 className="mt-3 text-2xl font-medium">Visual de marca real</h2>
            <p className="mt-4 leading-7 text-white/75">
              Aurora busca sentirse como una marca contemporánea, limpia y
              femenina, no solo como una tienda.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#E8DADB] bg-white p-8 shadow-[0_10px_28px_rgba(0,0,0,0.05)]">
            <p className="text-sm uppercase tracking-[0.22em] text-[#C8949D]">
              Comodidad
            </p>
            <h2 className="mt-3 text-2xl font-medium">Elegí tu combinación</h2>
            <p className="mt-4 leading-7 text-[#6E6161]">
              Seleccioná color, talle y cantidad de una forma clara y pensada
              para convertir más.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#E8DADB] bg-[#FBF7F6] p-8 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
            <p className="text-sm uppercase tracking-[0.22em] text-[#C8949D]">
              Compra
            </p>
            <h2 className="mt-3 text-2xl font-medium">Carrito + WhatsApp</h2>
            <p className="mt-4 leading-7 text-[#6E6161]">
              Un proceso ágil para armar pedido, aplicar cupones y cerrar la
              venta con atención personalizada.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2.2rem] border border-[#E8DADB] bg-white p-10 shadow-[0_14px_36px_rgba(0,0,0,0.06)]">
            <p className="text-sm uppercase tracking-[0.25em] text-[#C8949D]">
              Filosofía Aurora
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight">
              Menos ruido, más elegancia visual
            </h2>
            <p className="mt-5 leading-8 text-[#6E6161]">
              Estamos construyendo una experiencia que no solo venda, sino que
              transmita confianza, delicadeza y una estética más premium en cada
              detalle.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl bg-[#F8F1F0] p-4 text-sm text-[#5F5555]">
                Compra clara por variantes reales de color y talle.
              </div>
              <div className="rounded-2xl bg-[#F8F1F0] p-4 text-sm text-[#5F5555]">
                Gestión interna pensada para crecer sin complicaciones.
              </div>
              <div className="rounded-2xl bg-[#F8F1F0] p-4 text-sm text-[#5F5555]">
                Un look visual más editorial y menos genérico.
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2.2rem] border border-[#E8DADB] bg-white shadow-[0_14px_36px_rgba(0,0,0,0.06)]">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80"
              alt="Colección Aurora"
              className="h-full min-h-[420px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white/70 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#C8949D]">
                Destacados
              </p>
              <h2 className="mt-3 text-4xl font-semibold">
                Prendas que definen la identidad Aurora
              </h2>
            </div>

            <Link
              href="/catalogo"
              className="rounded-full border border-[#DDBCC1] bg-white px-6 py-3 text-sm font-medium text-[#1F1F1F] transition hover:bg-[#FFF7F6]"
            >
              Ver todo el catálogo
            </Link>
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
        </div>
      </section>
    </main>
  );
}