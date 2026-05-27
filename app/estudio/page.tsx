import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estudio — BGR Estudio Arquitectura",
  description:
    "Quiénes somos. Un equipo de arquitectos y constructores con base en Buenos Aires, especializado en reformas integrales de departamentos.",
};

const cifras = [
  { numero: "10+", rotulo: "Años de experiencia" },
  { numero: "53", rotulo: "Obras entregadas en CABA" },
  { numero: "153", rotulo: "Reformas realizadas" },
  { numero: "100%", rotulo: "Plazos cumplidos" },
];

const equipo = [
  {
    inicial: "J",
    nombre: "Javi",
    rol: "Construcción · Socio fundador",
    desc: "Más de diez años llevando obras adelante en CABA. Especializado en reformas integrales y dirección de obra. Cada proyecto con seguimiento propio de inicio a fin.",
  },
  {
    inicial: "A",
    nombre: "Alejandro",
    rol: "Arquitectura · Socio fundador",
    desc: "Arquitecto con foco en diseño y proyecto. Cada reforma parte de un concepto claro y termina con una ejecución precisa. Responsable del desarrollo técnico de cada obra.",
  },
];

const garantias = [
  {
    titulo: "Matrícula habilitada",
    desc: "Profesionales con matrícula CPAU activa. Documentación municipal y planos aprobados en cada obra.",
  },
  {
    titulo: "Equipo propio",
    desc: "Red estable de contratistas verificados. El mismo equipo de inicio a fin en cada proyecto.",
  },
  {
    titulo: "Presupuesto cerrado",
    desc: "Plazo y precio fijo desde el inicio. Sin sorpresas al final de la obra.",
  },
  {
    titulo: "Seguimiento semanal",
    desc: "Fotos y reportes de avance todas las semanas. Acceso permanente al estado de la obra.",
  },
];

export default function EstudioPage() {
  return (
    <>
      <section className="pt-32 md:pt-44 pb-20 border-b hairline">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <p className="eyebrow">— Quiénes somos</p>
            <h1 className="display text-5xl md:text-7xl lg:text-8xl mt-6 text-ink">
              Un equipo, una{" "}
              <span className="italic text-accent">firma</span>.
            </h1>
          </div>
          <p className="md:col-span-5 md:pt-32 text-lg text-muted leading-relaxed">
            Cada obra es un compromiso. Diseñamos, calculamos y dirigimos cada
            proyecto con la misma firma de inicio a fin. Nuestro nombre va en
            cada metro construido.
          </p>
        </div>
      </section>

      <section className="bg-paper border-b hairline py-20 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {cifras.map((c) => (
            <div key={c.rotulo}>
              <p className="display text-5xl md:text-6xl text-ink">
                {c.numero}
              </p>
              <p className="eyebrow mt-3">{c.rotulo}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-10 mb-12 items-end">
            <div className="md:col-span-5">
              <p className="eyebrow">— Equipo</p>
              <h2 className="display text-4xl md:text-5xl mt-4 text-ink leading-[1.05]">
                Dos socios, una{" "}
                <span className="italic text-accent">visión</span>.
              </h2>
            </div>
            <p className="md:col-span-6 md:col-start-7 text-base md:text-lg text-muted leading-relaxed">
              Construcción y arquitectura bajo el mismo techo. Atendemos cada
              proyecto en persona, sin intermediarios.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-line border hairline">
            {equipo.map((m, i) => (
              <div
                key={m.nombre}
                className="bg-background p-8 md:p-10 hover:bg-paper transition-colors grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] gap-6 md:gap-8 items-start"
              >
                <div className="aspect-square bg-paper border hairline flex items-center justify-center">
                  <span className="display text-6xl md:text-8xl text-accent">
                    {m.inicial}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.22em] uppercase text-accent font-medium">
                    /0{i + 1}
                  </p>
                  <h3 className="font-serif text-3xl md:text-4xl mt-2 text-ink">
                    {m.nombre}
                  </h3>
                  <p className="text-[11px] tracking-[0.18em] uppercase text-muted mt-1 font-medium">
                    {m.rol}
                  </p>
                  <p className="mt-5 text-sm md:text-base text-muted leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper border-y hairline py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-10 mb-12 items-end">
            <div className="md:col-span-6">
              <p className="eyebrow">— Por qué elegirnos</p>
              <h2 className="display text-4xl md:text-5xl mt-4 text-ink leading-[1.05]">
                Estructura propia.
                <br />
                <span className="italic text-accent">Responsabilidad total.</span>
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border hairline">
            {garantias.map((g, i) => (
              <div
                key={g.titulo}
                className="bg-background p-7 md:p-9 hover:bg-paper transition-colors"
              >
                <p className="display text-4xl text-accent">/0{i + 1}</p>
                <h3 className="font-serif text-xl md:text-2xl mt-4 text-ink">
                  {g.titulo}
                </h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {g.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
