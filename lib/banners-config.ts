// Constantes y tipos de banners. Archivo PURO (sin next/headers / supabase server).
// Importable desde Client Components.

export type Banner = {
  id: string;
  imagen_url: string;
  titulo: string;
  link: string | null;
  orden: number;
  activo: boolean;
};

export const BANNERS_LIMITE = 8;

export const BANNER_VALIDACION: {
  formatosPermitidos: readonly string[];
  formatosTexto: string;
  anchoMinimo: number;
  pesoMaximoMB: number;
} = {
  formatosPermitidos: ["image/jpeg", "image/png", "image/webp"],
  formatosTexto: "JPG, PNG o WebP",
  anchoMinimo: 1400,
  pesoMaximoMB: 2.5,
};
