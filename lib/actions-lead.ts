"use server";

import { supabase } from "./supabase";

export type LeadInput = {
  nombre: string;
  telefono?: string | null;
  email?: string | null;
  asunto?: string | null;
  mensaje?: string | null;
  // origen del lead: 'contacto' | 'asesoramiento' | 'servicio' | 'whatsapp_flotante'
  tipo_form: string;
  // honeypot: si viene con texto, es un bot
  hp?: string | null;
};

/**
 * Guarda un lead en bgr_mensajes ANTES de abrir WhatsApp.
 * Es best-effort: si falla, el cliente igual abre WhatsApp (no bloquea al usuario).
 * Anti-spam: honeypot. Si `hp` tiene contenido, se descarta silenciosamente.
 */
export async function guardarLeadAction(input: LeadInput) {
  // Honeypot: bots completan campos ocultos. Fingimos éxito sin guardar.
  if (input.hp && input.hp.trim() !== "") {
    return { ok: true as const };
  }

  const nombre = (input.nombre || "").trim();
  if (!nombre) return { ok: false as const, error: "Falta el nombre." };

  const { error } = await supabase.from("bgr_mensajes").insert([
    {
      nombre,
      email: (input.email || "").trim() || "—",
      telefono: input.telefono?.trim() || null,
      asunto: input.asunto?.trim() || null,
      mensaje: (input.mensaje || "").trim() || "(consulta iniciada por WhatsApp)",
      tipo_form: input.tipo_form,
      estado: "nuevo",
    },
  ]);
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const };
}
