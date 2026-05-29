type Props = {
  className?: string;
};

/**
 * Logo BGR: anillo circular + dos casas con techos a dos aguas (con espesor),
 * pico central con águila estilizada y ventanas con patrón pinwheel.
 * Color via currentColor (hereda).
 */
export function Logo({ className = "h-8 w-8" }: Props) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={className}
      aria-label="BGR Logo"
    >
      {/* Anillo circular */}
      <circle
        cx="100"
        cy="100"
        r="86"
        fill="none"
        stroke="currentColor"
        strokeWidth="11"
      />

      {/* Techos M con espesor (cornisa) */}
      <path
        d="M 22,128 L 65,72 L 100,108 L 135,72 L 178,128 L 178,140 L 135,86 L 100,124 L 65,86 L 22,140 Z"
      />

      {/* V central (valle profundo entre las dos casas) */}
      <path d="M 86,112 L 100,148 L 114,112 Z" />

      {/* Águila estilizada con dos alas y pico */}
      <path d="M 74,82 L 88,50 L 94,76 L 100,62 L 106,76 L 112,50 L 126,82 Z" />

      {/* Ventana izquierda: pinwheel de 4 triángulos */}
      <g transform="translate(32,108)">
        <path d="M 0,0 L 11,0 L 0,11 Z" />
        <path d="M 24,0 L 13,0 L 24,11 Z" />
        <path d="M 0,24 L 0,13 L 11,24 Z" />
        <path d="M 24,24 L 24,13 L 13,24 Z" />
      </g>

      {/* Ventana derecha: pinwheel de 4 triángulos */}
      <g transform="translate(144,108)">
        <path d="M 0,0 L 11,0 L 0,11 Z" />
        <path d="M 24,0 L 13,0 L 24,11 Z" />
        <path d="M 0,24 L 0,13 L 11,24 Z" />
        <path d="M 24,24 L 24,13 L 13,24 Z" />
      </g>
    </svg>
  );
}
