import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase-server";
import { getConfigRedes, getCuentas, getPostsProgramados } from "@/lib/saas-client";
import { NavAdmin } from "@/components/admin/NavAdmin";
import { ProgramadorPublicaciones } from "@/components/admin/ProgramadorPublicaciones";
import { RedesProximamente, redesActivo } from "@/components/admin/RedesProximamente";

export const dynamic = "force-dynamic";

export default async function AdminRedesPubsPage() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  if (!redesActivo()) {
    return (
      <>
        <NavAdmin email={user.email ?? ""} />
        <RedesProximamente />
      </>
    );
  }

  const [cfg, cuentas, programados] = await Promise.all([
    getConfigRedes(),
    getCuentas(),
    getPostsProgramados(50),
  ]);

  const horarios = cfg.ok && cfg.config.horarios?.length
    ? cfg.config.horarios
    : [
        { hora: 10, minuto: 0 },
        { hora: 14, minuto: 0 },
        { hora: 19, minuto: 0 },
      ];

  return (
    <>
      <NavAdmin email={user.email ?? ""} />

      <main className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <Link
          href="/admin/redes"
          className="text-[10px] tracking-[2px] uppercase text-muted hover:text-ink inline-block mb-6"
        >
          ← Volver a redes
        </Link>
        <p className="eyebrow mb-3">Automatización de redes</p>
        <h1 className="font-serif text-4xl md:text-5xl text-ink">
          Publicaciones e historias
        </h1>
        <p className="text-[14px] text-muted mt-2 font-light max-w-2xl leading-relaxed">
          Subí tus imágenes, escribí el texto de cada una y programalas. Con 3
          por día completás el mes (90 publicaciones). Se publican solas en los
          horarios configurados.
        </p>

        <ProgramadorPublicaciones
          horariosDefault={horarios}
          cuentas={cuentas.ok ? cuentas.accounts : []}
          programadosIniciales={programados.ok ? programados.posts : []}
        />
      </main>
    </>
  );
}
