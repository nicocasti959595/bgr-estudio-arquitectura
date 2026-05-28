import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase-server";
import { getStats } from "@/lib/stats";
import { NavAdmin } from "@/components/admin/NavAdmin";
import { FormularioStat } from "@/components/admin/FormularioStat";

export const dynamic = "force-dynamic";

export default async function AdminStatsPage() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const stats = await getStats();

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
        <p className="eyebrow mb-3">Panel privado</p>
        <h1 className="font-serif text-4xl md:text-5xl text-ink">
          Stats del sitio
        </h1>
        <p className="text-[14px] text-muted mt-2 font-light">
          Editá los 4 números clave que aparecen en la home y en la sección
          "Quiénes somos".
        </p>

        <div className="mt-10 grid gap-6">
          {stats.map((s) => (
            <FormularioStat key={s.clave} stat={s} />
          ))}
        </div>
      </main>
    </>
  );
}
