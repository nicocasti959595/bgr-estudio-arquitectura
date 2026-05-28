import type { Metadata } from "next";
import { getConfig } from "@/lib/config";
import { youTubeEmbedUrl } from "@/lib/youtube";
import { BotonAsesoramiento } from "@/components/BotonAsesoramiento";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Método BGR — Arquitectura & Construcción",
  description:
    "Conocé el método BGR: nuestro proceso completo desde el primer contacto hasta la entrega de la obra. Mirá el video y descubrí cómo trabajamos.",
};

export default async function MetodoBGRPage() {
  const videoUrl = await getConfig("video_metodo_url");
  const embed = youTubeEmbedUrl(videoUrl);

  return (
    <>
      <section className="pt-32 md:pt-44 pb-16 border-b hairline">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-8">
            <p className="eyebrow">— Cómo trabajamos</p>
            <h1 className="display text-5xl md:text-7xl lg:text-8xl mt-6 text-ink">
              Método{" "}
              <span className="italic text-accent">BGR</span>.
            </h1>
          </div>
          <p className="md:col-span-4 md:pt-24 text-lg text-muted leading-relaxed">
            Nuestro sistema de trabajo. Pensado para que sepas exactamente
            cómo avanza tu obra en cada momento.
          </p>
        </div>
      </section>

      {/* VIDEO PRINCIPAL */}
      <section className="py-16 md:py-20 bg-paper border-b hairline">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12">
          <div className="aspect-video bg-ink border hairline overflow-hidden">
            {embed ? (
              <iframe
                src={embed}
                title="Método BGR — Arquitectura y Construcción"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-center px-6">
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-16 w-16 text-accent mx-auto mb-4"
                    aria-hidden="true"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <p className="text-background/90 font-serif text-2xl md:text-3xl">
                    Video del Método BGR
                  </p>
                  <p className="text-background/50 text-sm mt-3 max-w-md mx-auto">
                    Próximamente cargaremos acá el video explicativo del
                    proceso completo.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* DESCRIPCIÓN DEL VIDEO + CTA COTIZAR */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-7">
              <p className="eyebrow">— Sobre el video</p>
              <h2 className="display text-4xl md:text-5xl mt-4 text-ink leading-[1.1]">
                Mirá cómo trabajamos,{" "}
                <span className="italic text-accent">paso a paso</span>.
              </h2>
              <div className="mt-7 space-y-4 text-base md:text-lg text-muted leading-relaxed">
                <p>
                  En este video repasamos el{" "}
                  <strong className="text-ink font-medium">
                    método BGR
                  </strong>{" "}
                  completo: desde el primer contacto, la visita técnica y el
                  diseño, hasta la gestión de permisos municipales, la
                  ejecución de la obra y la entrega final.
                </p>
                <p>
                  Conocé las dos modalidades de cotización (llave en mano y
                  mano de obra), cómo es el seguimiento semanal con
                  fotografías y reportes, y qué incluye nuestra garantía
                  postventa por escrito.
                </p>
                <p className="font-serif text-xl md:text-2xl text-ink italic leading-snug pt-2">
                  Si lo podés imaginar,{" "}
                  <span className="text-accent not-italic">
                    lo podemos construir.
                  </span>
                </p>
              </div>
            </div>

            <aside className="md:col-span-5 md:pt-12 border-t md:border-t-0 md:border-l hairline pt-8 md:pt-0 md:pl-12">
              <p className="text-[10px] tracking-[0.25em] uppercase text-muted font-medium">
                — Te respondemos en 24 hs
              </p>
              <h3 className="font-serif text-2xl md:text-3xl text-ink mt-3 leading-snug">
                Pedinos un{" "}
                <span className="italic text-accent">presupuesto</span>{" "}
                sin compromiso.
              </h3>
              <p className="mt-4 text-sm text-muted leading-relaxed">
                Completá el formulario breve y te abrimos WhatsApp con tu
                consulta lista para enviar.
              </p>
              <div className="mt-6">
                <BotonAsesoramiento
                  variant="oscuro"
                  label="Cotizar ahora →"
                  className="w-full sm:w-auto"
                />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
