import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#E7D8D7] bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <img
            src="/logo/aurora-logo.png"
            alt="Aurora"
            className="h-12 w-auto"
          />
          <p className="mt-4 max-w-sm text-sm leading-7 text-[#7A7A7A]">
            Ropa deportiva femenina premium, diseñada para acompañarte con estilo,
            comodidad y una identidad visual elegante.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C8949D]">
            Navegación
          </h3>
          <div className="mt-4 space-y-3 text-sm text-[#666666]">
            <Link href="/" className="block hover:text-black">Inicio</Link>
            <Link href="/catalogo" className="block hover:text-black">Catálogo</Link>
            <Link href="/carrito" className="block hover:text-black">Carrito</Link>
            <Link href="/contacto" className="block hover:text-black">Contacto</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C8949D]">
            Aurora
          </h3>
          <div className="mt-4 space-y-3 text-sm text-[#666666]">
            <p>Atención personalizada por WhatsApp</p>
            <p>Compra simple y rápida</p>
            <p>Envíos y coordinación de pedidos</p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#F1E7E6] px-6 py-5 text-center text-sm text-[#8B7E7E]">
        © {new Date().getFullYear()} Aurora. Todos los derechos reservados.
      </div>
    </footer>
  );
}