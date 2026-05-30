"use server";

import { redirect } from "next/navigation";
import { createSupabaseServer } from "./supabase-server";
import {
  getConfigRedes,
  patchConfigRedes,
  postAsset,
  postProgramar,
  type ConfigRedes,
  type Horario,
} from "./saas-client";

async function requireAdmin() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
}

/** Sube un archivo al SaaS (POST /assets) y devuelve el asset_id. */
export async function subirAssetAction(formData: FormData) {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { ok: false as const, error: "No se recibió archivo." };
  }
  const fd = new FormData();
  fd.append("file", file);
  const res = await postAsset(fd);
  if (!res.ok) return { ok: false as const, error: res.error };
  return { ok: true as const, asset_id: res.asset_id, url: res.url };
}

/** Programa una publicación individual. */
export async function programarPostAction(input: {
  type?: "feed" | "story" | "reel" | "carousel";
  caption: string;
  asset_ids: string[];
  scheduled_at: string;
  social_account_id?: string;
}) {
  await requireAdmin();
  if (!input.asset_ids?.length) {
    return { ok: false as const, error: "Falta la imagen del post." };
  }
  const res = await postProgramar(input);
  if (!res.ok) return { ok: false as const, error: res.error };
  return {
    ok: true as const,
    post_id: res.post_id,
    scheduled_at: res.scheduled_at,
  };
}

/** Guarda la configuración del servicio automático. */
export async function guardarConfigRedesAction(body: Partial<ConfigRedes>) {
  await requireAdmin();
  const res = await patchConfigRedes(body);
  if (!res.ok) return { ok: false as const, error: res.error };
  return { ok: true as const, config: res.config };
}

export async function leerConfigRedesAction() {
  await requireAdmin();
  const res = await getConfigRedes();
  if (!res.ok) return { ok: false as const, error: res.error };
  return { ok: true as const, config: res.config };
}

/**
 * Programa un LOTE de publicaciones distribuidas N por día desde una fecha.
 * Recibe items {asset_id, caption}, los horarios del día y la fecha de inicio.
 * Calcula scheduled_at en UTC respetando el offset informado.
 */
export async function programarLoteAction(input: {
  items: { asset_id: string; caption: string }[];
  type: "feed" | "story";
  horarios: Horario[];
  fechaInicio: string; // "YYYY-MM-DD"
  offsetMinutos: number; // getTimezoneOffset() del cliente
  social_account_id?: string;
}) {
  await requireAdmin();
  const { items, type, horarios, fechaInicio, offsetMinutos } = input;
  if (!items?.length) return { ok: false as const, error: "No hay imágenes." };
  if (!horarios?.length) return { ok: false as const, error: "Faltan horarios." };

  const [y, m, d] = fechaInicio.split("-").map(Number);
  const resultados: { ok: boolean; error?: string }[] = [];

  for (let i = 0; i < items.length; i++) {
    const diaIndex = Math.floor(i / horarios.length);
    const slot = horarios[i % horarios.length];

    // Construir fecha local del cliente y pasar a UTC sumando el offset.
    const fechaLocalMs = Date.UTC(y, m - 1, d + diaIndex, slot.hora, slot.minuto);
    const utcMs = fechaLocalMs + offsetMinutos * 60_000;
    const scheduled_at = new Date(utcMs).toISOString();

    const res = await postProgramar({
      type,
      caption: items[i].caption,
      asset_ids: [items[i].asset_id],
      scheduled_at,
      ...(input.social_account_id
        ? { social_account_id: input.social_account_id }
        : {}),
    });
    resultados.push(res.ok ? { ok: true } : { ok: false, error: res.error });
  }

  const okCount = resultados.filter((r) => r.ok).length;
  const fail = resultados.find((r) => !r.ok);
  return {
    ok: okCount > 0,
    programados: okCount,
    total: items.length,
    error: okCount === 0 ? fail?.error ?? "No se pudo programar." : undefined,
  };
}
