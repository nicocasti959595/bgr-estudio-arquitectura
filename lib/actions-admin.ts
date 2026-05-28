"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServer } from "./supabase-server";

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
