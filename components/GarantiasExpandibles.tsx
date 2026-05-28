"use client";

import { useState } from "react";

const garantias = [
  {
    titulo: "Matrícula habilitada",
    resumen:
      "Profesionales con matrícula CPAU activa. Documentación municipal y planos aprobados en cada obra.",
    detalles: [
      "Habilitación profesional verificable en CPAU.",
      "Documentación municipal completa y planos aprobados ante el Gobierno de CABA.",
      "Cumplimiento del Código de Edificación de CABA y la ley de propiedad horizontal (13.512).",
      "Seguro de responsabilidad civil profesional incluido en cada obra.",
    ],
  },
  {
    titulo: "Equipo propio",
    resumen:
      "Red estable de contratistas verificados. El mismo equipo de inicio a fin en cada proyecto.",
    detalles: [
      "Albañiles, plomeros, electricistas, gasistas y carpinteros de planta.",
      "Coordinador de obra exclusivo asignado a tu proyecto.",
      "Materiales gruesos provistos por nuestro corralón propio en CABA.",
      "Trato directo sin intermediarios entre vos y la obra.",
    ],
  },
  {
    titulo: "Presupuesto cerrado",
    resumen:
      "Plazo y precio fijo desde el inicio. Sin sorpresas al final de la obra.",
    detalles: [
      "Cotización detallada rubro por rubro antes de firmar.",
      "Contrato con hitos, pagos y plazos claros.",
      "Sólo se ajusta si vos pedís modificaciones al proyecto original.",
      "Modalidad llave en mano o mano de obra, vos elegís.",
    ],
  },
  {
    titulo: "Seguimiento semanal",
    resumen:
      "Fotos y reportes de avance todas las semanas. Acceso permanente al estado de la obra.",
    detalles: [
      "Reportes semanales con fotografías de cada gremio en obra.",
      "Reunión de coordinación semanal con el cliente (presencial o video).",
      "Acceso permanente por WhatsApp al coordinador de obra.",
      "Certificados de avance firmados en cada etapa.",
    ],
  },
];

export function GarantiasExpandibles() {
  const [abierta, setAbierta] = useState<number | null>(null);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border hairline">
      {garantias.map((g, i) => {
        const isOpen = abierta === i;
        return (
          <button
            key={g.titulo}
            type="button"
            onClick={() => setAbierta(isOpen ? null : i)}
            aria-expanded={isOpen}
            className={`text-left bg-background hover:bg-paper transition-all duration-300 group flex flex-col ${
              isOpen ? "bg-paper" : ""
            }`}
          >
            <div className="p-7 md:p-9 flex-1">
              <div className="flex items-start justify-between gap-3">
                <p className="display text-4xl text-accent">/0{i + 1}</p>
                <span
                  className={`text-accent text-2xl shrink-0 transition-transform duration-300 leading-none ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </div>
              <h3 className="font-serif text-xl md:text-2xl mt-4 text-ink group-hover:text-accent transition-colors">
                {g.titulo}
              </h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                {g.resumen}
              </p>
            </div>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-7 md:px-9 pb-7 md:pb-9 border-t hairline pt-5 mt-2">
                  <p className="text-[10px] tracking-[0.22em] uppercase text-accent font-medium mb-3">
                    En detalle
                  </p>
                  <ul className="space-y-2">
                    {g.detalles.map((d, k) => (
                      <li
                        key={k}
                        className="text-sm text-muted leading-relaxed flex gap-2"
                      >
                        <span className="text-accent shrink-0">·</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
