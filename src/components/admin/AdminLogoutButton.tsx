"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-full border border-[#E7C9CD] bg-white px-4 py-2 text-sm font-medium text-[#1F1F1F] transition hover:bg-[#FCF9F8]"
    >
      Cerrar sesión
    </button>
  );
}