import Link from "next/link";
import { cerrarSesionAction } from "@/lib/actions-admin";

export function NavAdmin({ email }: { email: string }) {
  return (
    <header className="border-b border-line bg-ink/95 backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between gap-6">
        <Link href="/admin" className="flex items-baseline gap-1.5">
          <span className="font-bold text-[15px] text-white tracking-[0.12em]">
            BGR
          </span>
          <span className="font-serif italic text-[14px] text-accent2">
            Admin
          </span>
        </Link>

        <nav className="hidden md:flex gap-8">
          <Link
            href="/admin"
            className="text-[12px] tracking-[1.5px] uppercase text-muted hover:text-white transition-colors"
          >
            Proyectos
          </Link>
          <Link
            href="/"
            target="_blank"
            className="text-[12px] tracking-[1.5px] uppercase text-muted hover:text-white transition-colors"
          >
            Ver sitio ↗
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-[11px] text-muted tracking-wider">
            {email}
          </span>
          <form action={cerrarSesionAction}>
            <button
              type="submit"
              className="text-[11px] tracking-[1.5px] uppercase text-accent2 border border-accent2 px-4 py-2 hover:bg-accent2/10 transition-colors"
            >
              Salir
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
