"use client";

import { useEffect, useState } from "react";
import { useWhatsappNumero } from "./WhatsappProvider";
import { guardarLeadAction } from "@/lib/actions-lead";

function sanitizar(s: string): string {
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    if ((code >= 32 && code < 127) || s[i] === "\n") out += s[i];
  }
  return out;
}

type Props = {
  abierto: boolean;
  onCerrar: () => void;
};

export function ModalAsesoramiento({ abierto, onCerrar }: Props) {
  const NUMERO_WA = useWhatsappNumero();
  const [nombre, setNombre] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [tipo, setTipo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [hp, setHp] = useState(""); // honeypot anti-bot
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCerrar();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [abierto, onCerrar]);

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const n = sanitizar(nombre);
    const w = sanitizar(whatsapp);
    if (!n || !w) {
      setError("Necesitamos al menos tu nombre y WhatsApp.");
      return;
    }
    setError(null);

    // Guardar el lead en el CRM ANTES de abrir WhatsApp (best-effort, no bloquea).
    guardarLeadAction({
      nombre: n,
      telefono: w,
      asunto: tipo ? `Asesoramiento — ${tipo}` : "Asesoramiento sin compromiso",
      mensaje: mensaje ? sanitizar(mensaje) : null,
      tipo_form: "asesoramiento",
      hp,
    }).catch(() => {});

    const partes = [
      `Hola BGR, soy ${n}.`,
      "Quiero un asesoramiento sin compromiso.",
      "",
      tipo ? `Tipo de obra: ${sanitizar(tipo)}.` : "",
      mensaje ? sanitizar(mensaje) : "",
      "",
      `Mi WhatsApp: ${w}`,
      "",
      "— Enviado desde bgr.com.ar",
    ].filter(Boolean);
    const url = `https://wa.me/${NUMERO_WA}?text=${encodeURIComponent(
      partes.join("\n")
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setNombre("");
    setWhatsapp("");
    setTipo("");
    setMensaje("");
    setHp("");
    onCerrar();
  }

  if (!abierto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Asesoramiento sin compromiso"
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-ink/70 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCerrar();
      }}
    >
      <div className="relative w-full sm:max-w-lg bg-background border-t-4 sm:border-4 border-accent shadow-2xl sm:m-6">
        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar"
          className="absolute top-4 right-4 p-2 text-muted hover:text-ink transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="px-7 sm:px-10 pt-10 pb-8">
          <p className="text-[10px] tracking-[0.25em] uppercase text-accent font-medium">
            — Asesoramiento sin cargo
          </p>
          <h2 className="font-serif text-2xl md:text-3xl mt-2 text-ink leading-tight">
            Te respondemos en menos de{" "}
            <span className="italic text-accent">24 horas</span>.
          </h2>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            Contanos brevemente qué necesitás. Te abrimos WhatsApp con el
            mensaje listo para enviar.
          </p>

          <form onSubmit={enviar} className="mt-6 space-y-5">
            {/* Honeypot anti-bot: invisible para humanos */}
            <input
              type="text"
              name="empresa_web"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
            />
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="ma-nombre"
                  className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-2 font-medium"
                >
                  Nombre *
                </label>
                <input
                  id="ma-nombre"
                  type="text"
                  value={nombre}
                  autoFocus
                  onChange={(e) => setNombre(sanitizar(e.target.value))}
                  placeholder="Tu nombre"
                  className="w-full bg-transparent border-b hairline focus:border-accent focus:outline-none pb-2 text-base text-ink transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="ma-wa"
                  className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-2 font-medium"
                >
                  WhatsApp *
                </label>
                <input
                  id="ma-wa"
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(sanitizar(e.target.value))}
                  placeholder="11 XXXX-XXXX"
                  className="w-full bg-transparent border-b hairline focus:border-accent focus:outline-none pb-2 text-base text-ink transition-colors"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="ma-tipo"
                className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-2 font-medium"
              >
                Tipo de obra
              </label>
              <select
                id="ma-tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full bg-transparent border-b hairline focus:border-accent focus:outline-none pb-2 text-base text-ink transition-colors cursor-pointer"
              >
                <option value="">Seleccioná</option>
                <option>Reforma integral</option>
                <option>Cocina</option>
                <option>Baño</option>
                <option>Obra nueva</option>
                <option>Interiorismo</option>
                <option>Otro</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="ma-msg"
                className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-2 font-medium"
              >
                Comentario (opcional)
              </label>
              <textarea
                id="ma-msg"
                rows={3}
                value={mensaje}
                onChange={(e) => setMensaje(sanitizar(e.target.value))}
                placeholder="Contanos brevemente qué tenés en mente..."
                className="w-full bg-transparent border-b hairline focus:border-accent focus:outline-none pb-2 text-base text-ink resize-none transition-colors"
              />
            </div>

            {error && (
              <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-2">
                {error}
              </p>
            )}

            <div className="pt-3 flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={onCerrar}
                className="text-sm text-muted hover:text-ink tracking-wider uppercase"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-7 py-3.5 text-sm font-semibold tracking-wider uppercase hover:bg-[#1ebe57] transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M19.077 4.928C17.191 3.041 14.683 2 12.011 2c-5.508 0-9.99 4.482-9.99 9.99 0 1.762.46 3.482 1.336 4.999L2 22l5.146-1.359a9.953 9.953 0 0 0 4.865 1.239h.004c5.509 0 9.991-4.482 9.991-9.99 0-2.673-1.041-5.181-2.929-7.068z" />
                </svg>
                Enviar por WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
