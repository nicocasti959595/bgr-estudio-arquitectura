import { createSupabaseServer } from "./supabase-server";

export type ObeliscoConfig = {
  activo: boolean;
  horaNocheInicio: number; // 0-23, hora en que empieza a verse la imagen de noche
  horaNocheFin: number; // 0-23, hora en que vuelve a verse la imagen de día
};

export const OBELISCO_DEFAULT: ObeliscoConfig = {
  activo: true,
  horaNocheInicio: 19,
  horaNocheFin: 7,
};

function parsearHora(valor: string | null | undefined, fallback: number): number {
  if (valor == null) return fallback;
  const n = Number.parseInt(valor, 10);
  if (Number.isNaN(n) || n < 0 || n > 23) return fallback;
  return n;
}

export async function getObeliscoConfig(): Promise<ObeliscoConfig> {
  try {
    const supabase = await createSupabaseServer();
    const { data } = await supabase
      .from("bgr_config")
      .select("clave, valor")
      .in("clave", [
        "obelisco_activo",
        "obelisco_hora_noche_inicio",
        "obelisco_hora_noche_fin",
      ]);

    const mapa = new Map<string, string>();
    for (const row of data ?? []) {
      mapa.set(row.clave, row.valor);
    }

    return {
      activo: (mapa.get("obelisco_activo") ?? "true") !== "false",
      horaNocheInicio: parsearHora(
        mapa.get("obelisco_hora_noche_inicio"),
        OBELISCO_DEFAULT.horaNocheInicio
      ),
      horaNocheFin: parsearHora(
        mapa.get("obelisco_hora_noche_fin"),
        OBELISCO_DEFAULT.horaNocheFin
      ),
    };
  } catch {
    return OBELISCO_DEFAULT;
  }
}
