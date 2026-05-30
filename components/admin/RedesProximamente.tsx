import Link from "next/link";

/**
 * Cartel "Próximamente" para la sección de redes mientras el SaaS (redesauto)
 * no esté operativo. Se controla con la env REDES_ACTIVO (server-side):
 *   - REDES_ACTIVO !== "true"  → se muestra este cartel (default).
 *   - REDES_ACTIVO === "true"  → se habilitan las pantallas reales.
 */
export function redesActivo(): boolean {
  return process.env.REDES_ACTIVO === "true";
}

export function RedesProximamente() {
  return (
    <main className="max-w-[900px] mx-auto px-6 md:px-12 py-12 md:py-16">
      <Link
        href="/admin"
        className="text-[10px] tracking-[2px] uppercase text-muted hover:text-ink inline-block mb-6"
      >
        ← Volver
      </Link>

      <div className="border-2 border-accent/40 bg-paper p-8 md:p-14 text-center">
        <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-background bg-accent px-3 py-1.5 mb-6">
          Próximamente
        </span>
        <h1 className="font-serif text-3xl md:text-5xl text-ink leading-tight">
          Automatización de redes
        </h1>
        <p className="text-[15px] text-muted mt-4 font-light max-w-xl mx-auto leading-relaxed">
          Muy pronto vas a poder cargar tus publicaciones e historias, programar
          los horarios y dejar que se publiquen solas en Instagram y Facebook,
          todo desde acá.
        </p>
        <p className="text-[13px] text-muted mt-6 font-light">
          Estamos terminando de conectar el servicio. Te avisamos cuando esté
          disponible.
        </p>

        <div className="mt-10 grid sm:grid-cols-3 gap-3 text-left max-w-xl mx-auto">
          {[
            ["📅", "Programá el mes", "Hasta 90 publicaciones, 3 por día."],
            ["🕒", "Horarios fijos", "Se publican solas, sin que estés encima."],
            ["💬", "Respuestas automáticas", "A cada mensaje que te llega."],
          ].map(([icon, t, d]) => (
            <div key={t} className="border hairline bg-background p-4">
              <div className="text-2xl">{icon}</div>
              <p className="font-serif text-base text-ink mt-2">{t}</p>
              <p className="text-[12px] text-muted mt-1 font-light">{d}</p>
            </div>
          ))}
        </div>

        <Link
          href="/admin"
          className="inline-flex items-center justify-center mt-10 px-8 py-4 bg-accent text-background text-sm tracking-wider uppercase hover:bg-ink transition-colors"
        >
          Volver al panel
        </Link>
      </div>
    </main>
  );
}
