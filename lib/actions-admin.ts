"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServer } from "./supabase-server";
import { heroModoKey } from "./hero-config";
import type { HeroZona } from "./hero-config";

async function requireAdmin() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/admin/login");
  }
  return supabase;
}

export type ProyectoInput = {
  titulo: string;
  barrio?: string | null;
  tipo?: string | null;
  descripcion?: string | null;
  imagen_portada?: string | null;
  imagenes?: string[] | null;
  destacado?: boolean;
  orden?: number;
  instagram_url?: string | null;
  ano?: number | null;
};

export async function crearProyectoAction(input: ProyectoInput) {
  const supabase = await requireAdmin();
  const { data, error } = await supabase
    .from("bgr_proyectos")
    .insert([input])
    .select()
    .single();
  if (error) return { ok: false, error: error.message };
  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true, id: data?.id };
}

export async function actualizarProyectoAction(
  id: string,
  input: ProyectoInput
) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("bgr_proyectos")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/admin/proyectos/${id}`);
  return { ok: true };
}

export async function eliminarProyectoAction(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("bgr_proyectos")
    .delete()
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true };
}

export async function cerrarSesionAction() {
  const supabase = await createSupabaseServer();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function actualizarConfigAction(clave: string, valor: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("bgr_config")
    .upsert({
      clave,
      valor: valor.trim(),
      updated_at: new Date().toISOString(),
    });
  if (error) return { ok: false, error: error.message };
  revalidatePath("/metodo-bgr");
  revalidatePath("/admin/metodo");
  return { ok: true };
}

// ============================================================
//  HERO / ZONAS DE IMÁGENES (configurables por zona)
// ============================================================

const HERO_LIMITE = 7;

async function contarZona(
  supabase: Awaited<ReturnType<typeof requireAdmin>>,
  zona: HeroZona
) {
  const { count } = await supabase
    .from("bgr_hero_images")
    .select("*", { count: "exact", head: true })
    .eq("zona", zona);
  return count ?? 0;
}

async function proximoOrdenZona(
  supabase: Awaited<ReturnType<typeof requireAdmin>>,
  zona: HeroZona
) {
  const { data } = await supabase
    .from("bgr_hero_images")
    .select("orden")
    .eq("zona", zona)
    .order("orden", { ascending: false })
    .limit(1)
    .maybeSingle();
  return (data?.orden ?? 0) + 1;
}

export async function eliminarHeroImageAction(id: string) {
  const supabase = await requireAdmin();

  const { data: img } = await supabase
    .from("bgr_hero_images")
    .select("principal, zona")
    .eq("id", id)
    .maybeSingle();
  if (!img) return { ok: false as const, error: "Imagen no encontrada." };

  // No permitir eliminar la única imagen de la zona
  if (img.principal) {
    const total = await contarZona(supabase, img.zona as HeroZona);
    if (total <= 1) {
      return {
        ok: false as const,
        error:
          "No podés eliminar la única imagen de esta sección. Subí otra primero.",
      };
    }
  }

  const { error } = await supabase
    .from("bgr_hero_images")
    .delete()
    .eq("id", id);
  if (error) return { ok: false as const, error: error.message };

  // Si era principal, promover otra de la MISMA zona (preferir las de rotación)
  if (img.principal) {
    const { data: candidata } = await supabase
      .from("bgr_hero_images")
      .select("id")
      .eq("zona", img.zona)
      .order("en_rotacion", { ascending: false })
      .order("orden", { ascending: true })
      .limit(1)
      .maybeSingle();
    if (candidata) {
      await supabase
        .from("bgr_hero_images")
        .update({ principal: true, updated_at: new Date().toISOString() })
        .eq("id", candidata.id);
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/hero");
  return { ok: true as const };
}

export async function toggleHeroRotacionAction(
  id: string,
  en_rotacion: boolean
) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("bgr_hero_images")
    .update({ en_rotacion, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { ok: false as const, error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/hero");
  return { ok: true as const };
}

export async function setHeroPrincipalAction(id: string) {
  const supabase = await requireAdmin();

  const { data: img } = await supabase
    .from("bgr_hero_images")
    .select("zona")
    .eq("id", id)
    .maybeSingle();
  if (!img) return { ok: false as const, error: "Imagen no encontrada." };

  // Quitar principal solo dentro de la misma zona (unique index parcial por zona)
  const { error: e1 } = await supabase
    .from("bgr_hero_images")
    .update({ principal: false, updated_at: new Date().toISOString() })
    .eq("zona", img.zona)
    .eq("principal", true);
  if (e1) return { ok: false as const, error: e1.message };

  const { error: e2 } = await supabase
    .from("bgr_hero_images")
    .update({ principal: true, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (e2) return { ok: false as const, error: e2.message };

  revalidatePath("/");
  revalidatePath("/admin/hero");
  return { ok: true as const };
}

export async function actualizarHeroModoAction(
  zona: HeroZona,
  modo: "fija" | "rotacion"
) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("bgr_config").upsert({
    clave: heroModoKey(zona),
    valor: modo,
    updated_at: new Date().toISOString(),
  });
  if (error) return { ok: false as const, error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/hero");
  return { ok: true as const };
}

/**
 * Sube un archivo al bucket `bgr-proyectos` bajo `hero/` y lo asocia a una zona.
 */
export async function subirHeroImagenAction(formData: FormData) {
  const supabase = await requireAdmin();
  const archivo = formData.get("archivo") as File | null;
  const label = String(formData.get("label") ?? "").trim();
  const zona = (String(formData.get("zona") ?? "hero") as HeroZona) || "hero";

  if (!archivo) {
    return { ok: false as const, error: "No se recibió archivo." };
  }

  const tiposOk = ["image/jpeg", "image/png", "image/webp"];
  if (!tiposOk.includes(archivo.type)) {
    return {
      ok: false as const,
      error: "Formato no permitido. Subí JPG, PNG o WebP.",
    };
  }
  if (archivo.size > 2 * 1024 * 1024) {
    return {
      ok: false as const,
      error: "El archivo supera los 2MB. Optimizalo y volvé a intentar.",
    };
  }

  if ((await contarZona(supabase, zona)) >= HERO_LIMITE) {
    return {
      ok: false as const,
      error: `Llegaste al límite de ${HERO_LIMITE} imágenes en esta sección. Borrá una primero.`,
    };
  }

  const ext = archivo.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const nombre = `hero/${zona}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}.${ext}`;

  const { error: upErr } = await supabase.storage
    .from("bgr-proyectos")
    .upload(nombre, archivo, { contentType: archivo.type, upsert: false });
  if (upErr) return { ok: false as const, error: upErr.message };

  const { data: publica } = supabase.storage
    .from("bgr-proyectos")
    .getPublicUrl(nombre);

  const { error: insErr } = await supabase.from("bgr_hero_images").insert([
    {
      url: publica.publicUrl,
      label: label || "Imagen subida",
      orden: await proximoOrdenZona(supabase, zona),
      principal: false,
      en_rotacion: false,
      zona,
    },
  ]);
  if (insErr) return { ok: false as const, error: insErr.message };

  revalidatePath("/");
  revalidatePath("/admin/hero");
  return { ok: true as const, url: publica.publicUrl };
}

export async function actualizarStatAction(
  clave: string,
  numero: string,
  actualizacion: string | null
) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("bgr_stats")
    .update({
      numero: numero.trim(),
      actualizacion: actualizacion?.trim() || null,
      updated_at: new Date().toISOString(),
    })
    .eq("clave", clave);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/stats");
  return { ok: true };
}

export async function loginAction(
  _prev: { error: string | null } | null,
  formData: FormData
): Promise<{ error: string | null }> {
  // Limpieza agresiva: nos quedamos SOLO con ASCII imprimible (codepoints 32-126).
  // Esto elimina BOM (U+FEFF = 65279), zero-width chars, control chars, RTL/LTR
  // marks y cualquier otro caracter invisible que rompa los headers HTTP.
  const sanitizar = (s: string): string => {
    let out = "";
    for (let i = 0; i < s.length; i++) {
      const code = s.charCodeAt(i);
      if (code >= 32 && code < 127) out += s[i];
    }
    return out.trim();
  };

  const usuarioRaw = sanitizar(String(formData.get("usuario") ?? ""));
  const password = sanitizar(String(formData.get("password") ?? ""));

  if (!usuarioRaw || !password) {
    return { error: "Completá usuario y contraseña." };
  }

  // Permitir "adminbgr" sin @ — autocompletamos al dominio interno.
  const email = usuarioRaw.includes("@")
    ? usuarioRaw
    : `${usuarioRaw}@bgr.com.ar`;

  const supabase = await createSupabaseServer();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    const msg = error.message?.toLowerCase() ?? "";
    if (msg.includes("invalid login")) {
      return { error: `Credenciales inválidas (probaste con ${email}).` };
    }
    if (msg.includes("email not confirmed")) {
      return { error: "Cuenta sin confirmar." };
    }
    if (msg.includes("too many")) {
      return { error: "Demasiados intentos. Esperá un minuto." };
    }
    return { error: error.message };
  }

  redirect("/admin");
}
