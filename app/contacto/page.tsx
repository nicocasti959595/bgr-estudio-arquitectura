import type { Metadata } from "next";
import { FormularioContacto } from "@/components/FormularioContacto";

export const metadata: Metadata = {
  title: "Contacto — BGR Arquitectura & Construcción",
  description:
    "Contactá a BGR Arquitectura & Construcción. info@bgr.com.ar · WhatsApp 11 3691-0077 · Av. Juan de Garay 3547, CABA · Lun a Vie 8 a 17 hs.",
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

            {/* ICONO INSTAGRAM GRANDE — DISEÑO PROPIO */}
            <div>
              <p className="eyebrow">— Seguinos</p>
              <a
                href="https://www.instagram.com/bgr.construcciones/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @bgr.construcciones"
                className="mt-5 group block"
              >
                <div className="relative aspect-square w-full max-w-[280px] bg-ink overflow-hidden group-hover:bg-accent transition-colors duration-500">
                  <div className="absolute inset-6 border-2 border-background flex items-center justify-center">
                    <div className="w-1/2 aspect-square rounded-full border-2 border-background flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-background absolute top-5 right-5" />
                      <span className="display text-4xl text-background">
                        BGR
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 px-5 py-3 flex items-center justify-between text-background border-t border-background/30">
                    <span className="text-[11px] tracking-[0.18em] uppercase">
                      @bgr.construcciones
                    </span>
                    <span className="text-lg group-hover:translate-x-1 transition-transform">
                      ↗
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted">
                  Fotos del proceso de cada obra, en vivo.
                </p>
              </a>

              {/* TikTok + YouTube */}
              <div className="mt-5 grid grid-cols-2 gap-3 max-w-[280px]">
                <a
                  href="https://www.tiktok.com/@bgr.construcciones"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok @bgr.construcciones"
                  className="group flex items-center gap-2 border hairline bg-background hover:bg-ink hover:text-background transition-colors px-3 py-3"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.16a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.59z" />
                  </svg>
                  <span className="text-[11px] tracking-[0.18em] uppercase">
                    TikTok
                  </span>
                </a>
                <a
                  href="https://youtube.com/@BGR.Construcciones"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube BGR Construcciones"
                  className="group flex items-center gap-2 border hairline bg-background hover:bg-ink hover:text-background transition-colors px-3 py-3"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span className="text-[11px] tracking-[0.18em] uppercase">
                    YouTube
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
