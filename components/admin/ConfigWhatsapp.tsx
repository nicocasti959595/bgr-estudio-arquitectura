"use client";

import { useState, useTransition } from "react";
import { actualizarWhatsappAction } from "@/lib/actions-admin";
import { AvisoAccion } from "./AvisoAccion";

function formatear(n: string): string {
  const d = n.replace(/\D/g, "");
  if (d.startsWith("549") && d.length >= 13) {
    return `+54 9 ${d.slice(3, 5)} ${d.slice(5, 9)}-${d.slice(9)}`;
  }
  return d ? `+${d}` : "";
}

export function ConfigWhatsapp({ numeroInicial }: { numeroInicial: string }) {
  const [numero, setNumero] = useState(numeroInicial);
  const [aviso, setAviso] = useState<
    { tipo: "ok" | "error"; mensaje: string } | null
  >(null);
  const [isPending, startTransition] = useTransition();

  const limpio = numero.replace(/\D/g, "");
  const cambios = limpio !== numeroInicial;

  function guardar() {
    startTransition(async () => {
      const res = await actualizarWhatsappAction(numero);
      if (!res.ok) setAviso({ tipo: "error", mensaje: res.error });
      else
        setAviso({
          tipo: "ok",
          mensaje:
            "Número actualizado. Todos los botones de WhatsApp del sitio ya apuntan al nuevo número.",
        });
    });
  }

  return (
    <section className="mt-10 border hairline bg-paper p-6 md:p-8">
      <p className="eyebrow mb-3">Número de WhatsApp del sitio</p>
      <h2 className="font-serif text-2xl text-ink">
        ¿A qué número llegan las consultas?
      </h2>
      <p className="text-[13px] text-muted mt-2 font-light max-w-2xl leading-relaxed">
        Es el número al que apuntan <strong className="text-ink">todos</strong>{" "}
        los botones de WhatsApp (el flotante, los formularios y el footer).
        Escribilo con código de país y área, solo números:{" "}
        <strong className="text-ink">54 9 11 36910077</strong> →{" "}
        <code className="text-ink">5491136910077</code>.
      </p>

      <div className="mt-5 flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="flex-1 max-w-sm">
          <label className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-2 font-medium">
            Número (formato wa.me)
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="5491136910077"
            className="bgr-input w-full font-mono"
          />
          {limpio && (
            <p className="text-[12px] text-muted mt-2">
              Se verá como:{" "}
              <strong className="text-ink">{formatear(limpio)}</strong>
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={guardar}
          disabled={!cambios || isPending}
          className="bg-accent text-background px-6 py-3 text-[10px] tracking-[2px] uppercase hover:bg-ink transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {isPending ? "Guardando…" : "Guardar número"}
        </button>
      </div>

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
