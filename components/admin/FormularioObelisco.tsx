"use client";

import { useState, useTransition } from "react";
import { actualizarObeliscoConfigAction } from "@/lib/actions-admin";
import { AvisoAccion } from "./AvisoAccion";

type Config = {
  activo: boolean;
  horaNocheInicio: number;
  horaNocheFin: number;
};

const HORAS = Array.from({ length: 24 }, (_, i) => i);

function formatearHora(h: number): string {
  return `${String(h).padStart(2, "0")}:00`;
}

export function FormularioObelisco({ inicial }: { inicial: Config }) {
  const [activo, setActivo] = useState(inicial.activo);
  const [horaNocheInicio, setHoraNocheInicio] = useState(
    inicial.horaNocheInicio
  );
  const [horaNocheFin, setHoraNocheFin] = useState(inicial.horaNocheFin);
  const [aviso, setAviso] = useState<
    { tipo: "ok" | "error" | "info"; mensaje: string } | null
  >(null);
  const [isPending, startTransition] = useTransition();

  const hayCambios =
    activo !== inicial.activo ||
    horaNocheInicio !== inicial.horaNocheInicio ||
    horaNocheFin !== inicial.horaNocheFin;

  function handleGuardar() {
    startTransition(async () => {
      const res = await actualizarObeliscoConfigAction({
        activo,
        horaNocheInicio,
        horaNocheFin,
      });
      if (!res.ok) {
        setAviso({ tipo: "error", mensaje: res.error });
      } else {
        setAviso({
          tipo: "ok",
          mensaje: activo
            ? `Listo. La imagen va a cambiar a noche de ${formatearHora(horaNocheInicio)} a ${formatearHora(horaNocheFin)}.`
            : "Listo. Se va a ver siempre la imagen de día.",
        });
      }
    });
  }

  return (
    <section className="mt-10 border hairline bg-paper p-6 md:p-8">
      <p className="eyebrow mb-3">Sección "Buenos Aires" — Obelisco</p>
      <h2 className="font-serif text-2xl text-ink">
        Horario de día / noche
      </h2>
      <p className="text-[13px] text-muted mt-2 font-light max-w-2xl leading-relaxed">
        La imagen del Obelisco que aparece más abajo en la home cambia entre
        día y noche según la hora del visitante. Acá podés ajustar el rango
        nocturno o desactivar el cambio (siempre día).
      </p>

      {/* Switch activo */}
      <div className="mt-6 flex items-start gap-4 p-4 border hairline bg-background">
        <button
          type="button"
          onClick={() => setActivo(!activo)}
          disabled={isPending}
          aria-pressed={activo}
          className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors ${
            activo ? "bg-accent" : "bg-line"
          } disabled:opacity-50`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-background transition-transform ${
              activo ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        <div className="flex-1">
          <p className="text-[14px] text-ink font-medium">
            {activo
              ? "Cambio día / noche activo"
              : "Cambio desactivado (siempre día)"}
          </p>
          <p className="text-[12px] text-muted mt-1 font-light">
            {activo
              ? "El visitante ve la imagen apropiada según su hora local."
              : "Independiente de la hora, se ve siempre la imagen de día."}
          </p>
        </div>
      </div>

      {/* Selectores de hora */}
      <div
        className={`mt-6 grid sm:grid-cols-2 gap-5 transition-opacity ${
          activo ? "opacity-100" : "opacity-40 pointer-events-none"
        }`}
      >
        <div>
          <label className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-2 font-medium">
            Empieza la noche a las
          </label>
          <select
            value={horaNocheInicio}
            onChange={(e) => setHoraNocheInicio(Number(e.target.value))}
            disabled={!activo || isPending}
            className="bgr-input w-full"
          >
            {HORAS.map((h) => (
              <option key={h} value={h}>
                {formatearHora(h)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-2 font-medium">
            Empieza el día a las
          </label>
          <select
            value={horaNocheFin}
            onChange={(e) => setHoraNocheFin(Number(e.target.value))}
            disabled={!activo || isPending}
            className="bgr-input w-full"
          >
            {HORAS.map((h) => (
              <option key={h} value={h}>
                {formatearHora(h)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-4 text-[12px] text-muted font-light">
        Actual: imagen de noche desde{" "}
        <strong className="text-ink">{formatearHora(horaNocheInicio)}</strong> hasta{" "}
        <strong className="text-ink">{formatearHora(horaNocheFin)}</strong>.
      </p>

      <button
        type="button"
        onClick={handleGuardar}
        disabled={!hayCambios || isPending}
        className="mt-6 bg-accent text-background px-6 py-3 text-[10px] tracking-[2px] uppercase hover:bg-ink transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {isPending ? "Guardando…" : "Guardar configuración"}
      </button>

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
