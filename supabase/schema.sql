-- =====================================================
-- BGR Estudio Arquitectura - Esquema de base de datos
-- Tablas prefijadas con `bgr_` para no colisionar
-- con otros proyectos en la misma instancia Supabase
-- Ejecutar en: SQL Editor de Supabase
-- =====================================================

-- 1. PROYECTOS ----------------------------------------
create table if not exists public.bgr_proyectos (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  titulo text not null,
  ubicacion text not null,
  anio int not null,
  tipologia text not null,
  superficie text,
  descripcion text not null,
  imagen_portada text not null,
  imagenes text[],
  destacado boolean default false,
  orden int default 100,
  created_at timestamptz default now()
);

create index if not exists idx_bgr_proyectos_orden on public.bgr_proyectos(orden);
create index if not exists idx_bgr_proyectos_destacado on public.bgr_proyectos(destacado);

-- 2. SERVICIOS ----------------------------------------
create table if not exists public.bgr_servicios (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descripcion text not null,
  orden int default 100,
  created_at timestamptz default now()
);

-- 3. MIEMBROS DEL EQUIPO ------------------------------
create table if not exists public.bgr_miembros (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  rol text not null,
  bio text,
  foto text,
  orden int default 100,
  created_at timestamptz default now()
);

-- 4. MENSAJES DE CONTACTO -----------------------------
create table if not exists public.bgr_mensajes (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  email text not null,
  telefono text,
  asunto text,
  mensaje text not null,
  leido boolean default false,
  created_at timestamptz default now()
);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================
alter table public.bgr_proyectos enable row level security;
alter table public.bgr_servicios enable row level security;
alter table public.bgr_miembros  enable row level security;
alter table public.bgr_mensajes  enable row level security;

-- Lectura pública del catálogo
drop policy if exists "lectura publica bgr_proyectos" on public.bgr_proyectos;
create policy "lectura publica bgr_proyectos" on public.bgr_proyectos
  for select using (true);

drop policy if exists "lectura publica bgr_servicios" on public.bgr_servicios;
create policy "lectura publica bgr_servicios" on public.bgr_servicios
  for select using (true);

drop policy if exists "lectura publica bgr_miembros" on public.bgr_miembros;
create policy "lectura publica bgr_miembros" on public.bgr_miembros
  for select using (true);

-- Escritura pública sólo para el formulario de contacto
drop policy if exists "insertar mensaje publico bgr" on public.bgr_mensajes;
create policy "insertar mensaje publico bgr" on public.bgr_mensajes
  for insert with check (true);

-- =====================================================
-- DATOS INICIALES
-- =====================================================
insert into public.bgr_proyectos (slug, titulo, ubicacion, anio, tipologia, superficie, descripcion, imagen_portada, imagenes, destacado, orden) values
('casa-pampa', 'Casa Pampa', 'Cañuelas, Buenos Aires', 2024, 'Residencial', '320 m²',
 'Vivienda unifamiliar emplazada en un lote de 1 hectárea sobre la llanura pampeana. La obra se organiza en una secuencia lineal de patios que median entre la vastedad del paisaje y la intimidad doméstica. Estructura de hormigón visto, carpinterías de madera de petiribí y muros de ladrillo aparente.',
 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80&auto=format&fit=crop',
 array['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80&auto=format&fit=crop','https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80&auto=format&fit=crop','https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1600&q=80&auto=format&fit=crop'],
 true, 1),
('edificio-malabia', 'Edificio Malabia', 'Palermo, CABA', 2023, 'Multifamiliar', '1.840 m²',
 'Edificio de viviendas de seis plantas en pleno corazón de Palermo. La fachada articula balcones corridos y celosías metálicas que filtran el asoleamiento y otorgan privacidad. Espacios comunes en planta baja con doble altura y patio interior.',
 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80&auto=format&fit=crop',
 array['https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80&auto=format&fit=crop','https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80&auto=format&fit=crop'],
 true, 2),
('bodega-uco', 'Bodega Valle de Uco', 'Tunuyán, Mendoza', 2023, 'Industrial', '2.600 m²',
 'Bodega boutique al pie de los Andes. La pieza principal —una nave de hormigón pretensado— alberga el sector de vinificación y crianza. Muros de tapial elaborados con tierra del propio terreno establecen un diálogo cromático con el paisaje cuyano.',
 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80&auto=format&fit=crop',
 array['https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=1600&q=80&auto=format&fit=crop'],
 true, 3),
('centro-cultural-rosario', 'Centro Cultural Saladillo', 'Rosario, Santa Fe', 2022, 'Institucional', '4.100 m²',
 'Recuperación de una antigua usina eléctrica reconvertida en espacio cultural. La intervención respeta la lógica industrial preexistente —ladrillo, cabriadas metálicas, tragaluces— e incorpora una sala de espectáculos suspendida sobre el patio central.',
 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1600&q=80&auto=format&fit=crop',
 array['https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&q=80&auto=format&fit=crop'],
 false, 4),
('casa-delta', 'Casa Delta', 'Tigre, Buenos Aires', 2022, 'Residencial', '180 m²',
 'Vivienda elevada sobre pilotes en una isla del Delta del Paraná. Estructura íntegramente de madera de eucalipto, envolvente de chapa galvanizada y grandes aleros que protegen del sol y la humedad ribereña.',
 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80&auto=format&fit=crop',
 null, false, 5),
('oficinas-corrientes', 'Oficinas Corrientes 880', 'Microcentro, CABA', 2021, 'Comercial', '920 m²',
 'Reciclaje integral de dos plantas de un edificio racionalista de los años cuarenta. Se conservaron pisos de granito original, carpinterías de hierro y la doble altura del hall. Nuevos espacios de trabajo flexibles bajo un techo continuo de pino tea.',
 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format&fit=crop',
 null, false, 6)
on conflict (slug) do nothing;

insert into public.bgr_servicios (titulo, descripcion, orden) values
('Obra Nueva', 'Proyecto y dirección de obras residenciales, comerciales e institucionales. Desde la idea inicial hasta la entrega final.', 1),
('Reciclaje y Remodelación', 'Intervención sobre edificios existentes con foco en la puesta en valor del patrimonio y la mejora del confort.', 2),
('Interiorismo', 'Diseño integral de interiores y mobiliario a medida. Curaduría de materiales, iluminación y equipamiento.', 3),
('Asesoramiento Técnico', 'Estudios de factibilidad, tasaciones, peritajes y consultoría normativa para proyectos urbanos y rurales.', 4),
('Dirección de Obra', 'Coordinación de gremios, control de calidad, certificaciones y vínculo con organismos municipales.', 5),
('Diseño de Paisaje', 'Proyecto de jardines, patios y espacios exteriores con flora autóctona y manejo sustentable del agua.', 6);

insert into public.bgr_miembros (nombre, rol, bio, orden) values
('Inés Mariño', 'Arquitecta · Socia fundadora', 'FADU-UBA, 2008. Posgrado en Proyecto Sustentable en la UPC (Barcelona). Premio Arq Clarín Joven 2015.', 1),
('Tomás Vergara', 'Arquitecto · Socio fundador', 'FAU-UNLP, 2009. Investigador del CONICET en materialidad regional argentina. Docente titular FADU-UBA.', 2),
('Camila Funes', 'Arquitecta · Dirección de obra', 'FAUD-UNC, 2014. Especialista en hormigón visto y sistemas constructivos en seco.', 3),
('Joaquín Reyes', 'Diseñador industrial', 'FADU-UBA, 2017. Responsable del área de mobiliario a medida y desarrollo de prototipos.', 4);
