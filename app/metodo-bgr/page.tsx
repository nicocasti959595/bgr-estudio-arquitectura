import type { Metadata } from "next";
import Link from "next/link";
import { getConfig } from "@/lib/config";
import { youTubeEmbedUrl } from "@/lib/youtube";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Método BGR — Arquitectura & Construcción",
  description:
    "Conocé el método BGR: nuestro proceso completo desde el primer contacto hasta la entrega de la obra. Mirá el video y descubrí cómo trabajamos.",
};

const pilares = [
  {
    n: "01",
    titulo: "Diagnóstico",
    desc: "Visitamos tu obra, escuchamos tu idea y medimos el alcance real del proyecto.",
  },
  {
    n: "02",
    titulo: "Diseño",
    desc: "Proyectamos a tu medida. Planos, materiales y cronograma claros antes de empezar.",
  },
  {
    n: "03",
    titulo: "Ejecución",
    desc: "Equipo propio en obra, control de calidad semanal y comunicación constante.",
  },
  {
    n: "04",
    titulo: "Entrega",
    desc: "Obra limpia, todo funcionando y postventa por escrito. Llave en mano.",
  },
];

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

      {/* 4 PILARES */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="text-center mb-14 md:mb-16">
            <p className="eyebrow">— 4 pilares</p>
            <h2 className="display text-4xl md:text-5xl mt-4 text-ink">
              Los pilares del{" "}
              <span className="italic text-accent">método</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border hairline">
            {pilares.map((p) => (
              <div
                key={p.n}
                className="bg-background p-8 md:p-10 hover:bg-paper transition-colors"
              >
                <p className="display text-5xl text-accent">{p.n}</p>
                <h3 className="font-serif text-2xl mt-4 text-ink">
                  {p.titulo}
                </h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/servicios"
              className="inline-flex items-center justify-center px-10 py-5 bg-accent text-background text-sm tracking-wider uppercase hover:bg-ink transition-colors"
            >
              Ver el paso a paso completo →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
