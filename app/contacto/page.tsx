import type { Metadata } from "next";
import { FormularioContacto } from "@/components/FormularioContacto";

export const metadata: Metadata = {
  title: "Contacto — BGR Arquitectura & Construcción",
  description:
    "Contactá a BGR Arquitectura & Construcción. Te abrimos WhatsApp con el mensaje listo. info@bgr.com.ar · CABA & GBA.",
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
                Av. del Libertador 2350
                <br />
                Piso 4°, Recoleta
                <br />
                Ciudad Autónoma de Buenos Aires
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
                href="https://wa.me/5491122506347"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-2xl mt-4 text-ink link-underline block"
              >
                +54 9 11 2250-6347
              </a>
            </div>

            {/* ICONO INSTAGRAM GRANDE — DISEÑO PROPIO */}
            <div>
              <p className="eyebrow">— Seguinos en Instagram</p>
              <a
                href="https://instagram.com/bgr.construcciones"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @bgr.construcciones"
                className="mt-5 group block"
              >
                <div className="relative aspect-square w-full max-w-[280px] bg-ink overflow-hidden group-hover:bg-accent transition-colors duration-500">
                  {/* Marco interno tipo cámara */}
                  <div className="absolute inset-6 border-2 border-background flex items-center justify-center">
                    <div className="w-1/2 aspect-square rounded-full border-2 border-background flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-background absolute top-5 right-5" />
                      <span className="display text-4xl text-background">
                        BGR
                      </span>
                    </div>
                  </div>
                  {/* Etiqueta abajo */}
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
