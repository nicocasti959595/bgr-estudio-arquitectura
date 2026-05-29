type Props = {
  className?: string;
};

/**
 * Logo BGR: anillo circular + dos casas con techos a dos aguas
 * y un pico central elevado. Color via currentColor (hereda).
 * Sin fondo propio — se monta sobre el background del header.
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
      <path
        fillRule="evenodd"
        d="M 100 8 A 92 92 0 1 1 99.99 8 Z M 100 30 A 70 70 0 1 0 100.01 30 Z"
      />

      {/* Casas con techos a dos aguas (zigzag + pico central elevado) */}
      <path d="M 22 152 L 72 100 L 100 130 L 128 100 L 178 152 L 178 165 L 22 165 Z" />

      {/* Pico central elevado (silueta de ave/águila) */}
      <path d="M 76 118 L 100 82 L 124 118 L 113 124 L 100 104 L 87 124 Z" />

      {/* Ventanas con cuadrícula (izquierda) — strokes engrosados
         para que se distingan en tamaños chicos (header móvil) */}
      <g>
        <rect
          x="38"
          y="136"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />
        <line x1="48" y1="136" x2="48" y2="156" stroke="currentColor" strokeWidth="3.5" />
        <line x1="38" y1="146" x2="58" y2="146" stroke="currentColor" strokeWidth="3.5" />
      </g>
      {/* Ventanas con cuadrícula (derecha) */}
      <g>
        <rect
          x="142"
          y="136"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />
        <line x1="152" y1="136" x2="152" y2="156" stroke="currentColor" strokeWidth="3.5" />
        <line x1="142" y1="146" x2="162" y2="146" stroke="currentColor" strokeWidth="3.5" />
      </g>
    </svg>
  );
}
