import { supabase } from "./supabase";

function tieneSupabase() {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function guardarConsulta(payload: Record<string, unknown>): Promise<{
  ok: boolean;
  error?: string;
}> {
  const nombre = String(payload.nombre ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const whatsapp = String(payload.whatsapp ?? "").trim();
  const tipo_form = String(payload.tipo_form ?? "general");
  const mensaje = String(payload.mensaje ?? "");

  if (!nombre || !email) {
    return { ok: false, error: "Faltan datos obligatorios." };
  }

  const fila = {
    nombre,
    email,
    telefono: whatsapp || null,
    asunto: tipo_form,
    mensaje: mensaje || JSON.stringify(payload),
    tipo_form,
    payload,
  };

  if (!tieneSupabase()) {
    console.log("[consulta · sin supabase configurado]", fila);
    return { ok: true };
  }

  const { error } = await supabase.from("bgr_mensajes").insert([fila]);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
