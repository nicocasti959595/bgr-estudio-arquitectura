import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase-server";
import { getAllHeroImages, getHeroModo, HERO_LIMITE_IMAGENES } from "@/lib/hero";
import { NavAdmin } from "@/components/admin/NavAdmin";
import { FormularioHero } from "@/components/admin/FormularioHero";

export const dynamic = "force-dynamic";

export default async function AdminHeroPage() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const [imagenes, modo] = await Promise.all([
    getAllHeroImages(),
    getHeroModo(),
  ]);

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
          Imagen del inicio
        </h1>
        <p className="text-[14px] text-muted mt-2 font-light max-w-2xl leading-relaxed">
          Administrá las imágenes que aparecen en el hero de la home. Podés
          tener una sola imagen fija o que vayan rotando. Máximo{" "}
          <strong className="text-ink">{HERO_LIMITE_IMAGENES} imágenes</strong>.
        </p>

        <FormularioHero imagenes={imagenes} modoInicial={modo} />
      </main>
    </>
  );
}
