import type { Proyecto, Servicio, Miembro } from "./supabase";

export const proyectosFallback: Proyecto[] = [
  {
    id: "1",
    slug: "casa-pampa",
    titulo: "Casa Pampa",
    ubicacion: "Cañuelas, Buenos Aires",
    anio: 2024,
    tipologia: "Residencial",
    superficie: "320 m²",
    descripcion:
      "Vivienda unifamiliar emplazada en un lote de 1 hectárea sobre la llanura pampeana. La obra se organiza en una secuencia lineal de patios que median entre la vastedad del paisaje y la intimidad doméstica. Estructura de hormigón visto, carpinterías de madera de petiribí y muros de ladrillo aparente.",
    imagen_portada:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80&auto=format&fit=crop",
    imagenes: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1600&q=80&auto=format&fit=crop",
    ],
    destacado: true,
    orden: 1,
    created_at: "2024-03-12",
  },
  {
    id: "2",
    slug: "edificio-malabia",
    titulo: "Edificio Malabia",
    ubicacion: "Palermo, CABA",
    anio: 2023,
    tipologia: "Multifamiliar",
    superficie: "1.840 m²",
    descripcion:
      "Edificio de viviendas de seis plantas en pleno corazón de Palermo. La fachada articula balcones corridos y celosías metálicas que filtran el asoleamiento y otorgan privacidad. Espacios comunes en planta baja con doble altura y patio interior.",
    imagen_portada:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80&auto=format&fit=crop",
    imagenes: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80&auto=format&fit=crop",
    ],
    destacado: true,
    orden: 2,
    created_at: "2023-09-04",
  },
  {
    id: "3",
    slug: "bodega-uco",
    titulo: "Bodega Valle de Uco",
    ubicacion: "Tunuyán, Mendoza",
    anio: 2023,
    tipologia: "Industrial",
    superficie: "2.600 m²",
    descripcion:
      "Bodega boutique al pie de los Andes. La pieza principal —una nave de hormigón pretensado— alberga el sector de vinificación y crianza. Muros de tapial elaborados con tierra del propio terreno establecen un diálogo cromático con el paisaje cuyano.",
    imagen_portada:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80&auto=format&fit=crop",
    imagenes: [
      "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=1600&q=80&auto=format&fit=crop",
    ],
    destacado: true,
    orden: 3,
    created_at: "2023-05-20",
  },
  {
    id: "4",
    slug: "centro-cultural-rosario",
    titulo: "Centro Cultural Saladillo",
    ubicacion: "Rosario, Santa Fe",
    anio: 2022,
    tipologia: "Institucional",
    superficie: "4.100 m²",
    descripcion:
      "Recuperación de una antigua usina eléctrica reconvertida en espacio cultural. La intervención respeta la lógica industrial preexistente —ladrillo, cabriadas metálicas, tragaluces— e incorpora una sala de espectáculos suspendida sobre el patio central.",
    imagen_portada:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1600&q=80&auto=format&fit=crop",
    imagenes: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&q=80&auto=format&fit=crop",
    ],
    destacado: false,
    orden: 4,
    created_at: "2022-11-18",
  },
  {
    id: "5",
    slug: "casa-delta",
    titulo: "Casa Delta",
    ubicacion: "Tigre, Buenos Aires",
    anio: 2022,
    tipologia: "Residencial",
    superficie: "180 m²",
    descripcion:
      "Vivienda elevada sobre pilotes en una isla del Delta del Paraná. Estructura íntegramente de madera de eucalipto, envolvente de chapa galvanizada y grandes aleros que protegen del sol y la humedad ribereña.",
    imagen_portada:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80&auto=format&fit=crop",
    imagenes: null,
    destacado: false,
    orden: 5,
    created_at: "2022-04-09",
  },
  {
    id: "6",
    slug: "oficinas-corrientes",
    titulo: "Oficinas Corrientes 880",
    ubicacion: "Microcentro, CABA",
    anio: 2021,
    tipologia: "Comercial",
    superficie: "920 m²",
    descripcion:
      "Reciclaje integral de dos plantas de un edificio racionalista de los años cuarenta. Se conservaron pisos de granito original, carpinterías de hierro y la doble altura del hall. Nuevos espacios de trabajo flexibles bajo un techo continuo de pino tea.",
    imagen_portada:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format&fit=crop",
    imagenes: null,
    destacado: false,
    orden: 6,
    created_at: "2021-08-30",
  },
];

export const serviciosFallback: Servicio[] = [
  {
    id: "1",
    titulo: "Obra Nueva",
    descripcion:
      "Proyecto y dirección de obras residenciales, comerciales e institucionales. Desde la idea inicial hasta la entrega final.",
    orden: 1,
  },
  {
    id: "2",
    titulo: "Reciclaje y Remodelación",
    descripcion:
      "Intervención sobre edificios existentes con foco en la puesta en valor del patrimonio y la mejora del confort.",
    orden: 2,
  },
  {
    id: "3",
    titulo: "Interiorismo",
    descripcion:
      "Diseño integral de interiores y mobiliario a medida. Curaduría de materiales, iluminación y equipamiento.",
    orden: 3,
  },
  {
    id: "4",
    titulo: "Asesoramiento Técnico",
    descripcion:
      "Estudios de factibilidad, tasaciones, peritajes y consultoría normativa para proyectos urbanos y rurales.",
    orden: 4,
  },
  {
    id: "5",
    titulo: "Dirección de Obra",
    descripcion:
      "Coordinación de gremios, control de calidad, certificaciones y vínculo con organismos municipales.",
    orden: 5,
  },
  {
    id: "6",
    titulo: "Diseño de Paisaje",
    descripcion:
      "Proyecto de jardines, patios y espacios exteriores con flora autóctona y manejo sustentable del agua.",
    orden: 6,
  },
];

export const miembrosFallback: Miembro[] = [
  {
    id: "1",
    nombre: "Inés Mariño",
    rol: "Arquitecta · Socia fundadora",
    bio: "FADU-UBA, 2008. Posgrado en Proyecto Sustentable en la UPC (Barcelona). Premio Arq Clarín Joven 2015.",
    foto: null,
    orden: 1,
  },
  {
    id: "2",
    nombre: "Tomás Vergara",
    rol: "Arquitecto · Socio fundador",
    bio: "FAU-UNLP, 2009. Investigador del CONICET en materialidad regional argentina. Docente titular FADU-UBA.",
    foto: null,
    orden: 2,
  },
  {
    id: "3",
    nombre: "Camila Funes",
    rol: "Arquitecta · Dirección de obra",
    bio: "FAUD-UNC, 2014. Especialista en hormigón visto y sistemas constructivos en seco.",
    foto: null,
    orden: 3,
  },
  {
    id: "4",
    nombre: "Joaquín Reyes",
    rol: "Diseñador industrial",
    bio: "FADU-UBA, 2017. Responsable del área de mobiliario a medida y desarrollo de prototipos.",
    foto: null,
    orden: 4,
  },
];
