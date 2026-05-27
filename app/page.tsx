import Link from "next/link";
import Image from "next/image";
import { getProyectosDestacados, getServicios } from "@/lib/datos";

const datosClave = [
  { numero: "16", rotulo: "Años en obra" },
  { numero: "84", rotulo: "Obras entregadas" },
  { numero: "12", rotulo: "Provincias" },
  { numero: "100%", rotulo: "Plazos cumplidos" },
];

export default async function Home() {
  const [destacados, servicios] = await Promise.all([
    getProyectosDestacados(),
    getServicios(),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="relative h-[calc(100vh-5rem)] min-h-[560px] max-h-[820px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=2400&q=85&auto=format&fit=crop"
            alt="Obra de arquitectura moderna"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            style={{ objectPosition: "center 35%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/15" />
        </div>

        <div className="relative w-full mx-auto max-w-[1400px] px-6 md:px-12 pb-12 md:pb-16 text-background">
          <div className="flex items-center gap-3 fade-up">
            <span className="h-px w-10 bg-accent" />
            <p className="font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase text-background/85">
              Arquitectura · Construcción · Argentina
            </p>
          </div>
          <h1 className="display text-5xl md:text-7xl lg:text-[5.5rem] mt-5 max-w-5xl fade-up leading-[0.95]">
            Vos tenés la idea,
            <br />
            <span className="italic text-accent">nosotros la construimos.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg text-background/85 leading-relaxed fade-up">
            Diseñamos, calculamos y construimos obra propia. Acompañamos cada
            proyecto con la misma firma del primer día hasta la entrega de
            llaves.
          </p>
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
              Solicitar presupuesto
            </Link>
          </div>
        </div>

        <div className="absolute bottom-5 right-5 md:right-12 hidden md:flex items-center gap-3 text-background/65 font-mono text-[10px] tracking-[0.25em] uppercase">
          <span>Est. 2008</span>
          <span className="h-px w-6 bg-background/40" />
          <span>Mat. CPAU</span>
        </div>
      </section>

      {/* STRIP DE DATOS CLAVE */}
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
              <p className="mt-3 font-mono text-[10px] md:text-xs tracking-[0.22em] uppercase text-background/65">
                {d.rotulo}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* QUIÉNES SOMOS / FRASE FUERTE */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
                Quiénes somos
              </p>
            </div>
            <p className="mt-6 text-sm text-muted leading-relaxed">
              Estudio de arquitectura fundado en Buenos Aires en 2008. Equipo
              propio de doce profesionales y red de obra activa en toda
              Argentina.
            </p>
          </div>
          <div className="md:col-span-8">
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.15] text-ink">
              Cada obra es un{" "}
              <span className="italic text-accent">compromiso</span>.
              Diseñamos, calculamos y dirigimos cada proyecto con la misma
              firma. Nuestro nombre va en cada metro construido.
            </p>
          </div>
        </div>
      </section>

      {/* PROYECTOS DESTACADOS */}
      <section className="bg-paper border-t hairline py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-accent" />
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
                  Proyectos destacados
                </p>
              </div>
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
                    ? "md:col-span-5 md:mt-24"
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
                  <div className="absolute top-4 left-4 bg-background/95 px-3 py-1.5 font-mono text-[10px] tracking-[0.22em] uppercase text-ink">
                    {p.tipologia}
                  </div>
                </div>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted">
                      {p.anio} · {p.ubicacion}
                    </p>
                    <h3 className="font-serif text-2xl md:text-3xl mt-2 text-ink">
                      {p.titulo}
                    </h3>
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
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 mb-14">
            <div className="md:col-span-4">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-accent" />
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
                  Lo que hacemos
                </p>
              </div>
              <h2 className="display text-4xl md:text-5xl mt-4 text-ink">
                Servicios
              </h2>
            </div>
            <p className="md:col-span-7 md:col-start-6 text-lg text-muted leading-relaxed">
              Tomamos a cargo la obra completa o intervenimos en la etapa que
              necesites. Trabajamos con ingenieros estructurales,
              instalaciones, paisajistas y un equipo propio de dirección de
              obra.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-line border hairline">
            {servicios.map((s, i) => (
              <div
                key={s.id}
                className="bg-background p-8 md:p-10 hover:bg-paper transition-colors group"
              >
                <div className="flex items-baseline justify-between mb-6">
                  <span className="font-mono text-xs text-muted tracking-[0.2em]">
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

      {/* PROCESO / CONFIANZA */}
      <section className="bg-paper border-y hairline py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
                Por qué elegirnos
              </p>
            </div>
            <h2 className="display text-4xl md:text-5xl mt-4 text-ink leading-[1.1]">
              Estructura propia.
              <br />
              Responsabilidad{" "}
              <span className="italic text-accent">total</span>.
            </h2>
          </div>
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-x-10 gap-y-8 md:pt-4">
            {[
              {
                t: "Matrícula habilitada",
                d: "Profesionales con matrícula CPAU activa. Documentación municipal y planos aprobados en cada obra.",
              },
              {
                t: "Equipo propio",
                d: "Doce profesionales en planta y red estable de contratistas verificados en cada provincia donde operamos.",
              },
              {
                t: "Presupuesto cerrado",
                d: "Plazo y precio fijo desde el inicio. Ajustes solo por modificaciones de proyecto solicitadas por el cliente.",
              },
              {
                t: "Seguimiento semanal",
                d: "Reportes con fotografías, certificados de avance y estado de gremios. Acceso permanente a la documentación.",
              },
            ].map((b) => (
              <div key={b.t} className="border-t hairline pt-5">
                <h3 className="font-serif text-xl text-ink">{b.t}</h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {b.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-background py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-background/60">
                Trabajemos juntos
              </p>
            </div>
            <h2 className="display text-4xl md:text-6xl lg:text-7xl mt-6">
              ¿Tenés un proyecto{" "}
              <span className="italic text-accent">en mente</span>?
            </h2>
            <p className="mt-6 text-lg text-background/75 max-w-2xl leading-relaxed">
              Contanos tu idea, el lugar y el momento en que querés
              construirla. Respondemos en menos de 48 horas hábiles con una
              primera evaluación.
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
