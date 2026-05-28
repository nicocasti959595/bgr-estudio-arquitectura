import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-background mt-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-20">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-4">
            <div className="flex items-center gap-4 mb-4">
              <Logo className="h-14 w-14 text-background shrink-0" />
              <h3 className="font-serif text-3xl md:text-4xl leading-tight">
                BGR{" "}
                <span className="italic text-accent">
                  Arquitectura &amp; Construcción
                </span>
              </h3>
            </div>
            <p className="mt-6 text-background/70 max-w-md leading-relaxed">
              Reformas integrales de departamentos en Buenos Aires. Proyecto,
              dirección y obra llave en mano.
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow text-background/60">Navegación</p>
            <ul className="mt-4 space-y-3">
              {[
                { href: "/servicios", label: "Servicios" },
                { href: "/metodo-bgr", label: "Método BGR" },
                { href: "/estudio", label: "Quiénes somos" },
                { href: "/proyectos", label: "Proyectos" },
                { href: "/contacto", label: "Contacto" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="link-underline text-background/90"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-background/60">Contacto</p>
            <ul className="mt-4 space-y-3 text-background/90">
              <li>
                <a
                  href="mailto:info@bgr.com.ar"
                  className="link-underline"
                >
                  info@bgr.com.ar
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5491136910077"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  WhatsApp 11 3691-0077
                </a>
              </li>
              <li>
                <a href="tel:+5491136910077" className="link-underline">
                  Tel. 11 3691-0077
                </a>
              </li>
              <li className="text-background/70 leading-relaxed">
                Av. Juan de Garay 3547
                <br />
                CABA, Argentina
              </li>
              <li className="text-background/60 text-sm leading-relaxed">
                Lun a Vie · 8.00 a 17.00 hs
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-background/60">Redes</p>
            <ul className="mt-4 space-y-3 text-background/90">
              <li>
                <a
                  href="https://www.instagram.com/bgr.construcciones/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-2"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@bgr.construcciones"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-2"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.16a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.59z" />
                  </svg>
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@BGR.Construcciones"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-2"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/15 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-background/50 tracking-wider">
            © {year} BGR ARQUITECTURA &amp; CONSTRUCCIÓN · TODOS LOS DERECHOS
            RESERVADOS
          </p>
          <p className="text-xs text-background/50 tracking-wider">
            CABA · ARGENTINA
          </p>
        </div>
      </div>
    </footer>
  );
}
