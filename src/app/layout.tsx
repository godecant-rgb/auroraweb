import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Aurora | Ropa deportiva femenina premium",
  description:
    "Descubrí Aurora, una tienda de ropa deportiva femenina con estética premium. Elegí tus prendas, combiná talle y color, y armá tu pedido online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-[#F1E7E6] text-[#1F1F1F] antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
