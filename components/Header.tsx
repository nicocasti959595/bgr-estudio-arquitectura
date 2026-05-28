"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/estudio", label: "Quiénes somos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contacto", label: "Contacto" },
  { href: "/admin/login", label: "Admin" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 bg-background/95 backdrop-blur-md ${
        scrolled ? "border-b hairline shadow-sm" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        <Link
          href="/"
          className="flex items-center gap-3 text-ink group"
          onClick={() => setOpen(false)}
          aria-label="BGR Arquitectura y Construcción — Inicio"
        >
          <span className="inline-flex items-center justify-center bg-ink p-2 group-hover:bg-accent transition-colors shrink-0">
            <Logo className="h-7 w-7 md:h-8 md:w-8 text-background" />
          </span>
          <span className="font-serif text-xl md:text-2xl tracking-tight leading-none">
            <span className="font-medium tracking-tight">BGR</span>{" "}
            <span className="italic text-accent hidden sm:inline">
              Arquitectura &amp; Construcción
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm tracking-wide text-foreground/80 hover:text-ink link-underline transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          <span
            className={`block w-6 h-px bg-ink transition-transform ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-ink transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-ink transition-transform ${
              open ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t hairline bg-background">
          <nav className="flex flex-col px-6 py-6 gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-lg font-serif text-ink py-2 border-b hairline"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
