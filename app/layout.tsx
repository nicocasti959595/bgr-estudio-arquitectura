import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Estudio Terreno — Arquitectura",
  description:
    "Estudio de arquitectura en Buenos Aires. Obras de arquitectura residencial, comercial e institucional con enfoque en la materialidad y el contexto.",
  keywords: [
    "arquitectura",
    "estudio de arquitectura",
    "Argentina",
    "Buenos Aires",
    "obra nueva",
    "remodelación",
    "diseño",
  ],
  metadataBase: new URL("https://estudio-terreno.vercel.app"),
  openGraph: {
    title: "Estudio Terreno — Arquitectura",
    description:
      "Arquitectura argentina contemporánea con foco en la materialidad, el clima y el lugar.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-AR"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
