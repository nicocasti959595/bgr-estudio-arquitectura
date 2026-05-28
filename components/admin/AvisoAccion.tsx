"use client";

import { useEffect } from "react";

type Tipo = "ok" | "error" | "info";

type Props = {
  tipo: Tipo;
  mensaje: string;
  onCerrar?: () => void;
  autoCierreMs?: number;
};

const estilos: Record<Tipo, string> = {
  ok: "border-accent bg-paper text-ink",
  error: "border-red-400 bg-red-50 text-red-800",
  info: "border-line bg-paper text-muted",
};

const iconos: Record<Tipo, React.ReactNode> = {
  ok: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5 text-accent shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  ),
};

export function AvisoAccion({
  tipo,
  mensaje,
  onCerrar,
  autoCierreMs = 4000,
}: Props) {
  useEffect(() => {
    if (!autoCierreMs || !onCerrar) return;
    const id = window.setTimeout(onCerrar, autoCierreMs);
    return () => window.clearTimeout(id);
  }, [autoCierreMs, onCerrar]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-24 right-6 z-[60] border-2 ${estilos[tipo]} px-5 py-3 shadow-xl max-w-md flex items-start gap-3 fade-up`}
    >
      {iconos[tipo]}
      <p className="text-sm leading-relaxed flex-1 font-medium">{mensaje}</p>
      {onCerrar && (
        <button
          onClick={onCerrar}
          aria-label="Cerrar aviso"
          className="text-muted hover:text-ink transition-colors ml-1 leading-none text-lg"
        >
          ×
        </button>
      )}
    </div>
  );
}
