import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "One Loved Babe | Boutique de Moda",
  description: "Tu destino de moda favorito. Piezas únicas seleccionadas con amor para ti.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
