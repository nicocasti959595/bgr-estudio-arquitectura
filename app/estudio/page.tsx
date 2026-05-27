import Image from "next/image";
import type { Metadata } from "next";
import { getMiembros } from "@/lib/datos";

export const metadata: Metadata = {
  title: "Estudio — Estudio Terreno",
  description:
    "Quiénes somos: un equipo de arquitectos y diseñadores con base en Buenos Aires, trabajando en proyectos en toda Argentina.",
};

const cifras = [
  { numero: "16", rotulo: "Años de práctica" },
  { numero: "84", rotulo: "Obras construidas" },
  { numero: "12", rotulo: "Provincias intervenidas" },
  { numero: "07", rotulo: "Premios recibidos" },
];

export default async function EstudioPage() {
  const miembros = await getMiembros();

  return (
    <>
      <section className="pt-32 md:pt-44 pb-20 border-b hairline">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <p className="eyebrow">— Quiénes somos</p>
            <h1 className="display text-5xl md:text-7xl lg:text-8xl mt-6 text-ink">
              Un equipo, <span className="italic">una mirada</span>.
            </h1>
          </div>
          <p className="md:col-span-5 md:pt-32 text-lg text-muted leading-relaxed">
            Somos un estudio fundado en 2008 por Inés Mariño y Tomás Vergara.
            Trabajamos desde Buenos Aires en proyectos de distintas escalas y
            programas, con un equipo permanente de doce personas y una red de
            colaboradores en todo el país.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7 relative aspect-[4/5] overflow-hidden bg-line order-2 md:order-1">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85&auto=format&fit=crop"
              alt="Nuestro estudio"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="md:col-span-5 md:pt-12 order-1 md:order-2">
            <p className="eyebrow">— Filosofía</p>
            <h2 className="font-serif text-3xl md:text-4xl mt-4 leading-tight text-ink">
              Cada obra es una respuesta específica al lugar, al programa y a
              la gente que la habitará.
            </h2>
            <div className="mt-8 space-y-4 text-muted leading-relaxed">
              <p>
                Nos interesa la arquitectura que envejece bien: aquella que
                trabaja con materiales nobles, que se deja afectar por el paso
                del tiempo y que acompaña los cambios de uso a lo largo de los
                años.
              </p>
              <p>
                Diseñamos pensando en la luz natural, la ventilación cruzada,
                la masa térmica y la relación entre interior y exterior. La
                sustentabilidad no es para nosotros una capa adicional sino el
                punto de partida del proyecto.
              </p>
              <p>
                Trabajamos cerca de la obra. Visitamos las canteras de piedra,
                los aserraderos y los talleres de herrería. Esa relación
                directa con los oficios es lo que da carácter a cada proyecto.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper border-y hairline py-20 md:py-24">
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
          <div className="grid md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-4">
              <p className="eyebrow">— Equipo</p>
              <h2 className="display text-4xl md:text-5xl mt-4 text-ink">
                El equipo
              </h2>
            </div>
            <p className="md:col-span-7 md:col-start-6 text-lg text-muted leading-relaxed">
              Profesionales formados en las principales facultades de
              arquitectura del país, con experiencia internacional y un fuerte
              compromiso con la práctica argentina.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-line border hairline">
            {miembros.map((m, i) => (
              <div
                key={m.id}
                className="bg-background p-8 hover:bg-paper transition-colors"
              >
                <div className="aspect-[3/4] bg-line mb-6 relative overflow-hidden">
                  {m.foto ? (
                    <Image
                      src={m.foto}
                      alt={m.nombre}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover grayscale"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="display text-7xl text-line">
                        {m.nombre[0]}
                      </span>
                    </div>
                  )}
                </div>
                <p className="font-mono text-xs text-muted">
                  /{String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-serif text-xl mt-2 text-ink">
                  {m.nombre}
                </h3>
                <p className="text-sm text-accent mt-1">{m.rol}</p>
                {m.bio && (
                  <p className="text-sm text-muted mt-4 leading-relaxed">
                    {m.bio}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
