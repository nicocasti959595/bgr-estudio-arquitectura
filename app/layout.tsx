import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
  title: "BGR | Arquitectura y Construcción",
  description:
    "BGR Arquitectura y Construcción. Reformas integrales de departamentos en CABA. Proyecto, dirección de obra y llave en mano.",
  keywords: [
    "BGR",
    "arquitectura",
    "construcción",
    "reformas integrales",
    "departamentos",
    "llave en mano",
    "CABA",
    "Buenos Aires",
    "Argentina",
  ],
  metadataBase: new URL("https://bgr-estudio-arquitectura.vercel.app"),
  openGraph: {
    title: "BGR | Arquitectura y Construcción",
    description:
      "Reformas integrales de departamentos en Buenos Aires. Proyecto, dirección y obra llave en mano.",
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
      <body className="min-h-full flex flex-col bg-ink text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
