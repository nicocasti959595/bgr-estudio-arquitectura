import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase-server";
import { getConfig } from "@/lib/config";
import { NavAdmin } from "@/components/admin/NavAdmin";
import { FormularioVideoMetodo } from "@/components/admin/FormularioVideoMetodo";

export const dynamic = "force-dynamic";

export default async function AdminMetodoPage() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const urlActual = await getConfig("video_metodo_url");

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
          Video del Método BGR
        </h1>
        <p className="text-[14px] text-muted mt-2 font-light">
          Pegá el link de YouTube y guardá. El video se va a mostrar arriba en{" "}
          <Link
            href="/metodo-bgr"
            target="_blank"
            className="text-accent link-underline"
          >
            /metodo-bgr ↗
          </Link>
          . Si no hay URL, se muestra un placeholder.
        </p>

        <div className="mt-10">
          <FormularioVideoMetodo urlInicial={urlActual} />
        </div>
      </main>
    </>
  );
}
