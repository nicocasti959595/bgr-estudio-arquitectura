import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase-server";
import { getProyectoById } from "@/lib/proyectos";
import { NavAdmin } from "@/components/admin/NavAdmin";
import { FormularioProyecto } from "@/components/admin/FormularioProyecto";

export const dynamic = "force-dynamic";

export default async function EditarProyectoPage(
  props: PageProps<"/admin/proyectos/[id]">
) {
  const { id } = await props.params;
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const proyecto = await getProyectoById(id);
  if (!proyecto) notFound();

  return (
    <>
      <NavAdmin email={user.email ?? ""} />
      <main className="max-w-[1000px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <Link
          href="/admin"
          className="text-[10px] tracking-[2px] uppercase text-muted hover:text-ink inline-block mb-6"
        >
          ← Volver
        </Link>
        <div className="eyebrow mb-3">Editar obra</div>
        <h1 className="font-serif text-4xl md:text-5xl text-ink mb-2">
          {proyecto.titulo}
        </h1>
        <p className="text-[13px] text-muted mb-10">
          {proyecto.tipo ?? "Sin tipo"} · {proyecto.barrio ?? "Sin ubicación"}
        </p>
        <FormularioProyecto proyecto={proyecto} />
      </main>
    </>
  );
}
