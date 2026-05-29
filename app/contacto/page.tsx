import type { Metadata } from "next";
import { FormularioContacto } from "@/components/FormularioContacto";

export const metadata: Metadata = {
  title: "Contacto — BGR Arquitectura & Construcción",
  description:
    "Contactá a BGR Arquitectura & Construcción. info@bgr.com.ar · WhatsApp 11 3691-0077 · Av. Juan de Garay 3547, CABA · Lun a Vie 8 a 17 hs.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <section className="pt-32 md:pt-44 pb-20 border-b hairline">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-8">
            <p className="eyebrow">— Hablemos</p>
            <h1 className="display text-5xl md:text-7xl lg:text-8xl mt-6 text-ink">
              Iniciemos{" "}
              <span className="italic text-accent">tu próximo proyecto</span>.
            </h1>
          </div>
          <p className="md:col-span-4 md:pt-24 text-lg text-muted leading-relaxed">
            Completá el formulario y te abrimos WhatsApp con el mensaje listo
            para enviar. También podés escribirnos directo por mail.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4 space-y-10">
            <div>
              <p className="eyebrow">— Estudio</p>
              <p className="font-serif text-2xl mt-4 text-ink leading-snug">
                Av. Juan de Garay 3547
                <br />
                CABA, Argentina
              </p>
            </div>

            <div>
              <p className="eyebrow">— Horario de atención</p>
              <p className="font-serif text-2xl mt-4 text-ink leading-snug">
                Lunes a Viernes
                <br />
                <span className="text-accent italic">8.00 a 17.00 hs</span>
              </p>
            </div>

            <div>
              <p className="eyebrow">— Mail</p>
              <a
                href="mailto:info@bgr.com.ar"
                className="font-serif text-2xl mt-4 text-ink link-underline block"
              >
                info@bgr.com.ar
              </a>
            </div>

            <div>
              <p className="eyebrow">— Teléfono / WhatsApp</p>
              <a
                href="https://wa.me/5491136910077"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-2xl mt-4 text-ink link-underline block"
              >
                +54 11 3691-0077
              </a>
            </div>

            {/* REDES — 3 botones grandes */}
            <div>
              <p className="eyebrow">— Seguinos</p>
              <p className="mt-3 text-sm text-muted max-w-[320px]">
                Fotos y videos del proceso de cada obra, en vivo.
              </p>
              <div className="mt-5 flex flex-col gap-3 max-w-[320px]">
                <a
                  href="https://www.instagram.com/bgr.construcciones/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram @bgr.construcciones"
                  className="group flex items-center gap-4 border hairline bg-background hover:bg-ink hover:text-background transition-colors px-5 py-4"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-7 w-7 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] tracking-[0.15em] uppercase font-medium">
                      Instagram
                    </p>
                    <p className="text-[11px] text-muted group-hover:text-background/70 tracking-wide">
                      @bgr.construcciones
                    </p>
                  </div>
                  <span className="text-lg group-hover:translate-x-1 transition-transform">
                    ↗
                  </span>
                </a>

                <a
                  href="https://www.tiktok.com/@bgr.construcciones"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok @bgr.construcciones"
                  className="group flex items-center gap-4 border hairline bg-background hover:bg-ink hover:text-background transition-colors px-5 py-4"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-7 w-7 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.16a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.59z" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] tracking-[0.15em] uppercase font-medium">
                      TikTok
                    </p>
                    <p className="text-[11px] text-muted group-hover:text-background/70 tracking-wide">
                      @bgr.construcciones
                    </p>
                  </div>
                  <span className="text-lg group-hover:translate-x-1 transition-transform">
                    ↗
                  </span>
                </a>

                <a
                  href="https://youtube.com/@BGR.Construcciones"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube BGR Construcciones"
                  className="group flex items-center gap-4 border hairline bg-background hover:bg-ink hover:text-background transition-colors px-5 py-4"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-7 w-7 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] tracking-[0.15em] uppercase font-medium">
                      YouTube
                    </p>
                    <p className="text-[11px] text-muted group-hover:text-background/70 tracking-wide">
                      @BGR.Construcciones
                    </p>
                  </div>
                  <span className="text-lg group-hover:translate-x-1 transition-transform">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <FormularioContacto />
          </div>
        </div>
      </section>
    </>
  );
}
