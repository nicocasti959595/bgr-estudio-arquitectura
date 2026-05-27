"use client";

import { useState } from "react";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#estudio", label: "Estudio" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur-md border-b border-line">
      <div className="flex items-center justify-between px-6 md:px-12 py-4 md:py-5">
        <a href="#top" className="flex items-baseline gap-1.5">
          <span className="font-bold text-[15px] text-white tracking-[0.12em]">
            BGR
          </span>
          <span className="font-serif italic text-[14px] text-accent2">
            Arquitectura y Construcción
          </span>
        </a>

        <nav className="hidden md:flex gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[12px] tracking-[1.5px] uppercase text-muted hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/5491122506347"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 text-[11px] tracking-[1.5px] uppercase text-wa border border-wa px-4 md:px-[18px] py-2 hover:bg-wa/10 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M19.077 4.928C17.191 3.041 14.683 2 12.011 2c-5.508 0-9.99 4.482-9.99 9.99 0 1.762.46 3.482 1.336 4.999L2 22l5.146-1.359a9.953 9.953 0 0 0 4.865 1.239h.004c5.509 0 9.991-4.482 9.991-9.99 0-2.673-1.041-5.181-2.929-7.068zm-7.066 15.339a8.297 8.297 0 0 1-4.214-1.155l-.302-.18-3.131.826.836-3.057-.196-.314a8.273 8.273 0 0 1-1.27-4.397c0-4.583 3.729-8.312 8.314-8.312 2.219 0 4.307.866 5.876 2.437a8.265 8.265 0 0 1 2.435 5.879c-.001 4.584-3.73 8.313-8.348 8.313zm4.554-6.227c-.247-.124-1.474-.728-1.701-.81-.227-.083-.392-.124-.557.124-.166.247-.641.81-.785.972-.144.165-.288.186-.535.062-.247-.123-1.045-.385-1.991-1.23-.737-.658-1.232-1.469-1.376-1.716-.144-.247-.015-.38.107-.502.11-.11.247-.288.37-.432.124-.144.165-.247.247-.412.083-.165.041-.31-.02-.433-.062-.124-.557-1.345-.764-1.84-.2-.484-.405-.42-.557-.426-.144-.007-.31-.009-.475-.009-.165 0-.433.062-.661.31-.227.247-.866.847-.866 2.07 0 1.221.886 2.4 1.011 2.566.124.165 1.748 2.667 4.234 3.741.591.256 1.054.41 1.413.523.594.189 1.135.162 1.561.099.476-.071 1.474-.602 1.682-1.183.207-.581.207-1.079.144-1.182-.062-.103-.227-.165-.475-.289z" />
            </svg>
            WhatsApp
          </a>

          <button
            className="md:hidden p-2 flex flex-col gap-1.5"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            <span
              className={`block w-5 h-px bg-white transition-transform ${
                open ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-white transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-white transition-transform ${
                open ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-ink">
          <nav className="flex flex-col px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-serif text-lg text-white py-3 border-b border-line2"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://wa.me/5491122506347"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="text-wa py-3 text-sm tracking-wider uppercase"
            >
              WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
