"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(data.error || "No se pudo iniciar sesión.");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setErrorMessage("No se pudo iniciar sesión.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F1E7E6]">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-[2rem] border border-[#EFE5E6] bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
          <p className="text-sm uppercase tracking-[0.25em] text-[#C8949D]">
            Aurora Admin
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-[#1F1F1F]">
            Iniciar sesión
          </h1>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#1F1F1F]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-[#E7D8D7] bg-[#FCF9F8] px-4 py-3 text-sm text-[#1F1F1F] outline-none transition focus:border-[#C8949D]"
                placeholder="admin@aurora.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#1F1F1F]">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-[#E7D8D7] bg-[#FCF9F8] px-4 py-3 text-sm text-[#1F1F1F] outline-none transition focus:border-[#C8949D]"
                placeholder="••••••••"
              />
            </div>

            {errorMessage && (
              <div className="rounded-2xl bg-[#FBE9E9] p-4 text-sm font-medium text-[#B05050]">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#D9A8AF] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#C8949D] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Ingresando..." : "Entrar al panel"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}