/**
 * Inyecta un bloque JSON-LD (datos estructurados schema.org) en la página.
 * Server component — sin interactividad.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // El contenido es propio (no input de usuario), seguro de serializar.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
