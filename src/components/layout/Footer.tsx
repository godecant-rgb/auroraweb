import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#E7D8D7] bg-[#1F1F1F] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <img
            src="/logo/aurora-logo.png"
            alt="Aurora"
            className="h-12 w-auto brightness-[1.25]"
          />
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">
            Aurora es una tienda de ropa deportiva femenina con una visión más
            editorial, moderna y premium.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E7B6BC]">
            Navegación
          </h3>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <Link href="/" className="block hover:text-white">Inicio</Link>
            <Link href="/catalogo" className="block hover:text-white">Catálogo</Link>
            <Link href="/carrito" className="block hover:text-white">Carrito</Link>
            <Link href="/contacto" className="block hover:text-white">Contacto</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E7B6BC]">
            Experiencia
          </h3>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <p>Compra clara por color y talle</p>
            <p>Atención personalizada por WhatsApp</p>
            <p>Gestión simple y profesional del pedido</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-sm text-white/55">
        © {new Date().getFullYear()} Aurora. Todos los derechos reservados.
      </div>
    </footer>
  );
}