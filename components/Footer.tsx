import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-background mt-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-20">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="eyebrow text-background/60">Estudio</p>
            <h3 className="font-serif text-4xl md:text-5xl mt-4 leading-tight">
              BGR <span className="italic text-accent">Estudio Arquitectura</span>
            </h3>
            <p className="mt-6 text-background/70 max-w-md leading-relaxed">
              Arquitectura argentina contemporánea. Diseñamos obras que
              dialogan con el lugar, el clima y los materiales de cada región.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-background/60">Navegación</p>
            <ul className="mt-4 space-y-3">
              {[
                { href: "/proyectos", label: "Proyectos" },
                { href: "/estudio", label: "Estudio" },
                { href: "/servicios", label: "Servicios" },
                { href: "/contacto", label: "Contacto" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="link-underline text-background/90"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow text-background/60">Contacto</p>
            <ul className="mt-4 space-y-3 text-background/90">
              <li>
                <a
                  href="mailto:hola@bgrarquitectura.com.ar"
                  className="link-underline"
                >
                  hola@bgrarquitectura.com.ar
                </a>
              </li>
              <li>
                <a href="tel:+541147778888" className="link-underline">
                  +54 11 4777 8888
                </a>
              </li>
              <li className="text-background/70 leading-relaxed">
                Av. Libertador 2350, Piso 4°
                <br />
                Ciudad Autónoma de Buenos Aires
                <br />
                Argentina
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/15 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-background/50 font-mono tracking-wider">
            © {year} BGR ESTUDIO ARQUITECTURA · TODOS LOS DERECHOS RESERVADOS
          </p>
          <p className="text-xs text-background/50 font-mono tracking-wider">
            CUIT 30-71234567-8 · MAT. CPAU 12345
          </p>
        </div>
      </div>
    </footer>
  );
}
