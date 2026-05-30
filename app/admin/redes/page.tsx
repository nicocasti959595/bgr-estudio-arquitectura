import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createSupabaseServer } from "@/lib/supabase-server";
import { getCuentas, getMetricas } from "@/lib/saas-client";
import { NavAdmin } from "@/components/admin/NavAdmin";
import { RedesProximamente, redesActivo } from "@/components/admin/RedesProximamente";

export const dynamic = "force-dynamic";

export default async function AdminRedesPage() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  // Mientras el SaaS no esté operativo, mostrar cartel "Próximamente".
  if (!redesActivo()) {
    return (
      <>
        <NavAdmin email={user.email ?? ""} />
        <RedesProximamente />
      </>
    );
  }

  const [cuentasRes, metricasRes] = await Promise.all([
    getCuentas(),
    getMetricas(30),
  ]);

  const saasCaido = !cuentasRes.ok && !metricasRes.ok;

  return (
    <>
      <NavAdmin email={user.email ?? ""} />

      <main className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <Link
          href="/admin"
          className="text-[10px] tracking-[2px] uppercase text-muted hover:text-ink inline-block mb-6"
        >
          ← Volver
        </Link>
        <p className="eyebrow mb-3">Panel privado</p>
        <h1 className="font-serif text-4xl md:text-5xl text-ink">
          Automatización de redes
        </h1>
        <p className="text-[14px] text-muted mt-2 font-light max-w-2xl leading-relaxed">
          Cargá tus publicaciones e historias, programá los horarios y dejá que
          se publiquen solas en Instagram y Facebook. Conectado con la
          plataforma redesauto.
        </p>

        {saasCaido && (
          <div className="mt-8 border-2 border-amber-300 bg-amber-50 px-5 py-4">
            <p className="text-[14px] text-amber-900 font-medium">
              El servicio de redes no está disponible en este momento.
            </p>
            <p className="text-[13px] text-amber-800 mt-1">
              {cuentasRes.ok ? "" : cuentasRes.error}
            </p>
          </div>
        )}

        {/* Accesos rápidos */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <Link
            href="/admin/redes/publicaciones"
            className="border-2 border-line hover:border-accent bg-paper p-6 transition-colors group"
          >
            <p className="font-serif text-2xl text-ink group-hover:text-accent transition-colors">
              Publicaciones e historias →
            </p>
            <p className="text-[13px] text-muted mt-2 font-light">
              Subí imágenes, escribí los textos y programá hasta 3 por día. La
              forma rápida de dejar listo todo el mes.
            </p>
          </Link>
          <Link
            href="/admin/redes/config"
            className="border-2 border-line hover:border-accent bg-paper p-6 transition-colors group"
          >
            <p className="font-serif text-2xl text-ink group-hover:text-accent transition-colors">
              Configuración →
            </p>
            <p className="text-[13px] text-muted mt-2 font-light">
              Horarios de publicación, cuenta por defecto, zona horaria y
              respuesta automática a mensajes.
            </p>
          </Link>
        </div>

        {/* Cuentas conectadas */}
        <section className="mt-12">
          <p className="eyebrow mb-3">Cuentas conectadas</p>
          {cuentasRes.ok && cuentasRes.accounts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cuentasRes.accounts.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-3 border hairline bg-paper p-4"
                >
                  {c.profile_image_url ? (
                    <Image
                      src={c.profile_image_url}
                      alt={c.account_name}
                      width={44}
                      height={44}
                      className="rounded-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-line" />
                  )}
                  <div className="min-w-0">
                    <p className="font-serif text-base text-ink truncate">
                      {c.account_name}
                    </p>
                    <p className="text-[11px] tracking-[1.5px] uppercase text-muted">
                      {c.platform}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[13px] text-muted font-light">
              {cuentasRes.ok
                ? "Todavía no hay cuentas conectadas. Se conectan desde la plataforma redesauto."
                : "No se pudieron cargar las cuentas en este momento."}
            </p>
          )}
        </section>

        {/* Métricas */}
        <section className="mt-12">
          <p className="eyebrow mb-3">Métricas — últimos 30 días</p>
          {metricasRes.ok && metricasRes.cuentas.length > 0 ? (
            <div className="space-y-4">
              {metricasRes.cuentas.map((m) => (
                <div
                  key={m.account_name}
                  className="border hairline bg-paper p-5"
                >
                  <p className="font-serif text-lg text-ink mb-4">
                    {m.account_name}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <Metric label="Seguidores" value={m.followers} />
                    <Metric label="Alcance" value={m.alcance_total_periodo} />
                    <Metric
                      label="Engagement"
                      value={m.engagement_total_periodo}
                    />
                    <Metric
                      label="Posts publicados"
                      value={m.posts_publicados_periodo}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[13px] text-muted font-light">
              {metricasRes.ok
                ? "Todavía no hay métricas para mostrar."
                : "No se pudieron cargar las métricas en este momento."}
            </p>
          )}
        </section>
      </main>
    </>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="display text-3xl md:text-4xl text-ink">
        {value.toLocaleString("es-AR")}
      </p>
      <p className="text-[10px] tracking-[0.22em] uppercase text-muted mt-1 font-medium">
        {label}
      </p>
    </div>
  );
}
