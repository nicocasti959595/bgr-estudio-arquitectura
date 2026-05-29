import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getProyectos } from "@/lib/datos";

export const metadata: Metadata = {
  title: "Proyectos — BGR Arquitectura & Construcción",
  description:
    "Obras y reformas integrales realizadas por BGR en CABA y GBA: departamentos, PH, casas y locales. Mirá nuestros proyectos terminados.",
  alternates: { canonical: "/proyectos" },
};

export default async function ProyectosPage() {
  const proyectos = await getProyectos();

  return (
    <>
      <section className="pt-32 md:pt-44 pb-16 md:pb-24 border-b hairline">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="eyebrow">— Obra construida</p>
          <h1 className="display text-5xl md:text-7xl lg:text-8xl mt-6 text-ink max-w-5xl">
            Proyectos
          </h1>
          <p className="mt-8 text-lg text-muted max-w-2xl leading-relaxed">
            Una selección de obras desarrolladas en distintas regiones del
            país: viviendas, edificios, espacios comerciales, intervenciones
            patrimoniales y obras institucionales.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-20">
            {proyectos.map((p, i) => (
              <Link
                key={p.id}
                href={`/proyectos/${p.slug}`}
                className={`group ${i % 2 === 1 ? "md:mt-24" : ""}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-line">
                  <Image
                    src={p.imagen_portada}
                    alt={p.titulo}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-background/95 px-3 py-1.5 font-mono text-[10px] tracking-wider text-ink">
                    {p.anio}
                  </div>
                </div>
                <div className="mt-6 flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <p className="eyebrow">{p.tipologia}</p>
                    <h2 className="font-serif text-3xl md:text-4xl mt-2 text-ink">
                      {p.titulo}
                    </h2>
                    <p className="text-muted mt-2">{p.ubicacion}</p>
                  </div>
                  <span className="font-mono text-xs text-muted mt-1">
                    /{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
