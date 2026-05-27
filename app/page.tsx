import { GaleriaProyectos } from "@/components/GaleriaProyectos";
import { FormularioConTabs } from "@/components/FormularioConTabs";

const stats = [
  { n: "10+", l: "Años de experiencia" },
  { n: "100+", l: "Obras entregadas en CABA" },
  { n: "100+", l: "Reformas realizadas" },
  { n: "100%", l: "Plazos cumplidos" },
];

const equipo = [
  {
    inicial: "J",
    nombre: "Javi",
    rol: "Socio fundador · Construcción",
    desc: "Más de diez años llevando obras adelante en CABA. Especializado en reformas integrales y dirección de obra. Cada proyecto con seguimiento propio de inicio a fin.",
  },
  {
    inicial: "A",
    nombre: "Alejandro",
    rol: "Socio fundador · Arquitectura",
    desc: "Arquitecto con foco en diseño y proyecto. Cada reforma parte de un concepto claro y termina con una ejecución precisa. Responsable del desarrollo técnico de cada obra.",
  },
];

const servicios = [
  {
    pre: "Servicio principal",
    titulo: "Obra Nueva",
    desc: "Proyecto y dirección de obras residenciales, comerciales e institucionales. Desde la idea inicial hasta la entrega final.",
  },
  {
    pre: "Servicio",
    titulo: "Reciclaje y Remodelación",
    desc: "Reformas integrales de departamentos — cocina, baños, pisos, aberturas — de punta a punta con el mismo equipo.",
  },
  {
    pre: "Servicio",
    titulo: "Interiorismo",
    desc: "Diseño integral de interiores y mobiliario a medida. Curaduría de materiales, iluminación y equipamiento.",
  },
  {
    pre: "Servicio",
    titulo: "Asesoramiento Técnico",
    desc: "Planos, renders y documentación técnica completa. Estudios de factibilidad y consultoría normativa con matrícula activa.",
  },
  {
    pre: "Servicio",
    titulo: "Dirección de Obra",
    desc: "Coordinación de gremios, control de calidad y reportes semanales con fotos de avance en cada etapa.",
  },
  {
    pre: "Servicio",
    titulo: "Llave en Mano",
    desc: "Plazo y precio fijo desde el inicio. Nos encargamos de todo hasta la entrega final.",
  },
];

const garantias = [
  {
    titulo: "Matrícula habilitada",
    desc: "Profesionales con matrícula activa. Documentación y planos aprobados en cada obra.",
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

export default function Home() {
  return (
    <div id="top">
      {/* HERO */}
      <div className="border-b border-line">
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-12 md:pb-20 grid md:grid-cols-2 gap-12 md:gap-20 items-end">
          <div className="fade-up">
            <div className="eyebrow mb-7">
              Arquitectura · Construcción · CABA
            </div>
            <h1 className="font-serif text-[44px] leading-[1.04] tracking-[-0.02em] text-white md:text-[64px] font-normal">
              Si lo podés
              <br />
              imaginar,
              <br />
              lo podemos
              <br />
              <em className="italic text-accent2">construir.</em>
            </h1>
          </div>
          <div className="fade-up">
            <div className="flex items-center gap-2 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-accent2" />
              <span className="text-[10px] tracking-[1.5px] uppercase text-muted">
                @bgr.construcciones · Cuenta verificada · 5.503 seguidores
              </span>
            </div>
            <p className="text-[15px] text-soft leading-[1.8] font-light mb-10">
              Reformas integrales de departamentos en Buenos Aires. Proyecto,
              dirección y obra llave en mano — desde el primer plano hasta la
              entrega de llaves.
            </p>
            <div className="flex flex-col">
              <a
                href="#contacto"
                className="flex items-center justify-between text-[11px] tracking-[1.5px] uppercase text-white py-3.5 border-t border-line2 hover:text-accent2 transition-colors"
              >
                Solicitá tu presupuesto <span className="text-muted">→</span>
              </a>
              <a
                href="https://instagram.com/bgr.construcciones"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-[11px] tracking-[1.5px] uppercase text-white py-3.5 border-t border-line2 hover:text-accent2 transition-colors"
              >
                Instagram @bgr.construcciones <span className="text-muted">↗</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* STATS */}
      <div className="border-b border-line">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.l}
              className={`p-10 md:px-12 md:py-10 ${
                i < 3 ? "md:border-r border-line" : ""
              } ${i % 2 === 0 ? "border-r" : ""} ${
                i < 2 ? "border-b md:border-b-0" : ""
              } border-line`}
            >
              <div className="font-serif text-[42px] md:text-[52px] text-accent2 leading-none mb-2">
                {s.n}
              </div>
              <div className="text-[10px] tracking-[1.8px] uppercase text-muted">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EQUIPO */}
      <div className="border-b border-line" id="estudio">
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-12 md:mb-14 items-end">
            <div>
              <div className="eyebrow mb-5">Quiénes somos</div>
              <h2 className="font-serif text-[34px] md:text-[42px] leading-[1.15] text-white font-normal">
                Un equipo,
                <br />
                una <em className="italic text-accent2">firma.</em>
              </h2>
            </div>
            <p className="text-[14px] text-muted leading-[1.8] font-light">
              Cada obra es un compromiso. Diseñamos, calculamos y dirigimos
              cada proyecto con la misma firma de inicio a fin. Nuestro nombre
              va en cada metro construido.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-line">
            {equipo.map((m, i) => (
              <div
                key={m.nombre}
                className="bg-ink p-8 md:p-10 grid grid-cols-[90px_1fr] gap-6 items-start"
              >
                <div className="w-[90px] h-[90px] bg-surface border border-line flex items-center justify-center font-serif text-[32px] text-accent2">
                  {m.inicial}
                </div>
                <div>
                  <div className="text-[10px] tracking-[1.5px] uppercase text-accent2 mb-1.5">
                    /0{i + 1}
                  </div>
                  <h3 className="font-serif text-[24px] text-white mb-1 font-normal">
                    {m.nombre}
                  </h3>
                  <div className="text-[10px] tracking-[1.5px] uppercase text-muted mb-2.5">
                    {m.rol}
                  </div>
                  <p className="text-[13px] text-soft leading-[1.7] font-light">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* SERVICIOS */}
      <div className="border-b border-line" id="servicios">
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-12 md:mb-14 items-end">
            <div>
              <div className="eyebrow mb-5">Práctica profesional</div>
              <h2 className="font-serif text-[34px] md:text-[42px] leading-[1.15] text-white font-normal">
                Lo que <em className="italic text-accent2">hacemos</em>
              </h2>
            </div>
            <p className="text-[14px] text-muted leading-[1.8] font-light">
              Acompañamos cada obra desde la primera conversación hasta la
              entrega final. Trabajamos con equipo propio y gremios de
              confianza en toda CABA.
            </p>
          </div>
          <div className="grid md:grid-cols-2">
            {servicios.map((s, i) => {
              const isLastRow = i >= servicios.length - 2;
              const isOdd = i % 2 === 1;
              return (
                <div
                  key={s.titulo}
                  className={`py-9 grid grid-cols-[3rem_1fr] gap-5 ${
                    isOdd ? "md:pl-9" : "md:pr-9 md:border-r"
                  } ${!isLastRow ? "border-b" : ""} border-line2`}
                >
                  <div className="font-serif text-[13px] text-accent2 pt-1">
                    /0{i + 1}
                  </div>
                  <div>
                    <div className="text-[9px] tracking-[2px] uppercase text-muted mb-2">
                      {s.pre}
                    </div>
                    <div className="text-[16px] font-medium text-white mb-2">
                      {s.titulo}
                    </div>
                    <p className="text-[13px] text-soft leading-[1.7] font-light">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* GALERIA / PROYECTOS */}
      <div className="border-b border-line" id="proyectos">
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-12 md:mb-14 items-end">
            <div>
              <div className="eyebrow mb-5">Últimas obras</div>
              <h2 className="font-serif text-[34px] md:text-[42px] leading-[1.15] text-white font-normal">
                Proyectos <em className="italic text-accent2">recientes</em>
              </h2>
            </div>
            <p className="text-[14px] text-muted leading-[1.8] font-light">
              Baños, cocinas y reformas integrales en toda CABA. Todos los
              proyectos con fotos del proceso en{" "}
              <strong className="text-accent2 font-medium">
                @bgr.construcciones
              </strong>
            </p>
          </div>
          <GaleriaProyectos />
        </section>
      </div>

      {/* GARANTIAS */}
      <div className="border-b border-line">
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 mb-12 md:mb-14 items-end">
            <div>
              <div className="eyebrow mb-5">Por qué elegirnos</div>
              <h2 className="font-serif text-[34px] md:text-[42px] leading-[1.15] text-white font-normal">
                Estructura propia.
                <br />
                <em className="italic text-accent2">Responsabilidad total.</em>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4">
            {garantias.map((g, i) => (
              <div
                key={g.titulo}
                className={`py-9 ${
                  i < garantias.length - 1
                    ? "md:pr-8 md:border-r border-line2"
                    : ""
                } ${i < garantias.length - 1 ? "border-b md:border-b-0" : ""} border-line2`}
              >
                <div className="text-[9px] tracking-[2px] uppercase text-accent2 mb-3">
                  — 0{i + 1}
                </div>
                <div className="text-[15px] font-medium text-white mb-2">
                  {g.titulo}
                </div>
                <p className="text-[13px] text-soft leading-[1.7] font-light">
                  {g.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA BAND */}
      <div className="bg-accent border-b border-line">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-14 md:py-16 text-center">
          <p className="font-serif text-[26px] md:text-[34px] text-white font-normal mb-7">
            Pedinos un presupuesto{" "}
            <em className="italic">sin compromiso.</em>
          </p>
          <a
            href="#contacto"
            className="inline-block border border-white/50 text-white px-10 py-3.5 text-[11px] tracking-[2px] uppercase hover:bg-white/15 transition-colors"
          >
            Contactar →
          </a>
        </div>
      </div>

      {/* FORMULARIO */}
      <div className="bg-paper border-b border-line" id="contacto">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20 grid md:grid-cols-[1fr_1.6fr] gap-12 md:gap-24">
          <div>
            <div className="eyebrow mb-5">Presupuesto sin cargo</div>
            <h2 className="font-serif text-[28px] md:text-[36px] text-white font-normal leading-tight">
              Iniciemos tu <em className="italic text-accent2">proyecto.</em>
            </h2>
            <p className="text-[14px] text-muted leading-[1.8] font-light mt-4">
              Contanos qué querés hacer y te respondemos en menos de 24 horas
              hábiles. Si preferís, escribinos directamente por WhatsApp.
            </p>
            <div className="mt-10 border-t border-line2 pt-6 space-y-1.5">
              <a
                href="mailto:info@bgr.com.ar"
                className="block text-[13px] text-muted hover:text-white transition-colors"
              >
                info@bgr.com.ar
              </a>
              <a
                href="https://wa.me/5491122506347"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[13px] text-muted hover:text-white transition-colors"
              >
                +54 9 11 2250-6347
              </a>
              <a
                href="https://instagram.com/bgr.construcciones"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[13px] text-accent2 hover:text-white transition-colors"
              >
                @bgr.construcciones
              </a>
              <p className="text-[11px] tracking-[1px] uppercase text-muted mt-2">
                CABA, Argentina
              </p>
            </div>
          </div>
          <FormularioConTabs />
        </div>
      </div>
    </div>
  );
}
