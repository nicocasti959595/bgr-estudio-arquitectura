"use client";

import { useMemo, useState, useTransition } from "react";
import {
  cambiarEstadoMensajeAction,
  eliminarMensajeAction,
} from "@/lib/actions-admin";
import type { EstadoMensaje, Mensaje } from "@/lib/mensajes";
import { AvisoAccion } from "./AvisoAccion";

type Filtro = "todos" | EstadoMensaje;

const ESTADO_LABEL: Record<EstadoMensaje, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  archivado: "Archivado",
};

const ESTADO_COLOR: Record<EstadoMensaje, string> = {
  nuevo: "bg-accent text-background",
  contactado: "bg-ink text-background",
  archivado: "bg-line text-muted",
};

export function BandejaMensajes({ mensajes }: { mensajes: Mensaje[] }) {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [aviso, setAviso] = useState<
    { tipo: "ok" | "error"; mensaje: string } | null
  >(null);
  const [isPending, startTransition] = useTransition();

  const filtrados = useMemo(
    () =>
      filtro === "todos"
        ? mensajes
        : mensajes.filter((m) => m.estado === filtro),
    [mensajes, filtro]
  );

  function setEstado(m: Mensaje, estado: EstadoMensaje) {
    startTransition(async () => {
      const res = await cambiarEstadoMensajeAction(m.id, estado);
      if (!res.ok) setAviso({ tipo: "error", mensaje: res.error });
    });
  }

  function eliminar(m: Mensaje) {
    if (!window.confirm(`¿Eliminar la consulta de ${m.nombre}?`)) return;
    startTransition(async () => {
      const res = await eliminarMensajeAction(m.id);
      if (!res.ok) setAviso({ tipo: "error", mensaje: res.error });
      else setAviso({ tipo: "ok", mensaje: "Consulta eliminada." });
    });
  }

  const filtros: Filtro[] = ["todos", "nuevo", "contactado", "archivado"];

  return (
    <section className="mt-10">
      <div className="flex flex-wrap gap-2 mb-6">
        {filtros.map((f) => {
          const n =
            f === "todos"
              ? mensajes.length
              : mensajes.filter((m) => m.estado === f).length;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFiltro(f)}
              className={`text-[11px] tracking-[1.5px] uppercase px-4 py-2 border transition-colors ${
                filtro === f
                  ? "bg-ink text-background border-ink"
                  : "border-line text-muted hover:text-ink hover:border-muted"
              }`}
            >
              {f === "todos" ? "Todas" : ESTADO_LABEL[f]} ({n})
            </button>
          );
        })}
      </div>

      {filtrados.length === 0 ? (
        <div className="border border-line bg-paper p-12 text-center">
          <p className="text-muted font-light text-[14px]">
            {mensajes.length === 0
              ? "Todavía no llegó ninguna consulta desde el formulario de contacto."
              : "No hay consultas en este filtro."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtrados.map((m) => (
            <TarjetaMensaje
              key={m.id}
              mensaje={m}
              disabled={isPending}
              onEstado={(e) => setEstado(m, e)}
              onEliminar={() => eliminar(m)}
            />
          ))}
        </div>
      )}

      {aviso && (
        <AvisoAccion
          tipo={aviso.tipo}
          mensaje={aviso.mensaje}
          onCerrar={() => setAviso(null)}
        />
      )}
    </section>
  );
}

function TarjetaMensaje({
  mensaje: m,
  disabled,
  onEstado,
  onEliminar,
}: {
  mensaje: Mensaje;
  disabled: boolean;
  onEstado: (e: EstadoMensaje) => void;
  onEliminar: () => void;
}) {
  const [abierto, setAbierto] = useState(m.estado === "nuevo");
  const fecha = m.created_at
    ? new Date(m.created_at).toLocaleString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const telWa = m.telefono?.replace(/\D/g, "");

  return (
    <div
      className={`border-2 bg-paper transition-colors ${
        m.estado === "nuevo" ? "border-accent/60" : "border-line"
      }`}
    >
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        className="w-full flex items-start justify-between gap-4 p-4 md:p-5 text-left"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`text-[9px] tracking-[1.5px] uppercase px-2 py-1 ${ESTADO_COLOR[m.estado]}`}
            >
              {ESTADO_LABEL[m.estado]}
            </span>
            <span className="font-serif text-lg text-ink truncate">
              {m.nombre}
            </span>
            {m.asunto && (
              <span className="text-[12px] text-muted truncate">
                · {m.asunto}
              </span>
            )}
          </div>
          <p className="text-[12px] text-muted mt-1">{fecha}</p>
        </div>
        <span className="text-muted text-sm shrink-0">
          {abierto ? "−" : "+"}
        </span>
      </button>

      {abierto && (
        <div className="px-4 md:px-5 pb-5 border-t hairline">
          <p className="text-[14px] text-ink leading-relaxed mt-4 whitespace-pre-wrap">
            {m.mensaje}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
            <a
              href={`mailto:${m.email}`}
              className="text-accent hover:underline"
            >
              ✉ {m.email}
            </a>
            {m.telefono && (
              <>
                <span className="text-muted">📞 {m.telefono}</span>
                {telWa && (
                  <a
                    href={`https://wa.me/${telWa}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1ebe57] hover:underline"
                  >
                    Responder por WhatsApp ↗
                  </a>
                )}
              </>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {m.estado !== "contactado" && (
              <button
                type="button"
                onClick={() => onEstado("contactado")}
                disabled={disabled}
                className="text-[10px] tracking-[1.5px] uppercase border border-ink text-ink px-3 py-1.5 hover:bg-ink hover:text-background transition-colors disabled:opacity-40"
              >
                Marcar contactado
              </button>
            )}
            {m.estado !== "nuevo" && (
              <button
                type="button"
                onClick={() => onEstado("nuevo")}
                disabled={disabled}
                className="text-[10px] tracking-[1.5px] uppercase border hairline px-3 py-1.5 hover:bg-paper transition-colors disabled:opacity-40"
              >
                Marcar nuevo
              </button>
            )}
            {m.estado !== "archivado" && (
              <button
                type="button"
                onClick={() => onEstado("archivado")}
                disabled={disabled}
                className="text-[10px] tracking-[1.5px] uppercase border hairline px-3 py-1.5 text-muted hover:bg-paper transition-colors disabled:opacity-40"
              >
                Archivar
              </button>
            )}
            <button
              type="button"
              onClick={onEliminar}
              disabled={disabled}
              className="text-[10px] tracking-[1.5px] uppercase text-red-700 hover:underline ml-auto disabled:opacity-40"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
