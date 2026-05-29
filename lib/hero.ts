import { createSupabaseServer } from "./supabase-server";
import type { HeroImage, HeroModo } from "./hero-config";

// Re-exporto los tipos para conveniencia (los consumidores server pueden hacer
// `import type { HeroImage } from "@/lib/hero"`).
export type { HeroImage, HeroModo } from "./hero-config";
export {
  HERO_LIMITE_IMAGENES,
  HERO_VALIDACION,
} from "./hero-config";

const FALLBACK_IMAGES: HeroImage[] = [
  {
    id: "fallback-dia",
    url: "https://uzxhloolvpdzfduenkew.supabase.co/storage/v1/object/public/bgr-proyectos/obelisco-dia.jpg?v=3",
    label: "Obelisco de día",
    orden: 1,
    principal: true,
    en_rotacion: true,
  },
];

/**
 * Devuelve TODAS las imágenes del hero (activas o no).
 * Útil para el panel admin.
 */
export async function getAllHeroImages(): Promise<HeroImage[]> {
  try {
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase
      .from("bgr_hero_images")
      .select("*")
      .order("orden", { ascending: true });
    if (error || !data || data.length === 0) return FALLBACK_IMAGES;
    return data as HeroImage[];
  } catch {
    return FALLBACK_IMAGES;
  }
}

/**
 * Devuelve las imágenes que el sitio público debe mostrar según el modo.
 * - modo 'fija' → solo la principal
 * - modo 'rotacion' → solo las marcadas para rotar, ordenadas con principal primero
 *   Si en rotación no hay ninguna marcada, fallback a la principal.
 */
export async function getHeroImagesPublicas(): Promise<HeroImage[]> {
  const [all, modo] = await Promise.all([getAllHeroImages(), getHeroModo()]);

  if (modo === "rotacion") {
    const enRotacion = all.filter((i) => i.en_rotacion);
    if (enRotacion.length > 0) {
      return enRotacion.sort((a, b) => {
        if (a.principal && !b.principal) return -1;
        if (!a.principal && b.principal) return 1;
        return a.orden - b.orden;
      });
    }
    // Sin imágenes en rotación → caemos a principal
  }

  // Modo fija o fallback: solo la principal
  const principal = all.find((i) => i.principal);
  if (principal) return [principal];
  // Último fallback: primera imagen disponible
  return all.length > 0 ? [all[0]] : FALLBACK_IMAGES;
}

export async function getHeroModo(): Promise<HeroModo> {
  try {
    const supabase = await createSupabaseServer();
    const { data } = await supabase
      .from("bgr_config")
      .select("valor")
      .eq("clave", "hero_modo")
      .maybeSingle();
    const v = data?.valor;
    return v === "rotacion" ? "rotacion" : "fija";
  } catch {
    return "fija";
  }
}
