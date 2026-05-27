import { createSupabaseServer } from "./supabase-server";

export type Proyecto = {
  id: string;
  slug: string | null;
  titulo: string;
  barrio: string | null;
  tipo: string | null;
  descripcion: string | null;
  imagen_portada: string | null;
  imagenes: string[] | null;
  destacado: boolean;
  orden: number;
  instagram_url: string | null;
  ano: number | null;
  created_at: string;
  updated_at: string;
};

export async function getProyectos(): Promise<Proyecto[]> {
  try {
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase
      .from("bgr_proyectos")
      .select("*")
      .order("orden", { ascending: true })
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data as Proyecto[];
  } catch {
    return [];
  }
}

export async function getProyectoById(id: string): Promise<Proyecto | null> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("bgr_proyectos")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  return data as Proyecto;
}
