// Constantes y tipos del hero. Archivo PURO: sin imports server (next/headers, supabase server).
// Importable desde Client Components.

export type HeroImage = {
  id: string;
  url: string;
  label: string;
  orden: number;
  principal: boolean;
  en_rotacion: boolean;
};

export type HeroModo = "fija" | "rotacion";

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
