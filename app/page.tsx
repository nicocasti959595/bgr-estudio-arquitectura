import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { GarantiasExpandibles } from "@/components/GarantiasExpandibles";
import { HeroImagen } from "@/components/HeroImagen";
import { HeroCTA } from "@/components/HeroCTA";
import { getStats } from "@/lib/stats";
import { getHeroImagesPublicas, getHeroModo } from "@/lib/hero";

export default async function Home() {
  const [datosClave, heroImagenes, heroModo, baImagenes, baModo] =
    await Promise.all([
      getStats(),
      getHeroImagesPublicas("hero"),
      getHeroModo("hero"),
      getHeroImagesPublicas("buenos_aires"),
      getHeroModo("buenos_aires"),
    ]);

  return (
    <>
      {/* HERO */}
      <section className="relative h-[calc(100vh-5rem)] min-h-[560px] max-h-[820px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <HeroImagen
            imagenes={heroImagenes}
            modo={heroModo}
            priority
            objectPosition="center 60%"
          />
          {/* Gradient: oscurece para garantizar legibilidad del texto sobre cualquier imagen */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/20" />
        </div>

        <div className="relative w-full mx-auto max-w-[1400px] px-6 md:px-12 pb-12 md:pb-16 text-background">
          <div className="flex items-center gap-3 fade-up">
            <span className="h-px w-10 bg-accent" />
            <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-background/85 font-medium">
              Arquitectura · Construcción · CABA &amp; GBA
            </p>
          </div>
          <h1
            className="display text-5xl md:text-7xl lg:text-[5.5rem] mt-5 max-w-5xl fade-up leading-[0.95]"
            style={{ textShadow: "0 2px 18px rgba(10,10,10,0.55), 0 1px 4px rgba(10,10,10,0.5)" }}
          >
            Si lo podés imaginar,
            <br />
            <span
              className="italic text-[#e3c89c]"
              style={{ textShadow: "0 2px 16px rgba(10,10,10,0.7), 0 1px 4px rgba(10,10,10,0.6)" }}
            >
              lo podemos construir.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg text-background/85 leading-relaxed fade-up">
            Reformas integrales de departamentos en Buenos Aires. Proyecto,
            dirección y obra llave en mano.
          </p>

          {/* Badge Instagram GRANDE */}
          <a
            href="https://www.instagram.com/bgr.construcciones/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 fade-up group"
          >
            <span className="inline-flex items-center gap-3 px-6 py-4 bg-background/10 border border-background/40 hover:border-accent hover:bg-accent/20 backdrop-blur-sm transition-all">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7 text-background"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <div>
                <p className="text-sm tracking-[0.15em] uppercase text-background font-medium">
                  @bgr.construcciones
                </p>
                <p className="text-[10px] tracking-[0.18em] uppercase text-background/60 mt-0.5">
                  Seguinos en Instagram
                </p>
              </div>
              <span className="text-xl text-background/70 group-hover:text-accent group-hover:translate-x-1 transition-all">
                ↗
              </span>
            </span>
          </a>

          <HeroCTA />
        </div>

        <div className="absolute bottom-5 right-5 md:right-12 hidden md:flex flex-col items-end gap-2 text-background/70 text-[10px] tracking-[0.25em] uppercase">
          <div className="flex items-center gap-3">
            <span>CABA &amp; GBA</span>
            <span className="h-px w-6 bg-background/40" />
            <span>Respuesta en 24 hs</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Llave en mano</span>
            <span className="h-px w-6 bg-background/40" />
            <span>Presupuesto cerrado</span>
          </div>
        </div>
      </section>

      {/* STRIP DE DATOS CLAVE con fecha de actualización */}
      <section className="bg-ink text-background border-y border-background/10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-background/10">
          {datosClave.map((d) => (
            <div key={d.rotulo} className="py-10 md:py-14 px-4 md:px-10">
              <p className="display text-5xl md:text-6xl text-background">
                {d.numero}
              </p>
              <p className="mt-3 text-[10px] md:text-xs tracking-[0.22em] uppercase text-background/65 font-medium">
                {d.rotulo}
              </p>
              {d.actualizacion && (
                <p className="mt-2 text-[10px] text-background/40 tracking-wider">
                  Últ. actualización {d.actualizacion}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN BUENOS AIRES — OBELISCO (muestra la imagen opuesta al hero) */}
      <section className="relative h-[55vh] min-h-[420px] overflow-hidden border-b hairline">
        <HeroImagen
          imagenes={baImagenes}
          modo={baModo}
          objectPosition="center 50%"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="w-full mx-auto max-w-[1400px] px-6 md:px-12 pb-12 md:pb-16 text-background">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-background/85 font-medium">
                Buenos Aires
              </p>
            </div>
            <h2 className="display text-4xl md:text-5xl lg:text-6xl mt-4 max-w-3xl leading-[1.05]">
              Construimos en la ciudad que{" "}
              <span className="italic text-accent">conocemos como nadie</span>.
            </h2>
            <p className="mt-4 max-w-xl text-base text-background/80 leading-relaxed">
              Operamos en toda CABA y GBA. Conocemos los reglamentos de cada
              comuna, los consorcios, los proveedores y los gremios locales.
            </p>
          </div>
        </div>
      </section>


      {/* GARANTÍAS / POR QUÉ ELEGIRNOS */}
      <section className="bg-paper border-y hairline py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-10 mb-12 md:mb-16 items-end">
            <div className="md:col-span-6">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-accent" />
                <p className="text-[10px] tracking-[0.25em] uppercase text-muted font-medium">
                  Por qué elegirnos
                </p>
              </div>
              <h2 className="display text-4xl md:text-5xl lg:text-6xl mt-4 text-ink leading-[1.05]">
                Tu tranquilidad{" "}
                <span className="italic text-accent">
                  es nuestra organización
                </span>.
              </h2>
            </div>
            <p className="md:col-span-5 md:col-start-8 text-base text-muted leading-relaxed">
              Procesos claros, equipo propio y compromiso firme en cada etapa.
              <strong className="text-ink font-medium">
                {" "}
                Tocá cada punto
              </strong>{" "}
              para ver el detalle de cómo lo garantizamos.
            </p>
          </div>

          <GarantiasExpandibles />
        </div>
      </section>

      {/* FAQ — PREGUNTAS FRECUENTES */}
      <section className="bg-paper border-y hairline py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-10 mb-10 md:mb-14 items-end">
            <div className="md:col-span-6">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-accent" />
                <p className="text-[10px] tracking-[0.25em] uppercase text-muted font-medium">
                  Preguntas frecuentes
                </p>
              </div>
              <h2 className="display text-4xl md:text-5xl lg:text-6xl mt-4 text-ink leading-[1.05]">
                Lo que más nos{" "}
                <span className="italic text-accent">consultan</span>.
              </h2>
            </div>
            <p className="md:col-span-5 md:col-start-8 text-base text-muted leading-relaxed">
              Si tenés otra duda, escribinos por WhatsApp y la resolvemos al
              instante.
            </p>
          </div>

          <FAQ />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-background py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <p className="text-[10px] tracking-[0.25em] uppercase text-background/60 font-medium">
                Asesoramiento sin compromiso
              </p>
            </div>
            <h2 className="display text-4xl md:text-6xl lg:text-7xl mt-6">
              ¿Tenés un proyecto{" "}
              <span className="italic text-accent">en mente</span>?
            </h2>
            <p className="mt-6 text-lg text-background/75 max-w-2xl leading-relaxed">
              Contanos tu idea, el lugar y el momento en que querés
              construirla. Respondemos en menos de 48 horas hábiles con una
              primera evaluación, sin cargo.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-10 py-5 bg-accent text-background text-sm tracking-wider uppercase hover:bg-background hover:text-ink transition-colors"
            >
              Hablemos →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
