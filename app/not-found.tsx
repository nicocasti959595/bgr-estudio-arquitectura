import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Página no encontrada — BGR Arquitectura & Construcción",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-xl w-full text-center">
        <div className="flex justify-center mb-8">
          <Logo variant="dark" className="h-20 w-20 object-contain opacity-90" />
        </div>

        <p className="display text-7xl md:text-8xl text-accent leading-none">
          404
        </p>
        <h1 className="display text-3xl md:text-4xl text-ink mt-4 leading-tight">
          Esta página{" "}
          <span className="italic text-accent">no existe</span>.
        </h1>
        <p className="mt-4 text-muted leading-relaxed max-w-md mx-auto">
          Puede que el enlace esté roto o que la página se haya movido. Volvé al
          inicio o mirá nuestras obras.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-accent text-background text-sm tracking-wider uppercase hover:bg-ink transition-colors"
          >
            Ir al inicio
          </Link>
          <Link
            href="/proyectos"
            className="inline-flex items-center justify-center px-8 py-4 border border-line text-ink text-sm tracking-wider uppercase hover:bg-paper transition-colors"
          >
            Ver proyectos
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center px-8 py-4 border border-line text-ink text-sm tracking-wider uppercase hover:bg-paper transition-colors"
          >
            Contacto
          </Link>
        </div>
      </div>
    </section>
  );
}
