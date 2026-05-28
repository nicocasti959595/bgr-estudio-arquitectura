import { createSupabaseServer } from "./supabase-server";

export async function getConfig(clave: string): Promise<string | null> {
  try {
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase
      .from("bgr_config")
      .select("valor")
      .eq("clave", clave)
      .maybeSingle();
    if (error || !data) return null;
    return data.valor ?? null;
  } catch {
    return null;
  }
}
