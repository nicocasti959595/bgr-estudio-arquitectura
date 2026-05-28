import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { GarantiasExpandibles } from "@/components/GarantiasExpandibles";
import { ImagenObelisco } from "@/components/ImagenObelisco";

const datosClave = [
  { numero: "10+", rotulo: "Años de experiencia" },
  {
    numero: "53",
    rotulo: "Obras entregadas en CABA",
    actualizacion: "13/04/2026",
  },
  {
    numero: "124",
    rotulo: "Reformas realizadas",
    actualizacion: "15/05/2026",
  },
  { numero: "100%", rotulo: "Plazos cumplidos" },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-[calc(100vh-5rem)] min-h-[560px] max-h-[820px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <ImagenObelisco priority objectPosition="center 60%" />
          {/* Gradient sutil: solo oscurece la mitad inferior para los CTAs */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-ink/5" />
        </div>

        <div className="relative w-full mx-auto max-w-[1400px] px-6 md:px-12 pb-12 md:pb-16 text-background">
          <div className="flex items-center gap-3 fade-up">
            <span className="h-px w-10 bg-accent" />
            <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-background/85 font-medium">
              Arquitectura · Construcción · CABA &amp; GBA
            </p>
          </div>
          <h1 className="display text-5xl md:text-7xl lg:text-[5.5rem] mt-5 max-w-5xl fade-up leading-[0.95]">
            Si lo podés imaginar,
            <br />
            <span className="italic text-accent">lo podemos construir.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg text-background/85 leading-relaxed fade-up">
            Reformas integrales de departamentos en Buenos Aires. Proyecto,
            dirección y obra llave en mano.
          </p>

          <a
            href="https://www.instagram.com/bgr.construcciones/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 fade-up group"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 border border-background/30 hover:border-accent hover:bg-accent/10 transition-colors">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 text-background"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="text-[11px] tracking-[0.18em] uppercase text-background">
                @bgr.construcciones
              </span>
              <span className="text-[10px] text-background/60 group-hover:text-accent transition-colors">
                ↗
              </span>
            </span>
          </a>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:items-center fade-up">
            <Link
              href="/proyectos"
              className="inline-flex items-center justify-center px-8 py-4 bg-background text-ink text-sm tracking-wider uppercase hover:bg-accent hover:text-background transition-colors"
            >
              Ver obra construida
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-8 py-4 border border-background/40 text-background text-sm tracking-wider uppercase hover:bg-background hover:text-ink transition-colors"
            >
              Asesoramiento sin compromiso
            </Link>
          </div>
        </div>

        <div className="absolute bottom-5 right-5 md:right-12 hidden md:flex items-center gap-3 text-background/65 text-[10px] tracking-[0.25em] uppercase">
          <span>Est. 2008</span>
          <span className="h-px w-6 bg-background/40" />
          <span>Mat. CPAU</span>
        </div>
      </section>

      {/* STRIP DE DATOS CLAVE con fecha de actualización */}
      <section className="bg-ink text-background border-y border-background/10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 divide-x divide-background/10">
          {datosClave.map((d, i) => (
            <div
              key={d.rotulo}
              className={`py-10 md:py-12 px-4 ${
                i >= 2 ? "border-t md:border-t-0 border-background/10" : ""
              }`}
            >
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
        <ImagenObelisco invertir objectPosition="center 50%" />
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

      {/* CTA breve para conocer al equipo en /estudio */}
      <section className="py-16 md:py-20" id="estudio">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-8 items-end border-y hairline py-10 md:py-12">
            <div className="md:col-span-7">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-accent" />
                <p className="text-[10px] tracking-[0.25em] uppercase text-muted font-medium">
                  Un equipo, una firma
                </p>
              </div>
              <p className="font-serif text-2xl md:text-3xl mt-4 text-ink leading-snug max-w-2xl">
                Dos socios al frente de cada proyecto:{" "}
                <span className="italic text-accent">Javier</span> en
                construcción y{" "}
                <span className="italic text-accent">Alejandro</span> en
                arquitectura. Nuestro nombre va en cada metro construido.
              </p>
            </div>
            <div className="md:col-span-5 md:text-right">
              <Link
                href="/estudio"
                className="inline-flex items-center gap-2 text-sm tracking-[0.18em] uppercase text-ink link-underline"
              >
                Conocé al equipo →
              </Link>
            </div>
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
