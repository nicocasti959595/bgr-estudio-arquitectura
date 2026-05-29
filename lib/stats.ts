import { createSupabaseServer } from "./supabase-server";

export type Stat = {
  clave: string;
  numero: string;
  rotulo: string;
  actualizacion: string | null;
  orden: number;
};

const fallback: Stat[] = [
  { clave: "anos", numero: "10", rotulo: "Años de experiencia", actualizacion: null, orden: 1 },
  { clave: "reformas", numero: "384", rotulo: "Reformas realizadas hasta el momento", actualizacion: null, orden: 2 },
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
