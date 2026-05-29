import type { MetadataRoute } from "next";

const BASE = "https://bgr.com.ar";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/"],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
