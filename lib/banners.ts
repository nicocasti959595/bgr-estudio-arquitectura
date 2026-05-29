import { createSupabaseServer } from "./supabase-server";
import type { Banner } from "./banners-config";

export type { Banner } from "./banners-config";
export { BANNERS_LIMITE, BANNER_VALIDACION } from "./banners-config";

/** TODOS los banners (activos o no). Para el panel admin. */
export async function getAllBanners(): Promise<Banner[]> {
  try {
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase
      .from("bgr_banners")
      .select("*")
      .order("orden", { ascending: true });
    if (error || !data) return [];
    return data as Banner[];
  } catch {
    return [];
  }
}

/** Solo los banners activos, ordenados. Para la home pública. */
export async function getBannersActivos(): Promise<Banner[]> {
  const all = await getAllBanners();
  return all.filter((b) => b.activo);
}
