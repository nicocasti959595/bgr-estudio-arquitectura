"use client";

import { useState, useTransition } from "react";
import { actualizarStatAction } from "@/lib/actions-admin";
import type { Stat } from "@/lib/stats";

export function FormularioStat({ stat }: { stat: Stat }) {
  const [numero, setNumero] = useState(stat.numero);
  const [actualizacion, setActualizacion] = useState(
    stat.actualizacion ?? ""
  );
  const [estado, setEstado] = useState<"idle" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSave() {
    setEstado("idle");
    setError("");
    startTransition(async () => {
      const res = await actualizarStatAction(
        stat.clave,
        numero,
        actualizacion || null
      );
      if (res.ok) setEstado("ok");
      else {
        setEstado("error");
        setError(res.error ?? "Error al guardar");
      }
    });
  }

  const cambios = numero !== stat.numero || actualizacion !== (stat.actualizacion ?? "");

  return (
    <div className="border hairline bg-paper p-6 md:p-8 grid md:grid-cols-[1fr_auto] gap-6 items-end">
      <div className="grid sm:grid-cols-[140px_1fr_180px] gap-5">
        <div>
          <label className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-2 font-medium">
            Número
          </label>
          <input
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="100+"
            className="w-full bg-transparent border-b hairline focus:border-accent focus:outline-none pb-2 text-3xl font-serif text-ink transition-colors"
          />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-2 font-medium">
            Rótulo (no editable)
          </label>
          <p className="font-serif text-lg text-ink py-2">{stat.rotulo}</p>
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-2 font-medium">
            Últ. actualización (opcional)
          </label>
          <input
            type="text"
            value={actualizacion}
            onChange={(e) => setActualizacion(e.target.value)}
            placeholder="DD/MM/AAAA"
            className="w-full bg-transparent border-b hairline focus:border-accent focus:outline-none pb-2 text-base text-ink transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col items-start md:items-end gap-2 min-w-[160px]">
        <button
          type="button"
          onClick={handleSave}
          disabled={!cambios || isPending}
          className="bg-accent text-background px-6 py-3 text-[10px] tracking-[2px] uppercase hover:bg-ink hover:text-background transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {isPending ? "Guardando…" : "Guardar"}
        </button>
        {estado === "ok" && (
          <p className="text-xs text-accent">✓ Guardado</p>
        )}
        {estado === "error" && (
          <p className="text-xs text-red-700">{error}</p>
        )}
      </div>
    </div>
  );
}
