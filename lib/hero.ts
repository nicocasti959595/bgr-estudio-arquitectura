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
    activa: true,
    principal: true,
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
 * Devuelve solo las imágenes activas que el sitio público debe mostrar.
 * Ordena con la principal primero.
 */
export async function getHeroImagesPublicas(): Promise<HeroImage[]> {
  const all = await getAllHeroImages();
  const activas = all.filter((i) => i.activa);
  if (activas.length === 0) return FALLBACK_IMAGES;
  return activas.sort((a, b) => {
    if (a.principal && !b.principal) return -1;
    if (!a.principal && b.principal) return 1;
    return a.orden - b.orden;
  });
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
