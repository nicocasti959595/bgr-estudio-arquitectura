import { createSupabaseServer } from "./supabase-server";
import { heroModoKey } from "./hero-config";
import type { HeroImage, HeroModo, HeroZona } from "./hero-config";

export type { HeroImage, HeroModo, HeroZona } from "./hero-config";
export {
  HERO_LIMITE_IMAGENES,
  HERO_VALIDACION,
  HERO_ZONAS,
  heroModoKey,
} from "./hero-config";

function fallbackImages(zona: HeroZona): HeroImage[] {
  return [
    {
      id: `fallback-${zona}`,
      url: "https://uzxhloolvpdzfduenkew.supabase.co/storage/v1/object/public/bgr-proyectos/obelisco-dia.jpg?v=3",
      label: "Obelisco de día",
      orden: 1,
      principal: true,
      en_rotacion: true,
      zona,
    },
  ];
}

/**
 * TODAS las imágenes de una zona (activas o no). Para el panel admin.
 */
export async function getAllHeroImages(
  zona: HeroZona = "hero"
): Promise<HeroImage[]> {
  try {
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase
      .from("bgr_hero_images")
      .select("*")
      .eq("zona", zona)
      .order("orden", { ascending: true });
    if (error || !data || data.length === 0) return fallbackImages(zona);
    return data as HeroImage[];
  } catch {
    return fallbackImages(zona);
  }
}

/**
 * Imágenes que el sitio público debe mostrar según el modo de la zona.
 * - 'fija' → solo la principal
 * - 'rotacion' → solo las marcadas para rotar (principal primero); si no hay, principal.
 */
export async function getHeroImagesPublicas(
  zona: HeroZona = "hero"
): Promise<HeroImage[]> {
  const [all, modo] = await Promise.all([
    getAllHeroImages(zona),
    getHeroModo(zona),
  ]);

  if (modo === "rotacion") {
    const enRotacion = all.filter((i) => i.en_rotacion);
    if (enRotacion.length > 0) {
      return enRotacion.sort((a, b) => {
        if (a.principal && !b.principal) return -1;
        if (!a.principal && b.principal) return 1;
        return a.orden - b.orden;
      });
    }
  }

  const principal = all.find((i) => i.principal);
  if (principal) return [principal];
  return all.length > 0 ? [all[0]] : fallbackImages(zona);
}

export async function getHeroModo(
  zona: HeroZona = "hero"
): Promise<HeroModo> {
  try {
    const supabase = await createSupabaseServer();
    const { data } = await supabase
      .from("bgr_config")
      .select("valor")
      .eq("clave", heroModoKey(zona))
      .maybeSingle();
    return data?.valor === "rotacion" ? "rotacion" : "fija";
  } catch {
    return "fija";
  }
}
