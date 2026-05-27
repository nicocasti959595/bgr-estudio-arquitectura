import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BotonWhatsApp } from "@/components/BotonWhatsApp";

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
  title: "BGR Estudio Arquitectura",
  description:
    "BGR Estudio Arquitectura. Estudio de arquitectura en Buenos Aires. Obras residenciales, comerciales e institucionales con enfoque en la materialidad y el contexto.",
  keywords: [
    "BGR",
    "BGR arquitectura",
    "BGR estudio arquitectura",
    "estudio de arquitectura",
    "Argentina",
    "Buenos Aires",
    "obra nueva",
    "remodelación",
    "diseño",
  ],
  metadataBase: new URL("https://bgr-estudio-arquitectura.vercel.app"),
  openGraph: {
    title: "BGR Estudio Arquitectura",
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
        <BotonWhatsApp />
      </body>
    </html>
  );
}
