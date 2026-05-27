import { supabase, type Proyecto, type Servicio, type Miembro } from "./supabase";
import {
  proyectosFallback,
  serviciosFallback,
  miembrosFallback,
} from "./datosFallback";

function tieneSupabase() {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function getProyectos(): Promise<Proyecto[]> {
  if (!tieneSupabase()) return proyectosFallback;
  const { data, error } = await supabase
    .from("terreno_proyectos")
    .select("*")
    .order("orden", { ascending: true });
  if (error || !data || data.length === 0) return proyectosFallback;
  return data as Proyecto[];
}

export async function getProyectosDestacados(): Promise<Proyecto[]> {
  const todos = await getProyectos();
  return todos.filter((p) => p.destacado).slice(0, 3);
}

export async function getProyectoPorSlug(
  slug: string
): Promise<Proyecto | null> {
  if (!tieneSupabase()) {
    return proyectosFallback.find((p) => p.slug === slug) ?? null;
  }
  const { data, error } = await supabase
    .from("terreno_proyectos")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) {
    return proyectosFallback.find((p) => p.slug === slug) ?? null;
  }
  return data as Proyecto;
}

export async function getServicios(): Promise<Servicio[]> {
  if (!tieneSupabase()) return serviciosFallback;
  const { data, error } = await supabase
    .from("terreno_servicios")
    .select("*")
    .order("orden", { ascending: true });
  if (error || !data || data.length === 0) return serviciosFallback;
  return data as Servicio[];
}

export async function getMiembros(): Promise<Miembro[]> {
  if (!tieneSupabase()) return miembrosFallback;
  const { data, error } = await supabase
    .from("terreno_miembros")
    .select("*")
    .order("orden", { ascending: true });
  if (error || !data || data.length === 0) return miembrosFallback;
  return data as Miembro[];
}

export async function guardarMensaje(payload: {
  nombre: string;
  email: string;
  telefono?: string | null;
  asunto?: string | null;
  mensaje: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!tieneSupabase()) {
    console.log("[contacto · sin supabase configurado]", payload);
    return { ok: true };
  }
  const { error } = await supabase.from("terreno_mensajes").insert([payload]);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
