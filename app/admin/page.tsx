import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createSupabaseServer } from "@/lib/supabase-server";
import { getProyectos } from "@/lib/proyectos";
import { NavAdmin } from "@/components/admin/NavAdmin";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const proyectos = await getProyectos();

  return (
    <>
      <NavAdmin email={user.email ?? ""} />

      <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="eyebrow mb-3">Panel privado</div>
            <h1 className="font-serif text-4xl md:text-5xl text-white">
              Proyectos
            </h1>
            <p className="text-[14px] text-muted mt-2 font-light">
              {proyectos.length === 0
                ? "Todavía no cargaste obras. Empezá creando la primera."
                : `${proyectos.length} obra${proyectos.length === 1 ? "" : "s"} cargada${proyectos.length === 1 ? "" : "s"}.`}
            </p>
          </div>
          <Link
            href="/admin/proyectos/nuevo"
            className="inline-flex items-center justify-center bg-accent text-white px-7 py-3.5 text-[10px] tracking-[2px] uppercase hover:bg-accent2 transition-colors"
          >
            + Nueva obra
          </Link>
        </div>

        {proyectos.length === 0 ? (
          <div className="border border-line bg-paper p-12 text-center">
            <p className="text-muted font-light text-[14px]">
              No hay obras cargadas. Tocá <span className="text-accent2">"+ Nueva obra"</span> para crear la primera.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
            {proyectos.map((p) => (
              <Link
                key={p.id}
                href={`/admin/proyectos/${p.id}`}
                className="bg-ink p-6 hover:bg-paper transition-colors group flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-surface mb-4 overflow-hidden">
                  {p.imagen_portada ? (
                    <Image
                      src={p.imagen_portada}
                      alt={p.titulo}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted text-[11px] tracking-widest uppercase">
                      Sin imagen
                    </div>
                  )}
                  {p.destacado && (
                    <span className="absolute top-2 right-2 bg-accent text-white px-2 py-1 text-[9px] tracking-[1.5px] uppercase">
                      Destacada
                    </span>
                  )}
                </div>
                <div className="flex items-start justify-between gap-2 flex-1">
                  <div className="min-w-0">
                    <div className="text-[10px] tracking-[1.5px] uppercase text-accent2 truncate">
                      {p.tipo ?? "Sin tipo"}
                    </div>
                    <h3 className="font-serif text-xl text-white mt-1 truncate">
                      {p.titulo}
                    </h3>
                    <p className="text-[12px] text-muted mt-0.5 truncate">
                      {p.barrio ?? "—"}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-muted shrink-0 mt-1 group-hover:text-accent2 transition-colors">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
