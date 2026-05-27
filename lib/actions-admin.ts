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
