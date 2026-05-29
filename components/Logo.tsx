import Image from "next/image";

type Props = {
  className?: string;
  /** "dark" = isotipo negro (sobre fondo claro). "light" = isotipo blanco (sobre fondo oscuro). */
  variant?: "dark" | "light";
};

/**
 * Logo BGR (isotipo). Usa los archivos reales en /public:
 *   - /logo.png         → símbolo negro, fondo transparente
 *   - /logo-blanco.png  → símbolo blanco, fondo transparente
 */
export function Logo({ className = "h-8 w-8", variant = "dark" }: Props) {
  const src = variant === "light" ? "/logo-blanco.png" : "/logo.png";
  return (
    <Image
      src={src}
      alt="BGR Arquitectura y Construcción"
      width={200}
      height={200}
      priority
      className={className}
    />
  );
}
