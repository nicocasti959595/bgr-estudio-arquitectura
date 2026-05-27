"use client";

import { useState, useTransition } from "react";
import { enviarMensajeAction } from "@/app/contacto/actions";

type Estado = "idle" | "enviando" | "ok" | "error";

export function FormularioContacto() {
  const [estado, setEstado] = useState<Estado>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [, startTransition] = useTransition();

  return (
    <form
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        setEstado("enviando");
        setErrorMsg("");
        const data = new FormData(e.currentTarget);
        const form = e.currentTarget;
        startTransition(async () => {
          const res = await enviarMensajeAction(data);
          if (res.ok) {
            setEstado("ok");
            form.reset();
          } else {
            setEstado("error");
            setErrorMsg(res.error ?? "Hubo un problema al enviar el mensaje.");
          }
        });
      }}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <Campo nombre="nombre" rotulo="Nombre" requerido />
        <Campo nombre="email" rotulo="Email" tipo="email" requerido />
        <Campo nombre="telefono" rotulo="Teléfono" />
        <Campo nombre="asunto" rotulo="Asunto" />
      </div>
      <div>
        <label
          htmlFor="mensaje"
          className="eyebrow block mb-3"
        >
          Mensaje *
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={6}
          className="w-full bg-transparent border-b hairline focus:border-accent focus:outline-none pb-3 text-lg text-ink resize-none transition-colors"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4">
        <p className="text-xs text-muted font-mono tracking-wider">
          * CAMPOS OBLIGATORIOS
        </p>
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="inline-flex items-center justify-center px-10 py-5 bg-ink text-background text-sm tracking-wider uppercase hover:bg-accent transition-colors disabled:opacity-50"
        >
          {estado === "enviando" ? "Enviando…" : "Enviar mensaje →"}
        </button>
      </div>

      {estado === "ok" && (
        <div className="border border-accent bg-accent/5 px-6 py-4 mt-6">
          <p className="font-serif text-lg text-ink">
            Mensaje enviado. Te respondemos en menos de 48 horas hábiles.
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
  nombre,
  rotulo,
  tipo = "text",
  requerido = false,
}: {
  nombre: string;
  rotulo: string;
  tipo?: string;
  requerido?: boolean;
}) {
  return (
    <div>
      <label htmlFor={nombre} className="eyebrow block mb-3">
        {rotulo} {requerido && "*"}
      </label>
      <input
        type={tipo}
        id={nombre}
        name={nombre}
        required={requerido}
        className="w-full bg-transparent border-b hairline focus:border-accent focus:outline-none pb-3 text-lg text-ink transition-colors"
      />
    </div>
  );
}
