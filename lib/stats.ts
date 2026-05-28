import { createSupabaseServer } from "./supabase-server";

export type Stat = {
  clave: string;
  numero: string;
  rotulo: string;
  actualizacion: string | null;
  orden: number;
};

const fallback: Stat[] = [
  { clave: "anos", numero: "10+", rotulo: "Años de experiencia", actualizacion: null, orden: 1 },
  { clave: "obras", numero: "53", rotulo: "Obras entregadas en CABA", actualizacion: "13/04/2026", orden: 2 },
  { clave: "reformas", numero: "124", rotulo: "Reformas realizadas", actualizacion: "15/05/2026", orden: 3 },
  { clave: "plazos", numero: "100%", rotulo: "Plazos cumplidos", actualizacion: null, orden: 4 },
];

export async function getStats(): Promise<Stat[]> {
  try {
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase
      .from("bgr_stats")
      .select("*")
      .order("orden", { ascending: true });
    if (error || !data || data.length === 0) return fallback;
    return data as Stat[];
  } catch {
    return fallback;
  }
}
