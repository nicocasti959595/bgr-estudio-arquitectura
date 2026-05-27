"use client";

import { useState } from "react";
import { ModalConsultaServicio } from "./ModalConsultaServicio";

type Servicio = {
  id: string;
  titulo: string;
  descripcion: string;
};

export function SelectorServicios({ servicios }: { servicios: Servicio[] }) {
  const [seleccionado, setSeleccionado] = useState<string | null>(null);

  return (
    <>
      <div className="grid md:grid-cols-2 gap-px bg-line border hairline">
        {servicios.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSeleccionado(s.titulo)}
            className="text-left bg-background p-10 md:p-12 hover:bg-paper transition-colors group cursor-pointer"
          >
            <div className="flex items-baseline justify-between mb-6">
              <span className="text-xs text-muted tracking-[0.2em] font-medium">
                SERVICIO {String(i + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-12 bg-line group-hover:bg-accent group-hover:w-24 transition-all duration-500" />
            </div>
            <h3 className="font-serif text-3xl md:text-4xl text-ink group-hover:text-accent transition-colors">
              {s.titulo}
            </h3>
            <p className="mt-6 text-muted leading-relaxed">{s.descripcion}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-accent font-medium">
              Consultar por WhatsApp
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path d="M19.077 4.928C17.191 3.041 14.683 2 12.011 2c-5.508 0-9.99 4.482-9.99 9.99 0 1.762.46 3.482 1.336 4.999L2 22l5.146-1.359a9.953 9.953 0 0 0 4.865 1.239h.004c5.509 0 9.991-4.482 9.991-9.99 0-2.673-1.041-5.181-2.929-7.068zm-7.066 15.339a8.297 8.297 0 0 1-4.214-1.155l-.302-.18-3.131.826.836-3.057-.196-.314a8.273 8.273 0 0 1-1.27-4.397c0-4.583 3.729-8.312 8.314-8.312 2.219 0 4.307.866 5.876 2.437a8.265 8.265 0 0 1 2.435 5.879c-.001 4.584-3.73 8.313-8.348 8.313zm4.554-6.227c-.247-.124-1.474-.728-1.701-.81-.227-.083-.392-.124-.557.124-.166.247-.641.81-.785.972-.144.165-.288.186-.535.062-.247-.123-1.045-.385-1.991-1.23-.737-.658-1.232-1.469-1.376-1.716-.144-.247-.015-.38.107-.502.11-.11.247-.288.37-.432.124-.144.165-.247.247-.412.083-.165.041-.31-.02-.433-.062-.124-.557-1.345-.764-1.84-.2-.484-.405-.42-.557-.426-.144-.007-.31-.009-.475-.009-.165 0-.433.062-.661.31-.227.247-.866.847-.866 2.07 0 1.221.886 2.4 1.011 2.566.124.165 1.748 2.667 4.234 3.741.591.256 1.054.41 1.413.523.594.189 1.135.162 1.561.099.476-.071 1.474-.602 1.682-1.183.207-.581.207-1.079.144-1.182-.062-.103-.227-.165-.475-.289z" />
              </svg>
            </span>
          </button>
        ))}
      </div>

      <ModalConsultaServicio
        servicio={seleccionado ?? ""}
        abierto={seleccionado !== null}
        onCerrar={() => setSeleccionado(null)}
      />
    </>
  );
}
