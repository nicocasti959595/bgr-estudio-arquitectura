import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiénes somos — BGR Arquitectura & Construcción",
  description:
    "Quiénes somos. Tres socios al frente de cada proyecto: Branca, Gonzales y Rial. BGR Construcciones SRL — más de 10 años de experiencia en CABA y GBA.",
};

const cifras = [
  { numero: "10+", rotulo: "Años de experiencia" },
  { numero: "53", rotulo: "Obras entregadas en CABA" },
  { numero: "124", rotulo: "Reformas realizadas" },
  { numero: "100%", rotulo: "Plazos cumplidos" },
];

const socios = [
  {
    inicial: "B",
    apellido: "Branca",
    nombre: "Alejandro",
    rol: "Arquitectura",
    desc: "Arquitecto con foco en diseño y proyecto. Cada reforma parte de un concepto claro y termina con una ejecución precisa. Responsable del desarrollo técnico de cada obra.",
  },
  {
    inicial: "G",
    apellido: "Gonzales",
    nombre: "Uriel",
    rol: "Proveedor",
    desc: "A cargo de la red de proveedores y el corralón propio del estudio en CABA. Garantiza calidad, plazo y precio en todos los materiales que llegan a la obra.",
  },
  {
    inicial: "R",
    apellido: "Rial",
    nombre: "Javier",
    rol: "Construcción",
    desc: "Más de diez años llevando obras adelante en CABA. Especializado en reformas integrales y dirección de obra. Cada proyecto con seguimiento propio de inicio a fin.",
  },
];

const staff = [
  { rol: "Recursos Humanos", desc: "Selección y coordinación del equipo de obra." },
  { rol: "Administración", desc: "Cotizaciones, certificados y contratos." },
  { rol: "Atención al cliente", desc: "Primer contacto y seguimiento de cada consulta." },
];

export default function EstudioPage() {
  return (
    <>
      {/* HERO + 3 SOCIOS */}
      <section className="pt-32 md:pt-44 pb-20 border-b hairline">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-10 mb-14 md:mb-20">
            <div className="md:col-span-7">
              <p className="eyebrow">— Quiénes somos</p>
              <h1 className="display text-5xl md:text-7xl lg:text-8xl mt-6 text-ink">
                Tres socios, una{" "}
                <span className="italic text-accent">firma</span>.
              </h1>
            </div>
            <div className="md:col-span-5 md:pt-24 space-y-4 text-base md:text-lg text-muted leading-relaxed">
              <p>
                Somos{" "}
                <strong className="text-ink font-medium">
                  BGR Construcciones SRL
                </strong>
                : un grupo de arquitectos, constructores y proveedores
                dedicados a obras civiles de la más alta calidad.
              </p>
              <p className="font-serif text-xl md:text-2xl text-ink italic leading-snug">
                Si lo podés imaginar,{" "}
                <span className="text-accent not-italic">
                  lo podemos construir.
                </span>
              </p>
            </div>
          </div>

          {/* GRÁFICO B - G - R */}
          <div className="grid md:grid-cols-3 gap-px bg-line border hairline">
            {socios.map((s, i) => (
              <div
                key={s.inicial}
                className="bg-background p-8 md:p-10 hover:bg-paper transition-colors group"
              >
                {/* Cuadrado grande con la inicial */}
                <div className="aspect-square w-full max-w-[180px] mx-auto bg-ink border-2 border-ink flex items-center justify-center mb-6 group-hover:bg-accent group-hover:border-accent transition-colors">
                  <span className="display text-[110px] md:text-[130px] text-background leading-none">
                    {s.inicial}
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-[10px] tracking-[0.22em] uppercase text-accent font-medium">
                    Socio /0{i + 1}
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl mt-2 text-ink">
                    {s.apellido}, {s.nombre}
                  </h3>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-muted mt-1 font-medium">
                    {s.rol}
                  </p>
                  <p className="mt-5 text-sm text-muted leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* STAFF */}
          <div className="mt-16 md:mt-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-muted" />
              <p className="text-[10px] tracking-[0.25em] uppercase text-muted font-medium">
                Staff
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 md:gap-8">
              {staff.map((m) => (
                <div key={m.rol} className="border-t hairline pt-5">
                  <h4 className="font-serif text-lg text-ink">{m.rol}</h4>
                  <p className="text-sm text-muted mt-2 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CIFRAS */}
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

      {/* DESCRIPCIÓN AMPLIADA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[900px] px-6 md:px-12 space-y-6 text-base md:text-lg text-muted leading-relaxed">
          <p>
            Gracias a la confianza de nuestros clientes estamos cumpliendo en
            el rubro{" "}
            <strong className="text-ink font-medium">10 años</strong>,
            realizando proyectos integrales de remodelación y de obras a
            estrenar.
          </p>
          <p>
            Hacemos énfasis en la armonía y funcionalidad de los espacios, la
            relación con el entorno y en mejorar la calidad de vida de nuestros
            clientes. Construcción y arquitectura bajo el mismo techo:
            atendemos cada proyecto en persona, sin intermediarios.
          </p>
        </div>
      </section>
    </>
  );
}
