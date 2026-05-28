"use client";

import { useState, useTransition } from "react";
import { actualizarConfigAction } from "@/lib/actions-admin";
import { AvisoAccion } from "./AvisoAccion";

type Props = {
  clave: string;
  label: string;
  ayuda?: string;
  placeholder?: string;
  valorInicial: string;
  filas?: number;
  rutaRevalidar?: string;
};

export function FormularioTextoConfig({
  clave,
  label,
  ayuda,
  placeholder,
  valorInicial,
  filas = 6,
}: Props) {
  const [valor, setValor] = useState(valorInicial);
  const [aviso, setAviso] = useState<
    { tipo: "ok" | "error"; mensaje: string } | null
  >(null);
  const [isPending, startTransition] = useTransition();

  const cambios = valor !== valorInicial;

  function handleSave() {
    setAviso(null);
    startTransition(async () => {
      const res = await actualizarConfigAction(clave, valor);
      if (res.ok) {
        setAviso({
          tipo: "ok",
          mensaje: `"${label}" guardado correctamente.`,
        });
      } else {
        setAviso({
          tipo: "error",
          mensaje: res.error ?? "No se pudo guardar.",
        });
      }
    });
  }

  return (
    <div className="border hairline bg-paper p-7 md:p-9 space-y-5">
      <div>
        <label
          htmlFor={`txt-${clave}`}
          className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-2 font-medium"
        >
          {label}
        </label>
        <textarea
          id={`txt-${clave}`}
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          rows={filas}
          placeholder={placeholder}
          className="w-full bg-transparent border hairline focus:border-accent focus:outline-none p-3 text-base text-ink leading-relaxed transition-colors resize-y"
        />
        {ayuda && (
          <p className="text-xs text-muted mt-2 leading-relaxed">{ayuda}</p>
        )}
      </div>

      <div className="flex items-center justify-end pt-2 border-t hairline">
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending || !cambios}
          className="bg-accent text-background px-7 py-3 text-[10px] tracking-[2px] uppercase hover:bg-ink hover:text-background transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {isPending ? "Guardando…" : "Guardar"}
        </button>
      </div>

      {aviso && (
        <AvisoAccion
          tipo={aviso.tipo}
          mensaje={aviso.mensaje}
          onCerrar={() => setAviso(null)}
        />
      )}
    </div>
  );
}
