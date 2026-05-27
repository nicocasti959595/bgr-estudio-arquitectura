"use client";

import { useState, useTransition } from "react";
import { enviarMensajeAction } from "@/app/contacto/actions";

const NUMERO_WA = "5491122506347";

type Estado = "idle" | "enviando" | "ok" | "error";

function sanitizar(s: string): string {
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    if (code >= 32 && code < 127 || s[i] === "\n") out += s[i];
  }
  return out;
}

export function FormularioContacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [estado, setEstado] = useState<Estado>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [, startTransition] = useTransition();

  function armarMensajeWA() {
    const partes = [
      `Hola BGR, soy ${nombre.trim()}.`,
      asunto.trim() ? `Asunto: ${asunto.trim()}.` : "",
      "",
      mensaje.trim(),
      "",
      `Email: ${email.trim()}`,
      telefono.trim() ? `Teléfono: ${telefono.trim()}` : "",
      "",
      "— Enviado desde bgr-estudio-arquitectura.vercel.app",
    ].filter(Boolean);
    return partes.join("\n");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !mensaje.trim()) {
      setEstado("error");
      setErrorMsg("Completá nombre, email y mensaje.");
      return;
    }
    setEstado("enviando");
    setErrorMsg("");

    // Guardar en Supabase + abrir WhatsApp con mensaje pre-cargado
    const data = new FormData();
    data.append("nombre", nombre.trim());
    data.append("email", email.trim());
    data.append("telefono", telefono.trim());
    data.append("asunto", asunto.trim());
    data.append("mensaje", mensaje.trim());

    startTransition(async () => {
      try {
        await enviarMensajeAction(data);
      } catch {
        // Si Supabase falla, igual abrimos WhatsApp.
      }
      const url = `https://wa.me/${NUMERO_WA}?text=${encodeURIComponent(
        armarMensajeWA()
      )}`;
      window.open(url, "_blank", "noopener,noreferrer");
      setEstado("ok");
      setNombre("");
      setEmail("");
      setTelefono("");
      setAsunto("");
      setMensaje("");
    });
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <Campo
          id="nombre"
          rotulo="Nombre"
          value={nombre}
          setValue={setNombre}
          requerido
        />
        <Campo
          id="email"
          rotulo="Email"
          tipo="email"
          value={email}
          setValue={setEmail}
          requerido
        />
        <Campo
          id="telefono"
          rotulo="Teléfono / WhatsApp"
          tipo="tel"
          value={telefono}
          setValue={setTelefono}
        />
        <Campo
          id="asunto"
          rotulo="Asunto"
          value={asunto}
          setValue={setAsunto}
        />
      </div>
      <div>
        <label htmlFor="mensaje" className="eyebrow block mb-3">
          Mensaje *
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={6}
          value={mensaje}
          onChange={(e) => setMensaje(sanitizar(e.target.value))}
          className="w-full bg-transparent border-b hairline focus:border-accent focus:outline-none pb-3 text-lg text-ink resize-none transition-colors"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4">
        <p className="text-xs text-muted tracking-wider">
          * CAMPOS OBLIGATORIOS · TE LLEVAMOS A WHATSAPP CON EL MENSAJE LISTO
        </p>
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-[#25D366] text-white text-sm tracking-wider uppercase hover:bg-[#1ebe57] transition-colors disabled:opacity-50"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M19.077 4.928C17.191 3.041 14.683 2 12.011 2c-5.508 0-9.99 4.482-9.99 9.99 0 1.762.46 3.482 1.336 4.999L2 22l5.146-1.359a9.953 9.953 0 0 0 4.865 1.239h.004c5.509 0 9.991-4.482 9.991-9.99 0-2.673-1.041-5.181-2.929-7.068zm-7.066 15.339a8.297 8.297 0 0 1-4.214-1.155l-.302-.18-3.131.826.836-3.057-.196-.314a8.273 8.273 0 0 1-1.27-4.397c0-4.583 3.729-8.312 8.314-8.312 2.219 0 4.307.866 5.876 2.437a8.265 8.265 0 0 1 2.435 5.879c-.001 4.584-3.73 8.313-8.348 8.313zm4.554-6.227c-.247-.124-1.474-.728-1.701-.81-.227-.083-.392-.124-.557.124-.166.247-.641.81-.785.972-.144.165-.288.186-.535.062-.247-.123-1.045-.385-1.991-1.23-.737-.658-1.232-1.469-1.376-1.716-.144-.247-.015-.38.107-.502.11-.11.247-.288.37-.432.124-.144.165-.247.247-.412.083-.165.041-.31-.02-.433-.062-.124-.557-1.345-.764-1.84-.2-.484-.405-.42-.557-.426-.144-.007-.31-.009-.475-.009-.165 0-.433.062-.661.31-.227.247-.866.847-.866 2.07 0 1.221.886 2.4 1.011 2.566.124.165 1.748 2.667 4.234 3.741.591.256 1.054.41 1.413.523.594.189 1.135.162 1.561.099.476-.071 1.474-.602 1.682-1.183.207-.581.207-1.079.144-1.182-.062-.103-.227-.165-.475-.289z" />
          </svg>
          {estado === "enviando" ? "Abriendo WhatsApp…" : "Enviar por WhatsApp"}
        </button>
      </div>

      {estado === "ok" && (
        <div className="border border-accent bg-accent/5 px-6 py-4 mt-6">
          <p className="font-serif text-lg text-ink">
            Se abrió WhatsApp con el mensaje. Solo tenés que tocar "Enviar".
          </p>
        </div>
      )}
      {estado === "error" && (
        <div className="border border-red-400 bg-red-50 px-6 py-4 mt-6">
          <p className="text-sm text-red-700">{errorMsg}</p>
        </div>
      )}
    </form>
  );
}

function Campo({
  id,
  rotulo,
  tipo = "text",
  value,
  setValue,
  requerido = false,
}: {
  id: string;
  rotulo: string;
  tipo?: string;
  value: string;
  setValue: (v: string) => void;
  requerido?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block mb-3">
        {rotulo} {requerido && "*"}
      </label>
      <input
        type={tipo}
        id={id}
        name={id}
        required={requerido}
        value={value}
        onChange={(e) => setValue(sanitizar(e.target.value))}
        className="w-full bg-transparent border-b hairline focus:border-accent focus:outline-none pb-3 text-lg text-ink transition-colors"
      />
    </div>
  );
}
