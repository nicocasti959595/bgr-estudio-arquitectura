import { createSupabaseServer } from "./supabase-server";

export type EstadoMensaje = "nuevo" | "contactado" | "archivado";

export type Mensaje = {
  id: string;
  nombre: string;
  email: string;
  telefono: string | null;
  asunto: string | null;
  mensaje: string;
  tipo_form: string | null;
  leido: boolean | null;
  estado: EstadoMensaje;
  created_at: string | null;
};

/** Lee las consultas guardadas. SERVER ONLY (RLS exige admin). */
export async function getMensajes(): Promise<Mensaje[]> {
  try {
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase
      .from("bgr_mensajes")
      .select("*")
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data as Mensaje[];
  } catch {
    return [];
  }
}
