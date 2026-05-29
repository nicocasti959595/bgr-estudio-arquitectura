import { preguntasFaq } from "./faq-data";

export const SITE_URL = "https://bgr.com.ar";

const REDES = [
  "https://www.instagram.com/bgr.construcciones/",
  "https://www.tiktok.com/@bgr.construcciones",
  "https://youtube.com/@BGR.Construcciones",
];

/** Datos del negocio (LocalBusiness / GeneralContractor) para todo el sitio. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${SITE_URL}/#business`,
    name: "BGR Arquitectura & Construcción",
    legalName: "BGR Construcciones SRL",
    url: SITE_URL,
    image: `${SITE_URL}/logo.png`,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Reformas integrales de departamentos y obra nueva en Buenos Aires. Proyecto, dirección y obra llave en mano en CABA y GBA.",
    email: "info@bgr.com.ar",
    telephone: "+541136910077",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Juan de Garay 3547",
      addressLocality: "Ciudad Autónoma de Buenos Aires",
      addressRegion: "CABA",
      addressCountry: "AR",
    },
    areaServed: [
      { "@type": "City", name: "Ciudad Autónoma de Buenos Aires" },
      { "@type": "AdministrativeArea", name: "Gran Buenos Aires" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    sameAs: REDES,
    slogan: "Si lo podés imaginar, lo podemos construir.",
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#org`,
    name: "BGR Arquitectura & Construcción",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: REDES,
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: preguntasFaq.map((p) => ({
      "@type": "Question",
      name: p.q,
      acceptedAnswer: { "@type": "Answer", text: p.a },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { nombre: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.nombre,
      item: it.url.startsWith("http") ? it.url : `${SITE_URL}${it.url}`,
    })),
  };
}
