import type { Metadata } from "next";
import Link from "next/link";
import { getServicios } from "@/lib/datos";

export const metadata: Metadata = {
  title: "Servicios — BGR Estudio Arquitectura",
  description:
    "Servicios de arquitectura de BGR: obra nueva, reciclaje, interiorismo, dirección de obra, paisaje y consultoría.",
};

const proceso = [
  {
    paso: "01",
    titulo: "Conversación inicial",
    descripcion:
      "Nos reunimos para entender tu programa, expectativas y presupuesto. Visitamos el sitio y relevamos sus particularidades.",
  },
  {
    paso: "02",
    titulo: "Anteproyecto",
    descripcion:
      "Desarrollamos las primeras hipótesis de organización espacial, materialidad y estrategia ambiental. Iteramos junto a vos.",
  },
  {
    paso: "03",
    titulo: "Proyecto ejecutivo",
    descripcion:
      "Elaboramos la documentación completa: planos generales, detalles constructivos, planillas de carpintería e instalaciones.",
  },
  {
    paso: "04",
    titulo: "Dirección de obra",
    descripcion:
      "Coordinamos a los gremios, controlamos calidad y cumplimos los tiempos y costos acordados. Reportes semanales de avance.",
  },
];

export default async function ServiciosPage() {
  const servicios = await getServicios();

  return (
    <>
      <section className="pt-32 md:pt-44 pb-20 border-b hairline">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="eyebrow">— Práctica profesional</p>
          <h1 className="display text-5xl md:text-7xl lg:text-8xl mt-6 text-ink max-w-5xl">
            Servicios
          </h1>
          <p className="mt-8 text-lg text-muted max-w-2xl leading-relaxed">
            Acompañamos cada obra desde la primera conversación hasta la
            entrega final. Nuestra escala de trabajo va desde la casa
            unifamiliar hasta el edificio en altura.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-px bg-line border hairline">
            {servicios.map((s, i) => (
              <div
                key={s.id}
                className="bg-background p-10 md:p-12 hover:bg-paper transition-colors group"
              >
                <div className="flex items-baseline justify-between mb-6">
                  <span className="font-mono text-xs text-muted tracking-wider">
                    SERVICIO {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-12 bg-line group-hover:bg-accent group-hover:w-24 transition-all duration-500" />
                </div>
                <h3 className="font-serif text-3xl md:text-4xl text-ink">
                  {s.titulo}
                </h3>
                <p className="mt-6 text-muted leading-relaxed">
                  {s.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper border-y hairline py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-4">
              <p className="eyebrow">— Proceso</p>
              <h2 className="display text-4xl md:text-5xl mt-4 text-ink">
                Cómo trabajamos
              </h2>
            </div>
            <p className="md:col-span-7 md:col-start-6 text-lg text-muted leading-relaxed">
              Un método claro, transparente y replicable. Cuatro etapas con
              entregables definidos y un acompañamiento permanente.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {proceso.map((p) => (
              <div key={p.paso} className="border-t hairline pt-6">
                <p className="display text-5xl text-accent">{p.paso}</p>
                <h3 className="font-serif text-2xl mt-4 text-ink">
                  {p.titulo}
                </h3>
                <p className="text-muted mt-3 text-sm leading-relaxed">
                  {p.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-background py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8">
            <h2 className="display text-4xl md:text-6xl">
              Pedinos un{" "}
              <span className="italic text-accent">presupuesto</span> sin
              compromiso.
            </h2>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-10 py-5 bg-accent text-background text-sm tracking-wider uppercase hover:bg-background hover:text-ink transition-colors"
            >
              Contactar →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
