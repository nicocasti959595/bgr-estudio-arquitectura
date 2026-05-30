import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase-server";
import { getConfigRedes, getCuentas } from "@/lib/saas-client";
import { NavAdmin } from "@/components/admin/NavAdmin";
import { ConfigRedes } from "@/components/admin/ConfigRedes";
import { RedesProximamente, redesActivo } from "@/components/admin/RedesProximamente";

export const dynamic = "force-dynamic";

export default async function AdminRedesConfigPage() {
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

  const [configRes, cuentasRes] = await Promise.all([
    getConfigRedes(),
    getCuentas(),
  ]);

  const configInicial = configRes.ok
    ? configRes.config
    : {
        horarios: [
          { hora: 10, minuto: 0 },
          { hora: 14, minuto: 0 },
          { hora: 19, minuto: 0 },
        ],
        default_social_account_id: null,
        auto_reply_activa: false,
        timezone: "America/Argentina/Buenos_Aires",
      };

  return (
    <>
      <NavAdmin email={user.email ?? ""} />

      <main className="max-w-[900px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <Link
          href="/admin/redes"
          className="text-[10px] tracking-[2px] uppercase text-muted hover:text-ink inline-block mb-6"
        >
          ← Volver a redes
        </Link>
        <p className="eyebrow mb-3">Automatización de redes</p>
        <h1 className="font-serif text-4xl md:text-5xl text-ink">
          Configuración
        </h1>
        <p className="text-[14px] text-muted mt-2 font-light max-w-2xl leading-relaxed">
          Definí los horarios en que se publican tus contenidos cada día, la
          cuenta por defecto y la respuesta automática a mensajes.
        </p>

        {!configRes.ok && (
          <div className="mt-6 border-2 border-amber-300 bg-amber-50 px-5 py-3 text-[13px] text-amber-900">
            No se pudo leer la configuración actual del servicio. Podés editar y
            guardar igual; se aplicará cuando el servicio esté disponible.
          </div>
        )}

        <ConfigRedes
          inicial={configInicial}
          cuentas={cuentasRes.ok ? cuentasRes.accounts : []}
        />
      </main>
    </>
  );
}
