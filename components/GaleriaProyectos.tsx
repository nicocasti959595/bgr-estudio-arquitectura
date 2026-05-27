import Image from "next/image";

const items = [
  {
    tipo: "Reforma integral",
    titulo: "Cocina · Lavadero",
    barrio: "Coghlan",
    imagen:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80&auto=format&fit=crop",
  },
  {
    tipo: "Remodelación",
    titulo: "Baño en suite",
    barrio: "Villa Urquiza",
    imagen:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=900&q=80&auto=format&fit=crop",
  },
  {
    tipo: "Reforma",
    titulo: "Baño",
    barrio: "Parque Chacabuco",
    imagen:
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=900&q=80&auto=format&fit=crop",
  },
  {
    tipo: "Reforma integral",
    titulo: "Cocina integrada",
    barrio: "Belgrano",
    imagen:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=900&q=80&auto=format&fit=crop",
  },
  {
    tipo: "Reforma",
    titulo: "Cocina",
    barrio: "Núñez",
    imagen:
      "https://images.unsplash.com/photo-1556909067-f8c7e3a7c4ab?w=900&q=80&auto=format&fit=crop",
  },
  {
    tipo: "Remodelación",
    titulo: "Baño",
    barrio: "Belgrano",
    imagen:
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=900&q=80&auto=format&fit=crop",
  },
  {
    tipo: "Reforma",
    titulo: "Cocina · Comedor",
    barrio: "Almagro",
    imagen:
      "https://images.unsplash.com/photo-1556909211-d5b81b06c2fb?w=900&q=80&auto=format&fit=crop",
  },
  {
    tipo: "Remodelación",
    titulo: "Baño principal",
    barrio: "Villa Crespo",
    imagen:
      "https://images.unsplash.com/photo-1564540583246-934409427776?w=900&q=80&auto=format&fit=crop",
  },
  {
    tipo: "Baño compartimentado",
    titulo: "Baño en suite",
    barrio: "Devoto",
    imagen:
      "https://images.unsplash.com/photo-1591311630200-ffa9120a540f?w=900&q=80&auto=format&fit=crop",
  },
  {
    tipo: "Reforma",
    titulo: "Baño principal",
    barrio: "Villa Luro",
    imagen:
      "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=900&q=80&auto=format&fit=crop",
  },
  {
    tipo: "Reforma",
    titulo: "Baño",
    barrio: "Boedo",
    imagen:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=900&q=80&auto=format&fit=crop",
  },
  {
    tipo: "Reforma integral",
    titulo: "Departamento nuevo",
    barrio: "CABA",
    imagen:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=80&auto=format&fit=crop",
  },
];

export function GaleriaProyectos() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px]">
      {items.map((p, i) => (
        <a
          key={i}
          href="https://instagram.com/bgr.construcciones"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative aspect-square bg-surface border border-line overflow-hidden flex items-end"
        >
          <Image
            src={p.imagen}
            alt={`${p.titulo} — ${p.barrio}`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent z-[1]" />
          <div className="relative z-[2] w-full p-4">
            <div className="text-[9px] tracking-[1.5px] uppercase text-accent2 mb-1">
              — {p.tipo}
            </div>
            <div className="font-serif text-[14px] text-white">{p.titulo}</div>
            <div className="text-[11px] text-muted mt-0.5">{p.barrio}</div>
          </div>
          <div className="absolute inset-0 bg-accent/[0.88] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[3]">
            <span className="text-[10px] tracking-[2px] uppercase text-white">
              Ver en Instagram ↗
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
