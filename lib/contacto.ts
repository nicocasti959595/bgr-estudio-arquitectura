import { supabase } from "./supabase";

/** Número por defecto si la config no está cargada (CABA, formato wa.me). */
export const WHATSAPP_FALLBACK = "5491136910077";

/**
 * Devuelve el número de WhatsApp (formato wa.me) configurado desde el panel.
 * Usa el cliente público (sin cookies). SERVER ONLY.
 */
export async function getWhatsappNumero(): Promise<string> {
  try {
    const { data } = await supabase
      .from("bgr_config")
      .select("valor")
      .eq("clave", "whatsapp_numero")
      .maybeSingle();
    const limpio = (data?.valor ?? "").replace(/\D/g, "");
    return limpio.length >= 8 ? limpio : WHATSAPP_FALLBACK;
  } catch {
    return WHATSAPP_FALLBACK;
  }
}

/** Formatea el número wa.me a algo legible: 5491136910077 → +54 9 11 3691-0077 (best effort). */
export function formatearWhatsapp(numero: string): string {
  const n = numero.replace(/\D/g, "");
  // 54 9 11 3691 0077
  if (n.startsWith("549") && n.length >= 13) {
    const area = n.slice(3, 5);
    const resto = n.slice(5);
    const p1 = resto.slice(0, 4);
    const p2 = resto.slice(4);
    return `+54 9 ${area} ${p1}-${p2}`;
  }
  return `+${n}`;
}
