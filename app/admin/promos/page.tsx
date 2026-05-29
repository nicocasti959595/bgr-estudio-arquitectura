import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase-server";
import { getAllBanners, BANNERS_LIMITE } from "@/lib/banners";
import { NavAdmin } from "@/components/admin/NavAdmin";
import { FormularioBanners } from "@/components/admin/FormularioBanners";

export const dynamic = "force-dynamic";

export default async function AdminPromosPage() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const banners = await getAllBanners();

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
          Promos / Carrusel de portada
        </h1>
        <p className="text-[14px] text-muted mt-2 font-light max-w-2xl leading-relaxed">
          Subí banners de ofertas y lanzamientos. Rotan solos en la portada de
          la home. Mientras haya al menos uno{" "}
          <strong className="text-ink">activo</strong>, reemplazan a la portada
          clásica; si los desactivás todos, vuelve la portada con la frase
          principal. Máximo{" "}
          <strong className="text-ink">{BANNERS_LIMITE} banners</strong>.
        </p>

        <FormularioBanners banners={banners} />
      </main>
    </>
  );
}
