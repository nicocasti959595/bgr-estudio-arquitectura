import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase-server";
import { NavAdmin } from "@/components/admin/NavAdmin";
import { FormularioProyecto } from "@/components/admin/FormularioProyecto";

export const dynamic = "force-dynamic";

export default async function NuevoProyectoPage() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  return (
    <>
      <NavAdmin email={user.email ?? ""} />
      <main className="max-w-[1000px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <Link
          href="/admin"
          className="text-[10px] tracking-[2px] uppercase text-muted hover:text-white inline-block mb-6"
        >
          ← Volver
        </Link>
        <div className="eyebrow mb-3">Crear obra</div>
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-10">
          Nueva obra
        </h1>
        <FormularioProyecto />
      </main>
    </>
  );
}
