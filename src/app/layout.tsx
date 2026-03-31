import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aurora | Ropa deportiva femenina premium",
    template: "%s | Aurora",
  },
  description:
    "Descubrí Aurora, una tienda de ropa deportiva femenina con estética premium. Elegí tus prendas, combiná talle y color, y armá tu pedido online.",
  openGraph: {
    title: "Aurora | Ropa deportiva femenina premium",
    description:
      "Ropa deportiva femenina premium con estética moderna, femenina y elegante.",
    url: siteUrl,
    siteName: "Aurora",
    locale: "es_UY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurora | Ropa deportiva femenina premium",
    description:
      "Ropa deportiva femenina premium con estética moderna, femenina y elegante.",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
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
        <Analytics />
      </body>
    </html>
  );
}
