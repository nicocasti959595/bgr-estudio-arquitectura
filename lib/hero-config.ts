// Constantes y tipos del hero. Archivo PURO: sin imports server (next/headers, supabase server).
// Importable desde Client Components.

export type HeroZona = "hero" | "buenos_aires";

export type HeroImage = {
  id: string;
  url: string;
  label: string;
  orden: number;
  principal: boolean;
  en_rotacion: boolean;
  zona: HeroZona;
};

export type HeroModo = "fija" | "rotacion";

/** Metadatos visibles de cada zona configurable. */
export const HERO_ZONAS: Record<
  HeroZona,
  { titulo: string; descripcion: string }
> = {
  hero: {
    titulo: "Hero principal (arriba de todo)",
    descripcion:
      "La imagen grande de portada, lo primero que se ve al entrar al sitio.",
  },
  buenos_aires: {
    titulo: "Sección Buenos Aires (media)",
    descripcion:
      "La franja del medio con el texto 'Construimos en la ciudad que conocemos como nadie'.",
  },
};

/** Clave de config para el modo de cada zona. */
export function heroModoKey(zona: HeroZona): string {
  return `${zona}_modo`;
}

export const HERO_LIMITE_IMAGENES = 7;

/** Reglas para validar imágenes subidas al hero. */
export const HERO_VALIDACION: {
  formatosPermitidos: readonly string[];
  formatosTexto: string;
  anchoMinimo: number;
  altoMinimo: number;
  pesoMaximoMB: number;
  aspectRatioObjetivo: number;
  toleranciaAspect: number;
} = {
  formatosPermitidos: ["image/jpeg", "image/png", "image/webp"],
  formatosTexto: "JPG, PNG o WebP",
  anchoMinimo: 1600,
  altoMinimo: 900,
  pesoMaximoMB: 2,
  aspectRatioObjetivo: 16 / 9,
  toleranciaAspect: 0.15, // ±15%
};
