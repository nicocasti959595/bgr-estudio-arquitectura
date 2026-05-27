"use client";

import { useEffect, useState } from "react";

const NUMERO = "5491136910077";

export function BotonWhatsApp() {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const n = nombre.trim();
    const d = descripcion.trim();
    if (!n || !d) {
      setError("Por favor completá tu nombre y una breve descripción.");
      return;
    }
    setError(null);
    const partes = [
      `Hola, soy ${n}.`,
      tipo ? `Tipo de consulta: ${tipo}.` : "",
      "",
      d,
      "",
      "— Enviado desde bgr-estudio-arquitectura.vercel.app",
    ].filter(Boolean);
    const mensaje = partes.join("\n");
    const url = `https://wa.me/${NUMERO}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
    setNombre("");
    setTipo("");
    setDescripcion("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Contactar por WhatsApp"
        className="group fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40 flex items-center gap-4 rounded-full bg-[#25D366] pl-6 pr-8 py-5 text-white shadow-[0_12px_32px_rgba(37,211,102,0.4)] hover:shadow-[0_18px_44px_rgba(37,211,102,0.55)] hover:bg-[#1ebe57] hover:-translate-y-1 transition-all duration-300"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-9 w-9 md:h-10 md:w-10 shrink-0"
          aria-hidden="true"
        >
          <path d="M19.077 4.928C17.191 3.041 14.683 2 12.011 2c-5.508 0-9.99 4.482-9.99 9.99 0 1.762.46 3.482 1.336 4.999L2 22l5.146-1.359a9.953 9.953 0 0 0 4.865 1.239h.004c5.509 0 9.991-4.482 9.991-9.99 0-2.673-1.041-5.181-2.929-7.068zm-7.066 15.339a8.297 8.297 0 0 1-4.214-1.155l-.302-.18-3.131.826.836-3.057-.196-.314a8.273 8.273 0 0 1-1.27-4.397c0-4.583 3.729-8.312 8.314-8.312 2.219 0 4.307.866 5.876 2.437a8.265 8.265 0 0 1 2.435 5.879c-.001 4.584-3.73 8.313-8.348 8.313zm4.554-6.227c-.247-.124-1.474-.728-1.701-.81-.227-.083-.392-.124-.557.124-.166.247-.641.81-.785.972-.144.165-.288.186-.535.062-.247-.123-1.045-.385-1.991-1.23-.737-.658-1.232-1.469-1.376-1.716-.144-.247-.015-.38.107-.502.11-.11.247-.288.37-.432.124-.144.165-.247.247-.412.083-.165.041-.31-.02-.433-.062-.124-.557-1.345-.764-1.84-.2-.484-.405-.42-.557-.426-.144-.007-.31-.009-.475-.009-.165 0-.433.062-.661.31-.227.247-.866.847-.866 2.07 0 1.221.886 2.4 1.011 2.566.124.165 1.748 2.667 4.234 3.741.591.256 1.054.41 1.413.523.594.189 1.135.162 1.561.099.476-.071 1.474-.602 1.682-1.183.207-.581.207-1.079.144-1.182-.062-.103-.227-.165-.475-.289z" />
        </svg>
        <span className="text-base md:text-lg font-semibold tracking-wide hidden sm:inline">
          WhatsApp
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Iniciar conversación por WhatsApp"
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-ink/70 backdrop-blur-sm animate-[fadeUp_0.25s_ease]"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="relative w-full sm:max-w-lg bg-background border-t-4 border-[#25D366] sm:border-t-4 shadow-2xl sm:rounded-none sm:m-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
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
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
                  Consulta por WhatsApp
                </p>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl mt-3 text-ink leading-tight">
                Contanos qué necesitás
              </h2>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                Armamos el mensaje y lo enviamos directo al WhatsApp del
                estudio.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="wa-nombre"
                    className="block font-mono text-[10px] tracking-[0.22em] uppercase text-muted mb-2"
                  >
                    Nombre *
                  </label>
                  <input
                    id="wa-nombre"
                    type="text"
                    required
                    autoFocus
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full bg-transparent border-b hairline focus:border-[#25D366] focus:outline-none pb-2 text-base text-ink transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="wa-tipo"
                    className="block font-mono text-[10px] tracking-[0.22em] uppercase text-muted mb-2"
                  >
                    Tipo de consulta
                  </label>
                  <select
                    id="wa-tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className="w-full bg-transparent border-b hairline focus:border-[#25D366] focus:outline-none pb-2 text-base text-ink transition-colors cursor-pointer"
                  >
                    <option value="">Seleccioná una opción</option>
                    <option value="Obra nueva">Obra nueva</option>
                    <option value="Reciclaje / Remodelación">
                      Reciclaje / Remodelación
                    </option>
                    <option value="Interiorismo">Interiorismo</option>
                    <option value="Dirección de obra">Dirección de obra</option>
                    <option value="Asesoramiento técnico">
                      Asesoramiento técnico
                    </option>
                    <option value="Otra">Otra</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="wa-descripcion"
                    className="block font-mono text-[10px] tracking-[0.22em] uppercase text-muted mb-2"
                  >
                    Descripción *
                  </label>
                  <textarea
                    id="wa-descripcion"
                    required
                    rows={4}
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Contanos brevemente qué tipo de obra, dónde, plazos aproximados..."
                    className="w-full bg-transparent border-b hairline focus:border-[#25D366] focus:outline-none pb-2 text-base text-ink resize-none transition-colors"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-2">
                    {error}
                  </p>
                )}

                <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="text-sm text-muted hover:text-ink tracking-wider uppercase link-underline self-start"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-7 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-[#1ebe57] transition-colors"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M19.077 4.928C17.191 3.041 14.683 2 12.011 2c-5.508 0-9.99 4.482-9.99 9.99 0 1.762.46 3.482 1.336 4.999L2 22l5.146-1.359a9.953 9.953 0 0 0 4.865 1.239h.004c5.509 0 9.991-4.482 9.991-9.99 0-2.673-1.041-5.181-2.929-7.068zm-7.066 15.339a8.297 8.297 0 0 1-4.214-1.155l-.302-.18-3.131.826.836-3.057-.196-.314a8.273 8.273 0 0 1-1.27-4.397c0-4.583 3.729-8.312 8.314-8.312 2.219 0 4.307.866 5.876 2.437a8.265 8.265 0 0 1 2.435 5.879c-.001 4.584-3.73 8.313-8.348 8.313zm4.554-6.227c-.247-.124-1.474-.728-1.701-.81-.227-.083-.392-.124-.557.124-.166.247-.641.81-.785.972-.144.165-.288.186-.535.062-.247-.123-1.045-.385-1.991-1.23-.737-.658-1.232-1.469-1.376-1.716-.144-.247-.015-.38.107-.502.11-.11.247-.288.37-.432.124-.144.165-.247.247-.412.083-.165.041-.31-.02-.433-.062-.124-.557-1.345-.764-1.84-.2-.484-.405-.42-.557-.426-.144-.007-.31-.009-.475-.009-.165 0-.433.062-.661.31-.227.247-.866.847-.866 2.07 0 1.221.886 2.4 1.011 2.566.124.165 1.748 2.667 4.234 3.741.591.256 1.054.41 1.413.523.594.189 1.135.162 1.561.099.476-.071 1.474-.602 1.682-1.183.207-.581.207-1.079.144-1.182-.062-.103-.227-.165-.475-.289z" />
                    </svg>
                    Enviar mensaje
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
