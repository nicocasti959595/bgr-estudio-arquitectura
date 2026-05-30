"use server";

import { guardarMensaje } from "@/lib/datos";

export async function enviarMensajeAction(formData: FormData) {
  const nombre = String(formData.get("nombre") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const telefono = String(formData.get("telefono") ?? "").trim() || null;
  const asunto = String(formData.get("asunto") ?? "").trim() || null;
  const mensaje = String(formData.get("mensaje") ?? "").trim();

  if (!nombre || !email || !mensaje) {
    return { ok: false, error: "Faltan datos obligatorios." };
  }

  return await guardarMensaje({
    nombre,
    email,
    telefono,
    asunto,
    mensaje,
    tipo_form: "contacto",
  });
}
