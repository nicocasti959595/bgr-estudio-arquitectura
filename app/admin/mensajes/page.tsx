import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase-server";
import { getMensajes } from "@/lib/mensajes";
import { getWhatsappNumero } from "@/lib/contacto";
import { NavAdmin } from "@/components/admin/NavAdmin";
import { BandejaMensajes } from "@/components/admin/BandejaMensajes";
import { ConfigWhatsapp } from "@/components/admin/ConfigWhatsapp";

export const dynamic = "force-dynamic";

export default async function AdminMensajesPage() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const [mensajes, whatsapp] = await Promise.all([
    getMensajes(),
    getWhatsappNumero(),
  ]);
  const nuevos = mensajes.filter((m) => m.estado === "nuevo").length;

  return (
    <>
      <NavAdmin email={user.email ?? ""} />

      <main className="max-w-[1100px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <Link
          href="/admin"
          className="text-[10px] tracking-[2px] uppercase text-muted hover:text-ink inline-block mb-6"
        >
          ← Volver
        </Link>
        <p className="eyebrow mb-3">Panel privado</p>
        <h1 className="font-serif text-4xl md:text-5xl text-ink">Consultas</h1>
        <p className="text-[14px] text-muted mt-2 font-light max-w-2xl leading-relaxed">
          Mensajes recibidos desde el formulario de contacto del sitio.
          {nuevos > 0 ? (
            <>
              {" "}
              Tenés <strong className="text-ink">{nuevos} sin leer</strong>.
            </>
          ) : (
            " No hay consultas nuevas."
          )}
        </p>

        <ConfigWhatsapp numeroInicial={whatsapp} />

        <BandejaMensajes mensajes={mensajes} />
      </main>
    </>
  );
}
