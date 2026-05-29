import type { Metadata } from "next";
import Link from "next/link";
import { WizardServicios } from "@/components/WizardServicios";

export const metadata: Metadata = {
  title: "Servicios — BGR Arquitectura & Construcción",
  description:
    "Guiado paso a paso para tu obra: elegí el tipo, contanos los detalles y te abrimos WhatsApp con tu consulta lista para enviar.",
  alternates: { canonical: "/servicios" },
};

const pasos = [
  {
    n: "01",
    titulo: "Contacto Inicial",
    desc: "El contacto inicial es el primer paso para hacer realidad tu proyecto. Nos contás tus ideas y necesidades de remodelación, ampliación o construcción, y coordinamos una visita para conocernos.",
  },
  {
    n: "02",
    titulo: "Visita Profesional",
    desc: "Uno de nuestros arquitectos te visita para evaluar la viabilidad de tu proyecto. En la visita, brindamos soluciones e ideas a la medida de tu obra y tu bolsillo.",
  },
  {
    n: "03",
    titulo: "Diseño y Presupuesto",
    desc: "Nos encargamos del diseño y el presupuesto de tu obra a tu medida. Tenemos dos metodologías de cotización y de trabajo:",
    submodalidades: [
      {
        letra: "A",
        titulo: "Llave en mano",
        desc: "Cotizamos la obra con absolutamente todo incluido. Ideal para quienes quieren desligarse completamente de la obra. Necesitamos definir antes de empezar la calidad de terminaciones y el precio final, para poder ocuparnos de todo.",
      },
      {
        letra: "B",
        titulo: "Mano de obra",
        desc: "Cotizamos únicamente la mano de obra, y te damos un aproximado de lo que podés llegar a gastar en materiales. Ideal para quienes no tienen claro el tipo de terminaciones, o para quien quiera elegir y comprar él mismo las terminaciones de su obra.",
      },
    ],
  },
  {
    n: "04",
    titulo: "Gestión de Avisos y Permisos de obra",
    desc: "Una vez confirmado el presupuesto y el diseño, procedemos a la gestión del Aviso o Permiso de Obra, según corresponda, basado en la magnitud de la obra. Una vez validado, podemos iniciar la obra.",
  },
  {
    n: "05",
    titulo: "Obra",
    desc: "¡Llegó el gran momento! Empezamos tu obra. Quedate tranquilo/a. Uno de nuestros arquitectos te acompañará durante toda la obra y con él verás diariamente los avances y detalles. Contamos con un excelente equipo de idóneos en todos los rubros y subrubros de la construcción.",
  },
  {
    n: "06",
    titulo: "Final de Obra",
    desc: "Te entregamos la obra terminada y limpia, para que puedas mudarte y empezar a disfrutarla.",
  },
];

export default function ServiciosPage() {
  return (
    <>
      <section className="pt-32 md:pt-44 pb-12 border-b hairline">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="eyebrow">— Práctica profesional</p>
          <h1 className="display text-5xl md:text-7xl lg:text-8xl mt-6 text-ink max-w-5xl">
            Servicios
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted max-w-3xl leading-relaxed">
            <strong className="text-ink font-medium">
              Te guiamos paso a paso.
            </strong>{" "}
            Elegí el tipo de obra, contanos los detalles y al final te abrimos
            WhatsApp con tu consulta armada lista para enviar.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12">
          <WizardServicios />
        </div>
      </section>

      <section className="bg-paper border-y hairline py-20 md:py-28">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12">
          <div className="text-center mb-14 md:mb-16">
            <p className="eyebrow">— Proceso</p>
            <h2 className="display text-4xl md:text-5xl lg:text-6xl mt-4 text-ink">
              ¿Cómo{" "}
              <span className="italic text-accent">trabajamos</span>?
            </h2>
            <p className="text-base md:text-lg text-muted mt-5 max-w-xl mx-auto leading-relaxed">
              Conocé el paso a paso. Seis etapas claras, transparentes y con
              acompañamiento permanente.
            </p>
          </div>

          {/* Timeline vertical */}
          <ol className="relative">
            {/* Línea vertical */}
            <span
              aria-hidden="true"
              className="absolute left-[28px] md:left-[44px] top-2 bottom-2 w-px bg-line"
            />

            {pasos.map((p, idx) => (
              <li key={p.n} className="relative grid grid-cols-[56px_1fr] md:grid-cols-[88px_1fr] gap-5 md:gap-8 pb-10 md:pb-14 last:pb-0">
                {/* Número circular */}
                <div className="relative">
                  <div className="w-14 h-14 md:w-[88px] md:h-[88px] bg-background border-2 border-accent flex items-center justify-center">
                    <span className="display text-2xl md:text-4xl text-accent leading-none">
                      {p.n}
                    </span>
                  </div>
                </div>

                {/* Contenido */}
                <div className="pt-2 md:pt-4">
                  <p className="text-[10px] tracking-[0.22em] uppercase text-muted font-medium">
                    Paso {idx + 1} de 6
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl text-ink mt-1">
                    {p.titulo}
                  </h3>
                  <p className="mt-3 text-base text-muted leading-relaxed max-w-3xl">
                    {p.desc}
                  </p>

                  {/* Submodalidades del paso 3 */}
                  {p.submodalidades && (
                    <div className="grid sm:grid-cols-2 gap-px bg-line border hairline mt-6">
                      {p.submodalidades.map((s) => (
                        <div
                          key={s.letra}
                          className="bg-background p-5 md:p-6"
                        >
                          <div className="flex items-baseline gap-3 mb-2">
                            <span className="display text-3xl text-accent leading-none">
                              {s.letra}
                            </span>
                            <h4 className="font-serif text-lg md:text-xl text-ink">
                              {s.titulo}
                            </h4>
                          </div>
                          <p className="text-sm text-muted leading-relaxed mt-2">
                            {s.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ink text-background py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8">
            <h2 className="display text-4xl md:text-6xl">
              ¿Preferís{" "}
              <span className="italic text-accent">otro canal</span>?
            </h2>
            <p className="mt-4 text-base text-background/75 max-w-2xl">
              Escribinos por mail a{" "}
              <a
                href="mailto:info@bgr.com.ar"
                className="text-accent link-underline"
              >
                info@bgr.com.ar
              </a>{" "}
              o completá el formulario completo en contacto.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-10 py-5 bg-accent text-background text-sm tracking-wider uppercase hover:bg-background hover:text-ink transition-colors"
            >
              Ir a contacto →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
