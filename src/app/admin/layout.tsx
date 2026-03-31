import Link from "next/link";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F1E7E6]">
      <header className="border-b border-[#E7D8D7] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#C8949D]">
              Aurora
            </p>
            <h1 className="text-xl font-semibold text-[#1F1F1F]">
              Panel Admin
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="text-sm text-[#555555] transition hover:text-black"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/pedidos"
              className="text-sm text-[#555555] transition hover:text-black"
            >
              Pedidos
            </Link>
            <Link
              href="/admin/productos"
              className="text-sm text-[#555555] transition hover:text-black"
            >
              Productos
            </Link>
            <Link
              href="/admin/cupones"
              className="text-sm text-[#555555] transition hover:text-black"
            >
              Cupones
            </Link>
            <AdminLogoutButton />
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}