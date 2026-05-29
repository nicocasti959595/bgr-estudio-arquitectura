"use client";

import { useEffect, useState } from "react";
import { useWhatsappNumero } from "./WhatsappProvider";

type Props = {
  servicio: string;
  abierto: boolean;
  onCerrar: () => void;
};

export function ModalConsultaServicio({ servicio, abierto, onCerrar }: Props) {
  const NUMERO_WA = useWhatsappNumero();
  const [nombre, setNombre] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [zona, setZona] = useState("");
  const [mensaje, setMensaje] = useState("");
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

  function sanitizar(s: string) {
    let out = "";
    for (let i = 0; i < s.length; i++) {
      const code = s.charCodeAt(i);
      if (code >= 32 && code < 127) out += s[i];
    }
    return out.trim();
  }

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const n = sanitizar(nombre);
    const w = sanitizar(whatsapp);
    if (!n || !w) {
      setError("Completá nombre y WhatsApp.");
      return;
    }
    setError(null);

    const partes = [
      `Hola BGR, soy ${n}.`,
      `Consulta por el servicio: ${servicio}.`,
      zona ? `Zona: ${zona}.` : "",
      "",
      mensaje || "Me gustaría coordinar una visita / asesoramiento.",
      "",
      `Mi WhatsApp: ${w}`,
      "",
      "— Enviado desde bgr-estudio-arquitectura.vercel.app",
    ].filter(Boolean);
    const url = `https://wa.me/${NUMERO_WA}?text=${encodeURIComponent(
      partes.join("\n")
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setNombre("");
    setWhatsapp("");
    setZona("");
    setMensaje("");
    onCerrar();
  }

  if (!abierto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Consulta por ${servicio}`}
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
          <div className="flex items-center gap-3">
            <svg
              viewBox="0 0 24 24"
              fill="#25D366"
              className="h-7 w-7"
              aria-hidden="true"
            >
              <path d="M19.077 4.928C17.191 3.041 14.683 2 12.011 2c-5.508 0-9.99 4.482-9.99 9.99 0 1.762.46 3.482 1.336 4.999L2 22l5.146-1.359a9.953 9.953 0 0 0 4.865 1.239h.004c5.509 0 9.991-4.482 9.991-9.99 0-2.673-1.041-5.181-2.929-7.068zm-7.066 15.339a8.297 8.297 0 0 1-4.214-1.155l-.302-.18-3.131.826.836-3.057-.196-.314a8.273 8.273 0 0 1-1.27-4.397c0-4.583 3.729-8.312 8.314-8.312 2.219 0 4.307.866 5.876 2.437a8.265 8.265 0 0 1 2.435 5.879c-.001 4.584-3.73 8.313-8.348 8.313zm4.554-6.227c-.247-.124-1.474-.728-1.701-.81-.227-.083-.392-.124-.557.124-.166.247-.641.81-.785.972-.144.165-.288.186-.535.062-.247-.123-1.045-.385-1.991-1.23-.737-.658-1.232-1.469-1.376-1.716-.144-.247-.015-.38.107-.502.11-.11.247-.288.37-.432.124-.144.165-.247.247-.412.083-.165.041-.31-.02-.433-.062-.124-.557-1.345-.764-1.84-.2-.484-.405-.42-.557-.426-.144-.007-.31-.009-.475-.009-.165 0-.433.062-.661.31-.227.247-.866.847-.866 2.07 0 1.221.886 2.4 1.011 2.566.124.165 1.748 2.667 4.234 3.741.591.256 1.054.41 1.413.523.594.189 1.135.162 1.561.099.476-.071 1.474-.602 1.682-1.183.207-.581.207-1.079.144-1.182-.062-.103-.227-.165-.475-.289z" />
            </svg>
            <p className="text-[10px] tracking-[0.25em] uppercase text-muted font-medium">
              Consulta por
            </p>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl mt-2 text-ink leading-tight">
            {servicio}
          </h2>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            Te abrimos WhatsApp con el mensaje listo para enviar.
          </p>

          <form onSubmit={enviar} className="mt-6 space-y-5">
            <Campo
              id="mc-nombre"
              label="Nombre *"
              value={nombre}
              setValue={setNombre}
              placeholder="Tu nombre"
              autoFocus
            />
            <Campo
              id="mc-wa"
              label="WhatsApp *"
              value={whatsapp}
              setValue={setWhatsapp}
              placeholder="11 XXXX-XXXX"
              tipo="tel"
            />
            <Campo
              id="mc-zona"
              label="Barrio / Zona"
              value={zona}
              setValue={setZona}
              placeholder="Ej: Belgrano"
            />
            <div>
              <label
                htmlFor="mc-msg"
                className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-2"
              >
                Comentario (opcional)
              </label>
              <textarea
                id="mc-msg"
                rows={3}
                value={mensaje}
                onChange={(e) => setMensaje(sanitizar(e.target.value))}
                placeholder="Contanos brevemente qué necesitás..."
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
                  <path d="M19.077 4.928C17.191 3.041 14.683 2 12.011 2c-5.508 0-9.99 4.482-9.99 9.99 0 1.762.46 3.482 1.336 4.999L2 22l5.146-1.359a9.953 9.953 0 0 0 4.865 1.239h.004c5.509 0 9.991-4.482 9.991-9.99 0-2.673-1.041-5.181-2.929-7.068zm-7.066 15.339a8.297 8.297 0 0 1-4.214-1.155l-.302-.18-3.131.826.836-3.057-.196-.314a8.273 8.273 0 0 1-1.27-4.397c0-4.583 3.729-8.312 8.314-8.312 2.219 0 4.307.866 5.876 2.437a8.265 8.265 0 0 1 2.435 5.879c-.001 4.584-3.73 8.313-8.348 8.313zm4.554-6.227c-.247-.124-1.474-.728-1.701-.81-.227-.083-.392-.124-.557.124-.166.247-.641.81-.785.972-.144.165-.288.186-.535.062-.247-.123-1.045-.385-1.991-1.23-.737-.658-1.232-1.469-1.376-1.716-.144-.247-.015-.38.107-.502.11-.11.247-.288.37-.432.124-.144.165-.247.247-.412.083-.165.041-.31-.02-.433-.062-.124-.557-1.345-.764-1.84-.2-.484-.405-.42-.557-.426-.144-.007-.31-.009-.475-.009-.165 0-.433.062-.661.31-.227.247-.866.847-.866 2.07 0 1.221.886 2.4 1.011 2.566.124.165 1.748 2.667 4.234 3.741.591.256 1.054.41 1.413.523.594.189 1.135.162 1.561.099.476-.071 1.474-.602 1.682-1.183.207-.581.207-1.079.144-1.182-.062-.103-.227-.165-.475-.289z" />
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

function Campo({
  id,
  label,
  value,
  setValue,
  placeholder,
  tipo = "text",
  autoFocus,
}: {
  id: string;
  label: string;
  value: string;
  setValue: (v: string) => void;
  placeholder?: string;
  tipo?: string;
  autoFocus?: boolean;
}) {
  function sanitizar(s: string) {
    let out = "";
    for (let i = 0; i < s.length; i++) {
      const code = s.charCodeAt(i);
      if (code >= 32 && code < 127) out += s[i];
    }
    return out;
  }
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        type={tipo}
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => setValue(sanitizar(e.target.value))}
        placeholder={placeholder}
        className="w-full bg-transparent border-b hairline focus:border-accent focus:outline-none pb-2 text-base text-ink transition-colors"
      />
    </div>
  );
}
