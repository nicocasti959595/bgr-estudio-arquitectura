import Link from "next/link";
import Image from "next/image";
import { getProyectosDestacados, getServicios } from "@/lib/datos";

export default async function Home() {
  const [destacados, servicios] = await Promise.all([
    getProyectosDestacados(),
    getServicios(),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=2200&q=85&auto=format&fit=crop"
            alt="Arquitectura contemporánea"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
        </div>

        <div className="relative w-full mx-auto max-w-[1400px] px-6 md:px-12 pb-16 md:pb-24 text-background">
          <p className="eyebrow text-background/70 fade-up">
            Estudio de Arquitectura · Buenos Aires · 2008
          </p>
          <h1 className="display text-5xl md:text-7xl lg:text-8xl mt-6 max-w-5xl fade-up">
            Sabemos de esto,
            <br />
            <span className="italic text-accent">vivimos de esto.</span>
          </h1>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:items-center fade-up">
            <Link
              href="/proyectos"
              className="inline-flex items-center justify-center px-8 py-4 bg-background text-ink text-sm tracking-wider uppercase hover:bg-accent hover:text-background transition-colors"
            >
              Ver Proyectos
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-8 py-4 border border-background/40 text-background text-sm tracking-wider uppercase hover:bg-background hover:text-ink transition-colors"
            >
              Iniciar un proyecto
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 md:right-12 text-background/60 font-mono text-xs tracking-wider">
          34° 36′ S · 58° 22′ O
        </div>
      </section>

      {/* MANIFIESTO */}
      <section className="py-24 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="eyebrow">— Manifiesto</p>
            <div className="mt-6 h-px w-16 bg-accent draw-line" />
          </div>
          <div className="md:col-span-8">
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.2] text-ink">
              Pensamos la arquitectura como un{" "}
              <span className="italic text-accent">acto territorial</span>.
              Cada proyecto comienza por mirar el sitio, escuchar a quienes
              habitarán la obra y comprender los materiales que la región
              ofrece.
            </p>
            <p className="mt-8 text-lg text-muted leading-relaxed max-w-2xl">
              Desde 2008 desarrollamos obras de arquitectura en distintas
              regiones del país: la llanura pampeana, el delta, los valles
              cuyanos y el litoral. Trabajamos con un equipo interdisciplinario
              y cada proyecto es entendido como una pieza única.
            </p>
          </div>
        </div>
      </section>

      {/* PROYECTOS DESTACADOS */}
      <section className="bg-paper border-t hairline py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="eyebrow">— Proyectos Destacados</p>
              <h2 className="display text-4xl md:text-6xl mt-4 text-ink">
                Obra reciente
              </h2>
            </div>
            <Link
              href="/proyectos"
              className="link-underline text-sm tracking-wider uppercase text-ink"
            >
              Ver todos los proyectos →
            </Link>
          </div>

          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            {destacados.map((p, i) => (
              <Link
                key={p.id}
                href={`/proyectos/${p.slug}`}
                className={`group ${
                  i === 0
                    ? "md:col-span-7"
                    : i === 1
                    ? "md:col-span-5 md:mt-32"
                    : "md:col-span-8 md:col-start-3"
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-line">
                  <Image
                    src={p.imagen_portada}
                    alt={p.titulo}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow">
                      {p.tipologia} · {p.anio}
                    </p>
                    <h3 className="font-serif text-2xl md:text-3xl mt-2 text-ink">
                      {p.titulo}
                    </h3>
                    <p className="text-muted text-sm mt-1">{p.ubicacion}</p>
                  </div>
                  <span className="font-mono text-xs text-muted shrink-0 mt-1">
                    /0{i + 1}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-4">
              <p className="eyebrow">— Práctica</p>
              <h2 className="display text-4xl md:text-5xl mt-4 text-ink">
                Lo que hacemos
              </h2>
            </div>
            <p className="md:col-span-7 md:col-start-6 text-lg text-muted leading-relaxed">
              Acompañamos cada obra desde el primer croquis hasta la entrega
              final. Trabajamos en conjunto con ingenieros estructurales,
              especialistas en instalaciones, paisajistas y artesanos de cada
              región.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-line border hairline">
            {servicios.map((s, i) => (
              <div
                key={s.id}
                className="bg-background p-8 md:p-10 hover:bg-paper transition-colors group"
              >
                <div className="flex items-baseline justify-between mb-6">
                  <span className="font-mono text-xs text-muted">
                    0{i + 1}
                  </span>
                  <span className="h-px flex-1 mx-4 bg-line group-hover:bg-accent transition-colors" />
                </div>
                <h3 className="font-serif text-2xl text-ink">{s.titulo}</h3>
                <p className="mt-4 text-muted leading-relaxed">
                  {s.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-background py-24 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8">
            <p className="eyebrow text-background/60">— Trabajemos juntos</p>
            <h2 className="display text-4xl md:text-6xl lg:text-7xl mt-6">
              ¿Tenés un proyecto{" "}
              <span className="italic text-accent">en mente</span>?
            </h2>
            <p className="mt-6 text-lg text-background/70 max-w-2xl leading-relaxed">
              Contanos tu idea, el lugar y el momento en que querés
              construirla. Te respondemos en menos de 48 horas hábiles.
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
