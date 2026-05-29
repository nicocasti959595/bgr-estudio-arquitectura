import type { MetadataRoute } from "next";
import { getProyectos } from "@/lib/datos";

const BASE = "https://bgr.com.ar";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const estaticas: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/servicios`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/proyectos`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/metodo-bgr`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/estudio`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contacto`, changeFrequency: "yearly", priority: 0.6 },
  ];

  let dinamicas: MetadataRoute.Sitemap = [];
  try {
    const proyectos = await getProyectos();
    dinamicas = proyectos
      .filter((p) => p.slug)
      .map((p) => ({
        url: `${BASE}/proyectos/${p.slug}`,
        lastModified: p.created_at ? new Date(p.created_at) : undefined,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
  } catch {
    dinamicas = [];
  }

  return [...estaticas, ...dinamicas];
}
