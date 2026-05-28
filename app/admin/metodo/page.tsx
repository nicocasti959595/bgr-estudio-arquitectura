import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase-server";
import { getConfig } from "@/lib/config";
import { NavAdmin } from "@/components/admin/NavAdmin";
import { FormularioVideoMetodo } from "@/components/admin/FormularioVideoMetodo";
import { FormularioTextoConfig } from "@/components/admin/FormularioTextoConfig";

export const dynamic = "force-dynamic";

export default async function AdminMetodoPage() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const [urlActual, descripcion] = await Promise.all([
    getConfig("video_metodo_url"),
    getConfig("video_metodo_descripcion"),
  ]);

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
          Método BGR
        </h1>
        <p className="text-[14px] text-muted mt-2 font-light">
          Editá el video y la descripción que aparecen en{" "}
          <Link
            href="/metodo-bgr"
            target="_blank"
            className="text-accent link-underline"
          >
            /metodo-bgr ↗
          </Link>
          .
        </p>

        <div className="mt-10 space-y-8">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-muted font-medium mb-4">
              — 01 · Video de YouTube
            </p>
            <FormularioVideoMetodo urlInicial={urlActual} />
          </div>

          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-muted font-medium mb-4">
              — 02 · Descripción del video
            </p>
            <FormularioTextoConfig
              clave="video_metodo_descripcion"
              label="Texto descriptivo (aparece al lado del video)"
              valorInicial={descripcion ?? ""}
              filas={10}
              placeholder="Contale al visitante qué muestra el video..."
              ayuda="Separá los párrafos con una línea en blanco (Enter dos veces). El último párrafo destacado del lema 'Si lo podés imaginar, lo podemos construir.' se muestra automáticamente debajo y no hay que escribirlo acá."
            />
          </div>
        </div>
      </main>
    </>
  );
}
