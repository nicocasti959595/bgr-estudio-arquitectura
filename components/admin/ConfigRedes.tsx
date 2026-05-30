"use client";

import { useState, useTransition } from "react";
import { guardarConfigRedesAction } from "@/lib/actions-saas";
import type { ConfigRedes as TConfig, CuentaSocial, Horario } from "@/lib/saas-client";
import { AvisoAccion } from "./AvisoAccion";

const HH = Array.from({ length: 24 }, (_, i) => i);
const MM = [0, 15, 30, 45];

export function ConfigRedes({
  inicial,
  cuentas,
}: {
  inicial: TConfig;
  cuentas: CuentaSocial[];
}) {
  const [horarios, setHorarios] = useState<Horario[]>(
    inicial.horarios?.length ? inicial.horarios : [{ hora: 10, minuto: 0 }]
  );
  const [cuenta, setCuenta] = useState(inicial.default_social_account_id ?? "");
  const [autoReply, setAutoReply] = useState(inicial.auto_reply_activa);
  const [tz] = useState(inicial.timezone || "America/Argentina/Buenos_Aires");
  const [aviso, setAviso] = useState<
    { tipo: "ok" | "error"; mensaje: string } | null
  >(null);
  const [isPending, startTransition] = useTransition();

  function setHora(i: number, campo: "hora" | "minuto", val: number) {
    setHorarios((prev) =>
      prev.map((h, idx) => (idx === i ? { ...h, [campo]: val } : h))
    );
  }
  function agregarHorario() {
    if (horarios.length >= 6) return;
    setHorarios((prev) => [...prev, { hora: 12, minuto: 0 }]);
  }
  function quitarHorario(i: number) {
    setHorarios((prev) => prev.filter((_, idx) => idx !== i));
  }

  function guardar() {
    startTransition(async () => {
      const res = await guardarConfigRedesAction({
        horarios,
        default_social_account_id: cuenta || null,
        auto_reply_activa: autoReply,
        timezone: tz,
      });
      if (!res.ok) setAviso({ tipo: "error", mensaje: res.error });
      else setAviso({ tipo: "ok", mensaje: "Configuración guardada." });
    });
  }

  return (
    <div className="mt-10 space-y-8">
      {/* Horarios */}
      <section className="border hairline bg-paper p-6 md:p-8">
        <h2 className="font-serif text-2xl text-ink">Horarios de publicación</h2>
        <p className="text-[13px] text-muted mt-2 font-light">
          Los contenidos se publican cada día en estos horarios. Recomendado: 3
          por día (ej: 10:00, 14:00, 19:00).
        </p>
        <div className="mt-5 space-y-3">
          {horarios.map((h, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-[11px] tracking-[1.5px] uppercase text-muted w-16">
                Slot {i + 1}
              </span>
              <select
                value={h.hora}
                onChange={(e) => setHora(i, "hora", Number(e.target.value))}
                className="bgr-input w-24"
              >
                {HH.map((x) => (
                  <option key={x} value={x}>
                    {String(x).padStart(2, "0")}
                  </option>
                ))}
              </select>
              <span className="text-ink">:</span>
              <select
                value={h.minuto}
                onChange={(e) => setHora(i, "minuto", Number(e.target.value))}
                className="bgr-input w-24"
              >
                {MM.map((x) => (
                  <option key={x} value={x}>
                    {String(x).padStart(2, "0")}
                  </option>
                ))}
              </select>
              {horarios.length > 1 && (
                <button
                  type="button"
                  onClick={() => quitarHorario(i)}
                  className="text-[10px] tracking-[1.5px] uppercase text-red-700 hover:underline ml-2"
                >
                  Quitar
                </button>
              )}
            </div>
          ))}
        </div>
        {horarios.length < 6 && (
          <button
            type="button"
            onClick={agregarHorario}
            className="mt-4 text-[10px] tracking-[1.5px] uppercase border hairline px-4 py-2 hover:bg-background transition-colors"
          >
            + Agregar horario
          </button>
        )}
      </section>

      {/* Cuenta default */}
      <section className="border hairline bg-paper p-6 md:p-8">
        <h2 className="font-serif text-2xl text-ink">Cuenta por defecto</h2>
        <p className="text-[13px] text-muted mt-2 font-light">
          Dónde se publica si no elegís otra cuenta al programar.
        </p>
        <select
          value={cuenta}
          onChange={(e) => setCuenta(e.target.value)}
          className="bgr-input w-full max-w-md mt-4"
        >
          <option value="">— Sin cuenta por defecto —</option>
          {cuentas.map((c) => (
            <option key={c.id} value={c.id}>
              {c.account_name} ({c.platform})
            </option>
          ))}
        </select>
        {cuentas.length === 0 && (
          <p className="text-[12px] text-muted mt-2">
            No hay cuentas conectadas todavía (se conectan desde redesauto).
          </p>
        )}
      </section>

      {/* Auto-reply */}
      <section className="border hairline bg-paper p-6 md:p-8">
        <div className="flex items-start gap-4">
          <button
            type="button"
            onClick={() => setAutoReply(!autoReply)}
            aria-pressed={autoReply}
            className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors ${
              autoReply ? "bg-accent" : "bg-line"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-background transition-transform ${
                autoReply ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <div>
            <h2 className="font-serif text-xl text-ink">
              Respuesta automática a mensajes
            </h2>
            <p className="text-[13px] text-muted mt-1 font-light">
              {autoReply
                ? "Activada: a quien escriba por DM se le responde con la plantilla configurada en redesauto."
                : "Desactivada: los mensajes no reciben respuesta automática."}
            </p>
          </div>
        </div>
      </section>

      <button
        type="button"
        onClick={guardar}
        disabled={isPending}
        className="bg-accent text-background px-7 py-3.5 text-[10px] tracking-[2px] uppercase hover:bg-ink transition-colors disabled:opacity-40"
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
    </div>
  );
}
