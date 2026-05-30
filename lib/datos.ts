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

// Map de fila de la BD del admin (campos: titulo, barrio, tipo, ano, ...)
// al tipo Proyecto que espera el frontend público (ubicacion, tipologia, anio).
// Cualquier campo faltante cae en defaults razonables.
type ProyectoBD = {
  id: string;
  slug: string | null;
  titulo: string;
  barrio: string | null;
  tipo: string | null;
  descripcion: string | null;
  imagen_portada: string | null;
  imagenes: string[] | null;
  destacado: boolean;
  orden: number;
  ano: number | null;
  created_at: string;
};

function mapearProyecto(p: ProyectoBD): Proyecto {
  return {
    id: p.id,
    slug: p.slug || p.id,
    titulo: p.titulo,
    ubicacion: p.barrio ?? "",
    anio: p.ano ?? new Date().getFullYear(),
    tipologia: p.tipo ?? "Obra",
    superficie: null,
    descripcion: p.descripcion ?? "",
    imagen_portada:
      p.imagen_portada ??
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80&auto=format&fit=crop",
    imagenes: p.imagenes,
    destacado: p.destacado,
    orden: p.orden,
    created_at: p.created_at,
  };
}

export async function getProyectos(): Promise<Proyecto[]> {
  if (!tieneSupabase()) return proyectosFallback;
  const { data, error } = await supabase
    .from("bgr_proyectos")
    .select("*")
    .order("orden", { ascending: true });
  if (error || !data || data.length === 0) return proyectosFallback;
  return (data as ProyectoBD[]).map(mapearProyecto);
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
  // Buscar primero por slug, después por id (porque mapeamos slug a id si está vacío)
  const { data, error } = await supabase
    .from("bgr_proyectos")
    .select("*")
    .or(`slug.eq.${slug},id.eq.${slug}`)
    .maybeSingle();
  if (error || !data) {
    return proyectosFallback.find((p) => p.slug === slug) ?? null;
  }
  return mapearProyecto(data as ProyectoBD);
}

export async function getServicios(): Promise<Servicio[]> {
  // No tenemos tabla bgr_servicios — siempre usar fallback hardcoded.
  return serviciosFallback;
}

export async function getMiembros(): Promise<Miembro[]> {
  // No tenemos tabla bgr_miembros — siempre usar fallback hardcoded.
  return miembrosFallback;
}

export async function guardarMensaje(payload: {
  nombre: string;
  email: string;
  telefono?: string | null;
  asunto?: string | null;
  mensaje: string;
  tipo_form?: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!tieneSupabase()) {
    console.log("[contacto · sin supabase configurado]", payload);
    return { ok: true };
  }
  const { error } = await supabase
    .from("bgr_mensajes")
    .insert([{ ...payload, tipo_form: payload.tipo_form ?? "contacto" }]);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
