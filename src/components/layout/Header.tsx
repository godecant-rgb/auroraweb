import Link from "next/link";
import CartButton from "@/components/layout/CartButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E7D8D7] bg-[#F5ECEB]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo/aurora-logo.png"
            alt="Aurora"
            className="h-12 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm text-[#5C5050] transition hover:text-black">
            Inicio
          </Link>
          <Link href="/catalogo" className="text-sm text-[#5C5050] transition hover:text-black">
            Catálogo
          </Link>
          <Link href="/contacto" className="text-sm text-[#5C5050] transition hover:text-black">
            Contacto
          </Link>
          <Link
            href="/admin/login"
            className="rounded-full border border-[#E6C9CD] bg-white px-4 py-2 text-sm text-[#5C5050] transition hover:bg-[#FFF7F6] hover:text-black"
          >
            Admin
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <CartButton />
        </div>
      </div>
    </header>
  );
}