import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BotonWhatsApp } from "@/components/BotonWhatsApp";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BGR Estudio Arquitectura",
  description:
    "BGR Estudio Arquitectura. Reformas integrales de departamentos en Buenos Aires. Proyecto, dirección y obra llave en mano.",
  keywords: [
    "BGR",
    "BGR arquitectura",
    "BGR estudio arquitectura",
    "reformas integrales",
    "departamentos",
    "llave en mano",
    "CABA",
    "GBA",
    "Buenos Aires",
    "Argentina",
  ],
  metadataBase: new URL("https://bgr-estudio-arquitectura.vercel.app"),
  openGraph: {
    title: "BGR Estudio Arquitectura",
    description:
      "Si lo podés imaginar, lo podemos construir. Reformas integrales de departamentos en Buenos Aires.",
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
      className={`${dmSans.variable} ${playfair.variable} h-full antialiased`}
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
