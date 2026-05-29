import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase-server";
import {
  getAllHeroImages,
  getHeroModo,
  HERO_LIMITE_IMAGENES,
} from "@/lib/hero";
import { NavAdmin } from "@/components/admin/NavAdmin";
import { FormularioHero } from "@/components/admin/FormularioHero";

export const dynamic = "force-dynamic";

export default async function AdminHeroPage() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const [heroImgs, heroModo, baImgs, baModo] = await Promise.all([
    getAllHeroImages("hero"),
    getHeroModo("hero"),
    getAllHeroImages("buenos_aires"),
    getHeroModo("buenos_aires"),
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
          Imágenes del sitio
        </h1>
        <p className="text-[14px] text-muted mt-2 font-light max-w-2xl leading-relaxed">
          El sitio tiene dos zonas de imágenes configurables. En cada una podés
          tener una imagen fija o varias rotando, subir las tuyas y elegir cuál
          es la principal. Máximo{" "}
          <strong className="text-ink">{HERO_LIMITE_IMAGENES} imágenes</strong>{" "}
          por zona.
        </p>

        <FormularioHero
          zona="hero"
          imagenes={heroImgs}
          modoInicial={heroModo}
        />

        <FormularioHero
          zona="buenos_aires"
          imagenes={baImgs}
          modoInicial={baModo}
        />
      </main>
    </>
  );
}
