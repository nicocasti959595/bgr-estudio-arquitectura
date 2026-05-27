const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#estudio", label: "Estudio" },
  { href: "#contacto", label: "Contacto" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#060606] pt-16 px-6 md:px-12 pb-10">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-[1.5fr_1fr_1fr] gap-10 md:gap-16 pb-10 border-b border-white/[0.06]">
        <div>
          <div className="flex items-baseline gap-1.5 mb-3">
            <span className="font-bold text-[14px] text-white tracking-[0.12em]">
              BGR
            </span>
            <span className="font-serif italic text-[13px] text-accent2">
              Arquitectura y Construcción
            </span>
          </div>
          <p className="text-[13px] text-white/30 leading-[1.75] font-light">
            Reformas integrales de departamentos en Buenos Aires.
            <br />
            Proyecto, dirección y obra llave en mano.
          </p>
        </div>

        <div>
          <p className="text-[9px] tracking-[2.5px] uppercase text-white/25 mb-5">
            Navegación
          </p>
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block text-[13px] text-white/45 hover:text-white mb-1.5 transition-colors font-light"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div>
          <p className="text-[9px] tracking-[2.5px] uppercase text-white/25 mb-5">
            Contacto
          </p>
          <a
            href="mailto:info@bgr.com.ar"
            className="block text-[13px] text-white/45 hover:text-white mb-1.5 transition-colors"
          >
            info@bgr.com.ar
          </a>
          <a
            href="https://wa.me/5491122506347"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[13px] text-white/45 hover:text-white mb-1.5 transition-colors"
          >
            +54 9 11 2250-6347
          </a>
          <a
            href="https://instagram.com/bgr.construcciones"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[13px] text-white/45 hover:text-white mb-1.5 transition-colors"
          >
            @bgr.construcciones
          </a>
          <span className="block text-[13px] text-white/45 font-light">
            CABA, Argentina
          </span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between pt-7 gap-2">
        <p className="text-[9px] tracking-[1.5px] uppercase text-white/20">
          © {year} BGR Arquitectura y Construcción · Todos los derechos
          reservados
        </p>
        <p className="text-[9px] tracking-[1.5px] uppercase text-white/20">
          CABA · Argentina
        </p>
      </div>
    </footer>
  );
}
