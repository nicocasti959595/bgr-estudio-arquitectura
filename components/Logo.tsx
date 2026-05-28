type Props = {
  className?: string;
};

/**
 * Monograma BGR estilizado: cuadrado con techo decorativo + iniciales BGR
 * en serif italic. Hereda color via currentColor.
 */
export function Logo({ className = "h-8 w-8" }: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="BGR Logo"
    >
      <rect
        x="6"
        y="6"
        width="88"
        height="88"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M 28 32 L 50 16 L 72 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="50"
        y="73"
        textAnchor="middle"
        fontFamily="Playfair Display, Georgia, serif"
        fontWeight="500"
        fontStyle="italic"
        fontSize="34"
        fill="currentColor"
        style={{ letterSpacing: "-0.02em" }}
      >
        BGR
      </text>
    </svg>
  );
}
