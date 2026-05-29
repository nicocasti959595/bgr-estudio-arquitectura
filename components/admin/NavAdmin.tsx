import Link from "next/link";
import { cerrarSesionAction } from "@/lib/actions-admin";

// El email del header es el "público" de la marca, no el usuario real de login.
const EMAIL_PUBLICO = "info@bgr.com.ar";

export function NavAdmin(_props: { email: string }) {
  return (
    <header className="border-b hairline bg-background/95 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4 md:py-5 flex items-center justify-between gap-6">
        <Link href="/admin" className="flex items-baseline gap-2">
          <span className="font-bold text-[15px] text-ink tracking-[0.12em]">
            BGR
          </span>
          <span className="font-serif italic text-[14px] text-accent">
            Admin
          </span>
        </Link>

        <nav className="hidden md:flex gap-8">
          <Link
            href="/admin"
            className="text-[12px] tracking-[1.5px] uppercase text-muted hover:text-ink transition-colors"
          >
            Proyectos
          </Link>
          <Link
            href="/admin/stats"
            className="text-[12px] tracking-[1.5px] uppercase text-muted hover:text-ink transition-colors"
          >
            Stats
          </Link>
          <Link
            href="/admin/promos"
            className="text-[12px] tracking-[1.5px] uppercase text-muted hover:text-ink transition-colors"
          >
            Promos
          </Link>
          <Link
            href="/admin/hero"
            className="text-[12px] tracking-[1.5px] uppercase text-muted hover:text-ink transition-colors"
          >
            Hero
          </Link>
          <Link
            href="/admin/metodo"
            className="text-[12px] tracking-[1.5px] uppercase text-muted hover:text-ink transition-colors"
          >
            Video Método
          </Link>
          <Link
            href="/"
            target="_blank"
            className="text-[12px] tracking-[1.5px] uppercase text-muted hover:text-ink transition-colors"
          >
            Ver sitio ↗
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-[11px] text-muted tracking-wider">
            {EMAIL_PUBLICO}
          </span>
          <form action={cerrarSesionAction}>
            <button
              type="submit"
              className="text-[11px] tracking-[1.5px] uppercase text-accent border border-accent px-4 py-2 hover:bg-accent hover:text-background transition-colors"
            >
              Salir
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
