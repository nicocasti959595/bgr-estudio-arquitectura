type Props = {
  className?: string;
  ariaLabel?: string;
};

/**
 * Logo BGR — círculo con dos casas y pico central.
 * Usa currentColor, así hereda el color del padre (oscuro sobre claro,
 * claro sobre oscuro). Reemplazá este SVG por un Image que apunte a
 * /public/logo.png si querés tu PNG exacto.
 */
export function Logo({ className = "h-9 w-9", ariaLabel = "BGR" }: Props) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={ariaLabel}
      role="img"
    >
      {/* Anillo exterior (círculo grueso) */}
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M100 8c50.81 0 92 41.19 92 92s-41.19 92-92 92S8 150.81 8 100 49.19 8 100 8zm0 16c41.974 0 76 34.026 76 76s-34.026 76-76 76-76-34.026-76-76 34.026-76 76-76z"
      />
      {/* Casas izquierda + derecha (silueta con techos) */}
      <path
        fill="currentColor"
        d="M28 148 L72 95 L95 122 L100 117 L105 122 L128 95 L172 148 L172 160 L28 160 Z"
      />
      {/* Pico central (V invertida elevada — el "ave" del logo) */}
      <path
        fill="currentColor"
        d="M78 115 L100 78 L122 115 L114 122 L100 105 L86 122 Z"
      />
    </svg>
  );
}
