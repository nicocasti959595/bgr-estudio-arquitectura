import type { Metadata } from "next";
import { FormularioContacto } from "@/components/FormularioContacto";

export const metadata: Metadata = {
  title: "Contacto — Estudio Terreno",
  description:
    "Contactanos para iniciar un proyecto. Av. Libertador 2350, CABA. hola@estudioterreno.ar",
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
              <span className="italic">tu próximo proyecto</span>.
            </h1>
          </div>
          <p className="md:col-span-4 md:pt-24 text-lg text-muted leading-relaxed">
            Te respondemos en menos de 48 horas hábiles. Si preferís llamarnos,
            atendemos de lunes a viernes de 9 a 18 hs.
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
                href="mailto:hola@estudioterreno.ar"
                className="font-serif text-2xl mt-4 text-ink link-underline block"
              >
                hola@estudioterreno.ar
              </a>
            </div>
            <div>
              <p className="eyebrow">— Teléfono</p>
              <a
                href="tel:+541147778888"
                className="font-serif text-2xl mt-4 text-ink link-underline block"
              >
                +54 11 4777 8888
              </a>
            </div>
            <div>
              <p className="eyebrow">— Redes</p>
              <div className="mt-4 flex gap-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-ink"
                >
                  Instagram
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-ink"
                >
                  LinkedIn
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
